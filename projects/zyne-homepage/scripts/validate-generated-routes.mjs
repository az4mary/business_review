import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  catalogProducts,
  categories,
  deliveryFamilies,
  intelligenceProductIds
} from "../src/data/products.js";

const errors = [];
const forbiddenPhrases = [
  "Schedule a Free Call",
  "Book a Free Consultation",
  "Get a Free Strategy Session",
  "Talk to Sales",
  "Contact Us for Pricing",
  "Request a Free Audit"
];

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

const assertOneH1 = (html, route) => {
  const matches = html.match(/<h1[\s>]/g) || [];
  if (matches.length !== 1) errors.push(`/${route}/ expected exactly one H1, found ${matches.length}`);
};

const assertNoForbiddenPhrases = (html, route) => {
  for (const phrase of forbiddenPhrases) {
    if (html.includes(phrase)) errors.push(`/${route}/ contains prohibited CTA language: ${phrase}`);
  }
};

const allRouteHtml = [];

for (const category of categories) {
  const html = await assertFile(category.slug);
  allRouteHtml.push([category.slug, html]);
  assertOneH1(html, category.slug);
  assertIncludes(html, category.slug, [
    category.title,
    category.description,
    "Buyer problem:",
    category.problemStatement,
    "Compare Products",
    "Recommended starting point:",
    "Product comparison",
    "Product ladder",
    "How to choose",
    "Available services",
    "Category FAQ",
    "Related growth paths",
    "Secure checkout is completed through Stan Store",
    "Are these free consultations?",
    "Where does checkout happen?",
    "Can I compare services before buying?",
    "What happens after purchase?"
  ]);

  for (const productId of category.productIds) {
    const product = catalogProducts.find((item) => item.id === productId);
    if (product && !html.includes(product.name)) {
      errors.push(`/${category.slug}/ missing category product: ${product.name}`);
    }
    if (product && !html.includes(product.internalUrl)) {
      errors.push(`/${category.slug}/ missing internal product link: ${product.internalUrl}`);
    }
  }

  if (category.id === "use-ai") {
    assertIncludes(html, category.slug, ["View Realtor GPT Products", "/use-ai/realtor-gpt/"]);
  }
}

const services = await assertFile("services");
allRouteHtml.push(["services", services]);
assertOneH1(services, "services");
assertIncludes(services, "services", ["ZYNE Paid Services", "Product comparison", "Every product links to a ZYNE detail page", "Secure checkout is completed through Stan Store"]);

const intelligence = await assertFile("intelligence");
allRouteHtml.push(["intelligence", intelligence]);
assertOneH1(intelligence, "intelligence");
assertIncludes(intelligence, "intelligence", ["ZYNE Intelligence", "Before execution comes intelligence.", "Product comparison", "Recommended Intelligence Sequence", "Collection questions", "Secure checkout is completed through Stan Store"]);
for (const productId of intelligenceProductIds) {
  const product = catalogProducts.find((item) => item.id === productId);
  if (product && !intelligence.includes(product.name)) errors.push(`/intelligence/ missing product: ${product.name}`);
}

const delivery = await assertFile("delivery");
allRouteHtml.push(["delivery", delivery]);
assertOneH1(delivery, "delivery");
assertIncludes(delivery, "delivery", ["ZYNE Delivery", "From strategy to execution.", "Product comparison", "Service families", "Delivery Service Families", "Collection questions", "Secure checkout is completed through Stan Store"]);
for (const family of deliveryFamilies) {
  if (!delivery.includes(family.name)) errors.push(`/delivery/ missing delivery family: ${family.name}`);
}

const realtorGpt = await assertFile(join("use-ai", "realtor-gpt"));
allRouteHtml.push([join("use-ai", "realtor-gpt"), realtorGpt]);
assertOneH1(realtorGpt, join("use-ai", "realtor-gpt"));
assertIncludes(realtorGpt, "use-ai/realtor-gpt", ["Realtor GPT Products", "real estate agents and teams", "Product comparison", "Secure checkout is completed through Stan Store"]);

for (const product of catalogProducts) {
  const route = join("services", product.slug);
  const html = await assertFile(route);
  allRouteHtml.push([route, html]);
  assertOneH1(html, route);
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
  allRouteHtml.push([route, html]);
  assertOneH1(html, route);
  assertIncludes(html, route, ["Legal and checkout clarity", "Secure checkout is completed through Stan Store"]);
}

for (const [route, html] of allRouteHtml) {
  assertNoForbiddenPhrases(html, route);
}

if (errors.length) {
  console.error("Generated route validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Generated route validation passed: ${catalogProducts.length} products, ${categories.length} growth paths, collection pages, subroutes, and policy routes.`);
