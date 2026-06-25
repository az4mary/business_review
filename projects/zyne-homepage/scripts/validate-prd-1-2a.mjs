import { readFileSync } from "node:fs";
import { diagnosticRoutes } from "../src/data/diagnostics.js";
import { renderHomePage } from "../src/render-prd-1-2a.js";

const html = renderHomePage();
const mainJs = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
const prdCss = readFileSync(new URL("../src/styles/prd-1-2a.css", import.meta.url), "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const requiredHtmlMarkers = [
  'id="diagnostic-search"',
  'data-diagnostic-search',
  'id="diagnostic-select"',
  'Find My Solution',
  'data-diagnostic-results',
  'Show full homepage',
  'data-return-context',
  'data-return-action',
  'data-source-section="delivery"',
  'data-source-section="diagnostic-search"',
  'id="strategic-services"',
  'id="final-cta"',
  'mobile-sticky-cta',
  'Secure Stan Store checkout',
  'Cookie policy'
];

requiredHtmlMarkers.forEach((marker) => assert(html.includes(marker), `Missing homepage marker: ${marker}`));

const prohibitedPhrases = [
  "Schedule a Free Call",
  "Book a Free Consultation",
  "Get a Free Strategy Session",
  "Contact Us for Pricing",
  "Talk to Sales",
  "Request a Free Audit"
];

prohibitedPhrases.forEach((phrase) => assert(!html.includes(phrase), `Prohibited CTA phrase found: ${phrase}`));

assert(diagnosticRoutes.length >= 7, "Diagnostic chooser must include at least seven buyer symptom options.");

for (const route of diagnosticRoutes) {
  assert(route.id && route.symptom, `Diagnostic route is missing id or symptom: ${JSON.stringify(route)}`);
  assert(html.includes(`<option value="${route.id}">`), `Missing select option for diagnostic route: ${route.id}`);
  assert(html.includes(`data-diagnostic-result="${route.id}"`), `Missing result panel for diagnostic route: ${route.id}`);
  assert(route.relatedProductIds?.length >= 3, `Diagnostic route must include at least three related products: ${route.id}`);
  assert(route.starterProductId, `Diagnostic route is missing starter product: ${route.id}`);
  assert(route.diagnosticProductId, `Diagnostic route is missing fallback diagnostic product: ${route.id}`);
}

const unclearRoute = diagnosticRoutes.find((route) => route.id === "unclear-problem");
assert(Boolean(unclearRoute), "Missing unclear-problem diagnostic route.");
assert(unclearRoute?.diagnosticProductId === "operational-audit", "Unclear-problem route must point to a paid diagnostic fallback.");
assert(html.includes("Start with a paid diagnostic before choosing a build."), "Unclear route must explain paid diagnostic fallback.");

const requiredMainMarkers = [
  'import "./styles/prd-1-2a.css"',
  'render-prd-1-2a.js',
  "revealDiagnosticResult",
  "diagnostic_search_submit",
  "zyneHomepageReturnContext",
  "sessionStorage.setItem",
  "data-source-section",
  "setMenuOpen",
  "mobile-menu-open"
];

requiredMainMarkers.forEach((marker) => assert(mainJs.includes(marker), `Missing main.js marker: ${marker}`));

const requiredCssMarkers = [
  ".diagnostic-section",
  ".diagnostic-controls",
  ".diagnostic-result-card",
  ".diagnostic-product",
  ".return-context",
  ".site-header #main-navigation",
  "body.mobile-menu-open",
  "footer { grid-template-columns: 1fr !important;",
  "--section-pad-mobile"
];

requiredCssMarkers.forEach((marker) => assert(prdCss.includes(marker), `Missing PRD 1.2A CSS marker: ${marker}`));

if (failures.length) {
  console.error("PRD 1.2A validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PRD 1.2A validation passed.");
