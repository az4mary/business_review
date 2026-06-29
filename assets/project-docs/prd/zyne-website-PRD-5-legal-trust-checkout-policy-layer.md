# ZYNE Website PRD 5 — Legal, Trust, and Checkout Policy Layer

## 1. Project Overview

### Project Name

ZYNE Legal, Trust, and Checkout Policy Layer

### Phase

PRD 5

### Objective

Add the legal and trust infrastructure needed for ZYNE's paid productized services and external Stan Store checkout flow.

PRD 5 ensures buyers understand what ZYNE controls, what Stan Store controls, how payment works, what happens after purchase, what is refundable or non-refundable, what buyer responsibilities exist, and how client materials and data are handled.

### Governing Business Rule

ZYNE owns the education, SEO, product comparison, buyer qualification, scope explanation, policy explanation, and service fulfillment logic.

Stan Store is only the payment and checkout layer after the buyer has reviewed enough product detail on zyne.store.

---

## 2. Scope

PRD 5 covers legal, policy, trust, and checkout clarity pages and disclosures.

### Pages Covered

```txt
/privacy/
/terms/
/refund-policy/
/cookie-policy/
```

### In Scope

- Privacy Policy.
- Terms of Service.
- Refund / Scope Policy.
- Cookie Policy.
- Checkout disclosure language.
- Footer legal links.
- Product-page policy summaries.
- Stan Store relationship disclosure.
- AI/data-processing language where relevant.
- No-results-guarantee language where relevant.
- Static/crawlable legal pages.
- Route validation aligned to PRD 5 acceptance criteria.

### Out of Scope

PRD 5 does not require attorney-reviewed final legal language, region-specific compliance beyond baseline policy clarity, consent-management platform installation, analytics provider installation, or new checkout URLs.

Legal copy should be operationally clear but must not claim to be formal legal advice.

---

## 3. Required Legal Pages

## 3.1 Privacy Policy

### Route

```txt
/privacy/
```

### Required Content

The Privacy Policy must explain:

- What information ZYNE may collect.
- How intake and service materials are used.
- How buyer contact and business information may be used.
- That payment information is handled through Stan Store or its payment processors, not ZYNE-hosted checkout pages.
- How client materials should be limited to what is needed for the purchased service.
- AI/data-processing expectations where AI-related services are purchased.
- Support/contact expectations.

### Required Disclosure

```txt
Payment information is processed by Stan Store or its payment processors. ZYNE does not host payment checkout on zyne.store.
```

---

## 3.2 Terms of Service

### Route

```txt
/terms/
```

### Required Content

The Terms of Service must explain:

- ZYNE offers paid productized services.
- There are no free consultations implied by the website.
- Each purchase is governed by its product scope, deliverables, timeline, exclusions, and buyer responsibilities.
- Checkout is completed externally through Stan Store.
- Buyer responsibilities after purchase.
- No guarantee of revenue, rankings, traffic, leads, or platform outcomes.
- Third-party software, ad spend, or platform fees are not included unless explicitly stated.
- ZYNE may decline or limit work outside purchased scope.

### Required Disclosure

```txt
ZYNE provides service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.
```

---

## 3.3 Refund / Scope Policy

### Route

```txt
/refund-policy/
```

### Required Content

The Refund / Scope Policy must explain:

- Fixed-price services begin from defined scope.
- Buyer intake is required for fulfillment.
- Completed strategy work, audits, digital deliverables, or started fulfillment work may be non-refundable.
- Revision handling is limited to the stated product scope.
- Refunds, if any, must respect work already performed.
- Scope changes may require a separate product purchase.
- ZYNE does not guarantee financial, ranking, traffic, or lead outcomes.

### Required Disclosure

```txt
Refund and scope handling depends on the purchased service, the stated scope, and the work already performed.
```

---

## 3.4 Cookie Policy

### Route

```txt
/cookie-policy/
```

### Required Content

The Cookie Policy must explain:

- ZYNE may use essential cookies or local browser storage for site functionality.
- Analytics, advertising, or tracking scripts should not be activated unless tracking IDs are provided.
- Future analytics providers may include GA4, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag, or custom dataLayer events.
- Third-party checkout on Stan Store may use its own cookies and tracking technologies under its own policies.
- Users may control cookies through browser settings.

### Required Disclosure

```txt
Stan Store checkout may use separate cookies, tracking, or payment technologies that are not controlled by zyne.store.
```

---

## 4. Footer Legal Links

The shared footer must include crawlable internal links to:

```txt
/privacy/
/terms/
/refund-policy/
/cookie-policy/
```

The footer must also include a checkout disclosure:

```txt
Product education and service details are provided on ZYNE. Secure checkout is completed through Stan Store.
```

---

## 5. Product Page Policy Summaries

Product pages must include short policy summaries or links that clarify:

- Checkout is external through Stan Store.
- Product scope is defined by the page and checkout terms.
- Buyer responsibilities apply after purchase.
- Refund/scope handling depends on product status and work already performed.
- Results are not guaranteed.

At minimum, product pages must link to:

```txt
/refund-policy/
```

---

## 6. Checkout Disclosure Requirements

Checkout disclosure must appear on footer, product detail pages, legal pages, and category pages where purchase paths are discussed.

Required phrase or close equivalent:

```txt
Secure checkout is completed through Stan Store.
```

---

## 7. Stan Store Relationship Disclosure

Pages must make clear:

- ZYNE controls product education and fulfillment expectations.
- Stan Store controls the external checkout/payment layer.
- Buyers leave zyne.store when they proceed to Stan Store checkout.
- Payment processing details are subject to Stan Store and payment processor terms.

---

## 8. AI and Data Processing Language

Where relevant, legal pages should state:

- Buyers should provide only the materials needed for the purchased service.
- AI-related services may use provided business context, workflows, examples, service information, or client-facing materials to structure AI systems, prompts, or automation plans.
- Buyers should not provide sensitive regulated information unless explicitly required and approved for the purchased scope.
- ZYNE does not promise that AI systems will produce perfect or error-free outputs.

---

## 9. No Results Guarantee Language

Legal and policy pages must state that ZYNE does not guarantee revenue, rankings, traffic, leads, conversion rates, platform approvals, AI output perfection, or third-party platform performance.

---

## 10. CTA Rules

### Allowed Legal CTAs

Use:

```txt
Review Services
Compare Paid Services
Return to Product Details
Review Refund and Scope Policy
View Privacy Policy
View Terms of Service
View Cookie Policy
```

### Disallowed Legal CTAs

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

## 11. SEO and Crawlability Requirements

Legal pages must be crawlable static HTML, internally linked from the footer, uniquely titled, given useful meta descriptions, included in generated route validation, and structured as semantic pages with one H1 each.

---

## 12. Accessibility Requirements

Legal pages and footer links must preserve baseline WCAG 2.1 AA expectations.

Required:

- One H1 per legal page.
- Semantic headings.
- Descriptive internal links.
- Keyboard-accessible links.
- Visible focus states.
- Sufficient color contrast.
- Mobile-friendly layout.

---

## 13. Validation Requirements

PRD 5 is valid when the legal and trust layer clearly explains:

- What ZYNE controls.
- What Stan Store controls.
- How payment works.
- What happens after purchase.
- What is refundable or not refundable.
- What buyer responsibilities exist.
- How data and client materials are handled.

### Required Checks

- `/privacy/` exists.
- `/terms/` exists.
- `/refund-policy/` exists.
- `/cookie-policy/` exists.
- Every legal page has one H1.
- Every legal page includes Stan Store checkout disclosure.
- Privacy page includes payment-processing language.
- Terms page includes productized-service and no-results-guarantee language.
- Refund page includes scope/refund handling language.
- Cookie page includes analytics/tracking and Stan Store cookie language.
- Footer includes all legal links.
- Product pages link to refund/scope policy.
- No prohibited free-call language appears.
- GitHub Actions validation passes.

### Validation Commands

```bash
cd projects/zyne-homepage
npm run build
npm run validate:catalog:strict
```

---

## 14. Acceptance Criteria

PRD 5 is complete when:

- Privacy, Terms, Refund / Scope, and Cookie Policy pages exist.
- Legal pages are crawlable and internally linked.
- The footer includes all required legal links.
- ZYNE and Stan Store responsibilities are clearly distinguished.
- Checkout disclosure appears in required locations.
- Product pages include policy summaries and refund/scope links.
- No-results-guarantee language appears where relevant.
- AI/data-processing language appears where relevant.
- No prohibited free-call language appears.
- Static route validation passes.
- Strict catalog validation passes.
- GitHub Actions validation passes.

---

## 15. Definition of Done

PRD 5 is done when a buyer can answer these questions from ZYNE pages without ambiguity:

1. What does ZYNE control?
2. What does Stan Store control?
3. How does payment work?
4. What happens after purchase?
5. What might be refundable or non-refundable?
6. What responsibilities does the buyer have?
7. How are submitted materials handled?
8. Are outcomes guaranteed?
9. Are cookies or analytics used?
10. Where are the legal pages linked?

---

## 16. Immediate Implementation Priority

Begin PRD 5 with these implementation tasks:

1. Expand legal page content.
2. Add `/cookie-policy/`.
3. Add footer legal links.
4. Confirm product pages link to `/refund-policy/`.
5. Add route validation for legal pages and footer links.
6. Run GitHub Actions validation.
7. Document PRD 5 validation result before moving to PRD 6.

---

# End of PRD 5
