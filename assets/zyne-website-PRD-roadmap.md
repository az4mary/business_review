Agreed. That should be the governing rule for every PRD:

> **ZYNE owns the education, SEO, product comparison, buyer qualification, and conversion logic. Stan Store is only the payment/checkout layer after the buyer has already reviewed enough product detail on zyne.store.**

That means homepage CTAs should generally go to **internal product/category pages**, not directly to Stan Store, unless the homepage itself contains enough detail for an informed purchase. The original homepage PRD already supports this model: ZYNE is the sales and education layer, Stan Store is the checkout layer, and “View Product” should route to an internal product detail page while “Buy Now” or “Checkout on Stan Store” should route to the exact Stan Store checkout URL. 

Below is the broader phased PRD roadmap.

---

# ZYNE Website PRD Roadmap

## PRD 1 — Homepage Storefront Foundation

**Current phase.**

### Scope

Build and validate the homepage as the premium storefront and routing layer for ZYNE’s productized services.

### Primary deliverables

* Premium homepage visual system.
* Crawlable static HTML homepage.
* One H1.
* Five buyer-intent growth paths.
* Starter product section.
* Intelligence section.
* Delivery section.
* How ZYNE Works section.
* Featured strategic products.
* Industries section.
* FAQ section.
* Final CTA.
* Footer with Stan Store disclosure.
* Structured `products.js` foundation.
* Internal links to category/product routes.
* No free-call language.

### Important CTA rule

Homepage product CTAs should primarily be:

```txt
View Product
View Service Details
View Visibility Products
View Brand Products
View Intelligence Products
View AI Products
View Conversion Products
```

Direct Stan Store checkout from homepage should only appear where the homepage gives enough product detail for informed purchase. Otherwise, checkout belongs on the internal product detail page.

### Validation standard

PRD 1 is valid when the homepage is:

* crawlable
* premium
* productized
* conversion-oriented
* not a free-call funnel
* internally routed
* structurally ready for future category/product pages

---

## PRD 2 — Product Data Model and Catalog Source of Truth

### Scope

Create the normalized product catalog that powers the homepage, category pages, product pages, schema, analytics, and checkout routing.

### Primary deliverables

* Final `products.js`.
* One master product catalog.
* Corrected `thumbnail` naming everywhere.
* Normalized timelines.
* Consistent product fields.
* Product IDs used in growth paths instead of hardcoded strings.
* Category data objects.
* Product flags:

  * `homepageVisible`
  * `starterOffer`
  * `premiumOffer`
  * `intelligenceOffer`
  * `deliveryOffer`
  * `categoryVisible`
  * `directCheckoutEnabled`
* Stan checkout URLs stored centrally.
* Product-specific metadata:

  * slug
  * price
  * timeline
  * revisions
  * image
  * deliverables
  * best-for label
  * SEO title
  * SEO description
  * checkout status

### Validation standard

PRD 2 is valid when every homepage card, category card, product route, checkout link, image, price, and timeline pulls from one consistent data source.

---

## PRD 3 — Category / Growth Path Pages

### Scope

Turn the placeholder growth-path routes into real SEO and conversion pages.

### Pages covered

```txt
/grow-my-visibility/
/build-my-brand/
/improve-my-business/
/use-ai/
/convert-more-clients/
/intelligence/
/delivery/
```

### Primary deliverables

Each category page should include:

* category H1
* category positioning copy
* buyer problem statement
* product comparison grid
* recommended starting point
* product ladder
* internal product links
* category FAQ
* Stan Store disclosure
* related categories
* structured data where appropriate

### Validation standard

PRD 3 is valid when a visitor can land on any category page, understand the problem area, compare relevant offers, and choose an internal product page without needing Stan Store for education.

---

## PRD 4 — Product Detail Pages

### Scope

Create high-converting product detail pages for each ZYNE paid offer.

### Primary deliverables

Each product page should include:

* product H1
* price
* short positioning statement
* who it is for
* what is included
* deliverables
* timeline
* revisions
* buyer responsibilities
* scope exclusions
* refund/scope note
* related products
* FAQ
* exact Stan Store checkout button
* checkout disclosure
* product schema / offer schema
* analytics events for checkout clicks

### CTA rule

This is where the main external checkout CTA belongs:

```txt
Checkout on Stan Store
Purchase This Service
Buy Now
```

### Validation standard

PRD 4 is valid when a buyer can make an informed purchase decision from the ZYNE product page before leaving for Stan Store checkout.

---

## PRD 5 — Legal, Trust, and Checkout Policy Layer

### Scope

Add the legal and trust infrastructure needed for paid services and external checkout.

### Primary deliverables

