# ZYNE Homepage PRD Compliance

## Implemented in Source

- Sections 1–12 in the required homepage order.
- Sticky header, desktop navigation, and accessible mobile menu.
- Single crawlable H1 and semantic H2/H3 hierarchy.
- Five buyer-intent growth paths.
- Eight starter product cards driven by structured data.
- Intelligence and Delivery offer families.
- Five-step operating model.
- Six featured premium services.
- Eight industries with elevated Real Estate treatment.
- Six required FAQ items and FAQ structured data.
- Final conversion CTA and full footer disclosure.
- Responsive desktop, tablet, and mobile layouts.
- Keyboard focus, skip link, minimum mobile menu target, reduced-motion support.
- SEO title, description, Open Graph metadata, Service/Offer schema, sitemap, robots file, breadcrumbs, and keyword metadata generation.
- `dataLayer` analytics hooks with product/category/destination properties.
- Internal route patterns required by PRD 1.
- Stan Store redirect disclosure in hero, commerce strip, final CTA, footer, product pages, and policy/checkout areas.

## PRD 1.1 Conversion Optimization Additions

- Mobile sticky CTA bar with `Find My Growth Path` and `Shop Services`.
- Mobile header/logo footprint reduced through responsive CSS.
- Hero CTA hierarchy prioritizes `Find My Growth Path`.
- Starter product decision badges added to all eight homepage product cards.
- Product-card `View Product` CTA treatment strengthened.
- `Best for` and `Timeline` metadata readability improved on mobile.
- Growth-path visual cue labels and differentiated card treatments added.
- Intelligence/Delivery bridge copy added.
- Premium strategic service cards compacted on mobile after the first card.
- Industry cards include conversion-oriented internal CTAs.
- First two FAQ trust objections are visually emphasized.
- PRD 1.1 validator is wired into the build pipeline as `npm run validate:prd1.1`.

## Build and Validation Pipeline

`npm run build` currently runs:

```bash
npm run validate:catalog && npm run validate:prd1.1 && vite build && node scripts/prerender.mjs && node scripts/generate-routes.mjs && node scripts/generate-legal-layer.mjs && node scripts/generate-seo-layer.mjs && npm run validate:routes
```

## Deployment Compliance

The intended deployment artifact is `projects/zyne-homepage/dist` after build.

The root generated site files are treated as deployment artifacts, not source files. Manual edits to root `index.html` or generated route HTML should be avoided because they can create a source/live mismatch.

## Data Status

- Stan Store checkout URLs exist for products currently represented in `src/data/products.js`.
- The larger live Stan Store catalog exists as reference material but is not yet fully normalized into structured product data.
- Analytics provider IDs for GA4, Meta, TikTok, or LinkedIn are still pending; the project currently emits `window.dataLayer` events without loading provider scripts.

## Current Known Gap

The live GitHub Pages site may lag behind the project source until GitHub Pages deploys the built `projects/zyne-homepage/dist` artifact through Actions or an equivalent automated process.

No dummy public checkout URLs or tracking IDs should be introduced.
