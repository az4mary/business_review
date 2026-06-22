# ZYNE Website PRD 3 — Category / Growth Path Pages

## 1. Project Overview

### Project Name

ZYNE Category and Growth Path Page Build

### Phase

PRD 3

### Objective

Turn the placeholder growth-path and collection routes into real SEO, education, comparison, and conversion pages.

PRD 3 expands the routing foundation created in PRD 1 and PRD 2 into category pages that help visitors understand their business constraint, compare relevant ZYNE offers, and move to an internal product detail page before checkout.

### Governing Business Rule

ZYNE owns the education, SEO, product comparison, buyer qualification, and conversion logic.

Stan Store is only the external checkout and payment layer after a buyer has reviewed enough service detail on zyne.store.

Category and growth-path pages must therefore route buyers primarily to internal ZYNE product detail pages, not directly to Stan Store checkout.

---

## 2. Scope

PRD 3 covers the creation and validation of category, growth-path, intelligence, and delivery collection pages.

### Pages Covered

```txt
/grow-my-visibility/
/build-my-brand/
/improve-my-business/
/use-ai/
/convert-more-clients/
/intelligence/
/delivery/
```

### In Scope

- Crawlable category page output.
- Category H1 and SEO metadata.
- Category positioning copy.
- Buyer problem statement.
- Recommended starting point.
- Product comparison grid.
- Product ladder.
- Internal product links.
- Category FAQ.
- Related category links.
- Stan Store checkout disclosure.
- Collection pages for Intelligence and Delivery.
- Category route validation.
- Product card rendering from the PRD 2 catalog.
- Structured-data readiness where appropriate.

### Out of Scope

PRD 3 does not require final long-form sales copy for each individual product. That is handled in PRD 4.

PRD 3 also does not require:

- Industry landing pages.
- Insights/article content.
- Final legal policy depth.
- Analytics provider script installation.
- Full visual QA beyond category-page usability and consistency.
- New paid-product creation outside the existing catalog.

---

## 3. Dependencies

PRD 3 depends on PRD 2 being complete and validated.

The category pages must use:

```txt
projects/zyne-homepage/src/data/products.js
```

as the source of truth for:

- Product names.
- Product IDs.
- Product slugs.
- Product prices.
- Product timelines.
- Product best-for labels.
- Product images.
- Product categories.
- Product visibility flags.
- Product internal URLs.
- Checkout status.
- SEO metadata.

Do not recreate product data inside page templates.

---

## 4. Primary Goals

PRD 3 must make category pages:

1. SEO-ready.
2. Crawlable.
3. Conversion-oriented.
4. Comparison-driven.
5. Internally routed.
6. Product-catalog driven.
7. Clear enough that visitors can self-select an offer path.
8. Consistent with ZYNE's premium productized-services positioning.

The practical outcome should be simple:

A visitor lands on a category page, understands the problem area, compares relevant offers, selects a product, and moves to the internal product detail page.

---

## 5. Required Page Types

### Type 1 — Growth Path Pages

These pages represent the five buyer-intent paths from the homepage.

```txt
grow-my-visibility
build-my-brand
improve-my-business
use-ai
convert-more-clients
```

Each page should explain the buyer problem, show relevant products, identify a recommended starting point, and route to internal product pages.

### Type 2 — Intelligence Collection Page

```txt
/intelligence/
```

This page should group strategic diagnostic products, audits, briefings, roadmaps, and intelligence-led services.

### Type 3 — Delivery Collection Page

```txt
/delivery/
```

This page should group done-for-you kits, systems, implementation offers, and client-facing infrastructure products.

---

## 6. Required Category Page Information Architecture

Each growth-path category page must include the following sections in this order unless implementation constraints require minor adjustment.

### Section 1 — Header / Navigation

Use the shared site header.

Required behavior:

- Logo links to `/`.
- Services link routes to `/services/`.
- Growth path links route to category pages.
- Header CTA routes internally to `/services/` or a product catalog page.
- No free-call CTA language.

### Section 2 — Category Hero

Each category page must include:

- One H1.
- Category positioning copy.
- Buyer problem statement.
- Primary CTA to the product comparison section.
- Secondary CTA to the recommended starting product.
- Stan Store disclosure text.

