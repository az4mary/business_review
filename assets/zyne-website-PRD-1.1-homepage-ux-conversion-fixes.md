# ZYNE Website PRD 1.1 — Homepage UX and Conversion Optimization Fixes

## 1. Project Overview

### Project Name

ZYNE Homepage UX and Conversion Optimization Pass

### Phase

PRD 1.1

### Source PRD

This PRD is an optimization follow-up to:

```txt
PRD 1 — Homepage Storefront Foundation
```

### Objective

Improve the PRD 1 homepage visitor experience and conversion path without changing the core brand direction, productized-services model, or homepage information architecture.

PRD 1.1 resolves visual and conversion issues identified through review of the PRD 1 desktop and mobile screenshot set, especially mobile scroll burden, CTA hierarchy, product-card decision clarity, growth-path scannability, and trust/checkout clarity.

### Governing Business Rule

ZYNE owns the education, SEO, product comparison, buyer qualification, and conversion logic.

Stan Store remains only the external payment and checkout layer after the buyer has reviewed enough detail on zyne.store.

The homepage must continue to route visitors toward internal category and product pages rather than acting as a free-call funnel.

---

## 2. Visual Audit Summary

### Reviewed Assets

The visual review was based on the PRD 1 screenshot set:

```txt
assets/PRD-1-images/
```

The image set includes:

```txt
Desktop screenshots: Desktop-1.png through Desktop-9.2.png
Mobile screenshots: iphone12pro-1.png through iphone12pro-9.9.7.png
```

### What Works Well

The PRD 1 homepage successfully establishes:

- Premium black/gold visual positioning.
- Clear hero headline.
- Paid productized-service framing.
- Internal routing instead of free-call behavior.
- Five growth-path self-diagnosis cards.
- Starter product section with transparent pricing.
- Intelligence and Delivery sections.
- Premium product imagery for strategic services.
- FAQ and Stan Store checkout disclosure.

### Primary Issues to Resolve

PRD 1.1 must resolve:

1. Mobile scroll burden.
2. Oversized mobile header/logo impact.
3. Weak primary CTA hierarchy.
4. Product-card decision friction.
5. Product-card metadata readability.
6. Growth-path card similarity.
7. Intelligence vs Delivery clarity.
8. Premium product card vertical weight on mobile.
9. Industry card conversion weakness.
10. FAQ trust-objection visibility.

---

## 3. Scope

### In Scope

PRD 1.1 includes homepage-only UX and conversion improvements:

- Mobile sticky CTA bar.
- Mobile header/logo sizing adjustment.
- Hero CTA hierarchy adjustment.
- Starter product decision badges.
- Product-card metadata readability improvements.
- Product-card CTA prominence improvements.
- Growth-path card visual differentiation.
- Intelligence vs Delivery explanatory bridge.
- Mobile premium-service card compaction.
- Industry section CTA improvements.
- FAQ trust-objection emphasis.
- Validation rules for these PRD 1.1 changes.

### Out of Scope

PRD 1.1 does not include:

- Rebuilding the entire homepage.
- Changing the ZYNE brand direction.
- Replacing the black/gold premium visual system.
- Rewriting all homepage copy.
- Product detail page expansion.
- Category page expansion.
- Legal policy expansion.
- SEO/schema expansion beyond homepage-specific metadata already required by prior work.
- Analytics provider installation.

---

## 4. UX and Conversion Requirements

## 4.1 Mobile Sticky CTA Bar

### Problem

Mobile screenshots show a long homepage journey. Visitors must scroll through many screens before reaching later CTA opportunities.

### Requirement

Add a mobile-only sticky bottom CTA bar after the hero section becomes scrollable.

### Required CTA Buttons

```txt
Find My Growth Path
Shop Services
```

### Behavior

- Display only on mobile and small tablet breakpoints.
- Do not display on desktop.
- The bar must not cover important content permanently.
- Add safe-area padding for modern mobile devices.
- Keep button count to two maximum.
- Primary action should be `Find My Growth Path`.
- Secondary action should be `Shop Services`.

