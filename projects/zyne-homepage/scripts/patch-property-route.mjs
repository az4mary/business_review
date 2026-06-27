import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const file = join("dist", "homedetail", "7101-wendemere-st-houston-tx-77088", "index.html");
let html = await readFile(file, "utf8");
html = html.replace("SEO and AI crawler readiness", "Property highlights");
await writeFile(file, html);
console.log("Patched Wendemere property route.");
