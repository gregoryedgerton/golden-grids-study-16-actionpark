# CLAUDE.md

Guidance for agents working in a Golden Grids layout study.

## What this repo is

Study 16: Action Park (Vernon Township, New Jersey, 1978 to 1996) set out as a
theme park's own site under the GIFpark parody name. THREE pages (`index`,
`rides`, `stories`), Vite entries with plain links. `src/lib/Page.tsx` is the
shell (a line of practical facts, a violet header, a footer of lists);
`src/bands/bands.tsx` has `GridBand`; `src/lib/cards.tsx` has every kind of cell
(hero, area, ride card and flat ride tile, photograph, year, word, quotation,
fact tile and strip); `src/lib/modules.tsx` the flat modules (the gallery's
filter bar, the story form); `src/content.ts` every word and number;
`src/sources.ts` and `src/photos.json` the provenance. Read
`docs/program/PROGRAM.md`, then `STUDY-BRIEF.md`, then `README.md`.

Live at https://gregoryedgerton.github.io/golden-grids-study-16-actionpark/;
pushing to `main` deploys.

## Rules that are not negotiable

- Name the reference page. Substitute every asset. Nothing from the reference
  site — photography, wordmarks, copy — goes into the repo or the deploy.
- The library is consumed from npm at its published version. Never link a
  local checkout. A bug found here is an issue on the library, not a patch.
- Bands stack; they never nest. No wrapper component over `GoldenGrid` — the
  study exists to show the real API being used directly.
- Breakpoints live only in `src/lib/viewport.ts`. Three states, never two.
- Study tools (`src/lib/tools.tsx`) are the only floating UI. Controls go
  there, on their own stacking layer; the study's stylesheet never styles them.
  Grid outlines and band notes are off by default. The panel is HIDDEN by
  default since 2026-10-07 (`?tools=1` shows it; the g/n/m keys still work):
  it used to be fixed at the viewport's top-right corner at
  `z-index: 2147483000`, which is where a drill-down's Close belongs. Until
  it has a better trigger, nothing is drawn in that corner over an open
  cell, and an expanded cell's Close sits at the top right of the cell.
- Expansion (`src/lib/expand.tsx`) is how a slot shows content it cannot hold:
  the band grows, nothing scrolls inside a box, and the covered content goes
  inert. Every photograph should be expandable — points of interaction are
  encouraged, and the picture is the affordance.
- Media fills a slot with `object-fit: cover`; per-image `object-position` is
  the escape hatch. Never reshape a band to suit an image.
- Pass one ends with the asset spec in `README.md` filled in. Do not invent
  placeholder content and call the study done.
- No CSS framework, no design system, no routing, no state library, no tests.

## The standard, from Studies 03 and 04

What every study is held to beyond the rules above. These are features and
the conditions for using them; the content is the study's own, drawn from
its subject. A study that leaves one out says why in its README.

**Copy is about the subject, never about the grid.** Band titles, lessons,
captions and standfirsts describe what the reference page is about, in the
subject's own detail and at paragraph length where there is room. Grid
geometry (range, placement, which side the hero is on) goes in the hidden
band `note`, the README's band table and this file. No winks, no stamps, no
novelty labels, no jokes about the reference or the reader: a plain
scholarly register, as a professor would write it.

**Where the format carries marketing or account matter, the study carries
it too.** A streaming home page interleaves rows with a plan banner, reasons
to join, a price table, a FAQ and a call to action; a listing page has a
booking card, a host card and policies; an encyclopaedia has a licence and
an edit history. Rebuild those modules as the reference places them, with
the study's own copy, straight and plausible, for a fictional service where
one is needed; a form sends nothing and says so. Flat modules (a FAQ, a
price table of peers) are lists, not grids.

**Grids run full width, and type fills what content does not.** No width
caps that leave a band standing in empty ground. When a band has fewer
things than squares, the remaining squares carry type as a design element,
a catalogue number, a date, a count, a word from the subject, rather than
nothing. The type set is one set: body copy, lessons and captions are
raised to carry as much as the headline, and the fitted line is capped
(about 120px) so the delta between largest and smallest type stays within
roughly eight to one. Body copy comes in two lengths and the square's
height picks one; it is never buried and never cut. (Greg, Study 05.)

**Type fits its square.** Copy slots use `Fact`, `Figure` and `LinkBox` from
`src/lib/boxes.tsx`: a label, a line of type fitted to the room the square
leaves it (`src/lib/fit.tsx`, a binary search on font-size), optional body
copy, a foot. The line's container is `flex: 1 1 0`, a definite box; it
must never grow with its content, or the fit measures against a box that is
always big enough (this is what broke in WebKit). Padding is a share of the
square's side. Nothing is ever cut: labels wrap, body copy is removed whole
below 240px, in a square under 64px the label goes and the line stays, and
a formula (`fit--num`) breaks only at its own newlines. A line that does not
read aloud as written gets a `spoken` form. With web fonts, call
`useFontsReady` so display type never flashes from the fallback face.

