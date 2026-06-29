# ZYNE Website PRD 1.2 — Homepage Strategic Conversion Plan

## Status

Draft for approval. This document is planning only. Do not implement PRD 1.2A, PRD 1.2B, or PRD X changes until the owner approves this file.

## Revision note

This revision moves the homepage cognitive-load solution into **PRD 1.2A as the highest-priority item**. The homepage is currently visually coherent, but it asks a simple buyer to read too much before finding the right service. PRD 1.2A must therefore begin with a diagnostic search / guided homepage curation system before adding more content.

This revision also:

- adds homepage return-context handling to reduce navigation stress,
- broadens spacing reduction across all devices,
- keeps Industry page expansion outside homepage scope in PRD X,
- moves high-ticket AI system explanation out of homepage scope and into PRD X for AI/product pages.

## Source inputs

This PRD consolidates homepage improvement work from:

- `assets/project-docs/prd/zyne-website-PRD-1.md`
- `assets/project-docs/prd/zyne-website-PRD-1.1-validation-result.md`
- `assets/project-docs/prd/zyne-website-PRD-1.1-visual-validation-result.md`
- `assets/project-docs/prd/zyne-website-PRD-1.1-deep-dive.md`
- `assets/project-docs/prd/zyne-website-PRD-1.1-critique.md`
- `assets/project-docs/prd/zyne-website-PRD-1.1-debate.md`
- `assets/zyne-website-PRD-1.1-presentation.pdf`
- Latest responsive device screenshots in `assets/PRD-1.1-images/` and/or the uploaded PRD 1.1 device capture package.

## Strategic premise

ZYNE is not a traditional agency website. ZYNE is a premium productized service storefront for growth intelligence and execution.

The homepage must act as:

1. a premium showroom,
2. a buyer self-diagnosis system,
3. a product education layer,
4. a trust and objection-removal layer,
5. a routing layer into paid products and checkout.

Stan Store remains the standard external checkout rail for direct-buy services. ZYNE must continue to disclose that secure checkout is completed through Stan Store.

## Non-negotiables

The following must remain true after PRD 1.2:

- No free-call funnel language.
- No `Schedule a Free Call`, `Book a Free Consultation`, `Get a Free Strategy Session`, `Contact Us for Pricing`, `Talk to Sales`, or `Request a Free Audit` language.
- Product prices, scopes, deliverables, and timelines remain public where products are fixed-scope.
- Homepage continues to educate and route; checkout remains external.
- Do not add heavy JavaScript where pre-authored content, anchor links, and lightweight state can solve the problem.
- Do not generate unreviewed AI copy in the browser. Any curated homepage content must come from pre-approved copy/data in the source code.
- Do not edit generated root HTML artifacts manually. Source-of-truth changes must remain in `projects/zyne-homepage/`.

---

# PRD 1.2A — Homepage Cognitive-Load Reduction, Responsive Polish, and Navigation Stabilization

## Goal

Make the current homepage easier to use before adding larger strategic content.

PRD 1.2A is focused on the immediate live homepage experience:

1. reduce buyer cognitive load,
2. let visitors quickly get a curated homepage view,
3. reduce vertical pacing and scroll burden,
4. fix mobile interaction states,
5. preserve context when users leave and return to the homepage,
6. stabilize responsive visual QA.

## 1.2A Scope

---

## A1. Add diagnostic search / curated homepage mode — top priority

### Problem

The current homepage is premium but loaded. A simple buyer who does not already know what they need has to read a large amount of content before finding the right service path.

This creates high cognitive load:

- too many service concepts appear before the buyer has self-identified,
- mobile users face a very long page,
- product cards require repeated reading and comparison,
- uncertain buyers may misdiagnose their problem,
- the site risks feeling like a catalog instead of a guided buying system.

### Required solution

Add a prominent diagnostic search / chooser near the top of the homepage. The preferred interaction is a large, high-visibility selection control plus a strong search/find button.

Suggested UI:

```txt
Find the right ZYNE service.

What do you need help with?
[ Select your biggest bottleneck ▼ ]   [ Find My Solution ]
```

Suggested dropdown options:

```txt
People cannot find my business locally
My brand does not look credible enough
My website gets traffic but does not convert
I need better proof, case studies, or sales assets
I need AI to handle intake, routing, or follow-up
I need to understand what is actually broken
I want a full enterprise system or complex build
```

