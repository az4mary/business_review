# ZYNE Website PRD 4 — Product Detail Pages

## 1. Project Overview

### Project Name

ZYNE Product Detail Page Build

### Phase

PRD 4

### Objective

Create high-converting, crawlable product detail pages for every ZYNE paid offer.

PRD 4 turns each internal product route into the final buyer-education layer before external checkout. A buyer must be able to understand the product, evaluate fit, review scope, understand responsibilities and exclusions, compare related products, and then proceed to the exact Stan Store checkout button when checkout is live.

### Governing Business Rule

ZYNE owns the education, SEO, product comparison, buyer qualification, offer explanation, and conversion logic.

Stan Store is only the payment and checkout layer after the buyer has reviewed enough product detail on zyne.store.

Product detail pages are therefore the primary place where direct external checkout CTAs belong.

---

## 2. Scope

PRD 4 covers all generated product detail routes for ZYNE paid offers.

### Route Pattern

```txt
/services/[product-slug]/
```

### In Scope

- Product H1.
- Price.
- Short positioning statement.
- Who it is for.
- What is included.
- Product deliverables.
- Timeline.
- Revisions.
- Buyer responsibilities.
- Scope exclusions.
- Refund/scope note.
- Related products.
- FAQ.
- Exact Stan Store checkout button when checkout is live.
- Checkout disclosure.
- Product schema / offer schema.
- Analytics event hooks for checkout clicks.
- Internal category breadcrumb/linking.
- Static/crawlable output.
- Route validation aligned to product-page acceptance criteria.

### Out of Scope

PRD 4 does not require:

- New product creation.
- Industry landing pages.
- Insights/article content.
- Full legal policy expansion beyond product-page policy notes.
- Final analytics provider script installation.
- Full visual QA beyond product-page usability and accessibility.

---

## 3. Dependencies

PRD 4 depends on PRD 2 and PRD 3 being complete and validated.

Product pages must use the PRD 2 catalog as their product source of truth:

```txt
projects/zyne-homepage/src/data/products.js
```

Product pages may use supplemental product-detail content, but supplemental content must be keyed by product ID and must not replace catalog source-of-truth fields for price, slug, timeline, image, category, checkout URL, or checkout status.

---

## 4. Required Product Page Information Architecture

Each product detail page must include the following sections.

### Section 1 — Header / Navigation

Use the shared site header.

Required behavior:

- Logo links to `/`.
- Services link routes to `/services/`.
- Growth path links route internally.
- No free-call CTA language.

### Section 2 — Product Hero

Each product page must include:

- One H1.
- Product type/eyebrow.
- Product image or product visual.
- Price.
- Short positioning statement.
- Who it is for.
- Timeline.
- Revisions.
- Category reference.
- Checkout panel.

### Section 3 — Checkout / Purchase Panel

The product page is where the primary external checkout CTA belongs.

Allowed checkout CTAs:

```txt
Checkout on Stan Store
Purchase This Service
Buy Now
```

The checkout CTA may render only when:

```js
product.checkoutStatus === "live" && product.stanCheckoutUrl
```

The checkout CTA must use the exact product-specific Stan Store checkout URL from the catalog.

Required disclosure:

```txt
Secure checkout is completed through Stan Store.
```

If checkout is not live, the page must not render a broken external checkout link. It should route internally to `/services/` or show a clear unavailable state.

### Section 4 — Product Positioning

Each page must explain:

- What the product does.
- The buyer problem it addresses.
- The expected decision or outcome it helps clarify.
- When it should be chosen over adjacent offers.

### Section 5 — What Is Included

Each page must include product-specific included items.

At minimum, every product page should show three or more included items.

### Section 6 — Deliverables

Each page must include tangible deliverables.

Examples:

- Audit summary.
- Fix roadmap.
- Strategic recommendations.
- Brand assets.
- Website architecture notes.
- AI system plan.
- Referral assets.
- Competitive response brief.

### Section 7 — Timeline and Revisions

Each page must show:

- Delivery timeline from the catalog.
- Revision terms from the catalog or a defined fallback.

### Section 8 — Buyer Responsibilities

Each page must explain what the buyer must provide after checkout.

Common examples:

- Intake form.
- Business context.
- Existing assets.
- Access where required.
- Examples, screenshots, profiles, or service details.
- Timely review during revision windows.

### Section 9 — Scope Exclusions

Each page must explain what is not included.

Common examples:

- Ongoing consulting outside purchased scope.
- Ad spend.
- Third-party platform fees.
- Guaranteed revenue, rankings, traffic, or leads.
- Work not listed in the purchased product scope.

### Section 10 — Related Products

Each page must link to related internal product detail pages.

Related products should come from:

1. Explicit `relatedProductIds` when available.
2. Products in the same category.
3. Relevant category or collection relationships.

### Section 11 — FAQ

Each product page must include FAQ content.

Required FAQ topics:

- Where does checkout happen?
- What happens after purchase?
- Are results guaranteed?
- What is included?
- What does the buyer need to provide?
- How do revisions work?

### Section 12 — Policy / Refund Scope Note

Each product page must include a refund/scope note that directs buyers to the refund policy and reinforces that the product has a defined scope.

Required internal link:

```txt
/refund-policy/
```

### Section 13 — Final CTA

Final CTA should reinforce:

- Review scope on ZYNE.
- Checkout securely through Stan Store.
- Compare related products if unsure.

---

## 5. CTA Rules

### Allowed Product CTAs

Use:

```txt
Checkout on Stan Store
Purchase This Service
Buy Now
View Related Product
Compare Before Checkout
Review Refund and Scope Policy
```

### Disallowed Product CTAs

Do not use:

```txt
Schedule a Free Call
Book a Free Consultation
Get a Free Strategy Session
Talk to Sales
Contact Us for Pricing
Request a Free Audit
```

