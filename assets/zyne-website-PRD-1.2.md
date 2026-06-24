# ZYNE Website PRD 1.2 — Homepage Strategic Conversion Plan

## Status

Draft for approval. This document is planning only. Do not implement PRD 1.2A, PRD 1.2B, or PRD X changes until the owner approves this file.

## Source inputs

This PRD consolidates homepage improvement work from:

- `assets/zyne-website-PRD-1.md`
- `assets/zyne-website-PRD-1.1-validation-result.md`
- `assets/zyne-website-PRD-1.1-visual-validation-result.md`
- `assets/zyne-website-PRD-1.1-deep-dive.md`
- `assets/zyne-website-PRD-1.1-critique.md`
- `assets/zyne-website-PRD-1.1-debate.md`
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
- Do not add heavy JavaScript for routing where anchor links or lightweight state are sufficient.
- Do not edit generated root HTML artifacts manually. Source-of-truth changes must remain in `projects/zyne-homepage/`.

---

# PRD 1.2A — Homepage Responsive Polish and Conversion-Surface Stabilization

## Goal

Finish the PRD 1.1 responsive quality pass and stabilize the homepage before adding larger strategic modules.

PRD 1.2A is focused on visible homepage UX, mobile interaction quality, responsive polish, and validation coverage.

## 1.2A Scope

### A1. Redesign mobile menu into a deliberate conversion panel

#### Problem

The current mobile menu opens beneath the header and visually covers the hero headline. It works mechanically, but it feels like a technical dropdown rather than a premium designed interaction state.

#### Required behavior

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

#### Implementation steps

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

#### Acceptance criteria

- `Mobile-Menu.png` shows a deliberate premium navigation panel.
- The panel no longer looks like it accidentally hides the hero headline.
- `Find My Growth Path` and `Shop Services` are visible inside the menu.
- The menu has an obvious close state.
- No horizontal scroll at `390px` viewport width.
- Existing header `Shop Services` CTA may remain, shorten, or be hidden on mobile only if the menu and sticky CTA preserve shopping access.

---

### A2. Preserve and validate compact mobile sticky CTA

#### Problem

The mobile sticky CTA previously regressed into two full-height panels due to inherited `nav` CSS. It has been patched and now needs permanent validation coverage.

#### Required behavior

At mobile scroll depth after the hero threshold, a compact bottom sticky CTA should appear:

```txt
Find My Growth Path | Shop Services
```

#### Implementation steps

1. Keep the dedicated sticky CTA layout guard or migrate its rules safely into scoped main CSS.
2. Ensure global `nav` selectors cannot affect `.mobile-sticky-cta`.
3. Keep `.mobile-sticky-cta` bottom-only positioned with explicit `top: auto` and capped height.
4. Add `Mobile-Sticky-CTA.png` capture to the screenshot workflow if it is not already permanently included.
5. Capture sticky CTA at `390 × 844`, viewport-only, after scrolling past the hero threshold.

#### Acceptance criteria

- `Mobile-Sticky-CTA.png` is generated in every responsive QA capture.
- Sticky CTA height remains compact.
- Both buttons are tappable and fully visible.
- Sticky CTA never overlaps the viewport as full-height panels.

---

### A3. Fix mobile footer layout

#### Problem

The mobile footer currently feels cramped because long disclosure and legal/service responsibility copy is rendered in narrow columns.

#### Required behavior

At mobile widths, footer content should stack in one clean column.

#### Implementation steps

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

#### Acceptance criteria

- Mobile footer is single-column at `390px`.
- Disclosure copy is readable without narrow columns.
- Legal links remain visible.
- Footer still includes Stan Store checkout disclosure and service responsibility language where applicable.

---

### A4. Tighten tablet hero and section pacing

#### Problem

At tablet widths, the hero mark is hidden but the top region retains desktop-like vertical pacing, creating excessive empty space.

#### Implementation steps

1. Add tablet-specific hero rules for `641px–1000px`.
2. Set hero `min-height: auto`.
3. Reduce tablet hero `padding-block`.
4. Slightly reduce general section padding for tablet only.

Suggested CSS direction:

```css
@media (min-width: 641px) and (max-width: 1000px) {
  .hero {
    min-height: auto;
    padding-block: 5.5rem 4.5rem;
  }

  .section {
    padding-block: 5.5rem;
  }
}
```

#### Acceptance criteria

- Tablet top viewport feels intentional, not sparse.
- Hero remains readable.
- No layout overflow.
- Two-column card grids remain stable.

---

### A5. Improve muted text contrast and product metadata readability

#### Problem

