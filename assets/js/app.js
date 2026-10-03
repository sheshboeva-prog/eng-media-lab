import { videos, tests, games, youtubeWatchUrl, youtubeThumb, youtubeThumbAlt } from './data.js?v=12';

/* ---------------------------------------------------------------
   State
   --------------------------------------------------------------- */
const TABS = {
  home:    { title: 'EnglishMediaLab', sub: 'Watch a lesson, test what you know, then play a game.' },
  videos:  { title: 'Videos',  sub: 'Short lessons to watch and learn from.' },
  tests:   { title: 'Tests',   sub: 'Five questions on one topic, scored as soon as you finish.' },
  games:   { title: 'Games',   sub: 'Interactive activities that play right here on the page.' },
};

let savedLevel = 'standard';
try { savedLevel = localStorage.getItem('eml-level') || 'standard'; } catch { /* storage off */ }

const state = { tab: 'home', query: '', topic: 'all', run: null, play: null, level: savedLevel };

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const el = (tag, props = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const child of [].concat(children)) {
    if (child) node.append(child.nodeType ? child : document.createTextNode(child));
  }
  return node;
};

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const countOf = (item) => (Array.isArray(item.questions) ? item.questions.length : item.questions);

const icon = (paths, attrs = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${attrs}>${paths}</svg>`;

/* ---------------------------------------------------------------
   Cards
   --------------------------------------------------------------- */
function videoCard(item) {
  const card = el('a', {
    className: 'card',
    href: youtubeWatchUrl(item.id),
    target: '_blank',
    rel: 'noopener noreferrer',
  });
  card.innerHTML = `
    <div class="card__thumb card__thumb--media">
      <img class="card__img" src="${youtubeThumb(item.id)}" alt="" loading="lazy"
           onerror="this.onerror=null;this.src='${youtubeThumbAlt(item.id)}'" />
      <span class="card__tag">${item.topic}</span>
      <span class="card__play">${icon('<path d="m9 7 9 5-9 5z" fill="currentColor" stroke="none" />')}</span>
      <span class="card__badge">${item.duration}</span>
    </div>
    <div class="card__body">
      <h3 class="card__title">${item.title}</h3>
      <p class="card__desc">${item.desc}</p>
      <div class="card__meta">
        <span class="card__channel">${item.channel}</span>
      </div>
    </div>`;
  return card;
}

function testRow(item) {
  const row = el('button', { className: 'row', type: 'button' });
  row.innerHTML = `
    <span class="row__icon">${icon('<path d="M9 5h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /><path d="M10 10h4M10 14h4" />')}</span>
    <span class="row__main">
      <span class="row__title">${item.title}</span>
      <span class="row__meta">${item.topic} · ${countOf(item)} questions</span>
    </span>
    <span class="row__cta">Start</span>`;
  row.addEventListener('click', () => startTest(item));
  return row;
}

const bestLabel = (game) => {
  const best = readBest(game);
  return best ? ` · best ${best.correct}/${best.total}` : '';
};

function gameCard(item) {
  const card = el('button', { className: 'card', type: 'button' });
  card.innerHTML = `
    <div class="cover cover--${item.cover}">
      <span class="cover__type">${item.type}</span>
      <span class="cover__title">${item.title}</span>
      <span class="cover__play">${icon('<path d="m9 7 9 5-9 5z" fill="currentColor" stroke="none" />')}</span>
    </div>
    <div class="card__body">
      <p class="card__desc card__desc--lead">${item.intro}</p>
      <div class="card__meta">
        <span class="tag">${item.topic}</span>
        <span class="dot"></span>
        <span>${item.type}</span>
      </div>
      <p class="card__skill">${item.cognitive}${bestLabel(item)}</p>
    </div>`;
  card.addEventListener('click', () => startGame(item));
  return card;
}

/* ---------------------------------------------------------------
   Render
   --------------------------------------------------------------- */
const datasets = { videos, tests, games };

function matches(item) {
  const q = state.query.trim().toLowerCase();
  const byQuery = !q || `${item.title} ${item.desc ?? ''} ${item.topic} ${item.channel ?? ''} ${item.type ?? ''}`.toLowerCase().includes(q);
  const byTopic = state.topic === 'all' || item.topic === state.topic;
  return byQuery && byTopic;
}

/** Topics are read from the content itself, so a new entry adds its own chip. */
const topicsFor = (tab) => [...new Set(datasets[tab].map((item) => item.topic))].sort();

function renderFilters() {
  const wrap = $('#filters');
  wrap.replaceChildren();
  for (const value of ['all', ...topicsFor(state.tab)]) {
    const chip = el('button', { className: 'chip', type: 'button', textContent: value === 'all' ? 'All topics' : value });
    chip.setAttribute('aria-pressed', String(state.topic === value));
    chip.addEventListener('click', () => {
      state.topic = value;
      renderFilters();
      renderContent();
    });
    wrap.append(chip);
  }
}

function replay(node) {
  node.classList.remove('is-enter');
  void node.offsetWidth;
  node.classList.add('is-enter');
}

function renderContent() {
  const content = $('#content');

  if (state.play) {
    content.replaceChildren(renderPlayer());
    replay(content);
    return;
  }

  if (state.run) {
    content.replaceChildren(state.run.done ? renderResults() : renderQuestion());
    replay(content);
    return;
  }

  if (state.tab === 'home') {
    content.replaceChildren(renderHome());
    replay(content);
    return;
  }

  const items = datasets[state.tab].filter(matches);
  content.replaceChildren();

  if (!items.length) {
    content.append(el('div', {
      className: 'empty',
      innerHTML: '<strong>Nothing here yet</strong><span>Try another topic or clear the search.</span>',
    }));
    replay(content);
    return;
  }

  const grid = el('div', { className: state.tab === 'tests' ? 'grid grid--list' : 'grid' });
  const build = { videos: videoCard, tests: testRow, games: gameCard }[state.tab];
  items.forEach((item) => grid.append(build(item)));
  content.append(grid);
  replay(content);
}

/* ---------------------------------------------------------------
   Home — the three sections, with a few items from each
   --------------------------------------------------------------- */
const SECTIONS = [
  {
    tab: 'videos', label: 'Videos', unit: 'lessons',
    glyph: '<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9.5 5 2.5-5 2.5z" />',
    blurb: 'Watch short English-language videos on different topics. Listen carefully '
         + 'and focus on the main ideas, key information, and new vocabulary.',
  },
  {
    tab: 'tests', label: 'Tests', unit: 'topics',
    glyph: '<path d="M9 4h6a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><path d="M10 10h4M10 14h4" />',
    blurb: 'Check your understanding after watching the videos. Answer the questions '
         + 'and test your English knowledge, comprehension, and analytical skills.',
  },
  {
    tab: 'games', label: 'Games', unit: 'activities',
    glyph: '<rect x="2" y="7" width="20" height="11" rx="4" /><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 14h.01" />',
    blurb: 'Learn English in an enjoyable and interactive way. Complete different '
         + 'language games to practise vocabulary, comprehension, and cognitive skills.',
  },
];

const ARROW = '<path d="M5 12h13M13 6l6 6-6 6" />';

function sectionCard({ tab, label, unit, blurb, glyph }) {
  const card = el('button', { className: `section section--${tab}`, type: 'button' });
  card.innerHTML = `
    <span class="section__top">
      <span class="section__icon" aria-hidden="true">${icon(glyph)}</span>
      <span class="section__arrow">${icon(ARROW)}</span>
    </span>
    <span class="section__title">${label}</span>
    <span class="section__blurb">${blurb}</span>
    <span class="section__count">${datasets[tab].length} ${unit}</span>`;
  card.addEventListener('click', () => setTab(tab));
  return card;
}

function homeBlock(tab, heading, items, build, listClass) {
  const block = el('section', { className: 'block' });
  block.innerHTML = `
    <div class="block__head">
      <h2 class="block__title">${heading}</h2>
      <span class="block__of">${items.length} of ${datasets[tab].length}</span>
      <button class="linkish linkish--end" type="button">See all ${icon(ARROW)}</button>
    </div>
    <div class="${listClass}"></div>`;
  const list = $(`.${listClass.split(' ')[0]}`, block);
  items.forEach((item) => list.append(build(item)));
  $('.linkish', block).addEventListener('click', () => setTab(tab));
  return block;
}

function howToLearn() {
  const node = el('section', { className: 'motto' });
  node.innerHTML = `
    <p class="motto__label">How to learn</p>
    <p class="motto__line">Learn English through media, challenge your thinking, and enjoy the process!</p>`;
  return node;
}

function renderHome() {
  const frag = document.createDocumentFragment();

  const sections = el('div', { className: 'sections' });
  SECTIONS.forEach((section) => sections.append(sectionCard(section)));
  frag.append(sections);
  frag.append(howToLearn());

  frag.append(homeBlock('videos', 'Watch', videos.slice(0, 3), videoCard, 'grid'));
  frag.append(homeBlock('tests', 'Test yourself', tests.slice(0, 3), testRow, 'grid grid--list'));
  frag.append(homeBlock('games', 'Play a game', games.slice(0, 3), gameCard, 'grid'));
  return frag;
}

/* ---------------------------------------------------------------
   Games — levels, engines and one shared result
   --------------------------------------------------------------- */
const LEVELS = ['easy', 'standard', 'hard'];
const LEVEL_LABEL = { easy: 'Easy', standard: 'Standard', hard: 'Hard' };
const LEVELLED = new Set(['match', 'sort', 'predict', 'chain', 'memory', 'spot']);

/** How much of a game's material each level uses. */
const SIZES = {
  match:   { easy: 4, standard: 6, hard: 99 },
  sort:    { easy: 6, standard: 9, hard: 99 },
  predict: { easy: 4, standard: 6, hard: 99 },
  chain:   { easy: 2, standard: 3, hard: 99 },
  memory:  { easy: 4, standard: 6, hard: 8 },
  spot:    { easy: 1, standard: 2, hard: 3 },
};
const STUDY_SECONDS = { easy: 16, standard: 13, hard: 10 };

const shuffle = (list) => {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const portion = (list, kind) => shuffle(list).slice(0, SIZES[kind][state.level]);
const clock = () => performance.now();
const secondsSince = (from) => Math.max(1, Math.round((clock() - from) / 1000));
const spell = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

const bestKey = (game) => `eml-best-${game.id}-${state.level}`;
const readBest = (game) => {
  try { return JSON.parse(localStorage.getItem(bestKey(game))); } catch { return null; }
};
const writeBest = (game, data) => {
  try { localStorage.setItem(bestKey(game), JSON.stringify(data)); } catch { /* storage off */ }
};

function startGame(game) {
  state.play = game;
  focusTab('games');
  renderTab();
  $('#main').scrollIntoView({ block: 'start' });
}

/** Started from the home page, an activity still belongs to its own tab. */
function focusTab(tab) {
  state.tab = tab;
  if (location.hash !== `#/${tab}`) location.hash = `#/${tab}`;
}

