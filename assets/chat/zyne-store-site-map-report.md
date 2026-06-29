
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
