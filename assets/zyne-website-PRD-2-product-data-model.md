# ZYNE Website PRD 2 — Product Data Model and Catalog Source of Truth

## 1. Project Overview

### Project Name

ZYNE Product Catalog Source of Truth

### Phase

PRD 2

### Objective

Create a normalized product data model that becomes the single source of truth for ZYNE productized services across the homepage, category pages, product detail pages, route generation, schema, analytics, product images, and checkout routing.

PRD 2 exists to remove duplicated product data, inconsistent product image paths, conflicting timelines, hardcoded product cards, and page-level inconsistencies before category pages and product pages are expanded in later PRDs.

### Governing Business Rule

ZYNE owns the education, SEO, product comparison, buyer qualification, and conversion logic.

Stan Store is only the external checkout and payment layer after a buyer has reviewed enough service information on zyne.store.

---

## 2. Problem Statement

The current PRD 1 implementation successfully establishes the homepage storefront, but product data is still fragmented across multiple places.

Observed issues include:

- Product image files exist in more than one folder pattern.
- Product pages may reference root asset files while homepage cards may reference catalog asset files.
- Static product pages contain duplicated product data.
- Generated routes and static routes can drift apart.
- Some assets use different extensions for similar product roles.
- Product routes, homepage cards, and future category pages need one consistent catalog source.
- Product images are difficult to replace because there is not one obvious upload location.

PRD 2 resolves this by standardizing product data, product asset paths, product IDs, route generation, metadata, and checkout handling.

---

## 3. Scope

PRD 2 covers the data and routing foundation for all current ZYNE productized services.

### In Scope

- Final normalized `products.js` or equivalent product catalog module.
- One master catalog array for all productized services.
- Product IDs used everywhere instead of hardcoded product names.
- Category data objects.
- Product image path standardization.
- Product image filename standardization.
- Migration of product images into one canonical folder.
- Stan Store checkout URL centralization.
- Checkout status tracking.
- Product flags for homepage, category, intelligence, delivery, starter, and premium use.
- Route generation from the catalog.
- Product-page static output generated from the catalog.
- Homepage product sections driven from catalog flags or ID arrays.
- Future category-page compatibility.
- Schema and analytics metadata readiness.
- Validation checks for missing fields, missing images, duplicate IDs, duplicate slugs, and broken checkout URLs.

### Out of Scope

PRD 2 does not require the full category-page copy or final high-converting product-page copy. Those are covered by later PRDs.

Out of scope for PRD 2:

- Full category page content depth.
- Final product page sales copy.
- Full legal policy pages.
- Full analytics provider script installation.
- Industry landing pages.
- Insights/articles.
- Final design polish beyond product image consistency and data-driven rendering.

---

## 4. Primary Goals

PRD 2 must make product data:

1. Centralized.
2. Maintainable.
3. Consistent.
4. Route-ready.
5. SEO-ready.
6. Analytics-ready.
7. Checkout-ready.
8. Asset-consistent.
9. Easy to update without hunting through static HTML.

The practical outcome should be simple:

If a product price, timeline, image, or checkout URL changes, it should be updated in one source file and then reflected everywhere after rebuild.

---

## 5. Source of Truth Requirement

The product catalog must become the single authoritative source for:

- Product name.
- Product short name.
- Product ID.
- Product slug.
- Category.
- Product type.
- Price.
- Timeline.
- Revisions.
- Description.
- Best-for label.
- Deliverables.
- Product image.
- Checkout URL.
- Checkout status.
- Internal URL.
- SEO metadata.
- Schema metadata.
- Analytics metadata.
- Product visibility flags.

No product card, homepage product, category product, or generated product route should rely on a separate hardcoded product object once PRD 2 is complete.

---

## 6. Required Product Data Model

Each product object must support the following fields.