function exitGame() {
  state.play = null;
  renderTab();
}

function setLevel(level) {
  state.level = level;
  try { localStorage.setItem('eml-level', level); } catch { /* storage off */ }
  renderContent();
}

function levelPicker(game) {
  const wrap = el('div', { className: 'levels', role: 'group' });
  wrap.setAttribute('aria-label', 'Difficulty');
  wrap.append(el('span', { className: 'levels__label', textContent: 'Level' }));
  LEVELS.forEach((level) => {
    const chip = el('button', { className: 'chip', type: 'button', textContent: LEVEL_LABEL[level] });
    chip.setAttribute('aria-pressed', String(state.level === level));
    chip.addEventListener('click', () => setLevel(level));
    wrap.append(chip);
  });
  const best = readBest(game);
  if (best) wrap.append(el('span', { className: 'levels__best', textContent: `Best ${best.correct}/${best.total}` }));
  return wrap;
}

function playerShell(game, body) {
  const wrap = el('section', { className: 'player' });
  wrap.innerHTML = `
    <div class="runner__head">
      <button class="linkish" type="button" data-exit>${icon('<path d="M15 18l-6-6 6-6" />')} All games</button>
      <span class="runner__step">${game.type}</span>
    </div>
    <p class="player__intro">${game.intro}</p>
    <dl class="traits">
      <div><dt>Cognitive skill</dt><dd>${game.cognitive}</dd></div>
      <div><dt>Language skill</dt><dd>${game.language}</dd></div>
      <div><dt>Material</dt><dd>${game.media}</dd></div>
    </dl>
    <div class="board"></div>`;
  $('[data-exit]', wrap).addEventListener('click', exitGame);
  if (LEVELLED.has(game.kind)) $('.board', wrap).before(levelPicker(game));
  $('.board', wrap).append(body);
  return wrap;
}

