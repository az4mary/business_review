
# Task 1 — Quick Site Function Findings

## Website purpose and customer journey

ZYNE is a static, catalog-style services website for fixed-price business growth products. The homepage helps visitors choose a growth path (visibility, brand, business improvement, AI, or conversion), browse service cards, review product/category detail pages, and then follow selected purchase links to Stan Store for secure checkout. It also includes Intelligence and Delivery product groupings, industry pathways, FAQs, legal pages, and analytics event hooks.

## How the website is built

- `projects/zyne-homepage` is the operational source of truth. Its `src/` directory contains the homepage renderer, browser interactions, styles, structured product/category/detail content, SEO data, and catalog rules.
- Vite provides local development and creates the initial production bundle. The full `npm run build` pipeline validates catalog and homepage requirements, builds the frontend, prerenders the homepage, generates route pages, generates legal pages, creates the property route, generates the SEO layer, and validates the final routes.
- `projects/zyne-homepage/public` contains static files and assets copied into the compiled `dist` output. Repository-level legal Markdown and property content/images are additional build inputs.
- `projects/zyne-homepage/dist` is the compiled deployment artifact. It contains a prerendered homepage plus generated category, product, legal, SEO, and property-listing pages, allowing both browsers and crawlers to receive complete HTML.
- The root folders such as `services`, `grow-my-visibility`, `build-my-brand`, `improve-my-business`, `use-ai`, `convert-more-clients`, `intelligence`, `delivery`, `privacy`, `terms`, and `refund-policy` correspond to public routes or generated/deployment artifacts; they should not be treated as the primary authoring source.

## Runtime behavior

- `src/main.js` adds responsive navigation, the mobile sticky call-to-action, diagnostic-result filtering, return-to-section context, FAQ behavior, outbound-link safeguards, image failure handling, and `window.dataLayer` analytics events.
- The homepage and generated pages are data-driven. Products, prices, descriptions, checkout state, growth paths, delivery families, industries, and FAQs come from structured JavaScript data rather than duplicated hand-written page markup.
- Internal product pages educate the customer and preserve a consistent ZYNE browsing experience; live checkout links redirect externally to Stan Store.
- JSON-LD schema is included for the organization, website, collection page, featured services, offers, and FAQ content. `sitemap.xml` currently lists the main homepage, service/growth collection routes, Intelligence, Delivery, and the property-detail route.

## Property route findings

- `homedetail/7101-wendemere-st-houston-tx-77088` contains the property-specific source material: `sale.md`, seven listing images, a ZIP archive, and patch/validation notes.
- There is no hand-maintained `index.html` in that source folder. `scripts/generate-property-route.mjs` generates the deployed page at `projects/zyne-homepage/dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html` during the build.
- The generated property page has already been validated as part of the route build, including its layout, agent link, and decorative asset reference.

## Deployment

The `Publish ZYNE Homepage` GitHub Actions workflow runs on changes to `main` affecting the project, catalog assets, property content, workflow, or route artifacts. It installs Node.js 22 dependencies, runs the complete build, checks required homepage markers, uploads `projects/zyne-homepage/dist`, and deploys that artifact to GitHub Pages for `zyne.store` (configured by `CNAME`).

## Quick conclusion

The customer-facing site is a prerendered static application with light client-side enhancements. Content and route generation are centralized under `projects/zyne-homepage`; `dist` is the deployable result; GitHub Actions rebuilds and publishes it. The architecture supports fast static delivery and crawlable pages while keeping product/catalog content structured and checkout delegated to Stan Store.

---

# Task 2 — File Structure and Organization Summary

## Organization completed

Non-customer-facing files that were loose at the repository root or mixed into an operational folder were reorganized by relationship:

- GitHub Actions run documentation moved from `.github/workflows/github-actions-job-log.md` to `docs/automation/github-actions-job-log.md`, leaving the workflow directory for executable workflow definitions.
- The loose brand note `About us.md` moved to `docs/brand/about-us.md`.
- Property administration documents moved to `docs/property/lease-repair-terms.md` and `docs/property/repair-schedule.md`.
- City Suites research/output was consolidated under `archive/city-suites/`, including its audit PDF, guest review, tracker, and HTML report.
- Historical standalone prototypes from `main/`, `mobile/`, `mobilev1/`, `template/`, `view/`, and `working/` were grouped under `archive/legacy-site-prototypes/` while retaining their individual subfolders and `index.html` files.
- Temporary address/script/delete test files were grouped under `archive/test-artifacts/` instead of remaining at the root.
- The loose homepage mockup moved to `assets/mockups/zyne-store-homepage-mockup.png`.