**Depth is in flow, never in a modal.** Every photograph, every card that
summarises, expands in place (`src/lib/expand.tsx`): the band grows,
nothing scrolls inside a box, covered content goes inert, focus moves to
the close control and returns on close. Every drill-down has ONE plain
way out: a labelled Close (not an icon alone) at the top right of the
opened container, in a sticky head so it stays reachable, plus Escape; a
band opened from a row closes the same way. The study tools panel, which
used to own the viewport's top-right corner, is hidden until it has a
better trigger (`?tools=1` shows it). The Close is the study's SECONDARY CTA:
`.cell__close` reads the `--cta2-*` tokens (font, padding, colour, ground,
border, radius, hover) from `expand.css`, and each study declares those tokens
once, at the end of `styles.css`, from its own secondary button (the outlined
box, the grey pill, the ghost button), so the Close always looks like the
study's other secondary controls and never like the template's. A study with no
secondary button defines one first. (Greg, Study 07–10.) An item chosen from a row opens its
own band beneath the row, a new band and never a grid inside a grid, with
one orientation per item so a row of ten turns through the placements. A
fact that continues elsewhere carries a section link, and an expanded
passage lists where it continues. When the reference is several pages, the
study is several pages (one Vite entry each, plain relative links, no
router) with a shared shell: contents strip, previous and next.

**Media supports the format.** Where the subject moves, the squares move:
short clips cut from the source at the moment of the still (`Clip`,
`src/lib/clip.tsx`), square, silent, looping, playing only while on screen
and fetched only then, and the whole work loads only on request (`Player`).
Where the subject is a text, the squares carry original figures drawn from
the subject's own mathematics or data, inline SVG, in the page's own inks.
Photographs fill their slot with `object-fit: cover`.

**Both colour schemes, by device preference.** Tokens in `:root` and a
`prefers-color-scheme` block; every box tone and figure takes its colour
from the tokens so the whole study follows the device. If the reference has
one scheme, that scheme is the default and the other is the study's own
values turned over, and the README says so. Small coloured text (the label)
gets its own token per scheme so it passes 4.5:1 on each ground.

**Reduced motion is respected, and tested as the device sends it.** The
rule is `transition: none; animation: none`, never the 0.01ms trick, which
turns every style write into a transition and breaks anything that
measures after writing. Clips become their stills; any dial becomes a static
layout. Verify with the device setting on, not only the tools switch.

**Opened cells hold on a phone.** An opened cell never widens the page, and its
head stays locked under the notice (and under any bar that really sticks)
while its content scrolls beneath. A grid item that holds a list set to
`white-space: nowrap` or `overflow-x: auto` must have `min-width: 0` and a
`minmax(0, 1fr)` track, or the whole column takes the width of the list; a bar
that scrolls away on a phone must publish `--bar-h: 0` (read the computed
`position`, not the breakpoint); form controls are 16px on a phone so iOS does
not zoom the page when one is focused. `captures/cells.cjs` opens every
expandable square at a phone width in WebKit and Chrome and fails on any of it.
(Greg, Studies 13 to 15.)

