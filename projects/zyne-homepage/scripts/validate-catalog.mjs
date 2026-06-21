import { access } from "node:fs/promises";
import { join } from "node:path";
import {
  catalogProducts,
  categories,
  homepageProductIds,
  intelligenceProductIds,
  premiumProductIds,
  deliveryFamilies,
  industrySegments
} from "../src/data/products.js";
import { catalogAssetPolicy } from "../src/data/catalog-standards.js";
import { canonicalImageByProductId, productImageMigrationMap } from "../src/data/catalog-image-map.js";

const enforceCanonicalAssets = process.env.ENFORCE_CANONICAL_ASSETS === "true";
const errors = [];
const warnings = [];
const categoryIds = new Set(categories.map((category) => category.id));
const productIds = new Set();
const slugs = new Set();
const imageMapIds = new Set(productImageMigrationMap.map((item) => item.id));

const requiredProductFields = [
  "id",
  "slug",
  "name",
  "shortName",
  "category",
  "productType",
  "price",
  "priceValue",
  "currency",
  "description",
  "shortDescription",
  "bestFor",
  "timeline",
  "imageAlt",
  "internalUrl",
  "checkoutStatus",
  "directCheckoutEnabled",
  "seoTitle",
  "seoDescription",
  "schemaType"
];

const requiredCategoryFields = [
  "id",
  "slug",
  "number",
  "icon",
  "title",
  "shortTitle",
  "description",
  "problemStatement",
  "url",
  "ctaLabel",
  "productIds",
  "recommendedStarterProductId",
  "seoTitle",
  "seoDescription"
];

const requiredFlags = [
  "homepageVisible",
  "categoryVisible",
  "starterOffer",
  "premiumOffer",
  "intelligenceOffer",
  "deliveryOffer",
  "directCheckoutEnabled"
];

const allReferencedProductIds = new Set([
  ...homepageProductIds,
  ...intelligenceProductIds,
  ...premiumProductIds,
  ...categories.flatMap((category) => category.productIds || []),
  ...deliveryFamilies.flatMap((family) => family.productIds || []),
  ...industrySegments.flatMap((industry) => industry.recommendedProductIds || [])
]);

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const hasForbiddenImageFragment = (imagePath) => {
  return catalogAssetPolicy.forbiddenFragments.some((fragment) => imagePath.includes(fragment));
};

for (const product of catalogProducts) {
  for (const field of requiredProductFields) {
    if (product[field] === undefined || product[field] === null || product[field] === "") {
      errors.push(`${product.id || "unknown-product"}: missing required field ${field}`);
    }
  }

  for (const flag of requiredFlags) {
    if (typeof product[flag] !== "boolean") {
      errors.push(`${product.id}: ${flag} must be boolean`);
    }
  }

  if (typeof product.priceValue !== "number" || Number.isNaN(product.priceValue)) {
    errors.push(`${product.id}: priceValue must be numeric`);
  }

  if (productIds.has(product.id)) errors.push(`Duplicate product id: ${product.id}`);
  productIds.add(product.id);

  if (slugs.has(product.slug)) errors.push(`Duplicate product slug: ${product.slug}`);
  slugs.add(product.slug);

  if (!categoryIds.has(product.category)) {
    errors.push(`${product.id}: category does not exist: ${product.category}`);
  }

  if (!product.internalUrl.endsWith(`/${product.slug}/`)) {
    errors.push(`${product.id}: internalUrl does not match slug`);
  }

  if (product.checkoutStatus === "live" && !product.stanCheckoutUrl) {
    errors.push(`${product.id}: live checkoutStatus requires stanCheckoutUrl`);
  }

  if (product.stanCheckoutUrl && !product.stanCheckoutUrl.startsWith("https://stan.store/")) {
    warnings.push(`${product.id}: Stan checkout URL does not use https://stan.store/`);
  }

  if (!imageMapIds.has(product.id)) {
    warnings.push(`${product.id}: missing image migration map entry`);
  }

  if (!product.image) {
    errors.push(`${product.id}: missing product image`);
  } else {
    if (hasForbiddenImageFragment(product.image)) errors.push(`${product.id}: image path contains forbidden thumbnail fragment`);
    if (!product.image.startsWith(catalogAssetPolicy.imagePathPrefix)) warnings.push(`${product.id}: image should use canonical catalog/ path`);

    const canonicalImage = canonicalImageByProductId[product.id];
    if (canonicalImage && product.image !== canonicalImage) {
      const message = `${product.id}: image is not yet canonical (${product.image} -> ${canonicalImage})`;
      if (enforceCanonicalAssets) errors.push(message);
      else warnings.push(`${message} (migration warning)`);
    }

    const publicAsset = join("public", "assets", product.image);
    if (!(await exists(publicAsset))) {
      const message = `${product.id}: missing source asset ${publicAsset}`;
      if (enforceCanonicalAssets) errors.push(message);
      else warnings.push(`${message} (migration warning)`);
    }
  }
}

for (const category of categories) {
  for (const field of requiredCategoryFields) {
    if (category[field] === undefined || category[field] === null || category[field] === "") {
      errors.push(`${category.id || "unknown-category"}: missing required category field ${field}`);
    }
  }
  if (!Array.isArray(category.productIds)) {
    errors.push(`${category.id || "unknown-category"}: productIds must be an array`);
  }
  for (const id of category.productIds || []) {
    if (!productIds.has(id)) errors.push(`${category.id}: references missing product ${id}`);
  }
  if (category.recommendedStarterProductId && !productIds.has(category.recommendedStarterProductId)) {
    errors.push(`${category.id}: recommendedStarterProductId does not exist`);
  }
}

for (const id of allReferencedProductIds) {
  if (!productIds.has(id)) errors.push(`Referenced product id does not exist: ${id}`);
}

if (warnings.length) {
  console.warn("Catalog warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Catalog validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Catalog validation passed: ${catalogProducts.length} products, ${categories.length} categories.`);