Required CTA behavior:

```txt
Compare Products → same-page product comparison section
View Recommended Starting Point → internal product detail page
```

Do not send hero CTAs directly to Stan Store.

### Section 3 — Buyer Problem / Diagnostic Context

Explain the constraint the visitor is likely experiencing.

This section should answer:

- What problem does this category solve?
- Who is this page for?
- What happens if the problem remains unresolved?
- Which ZYNE services are relevant?

### Section 4 — Recommended Starting Point

Each category must surface one recommended starter product from category data.

The card must include:

- Product name.
- Price.
- One-line description.
- Best-for label.
- Timeline.
- CTA: `View Product`.

CTA destination:

```txt
/services/[product-slug]/
```

### Section 5 — Product Comparison Grid

Each category page must render a product comparison grid using product IDs from the category object.

Required fields:

- Product name.
- Product type.
- Price.
- Timeline.
- Best-for label.
- Short description.
- Internal product link.

CTA language:

```txt
View Product
View Service Details
Compare This Service
```

Do not use:

```txt
Schedule a Free Call
Book a Free Consultation
Talk to Sales
Request a Free Audit
```

### Section 6 — Product Ladder

Show a progression from lower-friction or diagnostic offers to higher-value strategic or implementation offers.

Example ladder labels:

```txt
Start
Diagnose
Plan
Build
Scale
```

Product ladder data must derive from category product IDs and product metadata.

### Section 7 — How to Choose

Add category-specific decision guidance.

This section should explain:

- Start here if the buyer needs a quick diagnostic.
- Choose this product if the buyer needs a deeper audit or roadmap.
- Choose a premium service if the buyer needs implementation, system design, or strategic buildout.

### Section 8 — Related Growth Paths

Each category page must link to related category pages.

Example:

- Grow My Visibility may link to Build My Brand and Convert More Clients.
- Use AI may link to Improve My Business and Convert More Clients.
- Build My Brand may link to Grow My Visibility and Convert More Clients.

Links must be internal and crawlable.

### Section 9 — Category FAQ

Each category page must include FAQ content that addresses common buyer objections and product-selection questions.

Required FAQ topics:

- Which product should I start with?
- Are these free consultations?
- Where does checkout happen?
- Can I compare services before buying?
- What happens after purchase?

### Section 10 — Final Category CTA

The final CTA must route to:

- Product comparison section.
- Recommended product page.
- Full services index.

External checkout should not be the primary category-page CTA.

### Section 11 — Footer

Use the shared footer.

Footer must include:

- Growth path links.
- Services links.
- Legal links.
- Stan Store checkout disclosure.

---

## 7. Growth Path Page Requirements

## 7.1 Grow My Visibility

### Route

```txt
/grow-my-visibility/
```

### Purpose

Help businesses diagnose and improve local discovery, public trust, Google Business Profile visibility, social credibility, and website visibility.

### Required Products

```txt
google-bp-mini-audit
website-quick-win-audit
social-media-quick-audit
visibility-audit
```

### Recommended Starting Point

```txt
google-bp-mini-audit
```

### Required Positioning

This page should make clear that visibility work starts with discoverability, trust signals, profile completeness, website clarity, and public credibility.

### Required FAQ Focus

- Google Business Profile readiness.
- Website trust and clarity.
- Social credibility.
- When to choose a mini audit versus the full Visibility Audit.

---

## 7.2 Build My Brand

### Route

```txt
/build-my-brand/
```

### Purpose

Help businesses choose services for visual identity, brand credibility, positioning, market authority, and sector-specific differentiation.

### Required Products

```txt
starter-brand-kit
growth-brand-kit
premium-brand-kit
market-positioning
sector-authority
```

### Recommended Starting Point

```txt
starter-brand-kit
```

### Required Positioning

This page should make clear that brand work includes identity, message clarity, authority, market position, and professional presentation.

### Required FAQ Focus

- Which brand kit level to choose.
- Difference between brand identity and market positioning.
- When to choose Sector Authority.
- How brand work supports conversion.

---

## 7.3 Improve My Business

### Route

```txt
/improve-my-business/
```

### Purpose

