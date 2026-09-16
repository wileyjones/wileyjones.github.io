## Wiley Jones Personal Website and Playground

Plain static HTML with one stylesheet (`style.css`). No build step, no framework,
no JavaScript on the main pages.

Run locally:

    python3 -m http.server 8000

then open http://localhost:8000.

Deploy: served by GitHub Pages from the default branch (`CNAME` → wileyjones.com).
Any static host works the same way — drop the repo contents in and it's live.

Layout:

- `index.html` — home
- `style.css` — the whole design
- `blog/` — essays
- `ECE397/` — nonlinear control theory writeups
- `twitterProject/`, `weatherApp/`, `gMaps/` — older interactive demos, kept as-is