### Curated homepage behavior

After a visitor selects an option and clicks the large search/find button, the homepage should generate a **curated view** from pre-authored source content.

This is not open-ended AI generation. It is smart content assembly from approved product/category data.

The curated view should show:

```txt
Your likely path
Recommended starting point
Best diagnostic if unsure
Relevant products
Why this route fits
Next action
```

Example curated result:

```txt
You selected: My website gets traffic but does not convert.

Recommended path: Convert More Clients
Start here: Website Quick-Win Audit
Next step: Web Architecture or Origination System
If unsure: Executive Briefing or Operational Audit
```

### Implementation steps

1. Add a new homepage section immediately after the hero or inside the hero lower region.
2. Use a native `<select>` or accessible combobox pattern.
3. Add a large button labeled `Find My Solution`, `Find My Growth Path`, or approved equivalent.
4. Store diagnostic options in a simple data object, not hardcoded scattered markup.
5. On selection, reveal or populate a curated result panel on the homepage.
6. Curated results should link to existing homepage anchors and relevant product/service routes.
7. Include a `Reset` or `Show full homepage` control.
8. Avoid heavy JavaScript frameworks.
9. Ensure the selected diagnostic state can be represented by a URL hash or query parameter where practical, for example `#diagnostic-conversion`.
10. Ensure `I need to understand what is actually broken` routes to a paid diagnostic, not to a free-call path.

### Content rules

- Use buyer symptom language, not internal agency taxonomy.
- Do not force the buyer to choose from all products first.
- Do not imply the diagnostic is a guarantee.
- Do not use free-call language.
- Do not generate unapproved copy at runtime.
- Keep all recommendations traceable to approved product data.

### Acceptance criteria

- A first-time visitor can choose a business problem before reading the full catalog.
- The diagnostic search is visible above the heavy product sections.
- The result panel gives a curated path, starting product, diagnostic option, and next action.
- The `not sure` option routes to paid diagnostics.
- The full homepage remains accessible.
- The feature works at desktop, tablet, and `390px` mobile width.
- No prohibited free-call CTA appears.

---

## A2. Reduce vertical spacing between all homepage segments on all devices

### Problem

The homepage currently uses luxury spacing well on desktop, but the total page length is high, especially on mobile and tablet. The user should not have to scroll through excessive vertical air between every major section.

### Required behavior

Reduce vertical spacing globally while preserving the premium feel.

This applies to:

- desktop,
- tablet,
- mobile,
- hero-to-trust transition,
- section-to-section spacing,
- card grid spacing,
- pre-FAQ and final CTA spacing.

### Implementation steps

1. Audit all section padding values in `main.css`.
2. Introduce section spacing tokens if practical:

```css
:root {
  --section-pad-desktop: 6.5rem;
  --section-pad-tablet: 5rem;
  --section-pad-mobile: 4.25rem;
}
```

3. Reduce major section padding by approximately 10–20%.
4. Reduce tablet hero vertical padding.
5. Reduce mobile product/card internal vertical spacing without hiding decision-critical metadata.
6. Keep enough breathing room for premium perception.
7. Confirm final CTA still feels intentional.

### Acceptance criteria

- Homepage feels shorter without feeling compressed.
- Tablet top viewport no longer feels sparse.
- Mobile page has lower perceived scroll burden.
- Product metadata, CTAs, and FAQ remain readable.
- No section collision or cramped card layout.

---

## A3. Add homepage return-context handling to reduce navigation stress

### Problem

A visitor may click from the homepage into a path or service route, for example from the ZYNE Delivery section into Website Kits. If they decide the destination is not right and click Home, they lose their place and must manually scroll back through the homepage.

This creates navigation stress on a long homepage.

### Required solution

Add a lightweight return-context system so users can resume near the homepage section they left.

### Homepage-side implementation steps

1. Add `data-source-section` or equivalent metadata to internal homepage links that route to path/service pages.
2. Before navigating away from the homepage, store the current source section and scroll position in `sessionStorage`.
3. When the user returns to the homepage, show a small non-intrusive prompt:

```txt
Continue where you left off?
Return to ZYNE Delivery
```

