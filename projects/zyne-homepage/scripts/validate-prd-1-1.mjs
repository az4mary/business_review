import { renderHomePage } from "../src/render.js";
import { products } from "../src/data/products.js";

const html = renderHomePage();
const errors = [];

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const requiredProductBadges = {
  "google-bp-mini-audit": "Best local visibility starter",
  "website-quick-win-audit": "Best website clarity starter",
  "social-media-quick-audit": "Best presence check",
  "homepage-fix-pack": "Best conversion quick fix",
  "starter-brand-kit": "Best brand foundation",
  "realtor-gpt-starter-kit": "Best AI starter",
  "executive-briefing": "Best strategy starter",
  "visibility-audit": "Best full visibility diagnostic"
};

const requiredGrowthCueText = [
  "Search / map discovery signal",
  "Identity / diamond brand signal",
  "Compass / strategy signal",
  "Spark / automation signal",
  "Arrow / conversion pathway signal"
];

const requiredIndustryCtas = [
  "View Authority Services",
  "View Realtor GPT Products",
  "View Visibility Products",
  "View Positioning Services",
  "View Trust-Building Services",
  "View Local Visibility Products",
  "View Origination Services",
  "View Visibility Audit"
];

const requiredEvents = [
  "mobile_sticky_find_growth_path_click",
  "mobile_sticky_shop_services_click",
  "hero_find_growth_path_click",
  "hero_shop_services_click",
  "product_card_view_product_click",
  "industry_cta_click"
];

const forbiddenCtaLanguage = [
  "Schedule a Free Call",
  "Book a Free Consultation",
  "Get a Free Strategy Session",
  "Talk to Sales",
  "Contact Us for Pricing",
  "Request a Free Audit"
];

for (const [id, badge] of Object.entries(requiredProductBadges)) {
  assert(products.some((product) => product.id === id), `${id}: missing from homepage products`);
  assert(html.includes(badge), `${id}: missing PRD 1.1 decision badge`);
}

for (const cue of requiredGrowthCueText) {
  assert(html.includes(cue), `Missing growth-path visual cue: ${cue}`);
}

for (const label of requiredIndustryCtas) {
  assert(html.includes(label), `Missing industry CTA: ${label}`);
}

for (const eventName of requiredEvents) {
  assert(html.includes(`data-event="${eventName}"`), `Missing analytics hook: ${eventName}`);
}

assert(html.includes("class=\"mobile-sticky-cta\""), "Missing mobile sticky CTA bar");
assert(html.includes("Find My Growth Path") && html.includes("Shop Services"), "Sticky CTA labels are incomplete");
assert(html.indexOf("hero_find_growth_path_click") < html.indexOf("hero_shop_services_click"), "Hero CTA order does not prioritize Find My Growth Path");
assert(html.includes("Intelligence tells you what to build. Delivery helps you build the assets, systems, and pathways."), "Missing Intelligence/Delivery bridge copy");
assert(html.includes("premium-compact-card"), "Missing mobile premium-card compaction marker");
assert((html.match(/trust-objection/g) || []).length >= 2, "First two FAQ trust objections are not emphasized");
assert(!html.includes("stan.store/"), "Homepage render must not direct CTA traffic straight to Stan Store checkout URLs");

for (const phrase of forbiddenCtaLanguage) {
  assert(!html.includes(phrase), `Forbidden free-call CTA language found: ${phrase}`);
}

if (errors.length) {
  console.error("PRD 1.1 validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("PRD 1.1 validation passed: homepage UX and conversion fixes are present.");