function renderPlayer() {
  const game = state.play;
  const engines = {
    match: matchGame, sort: sortGame, wheel: wheelGame, cards: cardsGame,
    predict: predictGame, memory: memoryGame, chain: chainGame, spot: spotGame,
  };
  return playerShell(game, engines[game.kind](game));
}

/** Every game that can be scored ends here. */
function gameResult(game, { correct, total, seconds, review = [], extra = '' }) {
  const wrong = total - correct;
  const previous = readBest(game);
  const beaten = !previous || correct > previous.correct
    || (correct === previous.correct && seconds < previous.seconds);
  if (beaten) writeBest(game, { correct, total, seconds });

  const wrap = el('section', { className: 'result' });
  wrap.innerHTML = `
    <div class="score">
      <div class="score__ring" style="--pct:0">
        <span class="score__num"><span data-count>0</span><small>/${total}</small></span>
      </div>
      <div class="score__side">
        <p class="score__line"><span class="score__dot score__dot--ok"></span>${spell(correct, 'right')}</p>
        <p class="score__line"><span class="score__dot score__dot--no"></span>${spell(wrong, 'missed')}</p>
        <p class="score__verdict">
          ${LEVEL_LABEL[state.level]} level, ${spell(seconds, 'second')}${extra ? `, ${extra}` : ''}.
          ${beaten ? '<strong>Your best so far.</strong>'
                   : `Your best here is ${previous.correct}/${previous.total}.`}
        </p>
      </div>
    </div>
    <ol class="review"></ol>
    <div class="runner__actions"></div>`;

  const list = $('.review', wrap);
  review.forEach((item) => {
    const node = el('li', { className: `review__item ${item.ok ? 'is-ok' : 'is-no'}` });
    node.innerHTML = `
      <span class="review__mark">${item.ok
        ? icon('<path d="M20 6L9 17l-5-5" />')
        : icon('<path d="M6 6l12 12M18 6L6 18" />')}</span>
      <div class="review__body">
        <p class="review__q">${item.q}</p>
        ${item.your ? `<p class="review__answer"><span class="review__label">You said</span>${item.your}</p>` : ''}
        ${item.right ? `<p class="review__answer review__answer--right"><span class="review__label">Answer</span>${item.right}</p>` : ''}
        ${item.why ? `<p class="review__why">${item.why}</p>` : ''}
      </div>`;
    list.append(node);
  });
  if (!review.length) list.remove();

  const actions = $('.runner__actions', wrap);
  const again = el('button', { className: 'btn', type: 'button', textContent: 'Play again' });
  again.addEventListener('click', () => { state.play = game; renderContent(); });
  actions.append(again);

  const next = LEVELS[LEVELS.indexOf(state.level) + 1];
  if (next && LEVELLED.has(game.kind)) {
    const harder = el('button', { className: 'btn btn--primary', type: 'button', textContent: `Step up to ${LEVEL_LABEL[next]}` });
    harder.addEventListener('click', () => setLevel(next));
    actions.append(harder);
  } else {
    const back = el('button', { className: 'btn btn--primary', type: 'button', textContent: 'All games' });
    back.addEventListener('click', exitGame);
    actions.append(back);
  }

  const ring = $('.score__ring', wrap);
  const number = $('[data-count]', wrap);
  requestAnimationFrame(() => {
    ring.style.setProperty('--pct', (correct / total) * 100);
    const from = clock();
    const step = () => {
      const t = Math.min((clock() - from) / 900, 1);
      number.textContent = Math.round(correct * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
      else number.textContent = correct;
    };
    if (correct) requestAnimationFrame(step);
  });
  // frames stop in a hidden tab, so show the score either way
  setTimeout(() => { number.textContent = correct; }, 1200);
  return wrap;
}

const finish = (holder, node) => {
  holder.replaceChildren(node);
  holder.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
};

/* --- match up: click a word, then click what belongs with it --- */
function matchGame(game) {
  const holder = el('div', { className: 'game' });
  const board = el('div', { className: 'match' });
  const pairs = portion(game.pairs, 'match');
  const started = clock();
  let picked = null;
  let done = 0;
  let misses = 0;

  const status = el('p', { className: 'board__status', textContent: `0 of ${pairs.length} matched` });

  const column = (side, entries) => {
    const picture = game.pictures && side === 'meaning';
    const col = el('div', { className: `match__col match__col--${side}${picture ? ' match__col--grid' : ''}` });
    entries.forEach(({ text, key }) => {
      const btn = el('button', { className: `match__item${picture ? ' match__pic' : ''}`, type: 'button' });
      if (picture) btn.innerHTML = `<img src="${text}" alt="" loading="lazy" />`;
      else btn.textContent = text;
      btn.dataset.key = key;
      btn.dataset.side = side;
      btn.addEventListener('click', () => pick(btn));
      col.append(btn);
    });
    return col;
  };

  function pick(btn) {
    if (btn.classList.contains('is-done')) return;
    if (!picked) { picked = btn; btn.classList.add('is-picked'); return; }
    if (picked === btn) { btn.classList.remove('is-picked'); picked = null; return; }
    if (picked.dataset.side === btn.dataset.side) {
      picked.classList.remove('is-picked');
      picked = btn;
      btn.classList.add('is-picked');
      return;
    }

    const first = picked;
    picked = null;
    first.classList.remove('is-picked');

    if (first.dataset.key === btn.dataset.key) {
      [first, btn].forEach((n) => n.classList.add('is-done'));
      done += 1;
      status.textContent = `${done} of ${pairs.length} matched`;
      if (done === pairs.length) {
        finish(holder, gameResult(game, {
          correct: pairs.length,
          total: pairs.length,
          seconds: secondsSince(started),
          extra: misses ? spell(misses, 'wrong try') : 'no wrong tries',
          review: game.pictures ? [] : pairs.map(([term, meaning]) => ({ ok: true, q: term, right: meaning })),
        }));
      }
    } else {
      misses += 1;
      [first, btn].forEach((n) => {
        n.classList.add('is-wrong');
        setTimeout(() => n.classList.remove('is-wrong'), 420);
      });
    }
  }

  const left = pairs.map(([term], i) => ({ text: term, key: String(i) }));
  const right = pairs.map(([, answer], i) => ({ text: answer, key: String(i) }));
  board.append(column('term', shuffle(left)), column('meaning', shuffle(right)));
  if (game.pictures) board.classList.add('match--pictures');

  holder.append(board, status);
  return holder;
}

/* --- group sort: one card at a time, straight into a bin --- */
function sortGame(game) {
  const holder = el('div', { className: 'game' });
  const order = portion(game.items, 'sort');
  const bins = el('div', { className: 'bins' });
  const stage = el('div', { className: 'stage' });
  const status = el('p', { className: 'board__status' });
  const started = clock();
  const review = [];
  let at = 0;
  let right = 0;

  const binNodes = game.groups.map((name, gi) => {
    const bin = el('div', { className: 'bin' });
    bin.innerHTML = `<button class="bin__label" type="button">${name}</button><div class="bin__items"></div>`;
    $('.bin__label', bin).addEventListener('click', () => place(gi));
    bins.append(bin);
    return bin;
  });

  function draw() {
    const item = order[at];
    status.textContent = `${at} of ${order.length} sorted`;
    const card = el('div', { className: `stage__card${item.img ? ' stage__card--photo' : ''}` });
    if (item.img) card.innerHTML = `<img src="${item.img}" alt="" /><span class="stage__caption">${item.text}</span>`;
    else card.textContent = item.text;
    stage.replaceChildren(card);
  }

  function place(choice) {
    if (at >= order.length) return;
    const item = order[at];
    const ok = choice === item.group;
    if (ok) right += 1;
    else {
      review.push({
        ok: false,
        q: item.text,
        your: game.groups[choice],
        right: game.groups[item.group],
        why: item.why || '',
      });
    }
    const chip = el('span', { className: `chip-item ${ok ? 'is-ok' : 'is-no'}` });
    chip.innerHTML = item.img ? `<img class="chip-item__thumb" src="${item.img}" alt="" />${item.text}` : item.text;
    $('.bin__items', binNodes[item.group]).append(chip);
    at += 1;
    if (at < order.length) draw();
    else finish(holder, gameResult(game, { correct: right, total: order.length, seconds: secondsSince(started), review }));
  }

  draw();
  holder.append(stage, bins, status);
  return holder;
}

/* --- predict the next: a situation, then what follows --- */
function predictGame(game) {
  const holder = el('div', { className: 'game' });
  const order = portion(game.items, 'predict');
  const stage = el('div', { className: 'predict' });
  const status = el('p', { className: 'board__status' });
  const started = clock();
  const review = [];
  let at = 0;
  let right = 0;

  function draw() {
    status.textContent = `Situation ${at + 1} of ${order.length}`;
    const item = order[at];
    const scene = el('p', { className: 'predict__scene', textContent: item.scene });
    const list = el('div', { className: 'predict__options' });
    item.options.forEach((text, i) => {
      const btn = el('button', { className: 'opt', type: 'button' });
      btn.innerHTML = `<span class="opt__letter">${LETTERS[i]}</span><span class="opt__text">${text}</span>`;
      btn.addEventListener('click', () => answer(i));
      list.append(btn);
    });
    stage.replaceChildren(scene, list);
  }

  function answer(choice) {
    const item = order[at];
    const ok = choice === item.answer;
    if (ok) right += 1;
    else {
      review.push({
        ok: false,
        q: item.scene,
        your: item.options[choice],
        right: item.options[item.answer],
        why: item.why,
      });
    }
    $$('.opt', stage).forEach((b, i) => {
      b.disabled = true;
      if (i === item.answer) b.classList.add('is-right');
      else if (i === choice) b.classList.add('is-wrong');
    });
    const note = el('div', { className: `predict__why ${ok ? 'is-ok' : 'is-no'}` });
    note.innerHTML = `<strong>${ok ? 'That follows.' : 'Not quite.'}</strong> ${item.why}`;
    const next = el('button', {
      className: 'btn btn--primary',
      type: 'button',
      textContent: at === order.length - 1 ? 'See how you did' : 'Next situation',
    });
    next.addEventListener('click', () => {
      at += 1;
      if (at < order.length) draw();
      else finish(holder, gameResult(game, { correct: right, total: order.length, seconds: secondsSince(started), review }));
    });
    stage.append(note, el('div', { className: 'runner__actions' }, [next]));
  }

  draw();
  holder.append(stage, status);
  return holder;
}

/* --- memory challenge: look, then remember --- */
function memoryGame(game) {
  const holder = el('div', { className: 'game' });
  const stage = el('div', { className: 'memory' });
  const status = el('p', { className: 'board__status' });
  const actions = el('div', { className: 'runner__actions runner__actions--centre' });
  const shown = portion(game.shown, 'memory');
  const spare = shuffle([...game.shown.filter((i) => !shown.includes(i)), ...game.extra]).slice(0, shown.length);
  const seconds = STUDY_SECONDS[state.level];
  let timer = null;
  let started = clock();

  const tile = (item, extra = '') => `
    <div class="memory__tile ${extra}" data-text="${item.text}">
      <img src="${item.img}" alt="" loading="lazy" />
      <span>${item.text}</span>
    </div>`;

  function study() {
    let left = seconds;
    stage.innerHTML = `<div class="memory__grid">${shuffle(shown).map((i) => tile(i)).join('')}</div>`;
    status.textContent = `Look closely. ${spell(left, 'second')} left.`;
    const ready = el('button', { className: 'btn', type: 'button', textContent: 'I am ready' });
    ready.addEventListener('click', () => { clearInterval(timer); recall(); });
    actions.replaceChildren(ready);
    timer = setInterval(() => {
      left -= 1;
      status.textContent = `Look closely. ${spell(Math.max(left, 0), 'second')} left.`;
      if (left <= 0) { clearInterval(timer); recall(); }
    }, 1000);
  }

  function recall() {
    started = clock();
    const pool = shuffle([...shown, ...spare]);
    const picked = new Set();
    stage.innerHTML = `<div class="memory__grid memory__grid--pick">${pool.map((i) => tile(i, 'is-pickable')).join('')}</div>`;
    status.textContent = `Pick the ${shown.length} you saw. 0 chosen.`;
    $$('.memory__tile', stage).forEach((node) => {
      node.addEventListener('click', () => {
        if (node.classList.contains('is-marked')) return;
        const text = node.dataset.text;
        if (picked.has(text)) { picked.delete(text); node.classList.remove('is-picked'); }
        else { picked.add(text); node.classList.add('is-picked'); }
        status.textContent = `Pick the ${shown.length} you saw. ${picked.size} chosen.`;
      });
    });

    const check = el('button', { className: 'btn btn--primary', type: 'button', textContent: 'Check my answer' });
    check.addEventListener('click', () => {
      const wanted = new Set(shown.map((i) => i.text));
      const review = [];
      let right = 0;
      $$('.memory__tile', stage).forEach((node) => {
        const was = wanted.has(node.dataset.text);
        const chose = picked.has(node.dataset.text);
        node.classList.add('is-marked');
        if (was && chose) { node.classList.add('is-ok'); right += 1; }
        else if (chose) {
          node.classList.add('is-no');
          review.push({ ok: false, q: node.dataset.text, your: 'You picked it', right: 'It was not in the set' });
        } else if (was) {
          node.classList.add('is-missed');
          review.push({ ok: false, q: node.dataset.text, your: 'You left it out', right: 'It was in the set' });
        }
      });
      finish(holder, gameResult(game, { correct: right, total: shown.length, seconds: secondsSince(started), review }));
    });
    actions.replaceChildren(check);
  }

  study();
  holder.append(stage, status, actions);
  return holder;
}

/* --- cause and effect: put the chain back in order --- */
function chainGame(game) {
  const holder = el('div', { className: 'game' });
  const chains = portion(game.chains, 'chain');
  const stage = el('div', { className: 'chain' });
  const status = el('p', { className: 'board__status' });
  const actions = el('div', { className: 'runner__actions runner__actions--centre' });
  const started = clock();
  const review = [];
  let at = 0;
  let scored = 0;

  function draw() {
    const chain = chains[at];
    const chosen = [];
    status.textContent = `Chain ${at + 1} of ${chains.length}`;
    stage.innerHTML = `
      <p class="chain__title">${chain.title}</p>
      <ol class="chain__built"></ol>
      <div class="chain__pool"></div>`;

    const built = $('.chain__built', stage);
    const pool = $('.chain__pool', stage);

    shuffle(chain.steps).forEach((step) => {
      const chip = el('button', { className: 'chain__step', type: 'button', textContent: step });
      chip.addEventListener('click', () => {
        if (chip.disabled) return;
        chip.disabled = true;
        chosen.push(step);
        built.append(el('li', { className: 'chain__slot', textContent: step }));
        if (chosen.length === chain.steps.length) check(chain, chosen, built);
      });
      pool.append(chip);
    });
    actions.replaceChildren();
  }

  function check(chain, chosen, built) {
    let right = 0;
    $$('.chain__slot', built).forEach((slot, i) => {
      const ok = chosen[i] === chain.steps[i];
      slot.classList.add(ok ? 'is-ok' : 'is-no');
      if (ok) right += 1;
    });
    scored += right;
    if (right < chain.steps.length) {
      review.push({
        ok: false,
        q: chain.title,
        your: `${right} of ${chain.steps.length} steps in the right place`,
        right: chain.steps.join(' → '),
      });
    }
    status.textContent = `${right} of ${chain.steps.length} in the right place.`;
    const last = at === chains.length - 1;
    const next = el('button', {
      className: 'btn btn--primary',
      type: 'button',
      textContent: last ? 'See how you did' : 'Next chain',
    });
    next.addEventListener('click', () => {
      at += 1;
      if (at < chains.length) draw();
      else {
        const total = chains.reduce((n, c) => n + c.steps.length, 0);
        finish(holder, gameResult(game, { correct: scored, total, seconds: secondsSince(started), review }));
      }
    });
    actions.replaceChildren(next);
  }

  draw();
  holder.append(stage, status, actions);
  return holder;
}

/* --- spot the difference: two photographs, five changes --- */
function spotGame(game) {
  const holder = el('div', { className: 'game' });
  const scenes = portion(game.scenes, 'spot');
  const stage = el('div', { className: 'spot' });
  const status = el('p', { className: 'board__status' });
  const actions = el('div', { className: 'runner__actions runner__actions--centre' });
  const started = clock();
  let at = 0;
  let found = 0;
  let missedClicks = 0;
  let revealed = 0;
  let ticker = null;

  // each hotspot carries its own reach, in per cent, so a big object is easier to
  // hit than a small one
  const reachX = (spot) => spot.rx || 8.6;
  const reachY = (spot) => spot.ry || 11.4;

  function draw() {
    const scene = scenes[at];
    const resolved = new Set();
    stage.innerHTML = `
      <p class="spot__title">${scene.title}</p>
      <div class="spot__pair">
        <figure class="spot__pane"><img src="${scene.a}" alt="The first photograph" /><figcaption>Before</figcaption></figure>
        <figure class="spot__pane"><img src="${scene.b}" alt="The second photograph" /><figcaption>After</figcaption></figure>
      </div>`;

    const panes = $$('.spot__pane', stage);
    const tell = () => {
      status.textContent = `Scene ${at + 1} of ${scenes.length} · ${resolved.size} of ${scene.spots.length} found`;
    };
    tell();

    const mark = (index, how) => {
      panes.forEach((pane) => {
        const dot = el('span', { className: `spot__mark ${how}` });
        dot.style.left = `${scene.spots[index].x}%`;
        dot.style.top = `${scene.spots[index].y}%`;
        pane.append(dot);
      });
    };

    panes.forEach((pane) => {
      pane.addEventListener('click', (event) => {
        const img = $('img', pane);
        const box = img.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width) * 100;
        const y = ((event.clientY - box.top) / box.height) * 100;

        let hit = -1;
        let closest = Infinity;
        scene.spots.forEach((spot, i) => {
          if (resolved.has(i)) return;
          const d = ((x - spot.x) / reachX(spot)) ** 2 + ((y - spot.y) / reachY(spot)) ** 2;
          if (d <= 1 && d < closest) { closest = d; hit = i; }
        });

        if (hit === -1) {
          missedClicks += 1;
          const miss = el('span', { className: 'spot__miss' });
          miss.style.left = `${x}%`;
          miss.style.top = `${y}%`;
          pane.append(miss);
          setTimeout(() => miss.remove(), 600);
          return;
        }

        resolved.add(hit);
        found += 1;
        mark(hit, 'is-found');
        tell();
        if (resolved.size === scene.spots.length) done();
      });
    });

    const reveal = el('button', { className: 'btn', type: 'button', textContent: 'Show me one' });
    reveal.addEventListener('click', () => {
      const left = scene.spots.map((_, i) => i).filter((i) => !resolved.has(i));
      if (!left.length) return;
      const pick = left[Math.floor(Math.random() * left.length)];
      resolved.add(pick);
      revealed += 1;
      mark(pick, 'is-shown');
      tell();
      if (resolved.size === scene.spots.length) done();
    });
    actions.replaceChildren(reveal);

    function done() {
      const last = at === scenes.length - 1;
      const next = el('button', {
        className: 'btn btn--primary',
        type: 'button',
        textContent: last ? 'See how you did' : 'Next scene',
      });
      next.addEventListener('click', () => {
        at += 1;
        if (at < scenes.length) draw();
        else {
          clearInterval(ticker);
          const notes = [];
          if (missedClicks) notes.push(spell(missedClicks, 'wrong click'));
          if (revealed) notes.push(`${revealed} shown to you`);
          finish(holder, gameResult(game, {
            correct: found,
            total: scenes.reduce((n, sc) => n + sc.spots.length, 0),
            seconds: secondsSince(started),
            extra: notes.join(' and '),
          }));
        }
      });
      actions.replaceChildren(next);
    }
  }

  draw();
  holder.append(stage, status, actions);
  return holder;
}