4. Let the user choose to resume. Do not force auto-scroll unless the return URL explicitly includes a hash.
5. Add section anchors to major homepage modules:

```txt
#hero
#diagnostic-search
#growth-paths
#products
#intelligence
#delivery
#process
#strategic-services
#industries
#faq
#final-cta
```

6. Preserve normal browser Back behavior.
7. If the user clicks the ZYNE logo or Home from a subpage, support a URL pattern such as `/#delivery` where possible.

### Subdirectory carryover

Subpage-level `Back to previous homepage section` buttons belong in PRD X unless explicitly pulled into PRD 1.2A. PRD 1.2A may prepare homepage anchors and state handling; deeper route templates should be handled later.

### Acceptance criteria

- Leaving the homepage from a major section stores context.
- Returning home can restore or prompt restoration to the prior section.
- No unexpected forced scroll for new visitors.
- Major homepage sections have stable anchors.
- Works on mobile and desktop.

---

## A4. Redesign mobile menu into a deliberate conversion panel

### Problem

The current mobile menu opens beneath the header and visually covers the hero headline. It works mechanically, but it feels like a technical dropdown rather than a premium designed interaction state.

### Required behavior

On mobile widths, the open menu should become a full-screen or near-full-screen dark panel, not a partial accidental overlay.

Required menu content:

```txt
01 Services
02 Growth Paths
03 Intelligence
04 Delivery
05 Industries
06 FAQ

Find My Growth Path
Shop Services
```

### Implementation steps

1. Scope mobile menu CSS to `.site-header nav` instead of global `nav` selectors.
2. Add a mobile open state class, for example `body.mobile-menu-open` or `.site-header nav.is-open`.
3. At `max-width: 640px`, render `#main-navigation.is-open` as a fixed or absolute full-height panel below the 64px header.
4. Add two CTA links inside the open mobile menu:
   - `Find My Growth Path`
   - `Shop Services`
5. Change the menu button visual state from `MENU` to `CLOSE` when expanded.
6. Ensure `Escape` closes the menu.
7. Ensure menu links close the menu after click.
8. Preserve keyboard focus and `aria-expanded` state.
9. Consider routing the primary menu CTA into the new diagnostic search section.

### Acceptance criteria

- `Mobile-Menu.png` shows a deliberate premium navigation panel.
- The panel no longer looks like it accidentally hides the hero headline.
- `Find My Growth Path` and `Shop Services` are visible inside the menu.
- The menu has an obvious close state.
- No horizontal scroll at `390px` viewport width.
- Existing header `Shop Services` CTA may remain, shorten, or be hidden on mobile only if the menu and sticky CTA preserve shopping access.

---

## A5. Preserve and validate compact mobile sticky CTA

### Problem

The mobile sticky CTA previously regressed into two full-height panels due to inherited `nav` CSS. It has been patched and now needs permanent validation coverage.

### Required behavior

At mobile scroll depth after the hero threshold, a compact bottom sticky CTA should appear:

```txt
Find My Growth Path | Shop Services
```

### Implementation steps

1. Keep the dedicated sticky CTA layout guard or migrate its rules safely into scoped main CSS.
2. Ensure global `nav` selectors cannot affect `.mobile-sticky-cta`.
3. Keep `.mobile-sticky-cta` bottom-only positioned with explicit `top: auto` and capped height.
4. Add `Mobile-Sticky-CTA.png` capture to the screenshot workflow if it is not already permanently included.
5. Capture sticky CTA at `390 × 844`, viewport-only, after scrolling past the hero threshold.
6. Consider making the left sticky CTA route to the diagnostic search rather than directly to the full Growth Paths section.

### Acceptance criteria

- `Mobile-Sticky-CTA.png` is generated in every responsive QA capture.
- Sticky CTA height remains compact.
- Both buttons are tappable and fully visible.
- Sticky CTA never overlaps the viewport as full-height panels.

---

## A6. Fix mobile footer layout

### Problem

The mobile footer currently feels cramped because long disclosure and legal/service responsibility copy is rendered in narrow columns.

### Required behavior

At mobile widths, footer content should stack in one clean column.

### Implementation steps

1. At `max-width: 640px`, set footer grid to one column.
2. Ensure footer legal links remain grouped and readable.
3. Give long disclosure copy a readable line height.
4. Ensure `footer small` does not force multi-column placement on mobile.

