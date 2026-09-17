# EnglishMediaLab

Static site: a home page leading into Videos, Tests and Games. No build step,
no dependencies.

## Run

```
python3 serve.py
```

Then open http://localhost:5173. A server is needed because the JS uses ES modules.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell: header, home button, content slot |
| `assets/js/app.js` | Tab routing, home page, search, filters, test runner, quiz player |
| `assets/css/style.css` | Design tokens and all styling; Newsreader for headings, system stack for text |
| `assets/js/data.js` | All content: ten videos, ten tests, six games |
| `assets/img/` | Public-domain photographs used by the picture games |
| `serve.py` | Dev server that sends `Cache-Control: no-store` so edits show on reload |

The palette is ink navy and gold on paper, defined at the top of the stylesheet as
`--paper`, `--paper-deep`, `--gold`, `--gold-deep`, `--gold-soft` and `--accent`.
Changing those six values reskins the whole site. There is one theme only, no dark
mode. The site is built around a deep navy band. The header sits in it, and on the home
page the welcome block continues it, closed by a gold rule. Everything below is
white on blue-grey, with square-ish corners and thin borders rather than soft
shadows. Deep navy carries every heading rule, icon and marker; gold marks the
brand and the band's edge; green and red are kept for right and wrong answers. `--c-videos`, `--c-tests` and `--c-games` all point at the accent, so every section
reads in the same blue; give one of them its own value to colour that section apart.

Motion: content rises in when a section opens, cards follow in a short stagger, a
matched pair pops, and the score ring fills while the number counts up. Everything
stops for `prefers-reduced-motion`.

## Adding content

Edit `assets/js/data.js`. Keep the field names and everything else keeps working.

```js
// videos — `id` is the YouTube video id; the link and the thumbnail are built from it
{ id, title, desc, topic, channel, duration }
// tests — `answer` is the index of the correct option, 0 for A
{ id, title, desc, topic, questions: [{ q, options: [a, b, c, d], answer }] }
// games — `id` is the Wordwall activity hash; the embed URL is built from it
{ id, title, type, topic, thumb, theme? }
```

## Still open

- Test results are not saved between visits.

Videos are done: each card shows the video's own YouTube thumbnail and opens the
watch page in a new tab.

Tests are done: ten topic tests of five questions each. Questions appear one at a
time, and finishing shows a score with every question marked right or wrong and the
correct answer next to each miss.

Home opens with the welcome text in the navy masthead, then three cards carrying the author's
description of each section, then the "How to learn" line. There are no buttons in
the hero: the cards are the way in. The house
button in the header is the only navigation control, marked in vanilla while you
are on it. The page carries three cards leading into the sections,
then the first three videos, tests and quizzes with a link through to each full list.
Sections are reached from home, and the house button brings you back from anywhere,
including out of a running test or quiz. Every section still has its own address
(`#/videos`, `#/tests`, `#/games`), so links into them keep working.

Games are done: six activities built into the site, nothing embedded and nothing
fetched. `kind` picks the engine — `match` (pair a word with its meaning, or with a
photograph when `pictures` is true), `sort` (drop each card into its group, with or
without photographs), `wheel` (spin for a speaking prompt, drawn on a canvas) and
`cards` (a shuffled deck of prompts).

The fifteen photographs in `assets/img/` are public domain, found through Openverse
and cropped to 480x360. They need no credit line. `build.py --inline-images` embeds
them in the single-file build alongside the video thumbnails.

The filter chips are built from the `topic` values in the active tab, so adding an
entry with a new topic adds its chip automatically. There are no CEFR levels.

Bump the `?v=` on the stylesheet and script links in `index.html` whenever either
changes. Pages caches assets for several minutes, and without a new URL returning
visitors keep the old file until that expires.

## Publishing to GitHub Pages

The site is plain static files, so Pages serves it as-is. Every path is relative,
so it works from a project subdirectory too.

1. Create an empty public repository on GitHub named `eng-media-lab`.
2. From this folder:

       git remote add origin https://github.com/<your-username>/eng-media-lab.git
       git branch -M main
       git push -u origin main

3. In the repository, open Settings, then Pages, and set the source to
   "Deploy from a branch" with branch `main` and folder `/ (root)`.

The site appears at `https://<your-username>.github.io/eng-media-lab/` a minute or
two later. To update it, commit and push again.

`.nojekyll` is there so Pages serves the files untouched.

The footer carries the authorship and rights notice. The name appears twice in
`index.html`, in `footer__by` and in the copyright line; change both together.

## Rights

© 2026 Eshboyeva Shoira. The site, its texts, tests and games are the author's work
and may not be copied, republished or reused without written permission. The linked
videos belong to the channels that made them. The photographs in `assets/img/` are
public domain.