/* --- spin the wheel: a prompt to talk about --- */
function wheelGame(game) {
  const holder = el('div', { className: 'game game--centre' });
  const size = 260;
  const slices = game.prompts.length;
  const wheel = el('canvas', { className: 'wheel', width: size * 2, height: size * 2 });
  wheel.style.width = `${size}px`;
  wheel.style.height = `${size}px`;

  const ctx = wheel.getContext('2d');
  const read = (token) => getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const tints = ['#ffffff', read('--accent-soft'), '#f2f6fa', read('--paper-deep')];

  const paint = (turn) => {
    const r = size;
    ctx.clearRect(0, 0, size * 2, size * 2);
    ctx.save();
    ctx.translate(r, r);
    ctx.rotate(turn);
    for (let i = 0; i < slices; i += 1) {
      const a0 = (i / slices) * Math.PI * 2;
      const a1 = ((i + 1) / slices) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r - 8, a0, a1);
      ctx.closePath();
      ctx.fillStyle = tints[i % tints.length];
      ctx.fill();
      ctx.strokeStyle = read('--border-strong');
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate((a0 + a1) / 2);
      ctx.fillStyle = read('--accent');
      ctx.font = '600 34px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), r - 34, 0);
      ctx.restore();
    }
    ctx.restore();
  };

  let turn = 0;
  let spinning = false;
  const prompt = el('p', { className: 'wheel__prompt', textContent: 'Press spin to get a question.' });
  const spin = el('button', { className: 'btn btn--primary', type: 'button', textContent: 'Spin' });

  spin.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    spin.disabled = true;
    prompt.classList.remove('is-live');
    const landing = Math.floor(Math.random() * slices);
    const target = turn + Math.PI * 8 + (Math.PI * 2 - ((landing + 0.5) / slices) * Math.PI * 2)
      - (turn % (Math.PI * 2)) - Math.PI / 2;
    const from = turn;
    const startedAt = performance.now();
    let settled = false;

    const settle = () => {
      if (settled) return;
      settled = true;
      turn = target;
      paint(turn);
      spinning = false;
      spin.disabled = false;
      spin.textContent = 'Spin again';
      prompt.textContent = `${landing + 1}. ${game.prompts[landing]}`;
      prompt.classList.add('is-live');
    };

    const run = (now) => {
      const t = Math.min((now - startedAt) / 3200, 1);
      turn = from + (target - from) * (1 - Math.pow(1 - t, 4));
      paint(turn);
      if (t < 1) requestAnimationFrame(run);
      else settle();
    };
    requestAnimationFrame(run);
    // frames stop in a hidden tab, so land the wheel either way
    setTimeout(settle, 3400);
  });

  paint(turn);
  const dial = el('div', { className: 'wheel__dial' });
  dial.innerHTML = '<span class="wheel__pin" aria-hidden="true"></span>';
  dial.append(wheel);
  holder.append(dial, prompt, el('div', { className: 'runner__actions runner__actions--centre' }, [spin]));
  return holder;
}