### Destinations

```txt
Find My Growth Path → #growth-paths
Shop Services → /services/
```

### Tracking Hooks

```txt
mobile_sticky_find_growth_path_click
mobile_sticky_shop_services_click
```

---

## 4.2 Mobile Header and Logo Sizing

### Problem

The mobile logo/header consumes too much first-screen height and competes with the hero message and CTA.

### Requirement

Reduce mobile logo/header height while preserving premium brand presence.

### Acceptance Rules

- Mobile header remains visually premium.
- Logo remains legible.
- Header does not dominate the first viewport.
- Menu remains accessible.
- Header CTA remains visible or available through the sticky CTA pattern.

### Recommended Target

Reduce mobile logo/header visual height by approximately:

```txt
20%–30%
```

---

## 4.3 Hero CTA Hierarchy

### Problem

The hero CTAs are correct but the hierarchy favors direct shopping. For cold visitors, growth-path diagnosis is often the better first action.

### Requirement

Make the hero CTA hierarchy more diagnostic.

### Recommended Hierarchy

Primary:

```txt
Find My Growth Path
```

Secondary:

```txt
Shop Paid Services
```

### Design Rules

- Primary CTA must be visually dominant.
- Secondary CTA must remain visible but less dominant.
- Checkout disclosure must remain visible below CTAs.
- Do not add a third hero button.

### Tracking Hooks

Existing hooks may remain, but update naming or data attributes if necessary:

```txt
hero_find_growth_path_click
hero_shop_services_click
```

---

## 4.4 Starter Product Decision Badges

### Problem

Starter product cards show price and useful detail but do not sufficiently guide the buyer toward the best first purchase.

### Requirement

Add a decision badge to each homepage starter product card.

### Required Badges

| Product | Badge |
|---|---|
| Google Business Profile Mini Audit | Best local visibility starter |
| Website Quick-Win Audit | Best website clarity starter |
| Social Media Quick Audit | Best presence check |
| Homepage Fix Pack | Best conversion quick fix |
| Starter Brand Kit | Best brand foundation |
| Realtor GPT Starter Kit | Best AI starter |
| Executive Briefing | Best strategy starter |
| Visibility Audit | Best full visibility diagnostic |

### Data Requirement

Decision badges must be rendered from structured product data or a homepage-specific product badge map.

Do not hardcode badge text directly inside the card template unless no maintainable alternative exists.

### Design Rules

- Badge should be compact.
- Badge should not compete with price.
- Badge should appear above or near product name.
- Badge should be readable on mobile.

---

## 4.5 Product-Card CTA Prominence

### Problem

The homepage product cards are visually premium, but `View Product` CTAs are too quiet relative to the card structure.

### Requirement

Increase product-card CTA visibility.

### Required Improvements

- Make `View Product` visually button-like or stronger than plain text.
- Ensure consistent CTA placement across cards.
- Preserve internal routing to product detail pages.
- Maintain keyboard-accessible focus states.

### CTA Destination Rule

Homepage product cards must continue to route internally:

```txt
View Product → /services/[product-slug]/
```

They must not route directly to Stan Store checkout.

---

## 4.6 Product Metadata Readability

### Problem

`Best for` and `Timeline` metadata is useful but too small and easy to miss, especially on mobile.

### Requirement

Increase metadata readability across starter product cards.

### Required Fields

Each starter product card must clearly show:

```txt
Best for
Timeline
Price
```

### Design Rules

- Metadata must be legible on mobile.
- Avoid cramped two-column microtext on narrow screens.
- Labels should be scannable.
- Price must remain highly visible.

---

## 4.7 Growth-Path Visual Differentiation

### Problem

Growth-path cards are strong but visually similar. Visitors must read each card carefully to differentiate paths.

### Requirement

Add stronger visual cues to each growth path while preserving the premium style.

### Required Visual Direction

| Growth Path | Visual Cue |
|---|---|
| Grow My Visibility | Search / map / discovery signal |
| Build My Brand | Identity / diamond / brand mark |
| Improve My Business | Compass / strategy / operations signal |
| Use AI | Spark / automation / intelligence signal |
| Convert More Clients | Arrow / pathway / conversion signal |