All moves were recorded as Git renames, preserving file contents and history.

## Website-critical structure preserved

The active site source and all build inputs stayed at their established paths:

- `projects/zyne-homepage/src`, `scripts`, and `public`
- `assets/catalog`, policy Markdown, catalog reference data, and active design assets
- `homedetail/7101-wendemere-st-houston-tx-77088` property source and images
- `.github/workflows/zyne-homepage-pages.yml` and validation/capture workflows
- Root generated customer routes such as `services/`, growth-path folders, legal routes, `404.html`, `robots.txt`, and `sitemap.xml`

`LAW/`, `Messenger/`, and `Protocols/` were also left in place. They are already grouped as distinct operational workspaces, and `LAW/` contains hard-coded path/URL references that could be broken by a folder move. Existing untracked ZIP archives were not modified or included.

## Validation result

After the reorganization, the complete production build succeeded. Validation confirmed:

- 22 catalog products and 5 growth paths/categories
- PRD 1.1 and PRD 1.2A homepage requirements
- 4 generated legal policy pages
- 36 validated generated routes and a 37-URL sitemap
- SEO metadata, schema, breadcrumbs, keyword mapping, and image alternative text
- The property-detail route with all 7 listing images

The customer-facing website build and route-generation pipeline remained intact after the file moves.

---

# Task 2.1 — Assets Folder Organization Summary

## Organization completed

A second inventory was performed specifically for `assets/`, reviewing filenames, folder relationships, repository references, workflow references, and exact duplicate hashes.

- All 20 loose `zyne-website-PRD-*.md` requirement, implementation, roadmap, critique, and validation documents were consolidated under `assets/project-docs/prd/`.
- References inside the PRD documents were updated to their new archive paths.
- `.github/workflows/zyne-homepage-validation.yml` was updated so its PRD 2 path filters follow the moved product-data-model and asset-migration-map documents.
- `projects/zyne-homepage/docs/repo-cleanup-audit.md` was updated to identify `assets/project-docs/prd/` as the PRD archive.
- The unreferenced `ZYNE_homepage_desktop_2.0.png` was moved into the existing mockup collection as `assets/mockups/zyne-homepage-desktop-2.0.png`.
- Existing relationship folders—including `articles/`, `catalog/`, `chat/`, `decor/`, `product_images/`, `products/`, screenshot collections, and presentation/device-image collections—were retained because they are already grouped by purpose.

All content was preserved. The changes are Git renames plus reference updates; no asset, folder, or content was deleted.

## Customer-facing assets deliberately left in place

Loose product thumbnails, logos, favicons, generated `index-*.js`/`index-*.css` bundles, policy Markdown, Stan Store catalog references, report templates, and active design assets were not moved. Repository inspection found that these paths are still used by generated root pages, the build pipeline, or the separate LAW report. Moving them without a dedicated URL migration could break customer-facing or report pages.

The PRD screenshot directories were also kept at their current paths because capture/conversion GitHub Actions write to and publish artifacts from those locations.

## Marked for deletion review — nothing deleted

The following are exact duplicates or likely obsolete generated archives. They are marked for a future deletion decision, not deleted now:

1. `assets/Human Photo/` — all 36 portraits are byte-for-byte duplicates of the same filenames in `LAW/Abdulaziz_Bin_Ali_Partners/Human_Photos/`. Candidate rationale: redundant storage. Prerequisite: update the absolute paths in `testimonial_review_mapping.md` and confirm no external consumer uses the `assets/Human Photo` location.
2. `assets/design-reference.png` and `assets/mockups/zyne-homepage-desktop-2.0.png` — exact duplicates. Candidate rationale: one canonical mockup is sufficient. Prerequisite: choose the canonical filename and confirm report/design references.
3. `assets/favicon.svg` and `assets/ZYNE-favicon.svg`; `assets/ZYNE Logo Trans.png` and `assets/zyne-logo.png`; `assets/ZYNE-apple-touch-icon.png` and `assets/ZYNE-favicon.png` — three exact duplicate pairs. Candidate rationale: duplicate brand files. Prerequisite: standardize all HTML/public references on the canonical lowercase web assets.
4. `assets/product_images/*_Image_1` and matching `assets/products/*_Image_1` files for Market Positioning, Operational Audit, Origination System, and Web Architecture — four exact duplicate pairs. Candidate rationale: overlapping product-image collections. Prerequisite: choose one canonical product image directory and update all consumers.
5. `assets/AI_Integration_thumbnail.jpg` / `assets/product_images/AI_Integration_Image_1.jpg` and `assets/Competitor_Readiness_thumnail.png` / `assets/product_images/Competitor_Readiness_Image_1.png` — exact duplicate pairs with different roles/names. Candidate rationale: redundant binaries. Prerequisite: verify whether separate semantic filenames are still required by legacy pages.
6. `assets/Homepage_Fix_Pack_thumbnail.png` / `assets/Website_Quick_Win_Audit_thumbnail.png` and their corresponding `assets/catalog/` files — exact duplicate image pairs. Candidate rationale: the same visual is stored under two product identities. Prerequisite: confirm this is intentional product artwork rather than accidental duplication.
7. Root `assets/index-*.js` and `assets/index-*.css` files — multiple hashed build generations are present, including one exact duplicate JavaScript pair. Candidate rationale: stale generated bundles can accumulate. Prerequisite: retire root-generated deployment artifacts or identify precisely which hashes current root HTML references.
8. `assets/property-listing-screenshots.zip`, `assets/top-ecommerce-website-screenshots.zip`, and `homedetail/7101-wendemere-st-houston-tx-77088/images.zip` — untracked archives alongside expanded source folders. Candidate rationale: likely redundant packaged copies. Prerequisite: confirm archive contents/checksums and whether the ZIPs are required for delivery; these existing untracked files were not modified or committed.

## Validation result

After the asset moves and reference updates, the full production build passed. It again validated 22 products, 5 categories/growth paths, PRD 1.1 and 1.2A requirements, 4 legal pages, 36 generated routes, the 37-URL sitemap, SEO/schema/breadcrumb/image-alt checks, and the property route with all 7 listing images. The customer-facing website remains intact.

---

# Task 3 — Technical Environment & Repository Architecture

## Question 1: Repository Directory Layout

```text
zyne.store
├── .github
│   └── workflows                         # CI, deployment, and screenshot automation
├── archive
│   ├── city-suites
│   ├── legacy-site-prototypes
│   └── test-artifacts
├── assets                                # Repository-level content and reference assets
│   ├── catalog                           # Shared catalog images
│   ├── chat
│   ├── decor
│   ├── mockups
│   ├── product_images
│   ├── products
│   ├── project-docs/prd                  # PRD archive
│   ├── property-listing-screenshots
│   ├── top-ecommerce-website-screenshots
│   └── zyne-stan-store-*.md              # Legal source Markdown used by the build
├── docs
│   ├── automation
│   ├── brand
│   └── property
├── homedetail
│   └── 7101-wendemere-st-houston-tx-77088 # Property source copy and images
├── projects
│   └── zyne-homepage                     # Operational website source of truth
│       ├── src                           # Source renderers, data, styles, browser behavior
│       ├── scripts                       # Build generators and validators
│       ├── public                        # Static source assets copied during build
│       ├── dist                          # Generated deployment output (Git-ignored)
│       ├── docs
│       ├── index.html
│       ├── package.json
│       ├── pnpm-lock.yaml
│       └── README.md
├── scripts                               # Root Playwright/property capture tools
├── services                              # Root generated route artifacts
│   ├── ai-integration
│   ├── competitor-readiness
│   ├── ...
│   └── index.html
├── build-my-brand                        # Root generated collection route
├── convert-more-clients                  # Root generated collection route
├── delivery                              # Root generated collection route
├── grow-my-visibility                    # Root generated collection route
├── improve-my-business                   # Root generated collection route
├── intelligence                          # Root generated collection route
├── privacy                               # Root generated legal route
├── refund-policy                         # Root generated legal route
├── terms                                 # Root generated legal route
├── use-ai                                # Root generated collection/subroutes
├── 404.html
├── CNAME
├── package.json                          # Root Playwright capture manifest
├── pnpm-lock.yaml
├── robots.txt
└── sitemap.xml
```

## Question 2: Static Asset Management Paths

- **Source Asset Path:** `projects/zyne-homepage/public/assets/` for deployable static assets; selected repository inputs also come from `assets/catalog/`, `assets/zyne-stan-store-*.md`, and `homedetail/7101-wendemere-st-houston-tx-77088/images/`.
- **Compiled Output Path:** `projects/zyne-homepage/dist/assets/`; the property generator also copies listing images to `projects/zyne-homepage/dist/homedetail/7101-wendemere-st-houston-tx-77088/images/`.
- **Font Asset Delivery Method:** `None currently loaded` — no local font files, `@font-face`, Google Fonts stylesheet, or other font CDN is present. CSS uses system font stacks.