/* --- speaking cards: one prompt at a time --- */
function cardsGame(game) {
  const holder = el('div', { className: 'game game--centre' });
  let deck = shuffle(game.prompts);
  let at = 0;

  const card = el('div', { className: 'speak' });
  const status = el('p', { className: 'board__status' });
  const next = el('button', { className: 'btn btn--primary', type: 'button', textContent: 'Next card' });
  const shuffleBtn = el('button', { className: 'btn', type: 'button', textContent: 'Shuffle' });

  const draw = () => {
    card.textContent = deck[at];
    card.classList.remove('is-in');
    requestAnimationFrame(() => card.classList.add('is-in'));
    status.textContent = `Card ${at + 1} of ${deck.length}`;
    next.textContent = at === deck.length - 1 ? 'Back to the first card' : 'Next card';
  };

  next.addEventListener('click', () => { at = (at + 1) % deck.length; draw(); });
  shuffleBtn.addEventListener('click', () => { deck = shuffle(game.prompts); at = 0; draw(); });

  draw();
  holder.append(card, status, el('div', { className: 'runner__actions runner__actions--centre' }, [shuffleBtn, next]));
  return holder;
}

/* ---------------------------------------------------------------
   Test runner
   --------------------------------------------------------------- */
function startTest(test) {
  state.run = { test, index: 0, answers: Array(test.questions.length).fill(null), done: false };
  focusTab('tests');
  renderTab();
  $('#main').scrollIntoView({ block: 'start' });
}