### Product Checkout Rule

Direct external checkout belongs on product pages, not category pages.

The checkout button must only use the centralized catalog URL.

Do not hardcode checkout URLs in the template.

---

## 6. Product Data Requirements

Product pages must render from catalog data plus product-detail supplemental data where needed.

### Required Catalog Fields

Each product page must use:

- `id`
- `slug`
- `name`
- `shortName`
- `category`
- `productType`
- `price`
- `priceValue`
- `currency`
- `description`
- `shortDescription`
- `bestFor`
- `timeline`
- `revisions`
- `image`
- `imageAlt`
- `internalUrl`
- `stanCheckoutUrl`
- `checkoutStatus`
- `relatedProductIds`
- `seoTitle`
- `seoDescription`
- `schemaType`

### Supplemental Product Detail Fields

Supplemental product-detail content may include:

```js
{
  productId: "executive-briefing",
  positioning: "...",
  buyerProblem: "...",
  outcomes: ["..."],
  included: ["..."],
  deliverables: ["..."],
  buyerResponsibilities: ["..."],
  exclusions: ["..."],
  faqs: [["Question", "Answer"]]
}
```

Supplemental data must be keyed by product ID.

---

## 7. SEO Requirements

### Crawlability

Every product page must be statically generated and crawlable after build.

### Heading Hierarchy

Each product page must use:

- One H1.
- H2s for major sections.
- H3s for related product cards and FAQ questions where appropriate.

### Metadata

Each product page must use product-level metadata:

- SEO title.
- Meta description.
- Canonical URL readiness.
- Open Graph readiness.

### Schema

Each product page must support product/service offer schema:

- Service or product schema type.
- Offer schema.
- Price.
- Currency.
- Availability based on checkout status.
- Product URL.
- Checkout URL where live.

Full schema expansion may continue in PRD 6, but PRD 4 must not block product/offer schema readiness.

---

## 8. Analytics Requirements

Product checkout CTAs must include analytics event hooks.

### Required Events

```txt
product_page_view
product_buy_now_click
stan_store_redirect_click
related_product_click
product_faq_expand
refund_policy_click
```

### Checkout Event Properties

Checkout events should include:

```js
{
  product_id: "executive-briefing",
  product_name: "Executive Briefing",
  category: "improve-my-business",
  price: "$750",
  price_value: 750,
  currency: "USD",
  destination_type: "stan_checkout",
  destination_url: "https://stan.store/..."
}
```

Actual provider scripts should not be installed unless tracking IDs are supplied.

---

## 9. Accessibility Requirements

Product pages must preserve baseline WCAG 2.1 AA expectations.

Required:

- One H1 per product page.
- Semantic headings.
- Keyboard-accessible CTAs.
- Visible focus states.
- Descriptive checkout link text.
- Descriptive related product link text.
- Alt text for product images.
- Sufficient color contrast.
- Mobile-friendly checkout panel.

---

## 10. Validation Requirements

PRD 4 is valid when every product detail route exists and contains the required product-buying information.

### Required Checks

For every product in the catalog:

- Product route exists.
- Product page has exactly one H1.
- Product name appears.
- Product price appears.
- Product positioning copy appears.
- Who it is for appears.
- Timeline appears.
- Revisions appear.
- What is included appears.
- Deliverables appear.
- Buyer responsibilities appear.
- Scope exclusions appear.
- Refund/scope note appears.
- Related products appear.
- FAQ appears.
- Checkout disclosure appears.
- Checkout button appears when checkout is live.
- Checkout button URL comes from catalog.
- No external checkout link appears when checkout is not live.
- Product schema / offer schema appears.
- Prohibited free-call language does not appear.

### Validation Commands

```bash
cd projects/zyne-homepage
npm run build
npm run validate:catalog:strict
```

GitHub Actions must pass before PRD 4 is closed.

---

## 11. Acceptance Criteria

PRD 4 is complete when:

- Every catalog product has an internal product detail page.
- Product pages are not thin placeholders.
- Each product page contains enough detail for an informed purchase decision.
- Each product page clearly shows price, fit, timeline, revisions, scope, deliverables, responsibilities, exclusions, and FAQ.
- Product pages route to exact Stan Store checkout URLs only when live.
- Checkout disclosure appears before or near external checkout.
- Related product links are internal.
- Product schema and offer metadata are present.
- Analytics hooks exist for checkout clicks.
- No free-call language appears.
- Static route validation passes.
- Strict catalog validation passes.
- GitHub Actions validation passes.

---

## 12. Definition of Done

PRD 4 is done when a buyer can answer these questions from the product detail page without contacting ZYNE or relying on Stan Store for education:

1. What is this product?
2. Who is it for?
3. What problem does it solve?
4. What is included?
5. What will be delivered?
6. How long will it take?
7. Are revisions included?
8. What does the buyer need to provide?
9. What is excluded?
10. What related product should the buyer consider?
11. Where does checkout happen?
12. What happens after purchase?

The correct buyer journey should be:

```txt
Category page → product detail page → informed purchase decision → Stan Store checkout
```

not:

```txt
Product page → vague CTA → free sales call
```

---

## 13. Immediate Implementation Priority

Begin PRD 4 with these implementation tasks:

1. Audit current generated product pages.
2. Add or expand product-detail supplemental content keyed by product ID.
3. Render richer positioning, buyer problem, included items, deliverables, buyer responsibilities, exclusions, FAQs, and final CTA.
4. Ensure checkout links use catalog Stan URLs only.
5. Add checkout and related-product analytics data attributes.
6. Strengthen route validation for product-page acceptance criteria.
7. Run GitHub Actions validation.
8. Document PRD 4 validation result before moving to PRD 5.

---

# End of PRD 4
