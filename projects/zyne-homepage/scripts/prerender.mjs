import { readFile, writeFile } from "node:fs/promises";
import { buildSchema, renderHomePage } from "../src/render-prd-1-2a.js";

const path = new URL("../dist/index.html", import.meta.url);
let html = await readFile(path, "utf8");
const closingHead = "</" + "head>";

html = html.replace('<div id="app"></div>', `<div id="app">${renderHomePage()}</div>`);

if (!html.includes('rel="canonical"')) {
  html = html.replace(closingHead, '    <link rel="canonical" href="https://zyne.store/" />\n  ' + closingHead);
}

if (!html.includes('type="application/ld+json"')) {
  const json = JSON.stringify(buildSchema());
  html = html.replace(closingHead, '    <script type="application/ld+json">' + json + '</script>\n  ' + closingHead);
}

await writeFile(path, html);