* Privacy Policy.
* Terms of Service.
* Refund / Scope Policy.
* Cookie Policy.
* Checkout disclosure language.
* Footer legal links.
* Product-page policy summaries.
* Stan Store relationship disclosure.
* AI/data-processing language where relevant.
* No-results-guarantee language where relevant.

### Validation standard

PRD 5 is valid when ZYNE clearly explains:

* what ZYNE controls
* what Stan Store controls
* how payment works
* what happens after purchase
* what is refundable or not refundable
* what buyer responsibilities exist
* how data and client materials are handled

---

## PRD 6 — SEO, Schema, and Crawlability Expansion

### Scope

Strengthen search visibility and AI/crawler readability across the full site.

### Primary deliverables

* Fully static/crawlable page output.
* Page-specific SEO titles and meta descriptions.
* Canonicals.
* Sitemap containing only real pages.
* Correct `robots.txt`.
* Organization schema.
* Website schema.
* Service schema.
* Offer schema.
* FAQ schema.
* Breadcrumb schema.
* Internal linking model.
* Keyword mapping by page type.
* Image alt text standards.
* Open Graph / social metadata.

### Validation standard

PRD 6 is valid when every important page is crawlable, internally linked, uniquely titled, schema-ready, and aligned to a defined SEO/search-intent target.

---

## PRD 7 — Analytics, Tracking, and Conversion Measurement

### Scope

Make the site measurable without bloating performance.

### Primary deliverables

* DataLayer standard.
* Event naming convention.
* Product-card click events.
* Growth-path click events.
* FAQ expansion events.
* Checkout click events.
* Stan Store redirect tracking.
* Product/category metadata in events.
* GA4 readiness.
* Meta Pixel readiness.
* LinkedIn Insight readiness.
* TikTok Pixel readiness.
* No scripts activated unless IDs are provided.

### Validation standard

PRD 7 is valid when every major buyer action can be measured without guessing:

```txt
homepage_view
growth_path_card_click
product_card_view_product_click
product_buy_now_click
stan_store_redirect_click
faq_expand
final_cta_shop_services_click
```

---

## PRD 8 — Visual Polish, Accessibility, and Performance QA

### Scope

Audit the site as a premium production experience.

### Primary deliverables

* Mobile layout QA.
* Tablet layout QA.
* Desktop layout QA.
* Keyboard navigation.
* Focus states.
* Tap target sizing.
* Color contrast review.
* Image optimization.
* WebP/AVIF asset cleanup.
* Hero image optimization.
* Lazy loading.
* Lighthouse targets.
* Broken link check.
* Missing image check.
* Filename professionalism check, including `thumbnail`.

### Validation standard

PRD 8 is valid when the site feels finished, loads quickly, works across devices, and has no obvious professional defects such as broken images, misspelled filenames, hidden text, cramped cards, or inaccessible controls.

---

## PRD 9 — Industry Landing Pages

### Scope

Turn the industries section into targeted landing pages.

### Candidate pages

```txt
/industries/professional-services/
/industries/real-estate/
/industries/hospitality/
/industries/legal-advisory/
/industries/healthcare-wellness/
/industries/local-businesses/
/industries/consultants-experts/
/industries/multi-location-brands/
```

### Primary deliverables

Each page should include:

* industry-specific H1
* pain points
* recommended product paths
* relevant offers
* examples of use cases
* internal links to product/category pages
* FAQ
* CTA to internal product/category pages

### Validation standard

PRD 9 is valid when each industry page can support SEO and route buyers to the right ZYNE offers without relying on generic homepage copy.

---

## PRD 10 — Content / Insights Layer

### Scope

Add an educational content layer for authority and search growth.

### Primary deliverables

* Insights index.
* Article template.
* SEO article structure.
* Internal links to products/categories.
* Content clusters around:

  * Google Business Profile optimization
  * local visibility
  * AI automation
  * Realtor GPT
  * website conversion
  * brand positioning
  * client conversion systems
* Author/organization metadata.
* Article schema.

### Validation standard

PRD 10 is valid when ZYNE can publish educational content that builds authority and routes readers into paid product pages.

---

# Recommended phase order

```txt
PRD 1 — Homepage Storefront Foundation
PRD 2 — Product Data Model and Catalog Source of Truth
PRD 3 — Category / Growth Path Pages
PRD 4 — Product Detail Pages
PRD 5 — Legal, Trust, and Checkout Policy Layer
PRD 6 — SEO, Schema, and Crawlability Expansion
PRD 7 — Analytics, Tracking, and Conversion Measurement
PRD 8 — Visual Polish, Accessibility, and Performance QA
PRD 9 — Industry Landing Pages
PRD 10 — Content / Insights Layer
```

## Immediate next step

Finish PRD 1 by generating the final Phase 1 `products.js` only against the homepage PRD. Then move into PRD 2, where we make the product catalog robust enough to power the rest of the site.
