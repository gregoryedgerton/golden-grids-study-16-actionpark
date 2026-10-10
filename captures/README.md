# Captures

There is no reference site, so there is no capture of one.

- `find.py`: searches Wikimedia Commons and Openverse for candidate photographs and lays them out on a numbered sheet (`find/*.jpg`, not committed; the candidate lists `find/*.json` are). `find/cands.json` holds the Commons candidates, among them the category "Action Park".
- `find/unsplash.json`: Unsplash candidates (search results read in a browser on 2026-10-10).
- `picks.json`, `pick.py`: which candidate each photograph is, its alt text, and `real` for the seven taken at the park; `pick.py` downloads them to `public/assets/` and writes `src/photos.json` (author, licence, page).
- `scan.cjs`: overflow, fitted-line floor and axe, Chrome and WebKit, three widths, both schemes.
- `cells.cjs`: opens every expandable square at a phone width and fails on overflow or a drifting head.
- `site-issue.cjs`: run once, after the first deploy is live: it opens the "add this study to the gallery" issue on the marketing site's board from `src/study.json`. `--dry` prints it instead.

```bash
NODE_PATH=<a node_modules with playwright> node captures/scan.cjs http://localhost:5192/ index rides stories
```
