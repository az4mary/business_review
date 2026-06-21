import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  catalogProducts,
  categories,
  deliveryFamilies,
  intelligenceProductIds
} from "../src/data/products.js";

const errors = [];

const assertFile = async (route) => {
  const path = join("dist", route, "index.html");
  try {
    await access(path);
    return await readFile(path, "utf8");
  } catch {
    errors.push(`Missing generated route: /${route}/`);
    return "";
  }
};

const assertIncludes = (html, route, snippets) => {
  for (const snippet of snippets) {
    if (!html.includes(snippet)) errors.push(`/${route}/ missing required content: ${snippet}`);
  }
};

for (const category of categories) {
  const html = await assertFile(category.slug);
  assertIncludes(html, category.slug, [
    category.title,
    "Buyer problem:",
    "Recommended starting point:",
    "product comparison",
    "Related growth paths",
    "Secure checkout is completed through Stan Store"
  ]);

  for (const productId of category.productIds) {
    const product = catalogProducts.find((item) => item.id === productId);
    if (product && !html.includes(product.name)) {
      errors.push(`/${category.slug}/ missing category product: ${product.name}`);
    }
  }
}

const services = await assertFile("services");
assertIncludes(services, "services", ["ZYNE Paid Services", "Product comparison", "Every product links to a ZYNE detail page"]);

const intelligence = await assertFile("intelligence");
for (const productId of intelligenceProductIds) {
  const product = catalogProducts.find((item) => item.id === productId);
  if (product && !intelligence.includes(product.name)) errors.push(`/intelligence/ missing product: ${product.name}`);
}

const delivery = await assertFile("delivery");
for (const family of deliveryFamilies) {
  if (!delivery.includes(family.name)) errors.push(`/delivery/ missing delivery family: ${family.name}`);
}

const realtorGpt = await assertFile(join("use-ai", "realtor-gpt"));
assertIncludes(realtorGpt, "use-ai/realtor-gpt", ["Realtor GPT Products", "real estate agents and teams"]);

for (const product of catalogProducts) {
  const route = join("services", product.slug);
  const html = await assertFile(route);
  assertIncludes(html, route, [
    product.name,
    product.price,
    "What is included",
    "Buyer responsibilities",
    "Scope exclusions",
    "Related products",
    "Secure checkout is completed through Stan Store"
  ]);
}

for (const route of ["privacy", "terms", "refund-policy"]) {
  const html = await assertFile(route);
  assertIncludes(html, route, ["Legal and checkout clarity", "Secure checkout is completed through Stan Store"]);
}

if (errors.length) {
  console.error("Generated route validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Generated route validation passed: ${catalogProducts.length} products, ${categories.length} categories, collection and policy routes.`);
