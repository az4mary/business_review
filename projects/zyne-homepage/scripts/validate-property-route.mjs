import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const route = "homedetail/7101-wendemere-st-houston-tx-77088";
const html = await readFile(join("dist", route, "index.html"), "utf8");
const imageFiles = await readdir(join("dist", route, "images"));

const required = [
  "favicon.svg",
  "index,follow",
  "application/ld+json",
  "SingleFamilyResidence",
  "For rent",
  "$1,495/month",
  "Renter decision guide",
  "Visitor checklist",
  "data-lightbox",
  "Bathroom",
  "Front exterior",
  "Product education and service details are provided on ZYNE",
  "Privacy Policy",
  "Cookie Policy",
  "href=\"/services/\"",
  "href=\"/privacy/\"",
  "href=\"/cookie-policy/\""
];
const forbidden = [
  "SEO and AI crawler readiness",
  "Verification note",
  "Premium property presentation and strategic execution"
];

const missing = required.filter((marker) => !html.includes(marker));
for (const marker of forbidden) if (html.includes(marker)) missing.push(`remove ${marker}`);
if (html.includes("noindex")) missing.push("remove noindex");
if (!imageFiles.some((file) => [".jpg", ".jpeg", ".png", ".webp", ".avif"].some((ext) => file.toLowerCase().endsWith(ext)))) missing.push("property images");

if (missing.length) {
  console.error(`Property route validation failed: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Property route validation passed.");