**Accessibility is audited, not assumed.** Before publishing run
`captures/scan.cjs` against the dev server: in Chrome and WebKit, at 390,
820 and 1440, light and dark, it finds anything overflowing its box, any
fitted line under 12px, and axe-core violations (WCAG 2.0/2.1/2.2 A and AA,
best practice) with an expansion open. Then by hand: one `h1`, one `h2` per
band, landmarks, the skip link first in the tab order (before the tools),
every control with a distinct accessible name ("More: ⟨title⟩", "Continued
in section IV, Geometry"), SVGs with `role="img"` and a label that says what
they show, targets at least 24px, no horizontal scroll at 320px, Enter and
Escape through every expansion. Write what the scan cannot check in the
README: the smallest line, and that no screen-reader user has tested it.

## This study's own rules

- THERE IS NO REFERENCE SITE. The facts are Wikipedia's article "Action Park"
  (revision 1378502229); the page furniture is a theme park site's usual one.
- GIFPARK PROMOTES THE PARK (Greg, 2026-10-10). The copy is a park selling
  itself, in the present tense, and calls the park GIFpark. Every feature it
  sells (a length, a speed, a rule, a year, an extra charge) must be one the
  article records; invent no feature, price or rule. Do not mention injuries,
  deaths, closures, lawsuits or the documentary in the copy, and do not joke
  about any of them. The notice (`study.json`) and the disclosure
  (`LEFT_OUT` in `content.ts`, drawn by `Page.tsx`) say that the park closed
  in 1996 after many injuries and at least six deaths.
- CLASS ACTION PARK IS FOR GUEST QUOTATIONS ONLY (Greg, 2026-10-10): never a
  section, a headline or a fact. Every quotation is under fifteen words, is in
  quotation marks, carries its speaker, and was published somewhere that can be
  named; `FROM_THE_FILM` in `content.ts` lists them for the disclosure, which
  is the only place the film is named. Where a quotation says "Action Park",
  write `[GIFpark]` in square brackets. Never invent a quotation or a guest.
- The seven photographs taken at the park (`real` in `photos.json`, keys
  `ap-*`) are not identified by ride: never set one as a named ride's picture.
  A stand-in's credit says it was not taken at the park. Prefer frames where
  no guest's face is the subject.
- TYPE SCALES WITH THE SQUARE (as in Studies 13 to 15): `.sq` is a size
  container and `.card` sets `--u` from `cqmin`; every line is in em; what does
  not fit goes whole by container query. A flat tile under 150px drops its
  label and keeps the name; a quotation under 220px drops the speaker's role.
- EDGES: 12px corners, pill buttons, flat tiles in violet, yellow, teal and
  pink. Photographs are not outlined. Small coloured text uses `--accent-ink`
  (violet on white, yellow on the dark ground).
- `rides.html?open=<id>` opens that ride's square; `?area=` sets the filter. A
  flat tile takes its id through `Fact`'s `id` prop: never wrap a tile in
  another element, because an opened cell must be a direct child of its
  `GoldenBox`.
- Icons are the study's own (`src/icons.tsx`); the triangle in the mark is CSS.

Two geometry rules, verified against source, that every band relies on:

- Parity: with *n* = visible boxes (+1 for a placeholder), `right`/`left` are
  landscape only when *n* is even; `top`/`bottom` only when *n* is odd.
- Hero side: the largest box sits on the `placement` side turned *n − 2*
  quarter-turns in the spiral's direction (opposite at 4, one step at 3).

## Disclosure and neutrality

- **Every page says it is a study, in three places**: its metadata, a sticky
  banner at the top, and a disclosure that is the last element on the page.
  All three read `src/study.json`. `study.meta.ts` writes each entry's title
  (`{Brand} - a Golden Grids layout study`, with the page's label in front when
  there is more than one page), description, share card and icon links, so the
  HTML entries carry none; `StudyBanner` and
  `StudyDisclosure` (`src/lib/study.tsx`, `study.css`) draw the other two.
  The banner's sentence and the meta description are the same sentence. Do
  not restyle them from the study's stylesheet, do not hide or shorten them,
  and do not put anything after the disclosure.
- **Keep `src/study.json` true.** When pages, sources, assets or dates change,
  change it in the same commit: pages reviewed and when, how they were read,
  what is real, what is invented or changed, each asset's source and licence,
  and `updated`. Say what is not known (an unknown licence, a figure checked
  only at second hand). A page's own credit list goes to `StudyDisclosure` as
  children.
- **Anything that sticks to the top offsets by `--study-banner-h`**, which the
  banner sets: an opened cell's head, a strip, a rail, a stage.
- **A study records; it does not judge.** Do not write, on the page or in the
  README, that Golden Grids suits or does not suit this content, that the
  reference is worse, or that the study succeeded or failed. No "claim", no
  "what did not", no "honest failure". The README has "Approach" (describe both
  arrangements) and "Notes for review" (plain observations for the people who
  will review it). The assessment is made once, after all studies have been
  reviewed by people. (Greg, 2026-10-09.)
- **Icons**: the letters GIF, in capitals, in the study's face and colours:
  `public/favicon.svg` (a 32-unit tile with 6-unit corners), `favicon-96.png`,
  `apple-touch-icon.png` and the share card `og.png` (the parody name over "a
  Golden Grids layout study"). The raster files matter: share sheets and iOS do
  not read an SVG icon and otherwise show whatever icon the host last served.
  `captures/icons-make.py` and `icons-raster.cjs` in the template draw them.

## Brand

- **The study's brand is a parody name**: `GIF` in capitals, then the tail of
  the reference's name in lower case (GIFbnb, GIFspn, GIFflix, GIF.gov, GIFx,
  GIFbase, GIFmutual, GIFn'now, GIFbell, GIFipedia, GIFify, GIFmilk Records,
  GIFdepot, GIFvidia, GIFpark, GIF.org).
  Do not use GIFcommit as
  a service's name; it is only the npm scope of the library.
- **A play on the reference's premium tier or named service carries the
  parody name and keeps the alteration**: GIFspn+, GIFbase One, GIFx Premium.
- Write the name exactly so; never change its case in CSS. The notice in
  `src/study.json` says it is a parody name, and the disclosure lists it
  under what is invented. (Greg, 2026-10-09.)
- **The parody name is the subject's name in the copy, and the pages speak as
  that brand would**: a park's site promotes the park, a newsroom reports in
  its own name, even when the subject is real and the facts are a third
  party's. The real name, whose facts or reporting these are, and anything the
  brand's own site would leave out go in the notice and the disclosure. A
  third-party work about the subject (a documentary, a review) may supply
  short attributed quotations, never a section, a headline or a fact, and is
  named in the disclosure, not in the copy. (Greg, 2026-10-10, Study 16.)
- **The header is the reference's header.** Take its structure from the
  page being rebuilt: the parody name where the logo is, its nav items, its
  search, its tabs. Do not write "layout study", a study number or the
  reference's name there; the notice above and the disclosure below say that
  on every page. (Greg, 2026-10-09.)
- **Nothing links to the reference except the notice and the disclosure.** No
  link in the header, the nav, a band, an opened cell or the footer goes to
  the site being studied or its apps. Nav items are the reference's own, for
  show (plain text); only an item that leads to one of the study's own pages
  or sections is a link. Credits for photographs, maps and facts from other
  sources may link to those sources. (Greg, 2026-10-09.)

## API facts, verified against 5.0.0 source

- `GoldenGrid` props: `from` (1), `to` (4), `color`, `outline`, `clockwise`
  (true), `placement` (`"right"` | `"bottom"` | `"left"` | `"top"`), `children`.
- `GoldenBox` children map largest slot → smallest. Extra children are ignored.
- When `from > 1`, the skipped positions collapse into one placeholder slot,
  rendered first in the DOM and filled by the **last** `GoldenBox` child.
- Structural CSS is auto-injected. `GoldenBox` renders a 100%×100%
  `position: relative` div and nothing else; it accepts `className` and
  `style`. All visual styling is ours.
- Only direct `GoldenBox` children count; a wrapper component or fragment is
  dropped silently. `from={2}` skips position 1 alone:
  a 1×1 placeholder, rendered first, filled by the last child, raw base colour.
  Same rectangles as `from={1}`, different child mapping and colours. `from === to === 1`
  is `single`: one box, later children ignored.
- DOM order is placeholder first, then slots smallest to largest: the hero is
  the last element.
- There is no dial in this study.

## Publishing a study

A study is done when it is published, and publishing is these steps, in order.
Do them without asking; they are the standing pattern. (Greg, 2026-10-05 and
2026-10-10.)

1. A public repository named `golden-grids-study-NN-name`, with the Pages source
   set to Actions (`gh api -X POST repos/<owner>/<repo>/pages -f
   build_type=workflow`), the topics `golden-grids` and `layout-study`, and a
   description that says it is an unaffiliated layout study.
2. Push `main`; wait for the deploy; open the live pages and run
   `captures/scan.cjs` and `captures/cells.cjs` against them.
3. A row in the Showcase table of the library's README (a `docs:` commit to
   the library's `main`), and the name in rule 5 of `docs/program/PROGRAM.md`
   if it is a new parody name.
4. **An issue on the marketing site's board, every time.** The gallery at
   `gregoryedgerton/golden-grids-site` is built from one file per study, and
   nobody adds that file unless the board says a study is waiting. Run
   `node captures/site-issue.cjs` once the first deploy is live: it opens
   "Gallery: add ⟨Brand⟩ (Study NN)" on that repository with the live URL, the
   day of the first deploy and what the site's study file needs (number,
   published, brand, reference, subject, url, colours, face, icon). It will not
   open a second issue for the same study; `--dry` prints the issue instead.
   Only the issue is opened from here: the change to the site is made in the
   site's own repository, by its own loop (issue, pull request, review, merge).

## Commands

```bash
npm install
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build → dist/
npm run preview
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/pages.yml`.
Base path derives from `GITHUB_REPOSITORY`; do not hard-code it.

## Sandbox constraints

The library README links this repo as its "try it without installing" path,
opened in StackBlitz at `https://stackblitz.com/~/github.com/gregoryedgerton/golden-grids-study-template`.

- **Vite stays on 7.x.** Vite 8 depends on rolldown, whose WebContainer
  binding is a wasm download fetched at first run under an experimental WASI
  runtime. It made the sandbox slow and fragile. Do not bump to 8 without
  loading the StackBlitz link afterwards and watching it reach `VITE ready`.
- `.stackblitzrc` pins install and start so the importer does not guess.
- Do not append `?file=` to the `~/github.com` link; it made the IDE fail to
  start in testing. The classic `/github/` importer accepts `?file=` but waits
  on a WebSocket and can stall at "Cloning repo from GitHub".
