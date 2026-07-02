# ZYNE Homepage

Static ZYNE website implementation for the live `zyne.store` GitHub Pages site.

This project is the operational source of truth for homepage rendering, product/category routes, product detail pages, legal pages, SEO/crawler output, validation, and deployment artifacts.

## Run locally

```sh
npm install
npm run dev

```

## Build and validate

```sh
npm run build

```

The build script runs catalog validation, PRD 1.1 homepage UX validation, Vite build, homepage prerendering, generated route creation, legal/SEO layer generation, and route validation.

## Structure

* `src/render.js` — crawlable homepage renderer used by prerendering and browser fallback.


* `src/main.js` — browser interaction, analytics hooks, sticky CTA, menu, FAQ behavior, and schema fallback.


* `src/styles/main.css` — responsive premium visual system.


* `src/data/products.js` — structured product, category, industry, delivery, and homepage data.


* `src/data/product-detail-content.js` — product detail page copy extensions.


* `src/data/category-content.js` — category and collection page copy extensions.


* `src/data/catalog-standards.js` — catalog asset rules.


* `scripts/` — validators, prerendering, generated routes (including the standalone high-fidelity property detail generator), legal pages, SEO layer, and catalog reports.


* `public/` — public static assets copied into `dist`, including `CNAME`, `.nojekyll`, robots, sitemap seed, and catalog images.


* `docs/` — project-specific operating notes and cleanup/audit records.



## Legal page source model

Legal source copy is maintained as Markdown in the repository-level `assets/` folder and rendered into static pages during `npm run build`:

* `assets/zyne-stan-store-privacy-policy.md` → `/privacy/`

* `assets/zyne-stan-store-terms-and-conditions.md` → `/terms/`

* `assets/zyne-stan-store-refund-and-scope-policy.md` → `/refund-policy/`

* `assets/zyne-stan-store-cookie-policy.md` → `/cookie-policy/`


`projects/zyne-homepage/scripts/generate-legal-layer.mjs` reads those Markdown sources, injects required ZYNE/Stan Store relationship disclosures, preserves validator-required phrases, and writes the generated legal routes into `dist`.

Legal source Markdown is treated as content source, not deployed source. The live pages are generated artifacts. Update legal copy in `assets/`, then run `npm run build` or commit a project/build change that triggers the `Publish ZYNE Homepage` workflow.

## Crawler and SEO behavior

The homepage is prerendered into `dist/index.html` so crawlers see full homepage content instead of an empty JavaScript mount node. See:

```txt
projects/zyne-homepage/docs/crawler-seo-rendering.md

```

## Deployment model

Preferred deployment is GitHub Actions publishing the built `projects/zyne-homepage/dist` artifact to GitHub Pages.

Do not hand-edit root generated HTML as the source of truth. Update project source/data/legal Markdown, run the build, and deploy the generated output.

The publish workflow includes a PRD 1.1 artifact guard to verify that the generated homepage contains the expected sticky CTA, hero CTA order, starter badges, visual cues, Intelligence/Delivery bridge copy, and `CollectionPage` schema before upload.

## Current implementation status

* PRD 1 homepage foundation is implemented.


* PRD 1.1 homepage UX/conversion fixes are implemented in source and covered by `npm run validate:prd1.1`.


* Product and category cards render from structured data.


* Product/category/detail/legal/SEO route generation exists.


* **A high-fidelity, pixel-perfect property detail template (`/homedetail/...`) is implemented via route generation, featuring dynamic photo logic, bespoke SVG iconography, and strict UX grid alignments.**
* Legal pages are generated from Markdown policy sources in `assets/`.


* `window.dataLayer` event hooks are present without requiring provider scripts.


* Stan Store URLs are present for products currently represented in structured data.


* The full live Stan Store catalog still needs a structured catalog-sync pass before every listed Stan product is represented in `src/data/products.js`.



## Repository cleanup notes

See:

```txt
projects/zyne-homepage/docs/repo-cleanup-audit.md

```
