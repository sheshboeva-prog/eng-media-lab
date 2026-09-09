import { videos, tests, games, youtubeWatchUrl, youtubeThumb, youtubeThumbAlt, wordwallEmbed } from './data.js';

/* ---------------------------------------------------------------
   State
   --------------------------------------------------------------- */
const TABS = {
  home:    { title: 'EnglishMediaLab', sub: 'Watch a lesson, test what you know, then play a game.' },
  videos:  { title: 'Videos',  sub: 'Short lessons to watch and learn from.' },
  tests:   { title: 'Tests',   sub: 'Five questions on one topic, scored as soon as you finish.' },
  games:   { title: 'Games',   sub: 'Interactive activities that play right here on the page.' },
};

const state = { tab: 'home', query: '', topic: 'all', run: null, play: null };

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

function gameCard(item) {
  const card = el('button', { className: 'card', type: 'button' });
  card.innerHTML = `
    <div class="card__thumb card__thumb--media" style="aspect-ratio:4/3">
      <img class="card__img" src="${item.thumb}" alt="" loading="lazy" />
      <span class="card__tag">${item.topic}</span>
      <span class="card__play">${icon('<path d="m9 7 9 5-9 5z" fill="currentColor" stroke="none" />')}</span>
    </div>
    <div class="card__body">
      <h3 class="card__title">${item.title}</h3>
      <div class="card__meta">
        <span class="tag">${item.type}</span>
      </div>
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

function renderContent() {
  const content = $('#content');

  if (state.play) {
    content.replaceChildren(renderPlayer());
    return;
  }

  if (state.run) {
    content.replaceChildren(state.run.done ? renderResults() : renderQuestion());
    return;
  }

  if (state.tab === 'home') {
    content.replaceChildren(renderHome());
    return;
  }

  const items = datasets[state.tab].filter(matches);
  content.replaceChildren();

  if (!items.length) {
    content.append(el('div', {
      className: 'empty',
      innerHTML: '<strong>Nothing here yet</strong><span>Try another topic or clear the search.</span>',
    }));
    return;
  }

  const grid = el('div', { className: state.tab === 'tests' ? 'grid grid--list' : 'grid' });
  const build = { videos: videoCard, tests: testRow, games: gameCard }[state.tab];
  items.forEach((item) => grid.append(build(item)));
  content.append(grid);
}

/* ---------------------------------------------------------------
   Home — the three sections, with a few items from each
   --------------------------------------------------------------- */
const SECTIONS = [
  {
    tab: 'videos', label: 'Videos', unit: 'lessons', mark: '🎥',
    blurb: 'Watch short English-language videos on different topics. Listen carefully '
         + 'and focus on the main ideas, key information, and new vocabulary.',
  },
  {
    tab: 'tests', label: 'Tests', unit: 'topics', mark: '📝',
    blurb: 'Check your understanding after watching the videos. Answer the questions '
         + 'and test your English knowledge, comprehension, and analytical skills.',
  },
  {
    tab: 'games', label: 'Games', unit: 'activities', mark: '🎮',
    blurb: 'Learn English in an enjoyable and interactive way. Complete different '
         + 'language games to practise vocabulary, comprehension, and cognitive skills.',
  },
];

const ARROW = '<path d="M5 12h13M13 6l6 6-6 6" />';

function hero() {
  const node = el('header', { className: 'hero' });
  node.innerHTML = `
    <p class="hero__eyebrow">Interactive English platform</p>
    <h1 class="hero__title">Welcome to EnglishMediaLab!</h1>
    <p class="hero__lead">
      EnglishMediaLab is an interactive platform designed to help students improve
      their English through videos, tests, and educational games.
    </p>
    <div class="hero__actions">
      <button class="btn btn--primary" type="button" data-go="videos">Start watching</button>
      <button class="btn" type="button" data-go="tests">Take a test</button>
    </div>`;
  $$('[data-go]', node).forEach((b) => b.addEventListener('click', () => setTab(b.dataset.go)));
  return node;
}

function sectionCard({ tab, label, unit, blurb, mark }) {
  const card = el('button', { className: 'section', type: 'button' });
  card.innerHTML = `
    <span class="section__top">
      <span class="section__icon" aria-hidden="true">${mark}</span>
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
  frag.append(hero());

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
   Game player — the activity runs in the page, nothing navigates away
   --------------------------------------------------------------- */
function startGame(game) {
  state.play = game;
  focusTab('games');
  renderTab();
  $('#main').scrollIntoView({ block: 'start' });
}

function exitGame() {
  state.play = null;
  renderTab();
}

function renderPlayer() {
  const game = state.play;
  const wrap = el('section', { className: 'player' });
  wrap.innerHTML = `
    <div class="runner__head">
      <button class="linkish" type="button" data-exit>${icon('<path d="M15 18l-6-6 6-6" />')} All games</button>
      <span class="runner__step">${game.type}</span>
    </div>
    <iframe class="player__frame" src="${wordwallEmbed(game.id, game.theme)}" title="${game.title}"
            allowfullscreen loading="lazy"></iframe>`;
  $('[data-exit]', wrap).addEventListener('click', exitGame);
  return wrap;
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

/** Started from the home page, an activity still belongs to its own tab. */
function focusTab(tab) {
  state.tab = tab;
  if (location.hash !== `#/${tab}`) location.hash = `#/${tab}`;
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
      <div class="score__ring" style="--pct:${(correct / total) * 100}">
        <span class="score__num">${correct}<small>/${total}</small></span>
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