function exitTest() {
  state.run = null;
  renderTab();
}

function answerButton(option, i, chosen) {
  const btn = el('button', { className: 'opt', type: 'button' });
  btn.setAttribute('aria-pressed', String(chosen === i));
  btn.innerHTML = `<span class="opt__letter">${LETTERS[i]}</span><span class="opt__text">${option}</span>`;
  btn.addEventListener('click', () => {
    state.run.answers[state.run.index] = i;
    renderContent();
  });
  return btn;
}

function renderQuestion() {
  const { test, index, answers } = state.run;
  const question = test.questions[index];
  const total = test.questions.length;
  const last = index === total - 1;

  const wrap = el('section', { className: 'runner' });
  wrap.innerHTML = `
    <div class="runner__head">
      <button class="linkish" type="button" data-exit>${icon('<path d="M15 18l-6-6 6-6" />')} All tests</button>
      <span class="runner__step">Question ${index + 1} of ${total}</span>
    </div>
    <div class="runner__bar"><span style="width:${(index / total) * 100}%"></span></div>
    <h2 class="runner__q">${question.q}</h2>
    <div class="runner__options"></div>
    <div class="runner__actions">
      <button class="btn" type="button" data-prev ${index === 0 ? 'hidden' : ''}>Back</button>
      <button class="btn btn--primary" type="button" data-next ${answers[index] === null ? 'disabled' : ''}>
        ${last ? 'Finish and see results' : 'Next question'}
      </button>
    </div>`;

  const options = $('.runner__options', wrap);
  question.options.forEach((option, i) => options.append(answerButton(option, i, answers[index])));

  $('[data-exit]', wrap).addEventListener('click', exitTest);
  $('[data-prev]', wrap).addEventListener('click', () => { state.run.index -= 1; renderContent(); });
  $('[data-next]', wrap).addEventListener('click', () => {
    if (last) state.run.done = true;
    else state.run.index += 1;
    renderContent();
  });
  return wrap;
}