Suggested CSS direction:

```css
@media (max-width: 640px) {
  footer {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  footer small {
    grid-column: auto;
  }
}
```

### Acceptance criteria

- Mobile footer is single-column at `390px`.
- Disclosure copy is readable without narrow columns.
- Legal links remain visible.
- Footer still includes Stan Store checkout disclosure and service responsibility language where applicable.

---

## A7. Improve muted text contrast and product metadata readability

### Problem

Some muted copy and product metadata are technically readable but visually compressed, especially on desktop product cards and mobile metadata rows.

### Implementation steps

1. Increase secondary text contrast globally or selectively.
2. Improve product metadata line height.
3. Improve `Best for`, `Timeline`, and price row scanability.
4. Keep premium restraint; do not make all text pure white.

Suggested CSS direction:

```css
:root {
  --muted: #b2aca1;
}

.product-meta div,
dl div {
  font-size: .86rem;
  line-height: 1.55;
}

.product-meta dd,
dl dd {
  max-width: 60%;
}
```

### Acceptance criteria

- Product metadata can be scanned at desktop and mobile sizes.
- Muted footer/disclosure/card copy has improved readability.
- Visual tone remains premium, not high-contrast generic.

---

## A8. Reduce mobile catalog fatigue without removing product clarity

### Problem

The mobile homepage is functional but long. Product cards are clear, but the full product matrix creates high scroll burden.

### Implementation steps

1. Tighten mobile product-card padding.
2. Reduce vertical spacing inside metadata rows.
3. Preserve price, `Best for`, timeline, and CTA visibility.
4. Use diagnostic search to reduce the need to manually scan every product.
5. Do not remove buyer-critical metadata.

### Acceptance criteria

- Mobile product cards remain clear.
- Page feels slightly tighter without hiding buyer-critical information.
- CTAs remain large and tappable.
- Diagnostic search provides a faster path than scanning the full catalog.

---

## PRD 1.2A validations

Create or update:

```bash
npm run validate:prd1.2a
```

Validator should check:

- No prohibited free-call CTA language.
- Diagnostic search / chooser exists above heavy product sections.
- Diagnostic chooser includes at least seven buyer symptom options.
- Diagnostic chooser includes a large `Find` / `Search` / `Find My Solution` button.
- Diagnostic result panel contains recommended path, starting point, diagnostic option, relevant products, and next action.
- `I need to understand what is actually broken` routes to paid diagnostic language.
- Curated content is sourced from approved data/copy, not unreviewed runtime AI generation.
- Major homepage sections have stable anchors.
- Internal homepage-to-route links include source-section metadata or return-context support.
- `.mobile-sticky-cta` exists.
- `.mobile-sticky-cta` has direct links for `Find My Growth Path` and `Shop Services` or approved diagnostic/search equivalent.
- Mobile menu contains `Find My Growth Path` and `Shop Services` CTAs.
- Mobile menu uses a scoped selector strategy; no broad mobile `nav` selector should control all nav elements.
- Footer still contains legal links to privacy, terms, refund policy, and cookie policy.
- Checkout disclosure remains present.

### Visual validation

Responsive screenshot workflow must capture:

```txt
Desktop.png
Tablet.png
Mobile.png
Mobile-Menu.png
Mobile-Sticky-CTA.png
Mobile-Diagnostic-Result.png
```

Visual pass requirements:

- Diagnostic search is visible early on desktop, tablet, and mobile.
- Diagnostic result panel is readable at `390px`.
- Mobile sticky CTA is compact.
- Mobile menu is deliberate and CTA-bearing.
- Mobile footer is one-column.
- Tablet hero top region is not excessively sparse.
- Overall vertical spacing is reduced without damaging the premium system.
- No horizontal overflow on desktop, tablet, or mobile.

### Build validation

`npm run build` must still pass the existing chain:

```bash
npm run validate:catalog
npm run validate:prd1.1
npm run validate:prd1.2a
vite build
node scripts/prerender.mjs
node scripts/generate-routes.mjs
node scripts/generate-legal-layer.mjs
node scripts/generate-seo-layer.mjs
npm run validate:routes
```

---

# PRD 1.2B — Homepage Strategic Trust and Positioning System

## Goal

