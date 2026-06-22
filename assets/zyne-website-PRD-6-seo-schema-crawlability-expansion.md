# ZYNE Website PRD 6 — SEO, Schema, and Crawlability Expansion

## 1. Project Overview

### Project Name

ZYNE SEO, Schema, and Crawlability Expansion

### Phase

PRD 6

### Objective

Strengthen search visibility, crawler readability, social preview quality, and AI/search-system comprehension across the ZYNE website.

PRD 6 ensures every important ZYNE page is crawlable, internally linked, uniquely titled, schema-ready, represented in the sitemap, allowed by robots.txt, and aligned to a defined SEO/search-intent target.

### Governing Business Rule

ZYNE is the education, comparison, SEO, and conversion layer. Stan Store is only the external checkout/payment layer.

SEO and schema must therefore help search engines understand ZYNE's productized-service model, internal category structure, product pages, legal pages, and checkout relationship.

---

## 2. Scope

PRD 6 covers technical SEO, structured data, sitemap/robots output, metadata, crawler readability, and page-level search targeting.

### Pages Covered

PRD 6 applies to all generated ZYNE pages, including:

```txt
/
/services/
/grow-my-visibility/
/build-my-brand/
/improve-my-business/
/use-ai/
/use-ai/realtor-gpt/
/convert-more-clients/
/intelligence/
/delivery/
/services/[product-slug]/
/privacy/
/terms/
/refund-policy/
/cookie-policy/
```

### In Scope

- Fully static/crawlable page output.
- Page-specific SEO titles.
- Page-specific meta descriptions.
- Canonical URLs.
- Open Graph metadata.
- Twitter/social metadata.
- Sitemap containing only real pages.
- Correct `robots.txt`.
- Organization schema.
- WebSite schema.
- CollectionPage schema.
- Service schema.
- Offer schema.
- FAQ schema where FAQs exist.
- Breadcrumb schema.
- Internal linking model validation.
- Keyword mapping by page type.
- Image alt text standards.
- Route validation aligned to PRD 6 acceptance criteria.

### Out of Scope

PRD 6 does not require:

- Blog/insights content creation.
- Google Search Console setup.
- External backlink strategy.
- Paid search setup.
- Analytics provider installation.
- Final copywriting beyond SEO metadata and keyword mapping.

---

## 3. SEO Metadata Requirements

Every important page must include:

- Unique `<title>`.
- Unique meta description.
- Canonical URL.
- Open Graph title.
- Open Graph description.
- Open Graph URL.
- Open Graph type.
- Twitter card metadata.

### Required Default Site URL

```txt
https://zyne.store
```

### Canonical Rule

Canonical URLs must be absolute and route-normalized.

Example:

```html
<link rel="canonical" href="https://zyne.store/grow-my-visibility/">
```

---

## 4. Sitemap Requirements

Generate:

```txt
/sitemap.xml
```

The sitemap must include only real generated pages.

Required route inclusion:

- Homepage.
- Services index.
- Growth-path pages.
- Intelligence page.
- Delivery page.
- Realtor GPT subpage.
- Product detail pages.
- Legal pages.

The sitemap must not include placeholder-only routes, nonexistent planned routes, broken pages, or external Stan Store URLs.

---

## 5. Robots Requirements

Generate:

```txt
/robots.txt
```

The robots file must:

- Allow crawling of the site.
- Reference the sitemap.
- Avoid blocking important category/product/legal pages.

Required content:

```txt
User-agent: *
Allow: /
Sitemap: https://zyne.store/sitemap.xml
```

---

## 6. Structured Data Requirements

### Organization Schema

The homepage must include Organization schema for ZYNE.

### WebSite Schema

The homepage must include WebSite schema for ZYNE.

### CollectionPage Schema

Category, collection, and service-index pages should support CollectionPage schema and ItemList structure where product lists exist.

### Service / Offer Schema

Product pages must include Service or product-style schema with Offer data.

Required offer fields:

- Price.
- Currency.
- Availability.
- Product URL.
- Checkout URL where live.

### FAQ Schema

Pages with FAQ content should support FAQPage schema where feasible.

### Breadcrumb Schema

Important generated pages must include BreadcrumbList schema.

At minimum:

- Category pages.
- Collection pages.
- Product pages.
- Legal pages.

---

## 7. Keyword Mapping Requirements

Create a keyword/search-intent map by page type.

