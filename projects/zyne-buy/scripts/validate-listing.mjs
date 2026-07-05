import { listing } from "../src/data/listing.js";
import { validateListing } from "../src/data/validateListing.js";
import { existsSync } from "node:fs";
import { join } from "node:path";

const errors = validateListing(listing);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
const expectedCopy = [
  "FOR SALE · SELLER FINANCING",
  "7101",
  "Wendemere St",
  "Houston, TX 77088",
  "$150,000",
  "Seller-financed Acres Homes investment opportunity with a 6.51% negotiated note, 20% down payment, oversized 7,250 sqft lot, zero HOA, and a value-add path toward $1,700/month target rent.",
  "PURCHASE PRICE",
  "DOWN PAYMENT",
  "NOTE RATE",
  "TARGET CASH FLOW",
  "Carissa Weber",
  "Better Homes and Gardens Real Estate",
  "Gary Greene – Sugar Land"
];
const serializedListing = JSON.stringify(listing);
const missingCopy = expectedCopy.filter((text) => !serializedListing.includes(text));
if (missingCopy.length || /[Ââ�]/.test(serializedListing)) {
  console.error(`Visible copy validation failed.${missingCopy.length ? ` Missing: ${missingCopy.join(" | ")}` : ""}`);
  process.exit(1);
}
const assetUrls = listing.photos.flatMap((photo) => [photo.src, photo.fullSrc, photo.thumbnailSrc]);
assetUrls.push(listing.agent.photo.src);
assetUrls.push("/assets/brand/zyne-logo.webp", "/assets/brand/zyne-favicon.svg", "/assets/brand/zyne-favicon.png");
const missingAssets = assetUrls.filter((url) => !existsSync(join("public", url.replace(/^\//, ""))));
if (missingAssets.length) {
  console.error(`Missing required assets:\n${missingAssets.join("\n")}`);
  process.exit(1);
}
console.log(`Validated ${listing.id}: ${listing.photos.length} gallery photos and 6 preview slots.`);
