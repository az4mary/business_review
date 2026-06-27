import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const faviconTag = '<link rel="icon" href="/assets/favicon.svg">';
const htmlFiles = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const next = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(next);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(next);
    }
  }
}

await walk("dist");

let patched = 0;
for (const file of htmlFiles) {
  let html = await readFile(file, "utf8");
  if (html.includes('rel="icon"')) continue;
  html = html.replace("</head>", `${faviconTag}\n</head>`);
  await writeFile(file, html);
  patched += 1;
}

console.log(`Patched favicon on ${patched} generated page(s).`);