After PRD 1.2A reduces cognitive load and stabilizes the current homepage, PRD 1.2B can add strategic positioning modules.

PRD 1.2B must not make the homepage heavier unless it also improves buyer orientation. Do not add content just because it is strategically interesting.

## 1.2B Scope

---

## B1. Add an `Old Agency Model vs ZYNE Model` comparison section

### Problem

Buyers need to understand why ZYNE does not use vague discovery calls, hidden pricing, or custom proposal funnels.

### Required section

Add a compact comparison module near the top of the homepage only if it does not compete with the diagnostic search.

Suggested structure:

```txt
Traditional Agencies
- Hidden pricing
- Free-call sales funnels
- Custom proposals
- Scope creep
- Slow handoff

The ZYNE Model
- Fixed-price services
- Clear deliverables
- Defined timelines
- Productized diagnostics
- Secure checkout through Stan Store
```

### Acceptance criteria

- Section explains productized positioning within 10 seconds.
- It does not attack buyers or sound gimmicky.
- It does not introduce free-call language as a CTA.
- It reinforces fixed price, fixed scope, and clear timeline.
- It does not push the diagnostic search too far down the page.

---

## B2. Add diagnostic-first routing language around the chooser

### Problem

Buyers can misdiagnose their own business constraint. The homepage needs a safe path for uncertainty.

### Required copy pattern

```txt
Not sure what to buy?
Start with a paid diagnostic.

ZYNE does not use free discovery calls. If the problem is unclear, begin with an Executive Briefing, Operational Audit, or relevant paid assessment before moving into delivery.
```

### Implementation steps

1. Add a diagnostic callout inside or after the diagnostic search result panel.
2. Add links to relevant paid diagnostic products.
3. Keep the language firm: no free calls, no custom quote dependency.
4. Clarify that diagnostics create a better implementation path.

### Acceptance criteria

- Homepage gives uncertain buyers a path that does not require guessing.
- No free consultation language appears.
- Paid diagnostic products are positioned as valuable standalone products.

---

## B3. Add `Signature Frameworks` homepage section

### Problem

High-differentiation products such as Experience Bank, Origination System, Web Architecture, and AI Integration should not appear as ordinary catalog items with the same weight as basic audits.

### Required section

Add a distinct `Signature Frameworks` section before or near Featured Strategic Services.

Suggested products/frameworks:

```txt
Experience Bank
Turn past wins into anonymized proof assets for sales, websites, and proposals.

Origination System
Turn expertise, thought leadership, and buyer risk into a structured opportunity engine.

Web Architecture
Map buyer journey, proof, conversion paths, and page structure before building.

AI Integration System
Connect approved knowledge, intake logic, routing, and automation into a controlled workflow.
```

### Design direction

- Use larger, more premium cards than standard product cards.
- Use architectural/blueprint linework from the presentation aesthetic.
- Add labels such as `Signature Framework`, `Strategic IP`, or `Premium System`.
- Do not overfill the section with all products.

### Acceptance criteria

- Signature frameworks feel higher-order than basic fixed-scope products.
- Section elevates ZYNE proprietary thinking.
- At least Experience Bank and Origination System are clearly visible.
- Links route to relevant products or sections without requiring free-call behavior.

---

## B4. Add product ladder / escalation model

### Problem

The catalog can feel broad. Buyers need to understand the ladder from starter products to diagnostics to implementation.

### Required section or module

Add a ladder explanation:

```txt
Starter
Low-risk audits, quick wins, and starter kits.

Diagnostic
Briefings, reports, audits, and blueprints that clarify the build path.

Delivery
Fixed-scope implementation systems and strategic builds.

Enterprise
Higher-complexity builds that require readiness, access, and paid alignment.
```

### Acceptance criteria

- Buyer understands there is a progression.
- Low-ticket products are framed as trust-building entry points.
- High-ticket products are framed as implementation, not blind impulse purchases.

---

## B5. Add `What happens after checkout` purchase journey

### Problem

A no-call productized service model can create post-click anxiety. Buyers need to know what happens after they pay.

### Required module

Add a three- to five-step journey module near FAQ or final CTA:

```txt
1. Choose a fixed-scope product.
2. Review deliverables, timeline, and checkout disclosure.
3. Complete secure checkout through Stan Store.
4. Receive intake materials or next-step instructions.
5. ZYNE begins the scoped intelligence or delivery process.
```

