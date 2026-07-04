# Trade-off Drills

Free interview training tool for product managers. Ten timed scenarios with no right answer — you're scored on how you defend the call, the same four behaviors interviewers score: clarify the goal, name options, price the trade-off, state a reversal condition.

Part of The Prototyping PM. Drills 1–3 are free; email unlocks the remaining seven plus a scorecard.

## Stack

Static site, zero dependencies, no build step. Open `index.html` in a browser and it works.

- `index.html` — shell
- `css/styles.css` — styles (light/dark via `prefers-color-scheme`)
- `js/drills.js` — the 10 drill scenarios (content lives here)
- `js/app.js` — flow: drill → commit → reveal → self-score → next; gate at drill 4; scorecard at end
- `docs/` — business plan and drill source content

Progress and email are stored in `localStorage` only. No accounts, no cookies, no tracking.

## Email capture

The gate is stubbed for ConvertKit. Set `CONVERTKIT_FORM_ID` at the top of `js/app.js`. Until it's set, emails unlock the drills and are kept in `localStorage` — swap in the real form action before launch.

## Deploy

Any static host. Intended: GitHub Pages (Settings → Pages → deploy from `main`) or Cloudflare Pages. No server, no cost.

## Roadmap

- [ ] v1: 10 drills, gate, scorecard (this repo)
- [ ] ConvertKit live + tag weakest behavior on signup
- [ ] Shareable scorecard image
- [ ] Paid: AI Product Sense Interview Prep package (drills 11–30, model answers, recorded prototype builds)
