import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const file = join("dist", "homedetail", "7101-wendemere-st-houston-tx-77088", "index.html");
const labels = ["Bathroom", "Bedroom", "Living room", "Dining area", "Front exterior", "Kitchen", "Bedroom"];
let html = await readFile(file, "utf8");

let jsonIndex = 0;
html = html.replace(/"label":"[^"]+"/g, () => `"label":"${labels[jsonIndex++] || "Property image"}"`);
let tileIndex = 0;
html = html.replace(/(<button class="gallery-tile[\s\S]*?<img[^>]*alt=")[^"]+("[\s\S]*?<span>)[^<]+(<\/span><\/button>)/g, (match, beforeAlt, afterAlt, close) => {
  const label = labels[tileIndex++] || "Property image";
  return `${beforeAlt}${label} at 7101 Wendemere St${afterAlt}${label}${close}`;
});

await writeFile(file, html);
console.log("Patched Wendemere property route gallery labels.");
