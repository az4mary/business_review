# Site-Wide `main.css` Migration

## Summary

Make Vite’s compiled `main.css` the single production stylesheet for all site routes. Generated pages will resolve its hashed filename through Vite’s manifest. Header/footer/menu remain owned exclusively by `global-header-footer.mjs`.

Exclude standalone reports, archives, and screenshot evidence.

## Key Changes

- Enable Vite manifest generation and add one documented helper: `scripts/build-assets.mjs`, responsible only for resolving the compiled main stylesheet URL.
- Merge homepage supplemental CSS, generated-route CSS, legal CSS, repair CSS, rental/investment CSS, and buy-page CSS into `src/styles/main.css`.
- Scope route-specific rules under explicit body classes:
    - `home-route`
    - `catalog-route`
    - `legal-route`
    - `repair-route`
    - `rental-route`
    - `investment-route`
    - `buy-route`
- Replace page-level `<style>` blocks with one manifest-resolved `<link>` to compiled `main.css`.
- Keep header/footer/menu markup, behavior, and their dedicated styling in `global-header-footer.mjs`.
- Consolidate reusable property SVGs into `property-icons.mjs`.
- Consolidate buy gallery/panel rendering into `template-buy.mjs`.
- Retain only the documented buy files:
    - `src/data/buy-page-content.js`
    - `scripts/templates/template-buy.mjs`
    - `src/styles/buy-page.css` will be removed after its scoped rules enter `main.css`.
- Delete all obsolete supplemental and unapproved CSS/helper files after migration.
- Do not manually edit generated root HTML; rebuild it from source.

## Validation

- Fail builds when the Vite manifest or compiled CSS entry is missing.
- Validate every production route contains the same compiled stylesheet link.
- Reject obsolete inline page-style blocks and references to deleted CSS files.
- Run the root build and all catalog, legal, SEO, PRD, property, and buy-route validators.
- Visually inspect representative desktop/mobile routes from every route class, including homepage, services, legal, repair, rental, investment, and buy.
- Confirm shared header/footer/menu behavior remains unchanged.
- Commit the entire migration as one reversible commit and push only after all checks pass.

## Assumptions

- Temporary route breakage during local migration is acceptable.
- `LAW/`, `report/`, `archive/`, and screenshot evidence HTML remain isolated.
- Header/footer/menu CSS is exempt from `main.css` because its sole owner remains `global-header-footer.mjs`.
- The Vite manifest lookup choice is approved.