Some muted copy and product metadata are technically readable but visually compressed, especially on desktop product cards and mobile metadata rows.

#### Implementation steps

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

#### Acceptance criteria

- Product metadata can be scanned at desktop and mobile sizes.
- Muted footer/disclosure/card copy has improved readability.
- Visual tone remains premium, not high-contrast generic.

---

### A6. Reduce mobile catalog fatigue without removing product clarity

#### Problem

The mobile homepage is functional but long. Product cards are clear, but the full product matrix creates high scroll burden.

#### Implementation steps

1. Tighten mobile product-card padding.
2. Reduce vertical spacing inside metadata rows.
3. Preserve price, `Best for`, timeline, and CTA visibility.
4. Do not collapse all detail in PRD 1.2A; deeper routing belongs to PRD 1.2B.

#### Acceptance criteria

- Mobile product cards remain clear.
- Page feels slightly tighter without hiding buyer-critical information.
- CTAs remain large and tappable.

---

## PRD 1.2A validations

Add or update validations after implementation:

### Static/content validation

Create or update:

```bash
npm run validate:prd1.2a
```

Validator should check:

- No prohibited free-call CTA language.
- `.mobile-sticky-cta` exists.
- `.mobile-sticky-cta` has direct links for `Find My Growth Path` and `Shop Services`.
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
```

Visual pass requirements:

- Mobile sticky CTA is compact.
- Mobile menu is deliberate and CTA-bearing.
- Mobile footer is one-column.
- Tablet hero top region is not excessively sparse.
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

# PRD 1.2B — Homepage Strategic Buying System

## Goal

Convert the homepage from a premium catalog into a guided buying system for fixed-price growth intelligence and execution.

PRD 1.2B adds strategic modules to reduce buyer misdiagnosis, explain the productized model, elevate proprietary IP, and support high-ticket buyer trust without returning to free-call funnels.

## 1.2B Scope

### B1. Add an `Old Agency Model vs ZYNE Model` comparison section

#### Problem

Buyers need to understand why ZYNE does not use vague discovery calls, hidden pricing, or custom proposal funnels.

#### Required section

Add a compact comparison module near the top of the homepage after the hero or before Growth Paths.

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

#### Acceptance criteria

- Section explains productized positioning within 10 seconds.
- It does not attack buyers or sound gimmicky.
- It does not introduce free-call language as a CTA.
- It reinforces fixed price, fixed scope, and clear timeline.

---

### B2. Add symptom-based homepage routing

#### Problem

The five growth paths are useful, but buyers may not know whether their problem is visibility, brand, operations, AI, or conversion.

#### Required module

Add a lightweight buyer-routing module before or inside `Find My Growth Path`.

Suggested copy:

```txt
Find the right starting point.

My biggest bottleneck right now is:
- People cannot find us locally
- We do not look credible enough online
- We are getting traffic but not enough leads
- Our expertise is not turning into sales opportunities
- Our intake or follow-up process needs automation
- I am not sure what is actually broken
```

Each option should route to a relevant homepage section or product cluster using anchor links or lightweight state.

#### Routing rules

- Local discovery problem → Grow My Visibility
- Credibility / visual trust problem → Build My Brand
- Traffic without leads → Convert More Clients
- Expertise not turning into pipeline → Signature Frameworks / Origination System
- Intake or follow-up automation → Use AI
- Unsure what is broken → Intelligence / Executive Briefing / Operational Audit

#### Acceptance criteria

- Module reduces reliance on static category self-selection.
- No heavy script dependency.
- Anchor links are crawlable and accessible.
- The `not sure` path routes to a paid diagnostic, not a free call.

---

### B3. Add diagnostic-first routing language

#### Problem

Buyers can misdiagnose their own business constraint. The homepage needs a safe path for uncertainty.

#### Required copy pattern

```txt
Not sure what to buy?
Start with a paid diagnostic.