### Design Rules

- Keep icons restrained and premium.
- Do not use cartoon-style icons.
- Use existing gold accent system.
- Ensure cards remain visually balanced.

---

## 4.8 Intelligence vs Delivery Bridge Copy

### Problem

`Intelligence` and `Delivery` are on-brand but may not be immediately clear to all visitors.

### Requirement

Add plain-language bridge copy between or inside these sections.

### Required Copy Direction

Use this or a close variant:

```txt
Intelligence tells you what to build. Delivery helps you build the assets, systems, and pathways.
```

### Placement Options

Acceptable locations:

- At the end of the Intelligence section.
- At the beginning of the Delivery section.
- As a small bridge band between both sections.

### Design Rules

- Keep copy concise.
- Do not over-explain.
- Preserve the premium editorial tone.

---

## 4.9 Mobile Premium-Service Card Compaction

### Problem

Premium product image cards are visually strong but consume significant vertical space on mobile.

### Requirement

Compact premium-service cards on mobile after the first premium card.

### Acceptable Patterns

Option A:

- First premium card remains full visual.
- Remaining premium cards use smaller image thumbnails and tighter copy.

Option B:

- All premium cards use a compact mobile card layout with image thumbnail, product name, price, and CTA.

### Required Fields

Each premium service card must still show:

- Product image or thumbnail.
- Product name.
- Price.
- Short description or best-for text.
- Internal `View Product` CTA.

---

## 4.10 Industry Section CTAs

### Problem

The industry section is useful but most cards are descriptive rather than actionable.

### Requirement

Add conversion-oriented CTAs or recommended paths to industry cards.

### Recommended CTA Mapping

| Industry | CTA |
|---|---|
| Professional Services | View Authority Services |
| Real Estate | View Realtor GPT Products |
| Hospitality | View Visibility Products |
| Legal & Advisory | View Positioning Services |
| Healthcare & Wellness | View Trust-Building Services |
| Local Businesses | View Local Visibility Products |
| Consultants & Experts | View Origination Services |
| Multi-Location Brands | View Visibility Audit |

### Destination Rules

- Industry CTAs must route internally.
- Real Estate may route to `/use-ai/realtor-gpt/`.
- Generic industry CTAs may route to relevant category or product pages until PRD 9 industry pages exist.

---

## 4.11 FAQ Trust-Objection Emphasis

### Problem

The FAQ content is correct but the most important trust objections are visually quiet.

### Requirement

Make the first two FAQ items more prominent:

```txt
Are ZYNE services free consultations?
Where does checkout happen?
```

### Design Options

Acceptable implementations:

- Highlighted FAQ cards above the accordion list.
- Larger first two accordion rows.
- Trust-objection callout before the FAQ.

### Required Content

The answers must preserve these points:

- ZYNE services are paid productized offers.
- Checkout is completed securely through Stan Store.
- Product details are reviewed on ZYNE before checkout.

---

## 5. Copy Requirements

### Tone

Maintain the existing voice:

- Premium.
- Direct.
- Strategic.
- Clear.
- Productized.
- Commercial.

### Avoid

Do not add language implying:

- Free calls.
- Free consultations.
- Free audits.
- Custom quote requests.
- Contact-first sales funnel behavior.

### Prohibited CTA Language

Do not use:

```txt
Schedule a Free Call
Book a Free Consultation
Get a Free Strategy Session
Talk to Sales
Contact Us for Pricing
Request a Free Audit
```

---

## 6. Data Requirements

### Preferred Implementation

Store new homepage UX labels in structured data.

### Recommended Data Additions

Add one or more of the following:

```js
homepageBadge: "Best local visibility starter"
homepagePrimaryCta: true
homepageDecisionLabel: "Best first step for local discovery"
growthPathVisualCue: "search"
industryCtaLabel: "View Local Visibility Products"
industryCtaUrl: "/grow-my-visibility/"
```

