---

# ⚠️ MANDATORY RULES:
1. Update this chat file with your comment here under the `ASSISTANT` header.
2. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know this file has been updated with your comment.
3. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.

---

<aside>
🤖

# ASSISTANT

Reviewed `zyne.store` and `projects/zyne-homepage`.

Current understanding:
- `projects/zyne-homepage` is the operational source of truth for the live GitHub Pages site. Root/generated HTML should not be hand-edited as source.
- The app is a Vite static site. Browser entry is `src/main.js`, which imports `render-prd-1-2a.js`; that wraps the base homepage renderer in `render.js` with the PRD 1.2A diagnostic layer, return-context prompt, mobile-menu additions, and source-section tracking.
- `scripts/prerender.mjs` injects the rendered homepage into `dist/index.html` for crawler-readable output and adds canonical/schema when missing.
- Product, category, delivery, intelligence, premium, and diagnostic content is structured in `src/data/*`, primarily `products.js` and `diagnostics.js`.
- The build pipeline validates catalog data, PRD homepage behavior, Vite output, prerendering, generated product/category routes, legal pages, SEO files, and route content.
- Deployment should publish `projects/zyne-homepage/dist` through the `Publish ZYNE Homepage` GitHub Pages workflow.

Live-site status:
- `https://zyne.store` is live, crawlable, and serving a prerendered homepage with the PRD 1/1.1 structure: hero, trust strip, growth paths, starter products, intelligence, delivery, process, premium services, industries, FAQ, final CTA, and legal footer.
- The live page does **not** currently expose the newer PRD 1.2A diagnostic chooser markers such as `id="diagnostic-search"` / “Find the Right ZYNE Service,” even though source contains that layer. This indicates the live Pages artifact is behind the current project source or the latest PRD 1.2A source has not been deployed.

Important workflow gap:
- `npm run build` is wired to run `prebuild` → `validate:prd1.2a` before the full build.
- The publish workflow uses `npm run build`, so PRD 1.2A should be enforced there.
- The separate validation workflow manually runs `npx vite build` plus generation/validation scripts and currently does **not** explicitly run `npm run validate:prd1.2a`. That workflow can pass without checking the diagnostic layer unless updated.

Recommended next steps:
1. Trigger or re-run the `Publish ZYNE Homepage` workflow from `main`, then confirm the live homepage includes `diagnostic-search` and the diagnostic chooser copy.
2. Add `npm run validate:prd1.2a` to `.github/workflows/zyne-homepage-validation.yml`, preferably before `npx vite build`, or simplify that workflow to run `npm run build` so validation and publish use the same source of truth.
3. After deploy, re-check `/`, `/services/`, category routes, product routes, legal routes, `robots.txt`, and `sitemap.xml` against the generated artifact.
4. Continue catalog-sync work: current structured data is strong for represented products, but the project docs still flag the full Stan Store catalog normalization as incomplete.

I am caught up enough to continue project work from the current architecture.

</aside>

---

<aside>
👤

# ARCHITECT

</aside>

1. zyne.store is live and hosted on github pages and the main project files are deployed from here https://github.com/az4mary/zyne.store/tree/main/projects/zyne-homepage
2. Inspect both the `zyne.store` and the `projects/zyne-homepage` repo to understand how the website actually functions and bring yourself up to speed of the current status of the project before we continue any work on the project.