function renderResults() {
  const { test, answers } = state.run;
  const total = test.questions.length;
  const correct = answers.filter((a, i) => a === test.questions[i].answer).length;
  const wrong = total - correct;
  const verdict = correct === total ? 'Every answer correct.'
    : correct >= total / 2 ? 'A solid result. Look over what you missed.'
    : 'Worth another go once you have reviewed the answers.';

  const wrap = el('section', { className: 'runner' });
  wrap.innerHTML = `
    <div class="runner__head">
      <button class="linkish" type="button" data-exit>${icon('<path d="M15 18l-6-6 6-6" />')} All tests</button>
    </div>

    <div class="score">
      <div class="score__ring" style="--pct:0">
        <span class="score__num"><span data-count>0</span><small>/${total}</small></span>
      </div>
      <div class="score__side">
        <p class="score__line"><span class="score__dot score__dot--ok"></span>${correct} correct</p>
        <p class="score__line"><span class="score__dot score__dot--no"></span>${wrong} wrong</p>
        <p class="score__verdict">${verdict}</p>
      </div>
    </div>

    <ol class="review"></ol>

    <div class="runner__actions">
      <button class="btn" type="button" data-retry>Try again</button>
      <button class="btn btn--primary" type="button" data-exit>Back to tests</button>
    </div>`;

  const list = $('.review', wrap);
  test.questions.forEach((question, i) => {
    const given = answers[i];
    const ok = given === question.answer;
    const item = el('li', { className: `review__item ${ok ? 'is-ok' : 'is-no'}` });
    item.innerHTML = `
      <span class="review__mark">${ok
        ? icon('<path d="M20 6L9 17l-5-5" />')
        : icon('<path d="M6 6l12 12M18 6L6 18" />')}</span>
      <div class="review__body">
        <p class="review__q">${question.q}</p>
        <p class="review__answer">
          <span class="review__label">Your answer</span>
          ${given === null ? '<em>Not answered</em>' : `${LETTERS[given]}. ${question.options[given]}`}
        </p>
        ${ok ? '' : `<p class="review__answer review__answer--right">
          <span class="review__label">Correct answer</span>
          ${LETTERS[question.answer]}. ${question.options[question.answer]}
        </p>`}
      </div>`;
    list.append(item);
  });

  $$('[data-exit]', wrap).forEach((b) => b.addEventListener('click', exitTest));
  $('[data-retry]', wrap).addEventListener('click', () => startTest(test));

  // fill the ring and run the number up to the score
  const ring = $('.score__ring', wrap);
  const number = $('[data-count]', wrap);
  requestAnimationFrame(() => {
    ring.style.setProperty('--pct', (correct / total) * 100);
    const started = performance.now();
    const step = (now) => {
      const t = Math.min((now - started) / 900, 1);
      number.textContent = Math.round(correct * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step);
      else number.textContent = correct;
    };
    if (correct) requestAnimationFrame(step);
  });

  return wrap;
}

