# ZYNE Homepage Repository Cleanup Audit

## Scope

This audit covers repository organization for the live ZYNE website project in `projects/zyne-homepage`.

The goal is to make `projects/zyne-homepage` the operational source of truth for homepage code, generated routes, catalog rendering, SEO generation, validation, and deployment behavior.

## Current Source of Truth

Use these files as the active project source:

| Area | Source |
|---|---|
| Homepage rendering | `projects/zyne-homepage/src/render.js` |
| Browser behavior and analytics hooks | `projects/zyne-homepage/src/main.js` |
| Homepage styling | `projects/zyne-homepage/src/styles/main.css` |
| Product/category data | `projects/zyne-homepage/src/data/products.js` |
| Product detail copy | `projects/zyne-homepage/src/data/product-detail-content.js` |
| Category/collection copy | `projects/zyne-homepage/src/data/category-content.js` |
| Catalog asset policy | `projects/zyne-homepage/src/data/catalog-standards.js` |
| Catalog image migration map | `projects/zyne-homepage/src/data/catalog-image-map.js` |
| Build and route generation | `projects/zyne-homepage/scripts/*.mjs` |
| Public deploy assets | `projects/zyne-homepage/public/` |
| Deployment automation | `.github/workflows/zyne-homepage-pages.yml` |
| Validation automation | `.github/workflows/zyne-homepage-validation.yml` |

## Scattered Project-Related Files Found Outside `projects/zyne-homepage`

| Location | Status | Treatment |
|---|---|---|
| `index.html`, `services/`, category folders, legal folders, `404.html`, root `robots.txt`, root `sitemap.xml` | Generated/deployed site artifacts | Treat as build output only. Do not hand-edit as source. Prefer GitHub Actions publishing from `projects/zyne-homepage/dist`. |
| `projects/zyne-homepage/public/assets/catalog/products/` | Canonical product image source | Product media is centralized here as lowercase WebP files and published via build. |
| `assets/project-docs/prd/zyne-website-PRD-*.md` | Requirements archive | Keep as PRD archive. Do not mix these files into runtime code. |
| `assets/project-docs/prd/zyne-website-PRD-*-validation-result.md` | Historical validation records | Keep as audit trail. Future validation should be generated or documented under `projects/zyne-homepage/docs/` when project-specific. |
| `assets/stan_store_product_urls.md` | Source/reference URL list | Keep as reference until the full live catalog is normalized into structured product data. Do not duplicate under `public/`. |
| `assets/stan_store_product_listings.md` | Live product listing reference | Keep as catalog-reference source until the full product catalog is migrated into structured data. |
| `patches/zyne-crawler-enabled.md` | Implemented patch instruction | Consolidated into `projects/zyne-homepage/docs/crawler-seo-rendering.md` and removed. |
| `assets/index_zyne_homepage_1.html` | Obsolete standalone homepage artifact | Removed because it was publicly servable and not part of the current source/build pipeline. |
| `assets/index_redirect_stan_store.html` | Obsolete standalone Stan Store redirect artifact | Removed because direct redirect artifacts conflict with the product-education-first model. |
| `About us.md` | Brand/background note | Keep outside runtime until an About page PRD exists. Do not deploy automatically. |
| `Protocols/` and `LAW/` | Non-homepage operational/legal workspaces | Out of homepage scope. Do not import into `projects/zyne-homepage` unless a later PRD requires it. |

## Cleanup Applied

- Added `projects/zyne-homepage/public/CNAME` so built GitHub Pages artifacts preserve the `zyne.store` custom domain.
- Added `projects/zyne-homepage/public/.nojekyll` so GitHub Pages serves generated static assets without Jekyll processing.
- Added `.github/workflows/zyne-homepage-pages.yml` to build `projects/zyne-homepage` and deploy the generated `dist` artifact to GitHub Pages.
- Removed the duplicate public artifact `projects/zyne-homepage/public/assets/stan_store_product_urls.md` because it duplicated `assets/stan_store_product_urls.md` and would be published as a public static file.
- Consolidated crawler/AI extraction guidance into `projects/zyne-homepage/docs/crawler-seo-rendering.md`.
- Removed root `patches/zyne-crawler-enabled.md` after consolidation.
- Removed obsolete public standalone HTML artifacts under `assets/` that were not part of the current build.
- Updated `projects/zyne-homepage/README.md` and `projects/zyne-homepage/PRD_COMPLIANCE.md` to reflect the current source-of-truth model.

## Recommended Cleanup Still Pending

1. Confirm GitHub Pages is set to deploy from GitHub Actions, not manually from the root folder.
2. After GitHub Actions deployment is confirmed, stop relying on stale root generated HTML as the live source.
3. Migrate the full Stan Store live catalog into structured data rather than relying on Markdown URL/listing reference files.
4. Add a catalog-sync validation that checks product count, product IDs, Stan URLs, category assignment, and required homepage/category flags against the live catalog reference.
5. Consider a later root cleanup PR that removes generated root artifacts only after the Pages deployment path is confirmed stable.

## Operating Rule Going Forward

All new homepage/product/category/SEO changes should happen in `projects/zyne-homepage` source files and pass:

```bash
npm run build
```

Generated HTML should come from the build. Manual root HTML edits are what caused the live/source mismatch.
