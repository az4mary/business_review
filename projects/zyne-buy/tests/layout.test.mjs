import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pageCss = readFileSync(new URL("../src/styles/page.css", import.meta.url), "utf8");
const routeHtml = readFileSync(new URL("../homedetail/7101-wendemere-st-houston-tx-77088/buy/index.html", import.meta.url), "utf8");
const tokensCss = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const iconsJs = readFileSync(new URL("../src/components/icons.js", import.meta.url), "utf8");

test("pixel-critical Page 1 geometry remains locked", () => {
  assert.match(pageCss, /grid-template-columns:\s*811px 796px/);
  assert.match(pageCss, /\.summary-grid[^}]*height:\s*325px/);
  assert.match(pageCss, /\.tag-row[^}]*height:\s*76px/);
  assert.match(pageCss, /\.highlight-row[^}]*height:\s*136px/);
  assert.match(pageCss, /\.description[^}]*width:\s*420px/);
  assert.match(pageCss, /top:\s*17px;\s*bottom:\s*18px/);
});

test("property typography uses the master local Inter bundle while icons remain inline SVG", () => {
  assert.match(routeHtml, /\/assets\/fonts\/fonts\.css/);
  assert.match(tokensCss, /--property-font:\s*"Inter Var", Inter/);
  assert.doesNotMatch(tokensCss, /Robo[to]{2}/);
  assert.match(iconsJs, /<svg class=/);
  assert.doesNotMatch(iconsJs, /<img|\.png|\.webp|\.jpg/);
});
