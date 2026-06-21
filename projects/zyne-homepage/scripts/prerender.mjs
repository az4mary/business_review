import { readFile, writeFile } from "node:fs/promises";
import { buildSchema, renderHomePage } from "../src/render.js";

const path = new URL("../dist/index.html", import.meta.url);
let html = await readFile(path, "utf8");

html = html.replace('<div id="app"></div>', `<div id="app">${renderHomePage()}</div>`);

if (!html.includes('rel="canonical"')) {
  html = html.replace("</head>", '    <link rel="canonical" href="https://zyne.store/" />\n  </head>');
}

if (!html.includes('type="application/ld+json"')) {
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json">${JSON.stringify(buildSchema())}</script>\n  </head>`,
  );
}

await writeFile(path, html);