### Enterprise variation

For high-ticket products:

```txt
For enterprise systems, ZYNE may route the buyer through a paid alignment or blueprint product before implementation begins.
```

### Acceptance criteria

- Checkout anxiety is reduced.
- Stan Store disclosure is preserved.
- No custom pricing or free-call language is introduced.

---

## B6. Add enterprise alignment product pathway

### Problem

Some high-ticket buyers need human validation and scope confidence before a large purchase. Free discovery calls are prohibited, but paid alignment is compatible with the productized model.

### Required product concept

Add a new product or homepage pathway:

```txt
Enterprise Alignment Briefing
$250–$500
Credited toward qualifying premium implementation.
```

Suggested positioning:

```txt
For buyers considering enterprise systems, premium AI builds, multi-location rollouts, or complex operational work. Use this paid briefing to confirm scope, readiness, constraints, and recommended next purchase path.
```

### Rules

- This is not a free consultation.
- This is not `contact us for pricing`.
- Price must be public.
- Scope must be fixed.
- Credit policy must be explicit if offered.
- It should be used only for high-complexity or high-ticket pathways.

### Acceptance criteria

- Enterprise buyers have a human trust layer.
- ZYNE preserves no-free-call discipline.
- Direct-buy products remain direct-buy.

---

## B7. Add enterprise payment pathway language without breaking Stan Store model

### Problem

Stan Store is efficient for direct-buy products, but high-ticket enterprise buyers may need invoice/payment handling that feels appropriate for finance approval.

### Required language

Standard products:

```txt
Secure checkout is completed through Stan Store.
```

Enterprise alignment or implementation products:

```txt
Some enterprise purchases may begin with a paid alignment product and may use invoice-based payment handling where appropriate after scope is confirmed. Public pricing and product scope remain visible.
```

### Acceptance criteria

- Stan Store remains the disclosed checkout layer for standard products.
- High-ticket buyer credibility concerns are addressed.
- No hidden pricing or free-call language is introduced.

---

## Explicitly excluded from homepage PRD 1.2B

### High-ticket AI system explanation module

The high-ticket AI system explanation should not be added as a broad homepage module in PRD 1.2B. It is important, but it belongs in PRD X for AI product pages, the `/use-ai/` path, and high-ticket service pages where the buyer context is specific.

Homepage may include a light pointer to AI systems, but the detailed schematic belongs elsewhere.

### Industry page expansion

Industry page expansion does not belong in homepage PRD 1.2A or 1.2B. Homepage may keep or lightly refine industry cards, but full industry-page expansion belongs in PRD X.

---

## PRD 1.2B validations

Create or update:

```bash
npm run validate:prd1.2b
```

Validator should check:

- Homepage contains an `Old Agency Model vs ZYNE Model` or equivalent productized-model comparison if approved.
- Homepage contains diagnostic-first paid routing language.
- Homepage contains `Signature Frameworks` section if approved.
- Experience Bank and Origination System are visible if Signature Frameworks is approved.
- Purchase journey includes Stan Store checkout disclosure.
- Enterprise Alignment Briefing or equivalent paid alignment product/path is present if approved.
- Detailed high-ticket AI schematic is not implemented as a general homepage module.
- No prohibited free-call language appears.
- No `Contact us for pricing` language appears.
- Productized pricing/scope language remains visible.

Visual validation should check:

- New modules do not undo PRD 1.2A cognitive-load improvements.
- Signature Frameworks cards are visually distinct from regular product cards.
- Purchase journey is readable on desktop, tablet, and mobile.
- Mobile menu includes PRD 1.2B priority routes where approved.

Build validation should add `validate:prd1.2b` into `npm run build` only after the PRD 1.2B implementation is approved.

---

# PRD X — Future Path/Subdirectory Carryover Improvements

## Purpose

PRD X is not a current implementation PRD. It is a carryover basket for path, category, product detail, industry, legal, SEO, and future subdirectory improvements that should be implemented in later PRDs such as PRD 2, PRD 3, and PRD 4.

Do not include PRD X scope in PRD 1.2A or PRD 1.2B unless explicitly approved.

---

## X1. Growth path subdirectories

Affected paths may include:

```txt
/grow-my-visibility/
/build-my-brand/
/improve-my-business/
/use-ai/
/convert-more-clients/
```

Carryover improvements:

- Add path-specific symptom routing.
- Add path-specific product ladder: Starter → Diagnostic → Delivery → Enterprise.
- Add `best starting point` recommendations.
- Add path-specific FAQs.
- Add path-level schema and canonical metadata.
- Add path-specific visual cues from the homepage system.
- Add return-to-homepage-section affordances that use the PRD 1.2A homepage anchors.

Future validation:

- Each path has unique title, meta description, canonical, and H1.
- Each path includes at least one starter product and one next-step product.
- Each path includes Stan Store checkout disclosure where products route externally.
- No prohibited free-call language appears.
- Each path supports a clear way back to the relevant homepage context where appropriate.

---

## X2. Product detail pages / service pages

Affected paths may include:

```txt
/services/**
```

Carryover improvements:

- Standardize product detail page structure:
  - product name,
  - price,
  - best for,
  - timeline,
  - deliverables,
  - requirements,
  - not included,
  - what happens after checkout,
  - checkout disclosure,
  - refund/scope reminder.
- Add prerequisites for high-ticket products.
- Add scope boundaries and access requirements.
- Add related diagnostics and next-step products.
- Add structured data where appropriate.
- Add return-to-homepage-section links where the user arrived from a homepage module.

Future validation:

- Every service page has price, best-for, timeline, deliverables, and checkout disclosure.
- Every high-ticket product has prerequisites and scope exclusions.
- AI-related products include approved-data and guardrail language.
- No product page routes directly into free-call language.
- Service pages preserve navigation context where technically feasible.

---

## X3. AI product pages and AI subdirectory

Affected paths may include:

```txt
/use-ai/
/services/*ai*
/services/*chatbot*
/services/*gpt*
```

Carryover improvements:

- Add high-ticket AI system explanation modules on AI-specific pages, not the general homepage.
- Add AI Blueprint prerequisite logic.
- Add CRM/API readiness language.
- Add approved knowledge-source requirements.
- Add hallucination/guardrail positioning.
- Add integration limitation language.
- Add industry-specific compliance positioning where applicable, especially for regulated or local AI systems.
- Add schematic where context is specific:

```txt
Inputs → Approved Knowledge → Guardrails → Routing → CRM / Calendar / Human Escalation
```

Future validation:

- Premium AI pages do not imply unlimited integrations.
- Premium AI pages include data/access readiness requirements.
- AI pages distinguish starter, growth, and enterprise AI clearly.
- Compliance-sensitive AI products include relevant scope boundaries.
- High-ticket AI schematic appears on AI/product pages, not as a broad homepage module.

---

## X4. Industry pages / industry section expansion

This belongs outside homepage PRD 1.2A and PRD 1.2B.

Affected future paths may include:

```txt
/industries/**
```

Carryover improvements:

- Convert homepage industry cards into full landing pages only when content depth justifies it.
- Map each industry to a recommended starting product.
- Include industry-specific proof points and risks.
- Preserve premium visual system.
- Add industry-specific routing from diagnostic results only when relevant.

Future validation:

- Each industry page has a clear recommended starting point.
- Industry pages avoid generic service copy.
- Each page has unique SEO metadata and internal links.
- Industry expansion is not implemented as homepage bloat.

---

## X5. Legal, checkout, refund, and scope-policy pages

Affected paths:

```txt
/privacy/
/terms/
/refund-policy/
/cookie-policy/
```

Carryover improvements:

- Keep policy source Markdown as the legal source of truth.
- Ensure generated legal pages remain synchronized with source policy files.
- Maintain Stan Store and ZYNE responsibility separation.
- Add enterprise alignment / invoice-path references only after business approval.

Future validation:

- Legal pages are generated from source Markdown.
- Legal footer links remain visible on every generated route.
- Checkout disclosure remains consistent.
- Refund/scope language is not contradicted by product pages.

---

## X6. SEO and structured data layer

Carryover improvements:

- Add schema for service pages, product pages, FAQ pages, breadcrumb trails, and collection pages where appropriate.
- Ensure generated route metadata remains unique.
- Add internal links from homepage modules into relevant category/product pages.
- Support diagnostic-result anchors or query states with canonical-safe behavior.