ZYNE does not use free discovery calls. If the problem is unclear, begin with an Executive Briefing, Operational Audit, or relevant paid assessment before moving into delivery.
```

#### Implementation steps

1. Add a diagnostic callout inside or after the symptom router.
2. Add links to relevant paid diagnostic products.
3. Keep the language firm: no free calls, no custom quote dependency.
4. Clarify that diagnostics create a better implementation path.

#### Acceptance criteria

- Homepage gives uncertain buyers a path that does not require guessing.
- No free consultation language appears.
- Paid diagnostic products are positioned as valuable standalone products.

---

### B4. Add `Signature Frameworks` homepage section

#### Problem

High-differentiation products such as Experience Bank, Origination System, Web Architecture, and AI Integration should not appear as ordinary catalog items with the same weight as basic audits.

#### Required section

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

#### Design direction

- Use larger, more premium cards than standard product cards.
- Use architectural/blueprint linework from the presentation aesthetic.
- Add labels such as `Signature Framework`, `Strategic IP`, or `Premium System`.
- Do not overfill the section with all products.

#### Acceptance criteria

- Signature frameworks feel higher-order than basic fixed-scope products.
- Section elevates ZYNE proprietary thinking.
- At least Experience Bank and Origination System are clearly visible.
- Links route to relevant products or sections without requiring free-call behavior.

---

### B5. Add high-ticket AI system explanation module

#### Problem

A high-ticket AI product can be mistaken for a generic chatbot unless the homepage explains the operational system behind it.

#### Required module

Add a concise AI system schematic:

```txt
Inputs → Approved Knowledge → Guardrails → Routing → CRM / Calendar / Human Escalation
```

Suggested copy:

```txt
A premium AI system is not a chatbot wrapper. It is a controlled workflow connected to approved business knowledge, intake logic, routing rules, and escalation paths.
```

#### Scope guardrails to communicate

- Requires approved source material.
- Requires data/access readiness.
- CRM/API integration depends on available systems and permissions.
- Legacy-system remediation is not included unless separately scoped.
- High-ticket AI builds should begin with a paid AI blueprint or starter system where integration risk is unknown.

#### Acceptance criteria

- Homepage explains why premium AI costs more than a generic chatbot.
- Buyer sees the difference between starter AI and enterprise AI.
- Language protects ZYNE from implied unlimited integration scope.

---

### B6. Add product ladder / escalation model

#### Problem

The catalog can feel broad. Buyers need to understand the ladder from starter products to diagnostics to implementation.

#### Required section or module

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

#### Acceptance criteria

- Buyer understands there is a progression.
- Low-ticket products are framed as trust-building entry points.
- High-ticket products are framed as implementation, not blind impulse purchases.

---

### B7. Add `What happens after checkout` purchase journey

#### Problem

A no-call productized service model can create post-click anxiety. Buyers need to know what happens after they pay.

#### Required module

Add a three- to five-step journey module near FAQ or final CTA:

```txt
1. Choose a fixed-scope product.
2. Review deliverables, timeline, and checkout disclosure.
3. Complete secure checkout through Stan Store.
4. Receive intake materials or next-step instructions.
5. ZYNE begins the scoped intelligence or delivery process.
```

#### Enterprise variation

For high-ticket products:

```txt
For enterprise systems, ZYNE may route the buyer through a paid alignment or blueprint product before implementation begins.
```

#### Acceptance criteria

- Checkout anxiety is reduced.
- Stan Store disclosure is preserved.
- No custom pricing or free-call language is introduced.

---

### B8. Add enterprise alignment product pathway

#### Problem

Some high-ticket buyers need human validation and scope confidence before a large purchase. Free discovery calls are prohibited, but paid alignment is compatible with the productized model.

#### Required product concept

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

#### Rules

- This is not a free consultation.
- This is not `contact us for pricing`.
- Price must be public.
- Scope must be fixed.
- Credit policy must be explicit if offered.
- It should be used only for high-complexity or high-ticket pathways.

#### Acceptance criteria

- Enterprise buyers have a human trust layer.
- ZYNE preserves no-free-call discipline.
- Direct-buy products remain direct-buy.

---

### B9. Add enterprise payment pathway language without breaking Stan Store model

#### Problem

Stan Store is efficient for direct-buy products, but high-ticket enterprise buyers may need invoice/payment handling that feels appropriate for finance approval.

#### Required language

Standard products:

```txt
Secure checkout is completed through Stan Store.
```

Enterprise alignment or implementation products:

```txt
Some enterprise purchases may begin with a paid alignment product and may use invoice-based payment handling where appropriate after scope is confirmed. Public pricing and product scope remain visible.
```

#### Acceptance criteria

- Stan Store remains the disclosed checkout layer for standard products.
- High-ticket buyer credibility concerns are addressed.
- No hidden pricing or free-call language is introduced.

---

## PRD 1.2B validations

Create or update:

```bash
npm run validate:prd1.2b
```

Validator should check:

- Homepage contains an `Old Agency Model vs ZYNE Model` or equivalent productized-model comparison.
- Homepage contains symptom-based routing with at least six buyer symptoms.
- `not sure` symptom routes to paid diagnostic language.
- Homepage contains `Signature Frameworks` section.
- Experience Bank and Origination System are visible on homepage.
- AI explanation includes approved knowledge, guardrails, routing, and integration/access language.
- Purchase journey includes Stan Store checkout disclosure.
- Enterprise Alignment Briefing or equivalent paid alignment product/path is present if approved.
- No prohibited free-call language appears.
- No `Contact us for pricing` language appears.
- Productized pricing/scope language remains visible.

Visual validation should check:

- New modules do not create excessive mobile scroll without routing utility.
- Symptom chooser is usable at `390px`.
- Signature Frameworks cards are visually distinct from regular product cards.
- Purchase journey is readable on desktop, tablet, and mobile.
- Mobile menu includes PRD 1.2B priority routes.

Build validation should add `validate:prd1.2b` into `npm run build` only after the PRD 1.2B implementation is approved.

---

# PRD X — Future Path/Subdirectory Carryover Improvements

## Purpose

PRD X is not a current implementation PRD. It is a carryover basket for path, category, product detail, industry, legal, SEO, and future subdirectory improvements that should be implemented in later PRDs such as PRD 2, PRD 3, and PRD 4.

Do not include PRD X scope in PRD 1.2A or PRD 1.2B unless explicitly approved.

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

Future validation:

- Each path has unique title, meta description, canonical, and H1.
- Each path includes at least one starter product and one next-step product.
- Each path includes Stan Store checkout disclosure where products route externally.
- No prohibited free-call language appears.

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

Future validation:

- Every service page has price, best-for, timeline, deliverables, and checkout disclosure.
- Every high-ticket product has prerequisites and scope exclusions.
- AI-related products include approved-data and guardrail language.
- No product page routes directly into free-call language.

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

- Add AI Blueprint prerequisite logic.
- Add CRM/API readiness language.
- Add approved knowledge-source requirements.
- Add hallucination/guardrail positioning.
- Add integration limitation language.
- Add industry-specific compliance positioning where applicable, especially for regulated or local AI systems.

Future validation:

- Premium AI pages do not imply unlimited integrations.
- Premium AI pages include data/access readiness requirements.
- AI pages distinguish starter, growth, and enterprise AI clearly.
- Compliance-sensitive AI products include relevant scope boundaries.

---

## X4. Industry pages / industry section expansion

Affected future paths may include:

```txt
/industries/**
```

Carryover improvements:

- Convert homepage industry cards into full landing pages only when content depth justifies it.
- Map each industry to a recommended starting product.
- Include industry-specific proof points and risks.
- Preserve premium visual system.

Future validation:

- Each industry page has a clear recommended starting point.
- Industry pages avoid generic service copy.
- Each page has unique SEO metadata and internal links.

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

Future validation:

- Every generated route has canonical metadata.
- Every important route has unique title and description.
- Breadcrumb schema validates.
- Homepage CollectionPage schema remains valid.

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

Future validation:

- Every product has a tier.
- Every high-ticket product has a complexity level.
- Checkout mode is explicit and does not contradict the no-free-call model.

---

# Approval checklist

Before implementation begins, approve or revise the following decisions:

## PRD 1.2A decisions

- [ ] Approve full-screen / near-full-screen mobile menu direction.
- [ ] Approve menu CTAs: `Find My Growth Path` and `Shop Services`.
- [ ] Approve single-column mobile footer.
- [ ] Approve tablet hero pacing reduction.
- [ ] Approve muted text contrast increase.
- [ ] Approve Mobile-Sticky-CTA screenshot as a permanent QA artifact.

## PRD 1.2B decisions

- [ ] Approve `Old Agency Model vs ZYNE Model` homepage comparison.
- [ ] Approve symptom-based chooser module.
- [ ] Approve `not sure` routing into paid diagnostics.
- [ ] Approve `Signature Frameworks` homepage section.
- [ ] Approve Experience Bank and Origination System as signature frameworks.
- [ ] Approve AI system schematic and scope-guardrail language.
- [ ] Approve product ladder: Starter → Diagnostic → Delivery → Enterprise.
- [ ] Approve `What happens after checkout` module.
- [ ] Approve Enterprise Alignment Briefing concept and price range.
- [ ] Approve enterprise invoice/payment pathway language.

## PRD X decisions

- [ ] Confirm PRD X is carryover only and should not be implemented during PRD 1.2 unless separately approved.
- [ ] Confirm future PRD sequencing for path pages, service pages, AI pages, industry pages, and visual QA automation.

---

# Recommended sequencing

1. Implement PRD 1.2A first.
2. Validate PRD 1.2A visually and through build validators.
3. Implement PRD 1.2B after 1.2A is stable.
4. Use PRD X to generate future PRDs for path/subdirectory improvements.

# End of PRD 1.2 Draft