```js
{
  id: "executive-briefing",
  slug: "executive-briefing",
  name: "Executive Briefing",
  shortName: "Executive Briefing",
  category: "improve-my-business",
  productType: "briefing",
  price: "$750",
  priceValue: 750,
  currency: "USD",
  description: "A concentrated strategic briefing to clarify constraints and next moves.",
  shortDescription: "Clarify constraints and next strategic moves.",
  bestFor: "Leaders making a consequential decision",
  timeline: "3–5 business days",
  revisions: "1 revision round",
  deliverables: [
    "Strategic briefing document",
    "Constraint diagnosis",
    "Priority recommendations",
    "Next-step roadmap"
  ],
  buyerResponsibilities: [
    "Complete intake form",
    "Provide relevant business context",
    "Review final briefing within the stated revision window"
  ],
  exclusions: [
    "Ongoing consulting",
    "Implementation work unless purchased separately",
    "Guaranteed financial results"
  ],
  image: "catalog/executive-briefing-thumbnail.png",
  imageAlt: "Executive Briefing product package",
  internalUrl: "/services/executive-briefing/",
  stanCheckoutUrl: "https://stan.store/ZYNE_store/p/executive-briefing",
  checkoutStatus: "live",
  directCheckoutEnabled: false,
  homepageVisible: true,
  categoryVisible: true,
  starterOffer: true,
  premiumOffer: true,
  intelligenceOffer: true,
  deliveryOffer: false,
  relatedProductIds: ["growth-roadmap", "operational-audit"],
  seoTitle: "Executive Briefing | ZYNE",
  seoDescription: "Purchase a fixed-price ZYNE Executive Briefing to clarify constraints, priorities, and next strategic moves.",
  schemaType: "Service"
}
```

### Required Product Fields

| Field | Required | Purpose |
|---|---:|---|
| `id` | Yes | Stable internal product identifier. |
| `slug` | Yes | Route segment for product page URL. |
| `name` | Yes | Full public product name. |
| `shortName` | Yes | Compact display label for cards and lists. |
| `category` | Yes | Growth-path/category ID. |
| `productType` | Yes | Product classification. |
| `price` | Yes | Public display price. |
| `priceValue` | Yes | Numeric value for schema/analytics. |
| `currency` | Yes | Currency code, default `USD`. |
| `description` | Yes | Main card/page description. |
| `shortDescription` | Yes | Compact SEO/card text. |
| `bestFor` | Yes | Buyer-fit label. |
| `timeline` | Yes | Delivery timeline. |
| `revisions` | Conditional | Required when the product includes revisions. |
| `deliverables` | Yes | Product detail page and schema support. |
| `buyerResponsibilities` | Yes | Product detail page support. |
| `exclusions` | Yes | Scope control and policy clarity. |
| `image` | Yes | Canonical product image path. |
| `imageAlt` | Yes | Accessibility and SEO. |
| `internalUrl` | Yes | Internal ZYNE product page route. |
| `stanCheckoutUrl` | Conditional | Required when checkout is live. |
| `checkoutStatus` | Yes | `live`, `pending`, `disabled`, or `archived`. |
| `directCheckoutEnabled` | Yes | Controls whether external checkout links may render directly. |
| `homepageVisible` | Yes | Homepage eligibility flag. |
| `categoryVisible` | Yes | Category page eligibility flag. |
| `starterOffer` | Yes | Starter product section eligibility. |
| `premiumOffer` | Yes | Premium/strategic section eligibility. |
| `intelligenceOffer` | Yes | Intelligence section eligibility. |
| `deliveryOffer` | Yes | Delivery section eligibility. |
| `relatedProductIds` | Yes | Product-detail cross-sell support. |
| `seoTitle` | Yes | Page title support. |
| `seoDescription` | Yes | Meta description support. |
| `schemaType` | Yes | Structured data support. |

---

## 7. Required Category Data Model