Future validation:

- Every generated route has canonical metadata.
- Every important route has unique title and description.
- Breadcrumb schema validates.
- Homepage CollectionPage schema remains valid.
- Diagnostic states do not create duplicate-indexing problems.

---

## X7. Visual QA automation for subdirectories

Carryover improvements:

- Extend screenshot automation beyond homepage after PRD 1.2 is stable.
- Capture representative category and service pages.
- Add desktop, tablet, mobile, and key interaction states.

Future validation screenshots:

```txt
Homepage-Desktop.png
Homepage-Tablet.png
Homepage-Mobile.png
Homepage-Mobile-Menu.png
Homepage-Mobile-Sticky-CTA.png
Homepage-Mobile-Diagnostic-Result.png
Path-Visibility-Mobile.png
Path-AI-Mobile.png
Service-HighTicket-Mobile.png
Service-Starter-Mobile.png
Legal-Mobile.png
```

---

## X8. Catalog governance

Carryover improvements:

- Introduce product tier metadata:
  - Starter,
  - Diagnostic,
  - Delivery,
  - Enterprise.
- Introduce product complexity metadata:
  - Direct checkout,
  - Diagnostic recommended,
  - Alignment required.
- Introduce checkout mode metadata:
  - Stan Store direct,
  - Paid alignment first,
  - invoice option after alignment.
- Introduce diagnostic routing metadata:
  - buyer symptom,
  - recommended path,
  - recommended starting product,
  - fallback diagnostic,
  - related framework.

Future validation:

- Every product has a tier.
- Every high-ticket product has a complexity level.
- Checkout mode is explicit and does not contradict the no-free-call model.
- Diagnostic routing has at least one recommendation for every approved symptom.

---

# Approval checklist

Before implementation begins, approve or revise the following decisions:

## PRD 1.2A decisions

- [ ] Approve diagnostic search / curated homepage mode as the first PRD 1.2A priority.
- [ ] Approve dropdown/selector plus large `Find My Solution` style button.
- [ ] Approve pre-authored smart content assembly rather than runtime AI-generated copy.
- [ ] Approve diagnostic options and routing rules.
- [ ] Approve return-context handling for homepage navigation stress.
- [ ] Approve full-screen / near-full-screen mobile menu direction.
- [ ] Approve menu CTAs: `Find My Growth Path` and `Shop Services`.
- [ ] Approve single-column mobile footer.
- [ ] Approve spacing reduction across all devices.
- [ ] Approve muted text contrast increase.
- [ ] Approve Mobile-Sticky-CTA screenshot as a permanent QA artifact.
- [ ] Approve Mobile-Diagnostic-Result screenshot as a permanent QA artifact.

## PRD 1.2B decisions

- [ ] Approve `Old Agency Model vs ZYNE Model` homepage comparison only if it does not compete with diagnostic search.
- [ ] Approve diagnostic-first paid routing language.
- [ ] Approve `Signature Frameworks` homepage section.
- [ ] Approve Experience Bank and Origination System as signature frameworks.
- [ ] Approve product ladder: Starter → Diagnostic → Delivery → Enterprise.
- [ ] Approve `What happens after checkout` module.
- [ ] Approve Enterprise Alignment Briefing concept and price range.
- [ ] Approve enterprise invoice/payment pathway language.
- [ ] Confirm high-ticket AI system explanation module is excluded from homepage PRD 1.2B and moved to PRD X.
- [ ] Confirm industry page expansion is excluded from homepage PRD 1.2B and remains in PRD X.

## PRD X decisions

- [ ] Confirm PRD X is carryover only and should not be implemented during PRD 1.2 unless separately approved.
- [ ] Confirm future PRD sequencing for path pages, service pages, AI pages, industry pages, and visual QA automation.

---

# Recommended sequencing

1. Implement PRD 1.2A first, starting with diagnostic search / curated homepage mode.
2. Add return-context handling and section anchors.
3. Reduce spacing across all devices.
4. Complete mobile menu, sticky CTA, footer, readability, and screenshot validation.
5. Validate PRD 1.2A visually and through build validators.
6. Implement PRD 1.2B only after 1.2A reduces homepage cognitive load.
7. Use PRD X to generate future PRDs for path/subdirectory improvements.

# End of PRD 1.2 Draft