## Question 3: Package Configuration & Manifest

The generation manifest is `projects/zyne-homepage/package.json`. It has no `dependencies` object, represented below as an empty object so the requested structure remains explicit.

```json
{
  "scripts": {
    "dev": "vite",
    "validate:catalog": "node scripts/validate-catalog.mjs",
    "validate:catalog:strict": "ENFORCE_CANONICAL_ASSETS=true node scripts/validate-catalog.mjs",
    "validate:routes": "node scripts/validate-generated-routes.mjs && node scripts/validate-legal-layer.mjs && node scripts/validate-seo-layer.mjs",
    "validate:prd1.1": "node scripts/validate-prd-1-1.mjs",
    "validate:prd1.2a": "node scripts/validate-prd-1-2a.mjs",
    "prebuild": "npm run validate:prd1.2a",
    "postbuild": "node scripts/generate-property-route.mjs",
    "report:catalog-migration": "node scripts/report-catalog-migration.mjs",
    "build": "npm run validate:catalog && npm run validate:prd1.1 && vite build && node scripts/prerender.mjs && node scripts/generate-routes.mjs && node scripts/generate-legal-layer.mjs && node scripts/generate-property-route.mjs && node scripts/generate-seo-layer.mjs && npm run validate:routes",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^7.0.0"
  }
}
```

The separate root automation manifest defines `"capture:property-local": "node scripts/capture-property-listings-local.mjs"` and `"playwright": "latest"` as its only development dependency.

## Question 4: CI/CD Workflow Configuration

The complete primary automation-test workflow, `.github/workflows/zyne-homepage-validation.yml`, is:

```yaml
name: ZYNE Homepage Validation

on:
  push:
    paths:
      - "projects/zyne-homepage/**"
      - "assets/catalog/**"
      - "assets/project-docs/prd/zyne-website-PRD-2-product-data-model.md"
      - "assets/project-docs/prd/zyne-website-PRD-2-asset-migration-map.md"
      - ".github/workflows/zyne-homepage-validation.yml"
  pull_request:
    paths:
      - "projects/zyne-homepage/**"
      - "assets/catalog/**"
      - "assets/project-docs/prd/zyne-website-PRD-2-product-data-model.md"
      - "assets/project-docs/prd/zyne-website-PRD-2-asset-migration-map.md"
      - ".github/workflows/zyne-homepage-validation.yml"
  workflow_dispatch:

jobs:
  validate-homepage:
    name: Validate PRD catalog and build
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: projects/zyne-homepage

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Install dependencies
        run: npm install

      - name: Validate catalog
        run: npm run validate:catalog

      - name: Report catalog migration status
        run: npm run report:catalog-migration

      - name: Validate PRD 1.1 homepage UX
        run: npm run validate:prd1.1

      - name: Build Vite bundle
        run: npx vite build

      - name: Prerender crawler-readable homepage
        run: node scripts/prerender.mjs

      - name: Generate category and product routes
        run: node scripts/generate-routes.mjs

      - name: Generate legal layer
        run: node scripts/generate-legal-layer.mjs

      - name: Generate SEO layer
        run: node scripts/generate-seo-layer.mjs

      - name: Build and validate generated site
        run: npm run build

      - name: Validate legal layer
        run: node scripts/validate-legal-layer.mjs

      - name: Validate SEO layer
        run: node scripts/validate-seo-layer.mjs

      - name: Strict catalog validation
        run: npm run validate:catalog:strict
```

Screenshot-specific automation is separately defined in `capture-zyne-homepage.yml`, `capture-zyne-property-fullpage.yml`, and `capture-top-ecommerce-sites.yml`. Deployment is handled by `zyne-homepage-pages.yml`.

## Question 5: Local Testing & Runtime Parameters

- **Local Developer OS:** `Microsoft Windows 11 Pro, version 10.0.22631, build 22631, 64-bit`
- **Local Node.js Version:** `Node v24.14.0` from the Codex bundled runtime. The repository CI intentionally uses Node `22`.
- **Automation/Testing Engine:** `Playwright v1.61.1`; the site build uses installed `Vite v7.3.5`.
- **Local Preview Method:** `Vite development/preview server` from `projects/zyne-homepage`: standard commands are `npm run dev` and `npm run preview`; on this machine, native `npm` is not on `PATH`, so the working equivalents are bundled `pnpm run dev`, `pnpm run build`, and `pnpm run preview`. The completed local generation tests used bundled pnpm `11.7.0` with a temporary npm-to-pnpm compatibility shim because the build scripts contain nested `npm run` calls.
