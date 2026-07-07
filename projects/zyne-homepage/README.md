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



## Global header/footer source model

Shared header, header navigation, footer, footer navigation, and their shared layout/color styles are centralized in:

```txt
projects/zyne-homepage/scripts/global-header-footer.mjs

```

That module exports:

* `globalHeaderFooterStyles`
* `headerLinks`
* `footerLinks`
* `renderGlobalHeader()`
* `renderGlobalFooter()`

As of the latest header/footer unification pass, these generators/templates import the shared module directly:

* `projects/zyne-homepage/scripts/generate-legal-layer.mjs` for `/privacy/`, `/terms/`, `/refund-policy/`, and `/cookie-policy/`.
* `projects/zyne-homepage/scripts/generate-routes.mjs` for `/services/`, product detail pages, category pages, and generated service collection routes.
* `projects/zyne-homepage/scripts/templates/template-investment.mjs` for `/homedetail/7101-wendemere/`.

Implementation ledger:

* Done: created `projects/zyne-homepage/scripts/global-header-footer.mjs`.
* Done: updated `projects/zyne-homepage/scripts/generate-legal-layer.mjs`, covering `/privacy/`, `/terms/`, `/refund-policy/`, and `/cookie-policy/`.
* Done: updated `projects/zyne-homepage/scripts/generate-routes.mjs`, covering `/services/`, service product pages, service category pages, and generated service collection routes.
* Done: updated `projects/zyne-homepage/scripts/templates/template-investment.mjs`, covering `/homedetail/7101-wendemere/`.
* Done: updated this README with the shared header/footer source model.

The shared module currently controls header/footer/nav markup, active URL hrefs, nav colors, footer-link gold styling, sticky header behavior, blur, spacing, and mobile nav hiding. Page-level generators still provide their own base page CSS such as `body` font-family and page-specific layout rules, so font ownership has not yet been moved into `global-header-footer.mjs`.

Important historical context:

* `services/index.html` originally inherited footer nav styling from generic `nav` rules in `generate-routes.mjs`.
* Legal pages originally had footer-specific `.footer-links` gold styles in `generate-legal-layer.mjs`.
* A standalone preview was created at `C:\Users\murad\Documents\Codex\2026-07-07\co\outputs\global-footer-header-page.html` to compare and confirm the desired shared header/footer behavior before creating the source module.

## Legal page source model

Legal source copy is maintained as Markdown in the repository-level `assets/` folder and rendered into static pages during `npm run build`:

* `assets/legal/zyne-stan-store-privacy-policy.md` → `/privacy/`

* `assets/legal/zyne-stan-store-terms-and-conditions.md` → `/terms/`

* `assets/legal/zyne-stan-store-refund-and-scope-policy.md` → `/refund-policy/`

* `assets/legal/zyne-stan-store-cookie-policy.md` → `/cookie-policy/`


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

---

# Recommended file model for adding a new subdirectory page

### Shared Files (To Update or Link)

* **`src/styles/main.css`**
* *Action:* Refactor or verify that global design tokens (typography, core theme variables, and brand colors) are strictly defined here to enforce a unified aesthetic across all routes.




* **`scripts/global-header-footer.mjs`**
* *Action:* Reference this module to import `renderGlobalHeader()` and `renderGlobalFooter()` into your new template, keeping layout, navigation links, and sticky behaviors consistent.




* **`scripts/generate-routes.mjs`**
* *Action:* Update this generator script to import your new page template, establish its build path (`dist/your-subdirectory/index.html`), and hook it into the main `npm run build` process.




* **`scripts/` (Build Validators)**
* *Action:* Update your PRD 1.1 validation rules or deployment artifact guards to crawl the new generated subdirectory, ensuring it contains mandatory global elements, semantic structural schema, and valid CTA hierarchies before deployment.





---

### Standalone Files (To Create)

* **`src/data/your-page-content.js`**
* *Action:* Create this data file to store all static copy, image asset mappings, dynamic SEO metadata, and structural schema blocks specific to the new subdirectory.




* **`scripts/templates/template-your-page.mjs`**
* *Action:* Create this template module to ingest data from your new content file, pull in the shared header/footer functions, and return a clean, fully pre-rendered HTML layout string to the router.




* **`src/styles/your-page.css`**
* *Action:* Create this scoped style sheet strictly for unique layout requirements, specific grid templates, or bespoke icon scaling unique to this new subdirectory.