### Do Not

Do not duplicate product names, prices, timelines, or internal URLs in multiple templates.

---

## 7. Accessibility Requirements

PRD 1.1 must preserve baseline accessibility.

Required:

- Sticky mobile CTA must be keyboard-accessible.
- Sticky CTA must not obscure focused elements.
- CTA labels must be descriptive.
- Product-card CTA focus states must be visible.
- Metadata must remain readable at mobile widths.
- Icons must not be the only means of communicating path meaning.
- Decorative icons should be marked appropriately where applicable.

---

## 8. Performance Requirements

PRD 1.1 must not materially degrade homepage performance.

Required:

- Avoid heavy new images or scripts.
- Use CSS/SVG/icon text where possible.
- Do not add third-party scripts.
- Keep animations restrained.
- Mobile sticky CTA must be CSS-based where possible.

---

## 9. Validation Requirements

PRD 1.1 is valid when the homepage improves decision clarity and mobile conversion readiness without breaking PRD 1 requirements.

### Required Checks

- Mobile sticky CTA exists.
- Sticky CTA includes `Find My Growth Path` and `Shop Services`.
- Hero CTA hierarchy prioritizes `Find My Growth Path`.
- Mobile logo/header sizing is reduced or controlled by responsive CSS.
- Starter product cards include decision badges.
- Starter product cards show readable `Best for`, `Timeline`, and `Price` fields.
- Product-card CTAs are visually prominent and route internally.
- Growth-path cards include stronger visual cues.
- Intelligence/Delivery bridge copy exists.
- Premium service cards are compacted on mobile.
- Industry cards include actionable CTAs.
- First two FAQ objections are visually emphasized.
- No homepage CTA routes directly to Stan Store.
- Stan Store checkout disclosure remains visible.
- No prohibited free-call language appears.
- Homepage remains crawlable static HTML.
- One H1 remains on the homepage.
- Existing PRD 1 sections remain present.

### Suggested Validation Commands

```bash
cd projects/zyne-homepage
npm run build
npm run validate:catalog
npm run validate:routes
```

If a PRD 1.1 validator is added, it should be included in the build pipeline.

---

## 10. Acceptance Criteria

PRD 1.1 is complete when:

- Mobile visitors have a persistent clear next step.
- The first mobile viewport is less dominated by the header/logo.
- The hero guides cold visitors toward growth-path diagnosis.
- Product cards help buyers choose faster.
- Starter products have useful decision labels.
- Product CTAs are stronger and easier to act on.
- Growth paths are visually easier to distinguish.
- Intelligence and Delivery are easier to understand.
- Premium products remain visually strong but less vertically heavy on mobile.
- Industry cards provide clear internal next steps.
- FAQ trust objections are visually prominent.
- PRD 1 homepage requirements remain intact.

---

## 11. Definition of Done

PRD 1.1 is done when the homepage answers these visitor questions faster:

1. What does ZYNE sell?
2. Is this paid or free?
3. Where should I start?
4. Which problem path matches me?
5. Which first product should I consider?
6. How long will it take?
7. What is the next click?
8. Will checkout happen on ZYNE or Stan Store?
9. Can I compare before buying?
10. Am I being routed into a free-call funnel?

The target experience is:

```txt
Arrive → understand ZYNE → choose path → choose product → review details → checkout through Stan Store
```

not:

```txt
Arrive → scroll endlessly → compare too many equal cards → delay decision
```

---

## 12. Immediate Implementation Priority

Implement in this order:

1. Add mobile sticky CTA.
2. Reduce mobile header/logo footprint.
3. Adjust hero CTA hierarchy.
4. Add starter product badges.
5. Strengthen product-card CTAs and metadata readability.
6. Add growth-path visual cues.
7. Add Intelligence/Delivery bridge copy.
8. Compact mobile premium cards.
9. Add industry CTAs.
10. Emphasize first two FAQ objections.
11. Add or update validation for PRD 1.1.
12. Run build validation.
13. Document PRD 1.1 validation result.

---

# End of PRD 1.1
