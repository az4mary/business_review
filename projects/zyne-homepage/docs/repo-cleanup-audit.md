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

## Scattered Project-Related Files Found Outside `projects/zyne-homepage`

| Location | Status | Treatment |
|---|---|---|
| `index.html`, `services/`, category folders, legal folders, `404.html`, root `robots.txt`, root `sitemap.xml` | Generated/deployed site artifacts | Treat as build output only. Do not hand-edit as source. Prefer GitHub Actions publishing from `projects/zyne-homepage/dist`. |
| `assets/catalog/` | Shared catalog image output | Keep for now because existing root generated pages reference it. Long term, make `projects/zyne-homepage/public/assets/catalog/` canonical and publish via build. |
| `assets/zyne-website-PRD-*.md` | Requirements archive | Keep as PRD archive. Do not mix these files into runtime code. |
| `assets/zyne-website-PRD-*-validation-result.md` | Historical validation records | Keep as audit trail. Future validation should be generated or documented under `projects/zyne-homepage/docs/` when project-specific. |
| `assets/stan_store_product_urls.md` | Source/reference URL list | Keep as reference until the full live catalog is normalized into structured product data. Do not duplicate under `public/`. |
| `assets/stan_store_product_listings.md` | Live product listing reference | Keep as catalog-reference source until the full product catalog is migrated into structured data. |
| `patches/zyne-crawler-enabled.md` | Implemented patch instruction | Consolidated into `projects/zyne-homepage/docs/crawler-seo-rendering.md`; root patch file can be removed. |
| `About us.md` | Brand/background note | Keep outside runtime until an About page PRD exists. Do not deploy automatically. |
| `Protocols/` and `LAW/` | Non-homepage operational/legal workspaces | Out of homepage scope. Do not import into `projects/zyne-homepage` unless a later PRD requires it. |

## Cleanup Already Applied

- Added `projects/zyne-homepage/public/CNAME` so built GitHub Pages artifacts preserve the `zyne.store` custom domain.
- Added `projects/zyne-homepage/public/.nojekyll` so GitHub Pages serves generated static assets without Jekyll processing.
- Removed the duplicate public artifact `projects/zyne-homepage/public/assets/stan_store_product_urls.md` because it duplicated `assets/stan_store_product_urls.md` and would be published as a public static file.
- Consolidated crawler/AI extraction guidance into `projects/zyne-homepage/docs/crawler-seo-rendering.md`.

## Recommended Cleanup Still Pending

1. Configure GitHub Pages to deploy from GitHub Actions using the built `projects/zyne-homepage/dist` artifact.
2. Stop treating root generated HTML as editable source.
3. After GitHub Actions deployment is confirmed, remove or archive stale root generated artifacts from the working source path if they are no longer used by Pages.
4. Migrate the full Stan Store live catalog into structured data rather than relying on Markdown URL/listing reference files.
5. Add a catalog-sync validation that checks product count, product IDs, Stan URLs, category assignment, and required homepage/category flags against the live catalog reference.

## Operating Rule Going Forward

All new homepage/product/category/SEO changes should happen in `projects/zyne-homepage` source files and pass:

```bash
npm run build
```

Generated HTML should come from the build. Manual root HTML edits are what caused the live/source mismatch.
