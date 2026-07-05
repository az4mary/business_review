import test from "node:test";
import assert from "node:assert/strict";
import { listing } from "../src/data/listing.js";
import { REQUIRED_SLOTS, validateListing } from "../src/data/validateListing.js";
import { DESIGN_WIDTH, DESIGN_HEIGHT, computeCanvasScale } from "../src/utils/scaling.js";

test("listing data satisfies the production contract", () => assert.deepEqual(validateListing(listing), []));
test("all six named preview slots are configured", () => assert.deepEqual(Object.keys(listing.previewSlots), REQUIRED_SLOTS));
test("native design canvas remains 1672 by 941", () => { assert.equal(DESIGN_WIDTH, 1672); assert.equal(DESIGN_HEIGHT, 941); });
test("canvas stays native at 1920x1080 and scales uniformly on smaller desktops", () => {
  assert.equal(computeCanvasScale(1920, 1080), 1);
  assert.equal(computeCanvasScale(1672, 941), 1);
  assert.equal(computeCanvasScale(1366, 768), Math.min(1366 / 1672, 768 / 941));
  assert.equal(computeCanvasScale(2560, 1440), 1);
});

test("preview placement and full-gallery order are independent", () => {
  const firstPreview = listing.previewSlots.hero.photoId;
  const reversed = [...listing.galleryOrder].reverse();
  assert.equal(firstPreview, "exterior");
  assert.notEqual(reversed[0], firstPreview);
  assert.equal(listing.photos.length, 9);
});

test("approved visible copy remains encoding-safe", () => {
  const copy = JSON.stringify(listing);
  assert.match(copy, /FOR SALE · SELLER FINANCING/);
  assert.match(copy, /7,250 sqft lot/);
  assert.match(copy, /Gary Greene – Sugar Land/);
  assert.doesNotMatch(copy, /[Ââ�]/);
});
