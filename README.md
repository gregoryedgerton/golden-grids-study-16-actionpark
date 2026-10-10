# Layout study — Action Park, as GIFpark

**Live:** [`https://gregoryedgerton.github.io/golden-grids-study-16-actionpark/`](https://gregoryedgerton.github.io/golden-grids-study-16-actionpark/)

An unaffiliated layout study. It sets out Action Park, the amusement and water
park that stood in Vernon Township, New Jersey, from 1978 to 1996, as a theme
park's own site would: a home page, a ride gallery and a page of guest stories,
as stacked golden grids under a parody name, GIFpark. GIFpark is not a park. It
sells no tickets and operates no rides, its form sends nothing, and the real
park closed in 1996. Built with
[Golden Grids](https://github.com/gregoryedgerton/golden-grids) from the
[study template](https://github.com/gregoryedgerton/golden-grids-study-template).

## Reference

There is no site to rebuild. The sources are two Wikipedia articles, read in
full on 2026-10-10 through Wikipedia's API:
[Action Park](https://en.wikipedia.org/wiki/Action_Park) (revision 1378502229)
and [Class Action Park](https://en.wikipedia.org/wiki/Class_Action_Park)
(revision 1376695818), and Reason's review of the film for two quotations.

- **The park:** three areas (the Alpine Center, Motorworld, Waterworld), 75
  rides on 250 acres, over a million visitors a year in the 1980s.
- **The pages:** what a theme park's site usually has: a hero and a row of
  figures, the areas, featured rides, what is new, a visit module; a gallery
  with a filter; guest quotations and a form.

**Register:** taken from the park's own mark of the 1990s (a yellow-to-orange
triangle and heavy violet italics with a pink shadow): violet, yellow, pink and
a pool teal; Montserrat, heavy and italic for display; pill buttons and 12px
corners. Dark is the same inks on a deep violet ground.

## Approach

A park's site sets its rides out as a wall of equal cards. The study sets each
group as one grid: the first ride in the largest square, the rest in descending
squares, with a figure (a length, a height, a count) as large type among them. A
ride with an honest stand-in photograph is a picture card; a ride with none (the
Cannonball Loop, the Bailey Ball) is a flat tile in one of the park's four
colours with its name fitted to the square. A card's type is set from its
square's side and what a square cannot hold is left out whole.

**The voice is a park promoting itself** (Greg, 2026-10-10), in the present
tense, and every feature it sells (a length, a speed, a rule, a year) is one the
article records. What a park's own site would leave out, the disclosure on every
page puts back: the closure, the injuries, the six deaths. The documentary is
used for quotations only and is named only in the credits of a page that shows
one: the ride gallery, which shows none, does not mention it.

## The pages

Three Vite entries, plain relative links, no router. `GridBand`
([`src/bands/bands.tsx`](src/bands/bands.tsx)) draws every band from cells;
`lib/plan.ts` chooses each grid.

| Page | Band | Cells |
| --- | --- | --- |
| Home | The park | the hero over a photograph taken at the park, three figures |
| | Three parks in one | the three areas, each opening to its rides; a figure in the strip |
| | Start with these | five rides |
| | By the numbers | four figures and a strip |
| | What people say | two quotations, a photograph, a strip |
| | New this season | six years, each opening to what opened |
| | Also known as | the park's four nicknames |
| | Plan your visit | three tiles and a photograph of Route 94 |
| Ride gallery | Alpine Center / Motorworld / Waterworld | twenty-five rides, dealt five to a band, filtered by area |
| | Seen at the park | five photographs taken there |
| Guest stories | From our guests | five quotations in two bands, with figures and a photograph |
| | From the crew | three quotations, a photograph, a strip |
| | Make your own | two figures, two photographs |
| | Tell us your story | flat: a form that sends nothing |

**What answers back.** Every photograph, ride, year and quotation opens its
square in place. The gallery's chips filter by area and the grids are re-dealt.
An area on the home page lists its rides, and each link opens that ride's square
in the gallery (`rides.html?open=`).

## Content and provenance

- **The features are real; the voice is not.** Every sentence outside quotation
  marks is the study's. The park's advertising is not quoted.
- **GIFpark stands for Action Park** throughout the copy. The one quotation
  that named the park now says GIFpark, without brackets, and the credits of
  the pages that show it say it was altered (Greg, 2026-10-10).
- **Eight short quotations**, each under fifteen words, marked as a quotation,
  with its speaker: five from the documentary Class Action Park (2020), taken
  from Wikipedia and from Reason's review and not checked against the film;
  three from sources the article cites. Each carries its own credit, drawn in
  the disclosure of whichever page shows it. A speaker the source does not
  name is labelled "Said of GIFpark", not "a guest".
- **Photographs** are in [`src/photos.json`](src/photos.json), each with its
  author, licence, page and alt text. Seven were taken at Action Park by Joe
  Shlabotnik (Wikimedia Commons, CC BY 2.0); their author does not say which
  ride each shows, so none is placed as a named ride. The rest stand in for a
  kind of ride and say so when opened (Unsplash License, CC BY 2.0, CC0).
- **Icons and the mark** are the study's own drawings.

## Notes for review

Observations for whoever reviews this study, recorded without a verdict.
Whether the layout suits the page is assessed separately, after every study
has been reviewed.

- **A promotional voice over a real record.** The pages sell rides on which
  people were hurt and, on five of them, died. Nothing on the pages refers to
  that; the notice at the top and the disclosure at the foot do. Reviewers may
  want to judge whether the notice says enough.
- **Stand-in photographs.** Seventeen pictures show a kind of ride somewhere
  else. Ten rides have no picture and are flat tiles.
- **Nicknames.** The four nicknames are given as the article gives them; they
  came from healthcare workers and people who lived nearby.
- **Quotations at second hand.** None was checked against the film.
- **An altered quotation.** In the film the "land of yes" line names Action
  Park. Here it says GIFpark inside the quotation marks, with no brackets; the
  page's credits say so in a sentence of their own, and the opened square
  points to them. Reviewers may want to judge whether that is notice enough.
- **Card sizes.** In a band of five at 1440 the squares are about 850, 520,
  330, 200 and 200px; the two smallest show a photograph and a yellow label, or
  a ride's name alone.
- **Accessibility.** `captures/scan.cjs` reports no overflow, no fitted line
  under 12px and no axe violations in Chrome and WebKit at 390, 820 and 1440,
  light and dark; `captures/cells.cjs` opens every square at 390. No
  screen-reader user has tested it.
- **Not built.** Tickets, hours, directions and group pages; a park map.

## Disclosure

Every page says it is a study in three places, all read from
[`src/study.json`](src/study.json): the page's metadata, a sticky notice at the
top, and "About this layout study", the last element on the page.

## Running it

```bash
npm install
npm run dev
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5173/ index rides stories
```

Pushing to `main` deploys to GitHub Pages.
