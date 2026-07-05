import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageCss = readFileSync(new URL("../src/styles/page.css", import.meta.url), "utf8");
const mainJs = readFileSync(new URL("../src/main.js", import.meta.url), "utf8");
const iconsJs = readFileSync(new URL("../src/components/icons.js", import.meta.url), "utf8");

test("pixel-critical Page 1 geometry remains locked", () => {
  assert.match(pageCss, /grid-template-columns:\s*811px 796px/);
  assert.match(pageCss, /\.summary-grid[^}]*height:\s*325px/);
  assert.match(pageCss, /\.tag-row[^}]*height:\s*76px/);
  assert.match(pageCss, /\.highlight-row[^}]*height:\s*136px/);
  assert.match(pageCss, /\.description[^}]*width:\s*420px/);
  assert.match(pageCss, /top:\s*17px;\s*bottom:\s*18px/);
});

test("property typography is bundled Roboto while icons remain inline SVG", () => {
  assert.match(mainJs, /@fontsource\/roboto\/latin-400\.css/);
  assert.match(mainJs, /@fontsource\/roboto\/latin-500\.css/);
  assert.match(mainJs, /@fontsource\/roboto\/latin-700\.css/);
  assert.match(iconsJs, /<svg class=/);
  assert.doesNotMatch(iconsJs, /<img|\.png|\.webp|\.jpg/);
});
