# Integrate ZYNE Buy Page Into the Global Site Architecture

## Summary

Move the Buy page into `projects/zyne-homepage`, the sole GitHub Pages application and deployment artifact. Eliminate the isolated `zyne-buy` build system, dependencies, duplicated fonts/assets/styles, hardcoded chrome, icons, and tests.

The live route remains:

`/homedetail/7101-wendemere-st-houston-tx-77088/buy/`

Existing routes and the Buy page’s approved property-panel geometry, gallery behavior, scaling, and copy remain unchanged.

## Architecture and Resources

* Configure the master Vite build as a multi-page application with the homepage and nested Buy-page HTML as explicit inputs.
* Migrate the Buy page’s modular components, listing data, lightbox, scaling utility, and page-specific styles beneath the homepage source tree.
* Namespace Buy-page styles so global selectors cannot affect existing pages and global styles cannot disturb its pixel-matched canvas.
* Remove the entire isolated `projects/zyne-buy` application after migration, including its package manifest, lockfile, Vite configuration, tests, source, and duplicated public assets.

### Shared resources

* Add Inter and Roboto `.woff2` files once under the master `public/assets/fonts/` directory and declare them in the global stylesheet.
* Remove `@fontsource` dependencies and imports.
* Reuse existing global logo, favicon, and agent assets where equivalent; place property-specific optimized gallery derivatives only in the master asset tree.
* Extend `scripts/property-icons.mjs` with the Buy page’s metric, highlight, CTA, and utility SVGs. Remove the isolated icon module.
* Extract the established master header, property topbar, and footer markup into shared render functions.
* Make existing templates and the Buy page consume those functions without changing the current live chrome markup or navigation.
* Move global tokens, reset rules, font declarations, and chrome styles to the shared stylesheet. Keep only mock-up-specific property tokens scoped to the Buy page.

### Shared interfaces

Provide centralized render interfaces equivalent to:

* `renderSiteHeader(options)`
* `renderPropertyTopbar(listing, actions)`
* `renderSiteFooter(options)`
* `Icons.<name>`

The listing schema and six gallery slot names remain unchanged.

## Build, Validation, and Deployment

* Add Buy-page data, typography, icon-policy, layout, and asset tests to the homepage test directory and master validation pipeline.
* Extend generated-route validation to require:

  * The exact Buy route.
  * Valid listing and six preview-slot assignments.
  * Nine-image gallery ordering and referenced assets.
  * Shared header, topbar, footer, fonts, and icon imports.
  * Required copy, canonical URL, and structured data.
* Ensure SEO generation discovers the nested Buy HTML and includes it in `sitemap.xml`.
* Expand the existing GitHub Pages workflow triggers to include the nested HTML, Vite configuration, shared tests, and relevant asset paths.
* Continue publishing only `projects/zyne-homepage/dist`; do not introduce a second build artifact, workflow, repository, branch, or remote.

## Test and Acceptance Plan

* Follow the one-patch gate: clean workspace, record status, dry-run every migration match, apply one confirmed patch, validate, commit once, push once, clean again.
* Run the complete homepage catalog, PRD, route, legal, SEO, and Buy-page test suites.
* Run a clean master production build and confirm the final artifact contains both:

  * `/homedetail/7101-wendemere-st-houston-tx-77088/index.html`
  * `/homedetail/7101-wendemere-st-houston-tx-77088/buy/index.html`
* Verify all existing generated route inventories remain present.
* Serve the master artifact locally and test:

  * Homepage, services, executive briefing, parent property page, legal pages, 404 page, and Buy page.
  * Direct navigation and refresh at the Buy URL.
  * Three-page scrolling, proportional canvases, six preview frames, full gallery, keyboard/focus behavior, and scroll restoration.
  * 1920×1080 and 1366×768 layouts.
  * No missing assets, console errors, font fallback, or CSS leakage.
* After pushing to existing `origin/main`, require a successful GitHub Pages deployment and verify the new route and representative existing subdirectories return HTTP 200.

## Assumptions

* The global resource map supersedes the earlier isolated-build integration proposal.
* Shared header, topbar, and footer structures are authoritative even where their dimensions differ from the original disposable-header allowance.
* Property-page content remains pixel-matched; only site chrome and resource sourcing are centralized.
* Optimized display and thumbnail derivatives are intentional production assets, not prohibited duplication.
* No existing live URL is renamed, redirected, deleted, or replaced.