Each category object must support the following fields.

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
  productIds: [
    "google-bp-mini-audit",
    "website-quick-win-audit",
    "social-media-quick-audit",
    "visibility-audit"
  ],
  recommendedStarterProductId: "google-bp-mini-audit",
  seoTitle: "Grow My Visibility | ZYNE",
  seoDescription: "Explore fixed-price ZYNE services for Google Business Profile optimization, local visibility, website visibility, and public trust signals."
}
```

### Required Categories

The catalog must support these category IDs:

```txt
grow-my-visibility
build-my-brand
improve-my-business
use-ai
convert-more-clients
```

Additional grouping pages may use virtual category or collection IDs:

```txt
intelligence
delivery
realtor-gpt
```

---

## 8. Canonical Asset Strategy

### Required Asset Folder

All product image assets must use one canonical folder:

```txt
assets/catalog/
projects/zyne-homepage/public/assets/catalog/
```

The root `assets/catalog/` folder serves the current static/live GitHub Pages output.

The `projects/zyne-homepage/public/assets/catalog/` folder serves the source build pipeline so future builds preserve the same assets.

### Required Filename Convention

Use lowercase kebab-case for all new standardized product image files:

```txt
product-slug-thumbnail.png
```

Examples:

```txt
executive-briefing-thumbnail.png
competitor-readiness-thumbnail.png
web-architecture-thumbnail.png
starter-brand-kit-thumbnail.png
```

### Legacy Asset Compatibility

Existing files with PascalCase names may remain temporarily during migration, but the normalized catalog must point only to canonical lowercase kebab-case paths once migration is complete.

Do not introduce new files using:

```txt
Thumnail
thumnail
Thumbnail
Product_Name_thumbnail.png
Product_Name_thumbnail.webp
```

unless they are part of a temporary migration bridge.

### Image Extension Rule

Preferred final format:

```txt
.png
```

Acceptable optimized future formats:

```txt
.webp
.avif
```

The extension must match exactly in product data and static routes. If the extension changes, product data must change.

### Replacement Rule

After PRD 2 standardization, replacing a product image should require only this:

1. Upload the replacement image to `assets/catalog/`.
2. Upload the same replacement image to `projects/zyne-homepage/public/assets/catalog/`.
3. Keep the same exact filename and extension.
4. No code change should be required.

---

## 9. Checkout URL Strategy

Stan Store checkout URLs must be stored only in the product catalog.

### Rules

- Do not hardcode Stan Store URLs in homepage components.
- Do not hardcode Stan Store URLs in category page components.
- Do not hardcode Stan Store URLs in generated product pages outside catalog-derived output.
- A product may render a checkout button only when `checkoutStatus === "live"` and `stanCheckoutUrl` is present.
- Homepage cards should still route internally unless `directCheckoutEnabled === true` and the section has enough product detail for informed purchase.

### Checkout Status Values

```txt
live
pending
disabled
archived
```

### Checkout Disclosure

Every page that shows an external Stan Store checkout link must include this disclosure near the CTA:

```txt
Secure checkout is completed through Stan Store.
```

or an equivalent direct statement.

---

## 10. Route Generation Requirements

`generate-routes.mjs` must generate product routes from the master catalog.

### Required Behavior

- Import `catalogProducts` from the product catalog.
- Generate `/services/[slug]/` pages from product objects.
- Use `product.internalUrl` or `product.slug` consistently.
- Use `product.image` for product visuals.
- Use `product.imageAlt` for alt text.
- Use `product.price`, `product.timeline`, `product.revisions`, `product.deliverables`, `product.bestFor`, and `product.stanCheckoutUrl` from catalog data.
- Do not maintain a second product array inside the route generator.

### Generated Page Requirements

Each generated product page must include:

- Product H1.
- Product price.
- Product short description.
- Best-for label.
- Timeline.
- Revisions when available.
- Deliverables.
- Buyer responsibilities.
- Exclusions.
- Related products.
- Stan Store checkout CTA when checkout is live.
- Stan Store disclosure.
- Product image.
- Product image alt text.
- Basic product/offer schema readiness.

Full product-page sales copy depth is completed in PRD 4, but PRD 2 must ensure the data supports it.

---

## 11. Homepage Integration Requirements

The homepage must pull product information from the master catalog.

### Required Homepage Data Behavior

- Growth path product lists must use product IDs and product lookup helpers.
- Starter product cards must come from `starterOffer` or a controlled `homepageStarterProductIds` array.
- Premium strategic product cards must come from `premiumOffer` or a controlled `premiumProductIds` array.
- Intelligence section products must come from `intelligenceOffer` or `intelligenceProductIds`.
- Delivery section families must reference category IDs or product IDs.
- Product prices, names, timelines, image references, and internal URLs must not be duplicated in homepage markup.

### Rendering Rule

The homepage should render:

```txt
Product ID → product lookup → product display data
```

not:

```txt
Hardcoded string → manual card content
```

---

## 12. Category Page Readiness Requirements

PRD 2 does not build the full PRD 3 category pages, but it must provide the data needed for them.

Each category must expose:

- Category title.
- Category description.
- Buyer problem statement.
- Product IDs.
- Recommended starter product ID.
- CTA label.
- Category URL.
- SEO title.
- SEO description.

Category pages in PRD 3 must be able to render product grids using only category data plus product lookups.

---

## 13. Analytics Metadata Requirements

Product click events must be able to include the following data from the catalog:

```js
{
  product_id: "executive-briefing",
  product_name: "Executive Briefing",
  category: "improve-my-business",
  price: "$750",
  price_value: 750,
  currency: "USD",
  destination_type: "internal_product_page" | "stan_checkout",
  destination_url: "/services/executive-briefing/"
}
```

The product catalog must support analytics without requiring each component to manually recreate product metadata.

---

## 14. Schema Metadata Requirements

The product catalog must support future schema generation for:

- Service.
- Offer.
- ItemList.
- FAQPage.
- BreadcrumbList.

Each product must include enough data to generate a basic Service/Offer object:

```js
{
  "@type": "Service",
  name: product.name,
  description: product.description,
  url: product.internalUrl,
  offers: {
    "@type": "Offer",
    price: product.priceValue,
    priceCurrency: product.currency,
    availability: product.checkoutStatus === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
  }
}
```

---

## 15. Required Validation Scripts or Checks

PRD 2 should include validation logic that can be run before deployment.

### Required Checks

- No duplicate product IDs.
- No duplicate product slugs.
- No missing product names.
- No missing categories.
- No products assigned to nonexistent categories.
- No missing product URLs.
- No missing image path when image is required.
- No image path using `thumnail`.
- No uppercase/legacy image naming after migration is marked complete.
- No product with `checkoutStatus: "live"` missing `stanCheckoutUrl`.
- No product with a Stan URL outside the catalog.
- No homepage product card hardcoding duplicated product fields.
- No generated product route using stale product values.
- All product pages generated from catalog.

### Example Validation Command

```bash
pnpm run validate:catalog
```

The final command name can vary, but PRD 2 requires a repeatable validation step.

---

## 16. Migration Requirements

### Migration Step 1 — Inventory Current Product Assets

List every current product image file in:

```txt
assets/
assets/catalog/
projects/zyne-homepage/public/assets/
projects/zyne-homepage/public/assets/catalog/
```

### Migration Step 2 — Choose Canonical Filenames

Map every current product image to final canonical format:

```txt
product-slug-thumbnail.png
```

### Migration Step 3 — Copy or Rename Assets

Each product image must exist in both:

```txt
assets/catalog/
projects/zyne-homepage/public/assets/catalog/
```

### Migration Step 4 — Update Product Catalog

Update product data to point to canonical asset paths only:

```js
image: "catalog/executive-briefing-thumbnail.png"
```

### Migration Step 5 — Regenerate Routes

Product routes must be regenerated from catalog data.

### Migration Step 6 — Remove Legacy References

Search the repository for legacy asset references and remove or replace them.

Required search targets:

```txt
thumnail
_thumbnail
Executive_Briefing_thumbnail
Competitor_Readiness_thumbnail
/assets/Executive_Briefing_thumbnail.png
/assets/catalog/Competitor_Readiness_thumbnail.png
```

The final target is not necessarily zero results for all legacy names during the transition, but final production templates must use canonical paths.

---

## 17. File Structure Requirements

Recommended final structure:

```txt
projects/zyne-homepage/src/data/products.js
projects/zyne-homepage/src/data/categories.js
projects/zyne-homepage/src/data/collections.js
projects/zyne-homepage/src/data/validation.js
projects/zyne-homepage/public/assets/catalog/
assets/catalog/
scripts/generate-routes.mjs
scripts/validate-catalog.mjs
```

If the project remains minimal, categories and collections may stay inside `products.js`, but the catalog must remain readable and maintainable.

---

## 18. Acceptance Criteria

PRD 2 is complete when:

- There is one master product catalog.
- Product data is not duplicated across homepage, route generator, and static product pages.
- Product IDs are used for lookup across homepage, categories, intelligence, delivery, and premium sections.
- Product prices are consistent everywhere.
- Product timelines are consistent everywhere.
- Product checkout URLs are stored centrally.
- Product images use one canonical folder strategy.
- Product image names use one professional naming convention.
- Replacing a product image is clear and requires no code change when the filename and extension remain unchanged.
- `thumbnail` is spelled correctly everywhere.
- No current production page references `thumnail`.
- Product pages can be regenerated from the catalog.
- Homepage product sections can be regenerated from the catalog.
- Future category pages can render from category objects and product lookups.
- The catalog supports schema and analytics metadata.
- Validation checks exist for missing data, broken image paths, duplicate IDs, and invalid checkout configuration.

---

## 19. Definition of Done

PRD 2 is done when a developer or operator can answer these questions without inspecting static HTML manually:

1. Where do I change a product price?
2. Where do I change a product image?
3. Where do I change a checkout URL?
4. Where do I change a product timeline?
5. Which category does a product belong to?
6. Which products appear on the homepage?
7. Which products appear in premium or intelligence sections?
8. Which product pages are generated?
9. Which checkout links are live?
10. Which assets are missing or incorrectly named?

The answer to each should be: the product catalog and its validation output.

---

## 20. Immediate Implementation Priority

Begin PRD 2 with these implementation tasks:

1. Create the final normalized product catalog.
2. Standardize all image paths into `catalog/product-slug-thumbnail.png`.
3. Copy product images into both canonical asset folders.
4. Update `generate-routes.mjs` to generate all product pages from catalog data.
5. Replace static root product image references with catalog-driven references where possible.
6. Add `validate-catalog.mjs`.
7. Run a repository search for old image names and `thumnail`.
8. Confirm homepage and product pages still render correctly.

---

# End of PRD 2