function renderTab() {
  const meta = TABS[state.tab];
  const run = state.run;
  const play = state.play;
  const focused = Boolean(run || play) || state.tab === 'home';

  $('#page-title').textContent = play ? play.title : run ? run.test.title : meta.title;
  $('#page-sub').textContent = play ? play.topic
    : run ? `${run.test.topic} · ${countOf(run.test)} questions`
    : meta.sub;
  const name = play ? play.title : run ? run.test.title : meta.title;
  document.title = state.tab === 'home' ? 'EnglishMediaLab' : `${name} — EnglishMediaLab`;

  const atHome = state.tab === 'home' && !run && !play;
  $('#home-btn').setAttribute('aria-current', atHome ? 'page' : 'false');

  document.body.dataset.section = state.tab;
  $('#masthead').hidden = !atHome;
  $('#page-head').hidden = atHome;
  $('#filters').hidden = focused;
  $('.search').hidden = focused;
  if (!focused) renderFilters();
  renderContent();
}

function setTab(tab, { pushHash = true } = {}) {
  if (!TABS[tab] || tab === state.tab) return;
  state.tab = tab;
  state.topic = 'all';
  state.run = null;
  state.play = null;
  if (pushHash) location.hash = `#/${tab}`;
  renderTab();
}

/* ---------------------------------------------------------------
   Wiring
   --------------------------------------------------------------- */
function init() {
  $('#home-btn').addEventListener('click', () => {
    state.run = null;
    state.play = null;
    if (state.tab === 'home') renderTab();
    else setTab('home');
  });

  $('#search').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderContent();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (state.run || state.play)) { state.run = null; state.play = null; renderTab(); }
  });

  addEventListener('hashchange', () => setTab(location.hash.replace('#/', '') || 'home', { pushHash: false }));

  const initial = location.hash.replace('#/', '');
  state.tab = TABS[initial] ? initial : 'home';
  renderTab();
}

init();
