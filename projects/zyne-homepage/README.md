# ZYNE Homepage

Independent homepage implementation based on `assets/ZYNE_page_PRD.md`.

## Run locally

```sh
npm install
npm run dev
```

## Structure

- `src/data/products.js` — structured product and growth-path data
- `src/main.js` — semantic page rendering and analytics hooks
- `src/styles/main.css` — responsive premium visual system
- `public/assets` — project-local brand assets

Stan Store URLs intentionally remain `TO_BE_PROVIDED` until production links are supplied.

## Implementation status

- All 12 homepage sections from the PRD are implemented.
- Product and category cards render from structured data.
- SEO metadata, FAQ/Service structured data, sitemap, and robots directives are included.
- Analytics events push to `window.dataLayer` without requiring a provider script.
- Keyboard focus, skip navigation, semantic headings, and reduced-motion support are included.
- Final Stan Store purchase links remain intentionally disabled until exact URLs are supplied.
