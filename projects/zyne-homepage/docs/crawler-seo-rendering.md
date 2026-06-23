# Crawler and SEO Rendering Architecture

## Purpose

The homepage must be readable by search engines, AI crawlers, and no-JavaScript clients without relying on client-side hydration to reveal the main page content.

## Current Approach

`projects/zyne-homepage` uses a shared homepage renderer:

- `src/render.js` produces the crawlable homepage HTML.
- `src/main.js` attaches interaction, analytics, mobile menu, FAQ, and sticky CTA behavior after the page exists.
- `scripts/prerender.mjs` injects the rendered homepage into `dist/index.html` during build.
- `scripts/generate-routes.mjs` generates category, collection, product detail, legal, and 404 pages into `dist`.
- `scripts/generate-seo-layer.mjs` adds sitemap, robots, Open Graph, Twitter, breadcrumb schema, and keyword metadata.

This keeps the SEO objective of the root `index.html`: crawlers should see full homepage content, not an empty `<div id="app"></div>`.

## Required Validation

After build, `dist/index.html` should contain live homepage copy including:

```txt
Choose Your Growth Path
Google Business Profile Mini Audit
Secure checkout is completed through Stan Store
```

The homepage should also preserve:

- one crawlable H1;
- FAQ structured data;
- service/offer structured data;
- canonical URL;
- internal product/category links;
- no direct homepage Stan Store checkout links.

## Deployment Rule

The built `dist` output is the deployable site. Do not manually edit generated root HTML as the source of truth. Update source files and data under `projects/zyne-homepage`, then rebuild.

## Retired Patch Note

The former root patch note `patches/zyne-crawler-enabled.md` has been consolidated into this document. Its functional guidance is now represented by the renderer, prerender script, route generator, SEO generator, and validation scripts inside this project.