### Homepage

Search intent:

- Premium growth services.
- Productized business services.
- Visibility, brand, AI, and conversion services.

### Category Pages

Search intent examples:

- Google Business Profile optimization.
- Brand identity services.
- Business growth strategy.
- AI automation services.
- Client conversion systems.

### Product Pages

Search intent should align with product name, problem solved, service type, and buyer use case.

### Legal Pages

Search intent should support trust and checkout clarity, not acquisition.

Keyword mapping can live in a data file, validation script, or generated SEO layer.

---

## 8. Internal Linking Requirements

Every important page must be reachable through internal links.

Required linking patterns:

- Homepage links to services, categories, intelligence, delivery, product pages, and legal footer links.
- Category pages link to products and related categories.
- Product pages link to category, services, refund policy, and related products.
- Legal pages link to the other legal pages and services where appropriate.
- Footer includes growth path, services, and legal links.

---

## 9. Image Alt Text Standards

Meaningful images must use descriptive alt text.

Product images should describe the product/package, not use empty or generic alt text.

Decorative graphics may be marked appropriately.

Validation should catch missing alt text on generated HTML image tags where practical.

---

## 10. CTA and Checkout SEO Rule

SEO content must not reposition the site as a free-call funnel.

Do not use prohibited CTA language:

```txt
Schedule a Free Call
Book a Free Consultation
Get a Free Strategy Session
Talk to Sales
Contact Us for Pricing
Request a Free Audit
```

Checkout language must continue to make clear:

```txt
Secure checkout is completed through Stan Store.
```

---

## 11. Validation Requirements

PRD 6 is valid when every important page is crawlable, internally linked, uniquely titled, schema-ready, and aligned to a defined SEO/search-intent target.

### Required Checks

- `sitemap.xml` exists.
- `robots.txt` exists.
- Robots references sitemap.
- Sitemap includes only internal ZYNE URLs.
- Sitemap includes all generated real routes.
- Every generated route has a title.
- Every generated route has a meta description.
- Every generated route has a canonical URL.
- Every generated route has Open Graph metadata.
- Every generated route has Twitter metadata.
- Homepage includes Organization schema.
- Homepage includes WebSite schema.
- Category/collection pages include CollectionPage or ItemList schema.
- Product pages include Offer schema.
- Important routes include BreadcrumbList schema.
- Product images have alt text.
- Keyword mapping exists for all important route types.
- No prohibited free-call language appears.
- GitHub Actions validation passes.

### Validation Commands

```bash
cd projects/zyne-homepage
npm run build
npm run validate:catalog:strict
```

---

## 12. Acceptance Criteria

PRD 6 is complete when:

- Sitemap and robots files are generated.
- All real pages are represented in the sitemap.
- External Stan Store URLs are not listed in the sitemap.
- Page-level titles and descriptions exist.
- Canonicals are absolute and correct.
- Open Graph and Twitter metadata exist.
- Structured data is present and route-appropriate.
- Breadcrumb schema exists for important pages.
- Keyword mapping exists and is validated.
- Image alt text standards are enforced where practical.
- Static route validation passes.
- Strict catalog validation passes.
- GitHub Actions validation passes.

---

## 13. Definition of Done

PRD 6 is done when a crawler, search engine, or AI retrieval system can understand:

1. What ZYNE is.
2. What services ZYNE sells.
3. Which category each product belongs to.
4. Which pages are real and indexable.
5. Which pages are product pages versus category pages versus legal pages.
6. What each page is targeting from a search-intent perspective.
7. How pages relate through breadcrumbs and internal links.
8. Where checkout happens.
9. Which pages should appear in the sitemap.
10. That ZYNE is a paid productized-services storefront, not a free-call funnel.

---

## 14. Immediate Implementation Priority

Begin PRD 6 with these implementation tasks:

1. Add SEO/search-intent mapping.
2. Generate sitemap.xml.
3. Generate robots.txt.
4. Add Open Graph and Twitter metadata.
5. Add or reinforce BreadcrumbList schema.
6. Validate product image alt text.
7. Validate sitemap route coverage.
8. Validate no external checkout URLs appear in sitemap.
9. Add PRD 6 SEO validation script.
10. Wire SEO validation into build.
11. Run GitHub Actions validation.
12. Document PRD 6 validation result before moving to PRD 7.

---

# End of PRD 6