Help founders, operators, and leadership teams choose strategic intelligence products that clarify priorities, constraints, operations, and competitive readiness.

### Required Products

```txt
executive-briefing
growth-roadmap
operational-audit
competitor-readiness
```

### Recommended Starting Point

```txt
executive-briefing
```

### Required Positioning

This page should position ZYNE Intelligence as the layer that precedes execution. It should emphasize strategic clarity, constraint diagnosis, and better sequencing.

### Required FAQ Focus

- Executive Briefing versus Growth Roadmap.
- Operational Audit versus Competitor Readiness.
- When a business should diagnose before building.
- What inputs the buyer may need to provide.

---

## 7.4 Use AI

### Route

```txt
/use-ai/
```

### Purpose

Help businesses compare AI planning, Realtor GPT products, chatbot systems, and workflow automation services.

### Required Products

```txt
realtor-gpt-starter-kit
realtor-gpt-growth-kit
ai-integration
starter-ai-chatbot-kit
```

### Recommended Starting Point

```txt
realtor-gpt-starter-kit
```

### Required Positioning

This page should explain AI as a practical business system, not a novelty tool. It should distinguish between AI planning, real estate assistant kits, and chatbot infrastructure.

### Required FAQ Focus

- Realtor GPT versus AI Integration.
- When to choose a chatbot kit.
- What buyer materials are needed.
- How AI systems support client conversion and operational efficiency.

### Realtor GPT Routing Requirement

The Use AI page must link to:

```txt
/use-ai/realtor-gpt/
```

when that subpage exists.

---

## 7.5 Convert More Clients

### Route

```txt
/convert-more-clients/
```

### Purpose

Help businesses choose services that improve proof, referrals, website architecture, and lead-to-client pathways.

### Required Products

```txt
homepage-fix-pack
experience-bank
referral-kit
origination-system
web-architecture
```

### Recommended Starting Point

```txt
homepage-fix-pack
```

### Required Positioning

This page should make clear that conversion is not only lead capture. It includes proof, trust, referral infrastructure, website logic, and origination systems.

### Required FAQ Focus

- Homepage Fix Pack versus Web Architecture.
- Referral Kit versus Origination System.
- How proof assets support conversion.
- When to fix a page versus rebuild the website architecture.

---

## 8. Intelligence Page Requirements

### Route

```txt
/intelligence/
```

### Purpose

Create a dedicated collection page for strategic diagnostic and intelligence services.

### Required Products

Products with `intelligenceOffer: true` must be eligible for this page.

Expected product set includes:

```txt
executive-briefing
visibility-audit
growth-roadmap
market-positioning
ai-integration
sector-authority
operational-audit
competitor-readiness
```

### Required Sections

- H1: `ZYNE Intelligence`
- Eyebrow: `Before execution comes intelligence.`
- Strategic positioning copy.
- Product comparison grid.
- Recommended sequence.
- Internal product links.
- FAQ.
- Stan Store disclosure.

### CTA Rule

All Intelligence page product CTAs should route to internal product detail pages first.

---

## 9. Delivery Page Requirements

### Route

```txt
/delivery/
```

### Purpose

Create a dedicated collection page for done-for-you kits, systems, and implementation-oriented service families.

### Required Product Families

Expected families include:

```txt
Brand Identity Kits
Website Kits
Social Media Kits
Google Business Profile Services
Realtor GPT Kits
AI Chatbot Kits
Referral and Conversion Systems
```

### Required Sections

- H1: `ZYNE Delivery`
- Eyebrow: `From strategy to execution.`
- Delivery positioning copy.
- Family cards.
- Product links where available.
- Suggested starting point.
- Related Intelligence link.
- FAQ.
- Stan Store disclosure.

### CTA Rule

Delivery page CTAs should route to internal category pages or internal product pages first.

---

## 10. Data Requirements

Category pages must be driven by category and product data.

### Required Category Data Fields

Each category object must support:

```js
{
  id: "grow-my-visibility",
  slug: "grow-my-visibility",
  title: "Grow My Visibility",
  shortTitle: "Visibility",
  description: "For businesses that need stronger local discovery, better profiles, clearer social presence, or more credible website visibility.",
  problemStatement: "Your business is not being discovered, trusted, or chosen quickly enough online.",
  icon: "visibility",
  number: "01",
  url: "/grow-my-visibility/",
  ctaLabel: "View Visibility Products",
  productIds: ["google-bp-mini-audit", "website-quick-win-audit", "social-media-quick-audit", "visibility-audit"],
  recommendedStarterProductId: "google-bp-mini-audit",
  seoTitle: "Grow My Visibility | ZYNE",
  seoDescription: "Explore fixed-price ZYNE services for local visibility and public trust signals."
}
```

### Required Product Data Use

Category templates must retrieve product fields from product IDs.

Required product fields for category rendering:

- `id`
- `slug`
- `name`
- `shortName`
- `category`
- `productType`
- `price`
- `description`
- `shortDescription`
- `bestFor`
- `timeline`
- `image`
- `imageAlt`
- `internalUrl`
- `homepageVisible`
- `categoryVisible`
- `starterOffer`
- `premiumOffer`
- `intelligenceOffer`
- `deliveryOffer`

---

## 11. SEO Requirements

### Crawlability

All category and collection page content must be present in crawlable HTML after build/prerender.

Important text must not be image-only or client-only after route generation.

### Heading Hierarchy

Each category page must use:

- One H1.
- H2s for major sections.
- H3s for product cards, FAQ questions, and sub-sections.

### SEO Metadata

Each category page must use category-level metadata.

Required fields:

- SEO title.
- Meta description.
- Canonical URL readiness.
- Open Graph title/description readiness.

### Internal Linking

Each category page must link to:

- Its product detail pages.
- Related category pages.
- `/services/`.
- `/intelligence/` where strategically relevant.
- `/delivery/` where strategically relevant.

### Structured Data Readiness

PRD 3 should support future schema implementation for:

- `CollectionPage`
- `ItemList`
- `FAQPage`
- `BreadcrumbList`
- `Service`

Full schema expansion may be completed in PRD 6, but PRD 3 page data should not block it.

---

## 12. CTA and Checkout Rules

### Allowed Category CTAs

Use:

```txt
Compare Products
View Product
View Service Details
View Recommended Starting Point
Explore Related Services
View All Paid Services
```

### Disallowed Category CTAs

Do not use:

```txt
Schedule a Free Call
Book a Free Consultation
Get a Free Strategy Session
Talk to Sales
Contact Us for Pricing
Request a Free Audit
```

### Checkout Disclosure

Every category page must include:

```txt
Secure checkout is completed through Stan Store.
```

or an equivalent direct statement.

### External Checkout Rule

Category pages should not use external checkout as the primary action.

If a checkout CTA is ever introduced on a category page, it must only render when:

```js
product.checkoutStatus === "live" && product.stanCheckoutUrl && product.directCheckoutEnabled === true
```

and the page must provide sufficient product detail for an informed purchase.

---

## 13. UX Requirements

Category pages must feel:

- Premium.
- Clear.
- Structured.
- Commercial.
- Comparison-oriented.
- Easy to scan.

### Desktop

- Hero and recommended product may use two-column layout.
- Product comparison grid may use multi-column cards.
- Product ladder may render horizontally.

### Tablet

- Product cards should reduce to two columns where appropriate.
- Category copy must remain readable.

### Mobile

- Single-column sections.
- Full-width CTAs.
- Product cards should show only the highest-value fields first.
- Product ladder should become a vertical sequence.

---

## 14. Accessibility Requirements

PRD 3 pages must preserve baseline WCAG 2.1 AA expectations.

Required:

- One H1 per page.
- Semantic headings.
- Keyboard-accessible links and CTAs.
- Visible focus states.
- Sufficient color contrast.
- Descriptive link text.
- Alt text for meaningful product images.
- Decorative elements marked appropriately.
- Large enough mobile tap targets.

---

## 15. Analytics Requirements

PRD 3 should prepare category-page events without requiring final analytics provider IDs.

### Required Event Hooks

```txt
category_page_view
category_compare_products_click
category_recommended_product_click
category_product_card_click
category_related_path_click
category_faq_expand
collection_product_card_click
```

### Required Event Properties

Product-click events should include:

```js
{
  product_id: "executive-briefing",
  product_name: "Executive Briefing",
  category: "improve-my-business",
  price: "$750",
  price_value: 750,
  currency: "USD",
  destination_type: "internal_product_page",
  destination_url: "/services/executive-briefing/"
}
```

Category events should include:

```js
{
  category_id: "improve-my-business",
  category_name: "Improve My Business",
  page_type: "growth_path",
  destination_url: "/services/executive-briefing/"
}
```

Actual provider scripts should not be installed unless tracking IDs are supplied.

---

## 16. Route Generation Requirements

Category and collection pages should be generated or rendered from shared route logic.

Required:

- Generate the seven covered routes.
- Pull category content from category objects.
- Pull product cards from product lookups.
- Avoid duplicate product arrays in route files.
- Ensure static output exists for every route.
- Validate generated routes after build.

The build pipeline must continue to run:

```bash
npm run validate:catalog
npm run build
npm run validate:routes
npm run validate:catalog:strict
```

or equivalent commands through GitHub Actions.

---

## 17. Validation Requirements

PRD 3 is valid when every covered route exists and includes the required category/collection content.

### Required Checks

- `/grow-my-visibility/` exists.
- `/build-my-brand/` exists.
- `/improve-my-business/` exists.
- `/use-ai/` exists.
- `/convert-more-clients/` exists.
- `/intelligence/` exists.
- `/delivery/` exists.
- Each growth path has one H1.
- Each growth path includes buyer problem copy.
- Each growth path includes recommended starting point.
- Each growth path includes a product comparison grid.
- Each product in the category appears on the category page.
- Product CTAs route to internal product pages.
- Stan Store disclosure appears on each page.
- Related categories appear on each growth path page.
- FAQ content appears on each growth path page.
- No free-call language appears.
- Generated routes pass validation.
- Category content is crawlable in static HTML.

### Validation Command

```bash
cd projects/zyne-homepage
npm run build
```

Because `build` runs route validation, it should fail if required generated routes are missing required content.

Strict catalog validation should also remain passing:

```bash
npm run validate:catalog:strict
```

---

## 18. Acceptance Criteria

PRD 3 is complete when:

- All seven category/collection pages exist.
- Growth-path pages are no longer placeholders.
- Each category page has category-specific SEO and positioning copy.
- Each category page explains the buyer problem.
- Each category page shows a recommended starting product.
- Each category page includes a product comparison grid.
- Each category page includes internal product links.
- Each category page includes category FAQ content.
- Each category page includes related category links.
- `/intelligence/` presents strategic diagnostic products.
- `/delivery/` presents implementation/service families.
- Category pages do not depend on Stan Store for buyer education.
- Product CTAs route internally before checkout.
- Stan Store disclosure appears where relevant.
- No prohibited free-call language appears.
- Category/product data comes from the PRD 2 catalog.
- Static route validation passes.
- GitHub Actions validation passes.

---

## 19. Definition of Done

PRD 3 is done when a developer, operator, or buyer can answer these questions from the live/static pages without inspecting source code:

1. What business problem does this category solve?
2. Which ZYNE products belong to this category?
3. Which product should a buyer start with?
4. What is the price and timeline for each relevant product?
5. How do the products compare?
6. Which related category should the buyer consider next?
7. Where does the buyer go to review product details?
8. Where does checkout happen?
9. Are ZYNE category pages free-consultation funnels?
10. Can search engines crawl and understand the category page content?

The correct answer pattern should be:

```txt
Category page → product comparison → internal product detail page → Stan Store checkout
```

not:

```txt
Category page → free call → sales conversation
```

---

## 20. Immediate Implementation Priority

Begin PRD 3 with these implementation tasks:

1. Audit current generated category and collection routes.
2. Confirm all seven target routes exist after build.
3. Expand category page templates beyond placeholder content.
4. Render recommended starting product cards from category data.
5. Render product comparison grids from product IDs.
6. Add category-specific FAQ content.
7. Add related category linking logic.
8. Confirm all product CTAs route internally.
9. Ensure Stan Store disclosure appears on every category/collection page.
10. Update generated route validation for PRD 3 acceptance criteria.
11. Run GitHub Actions validation.
12. Document PRD 3 validation result before moving to PRD 4.

---

# End of PRD 3
