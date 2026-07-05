import { mkdir, readdir, copyFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const sourceDir = process.argv[2];
if (!sourceDir) throw new Error("Usage: node scripts/prepare-property-images.mjs <source-directory>");

const root = "public/assets/properties/7101-wendemere-st-houston-tx-77088";
const originalDir = join(root, "original");
const displayDir = join(root, "display");
const thumbnailDir = join(root, "thumbnail");
await Promise.all([originalDir, displayDir, thumbnailDir].map((dir) => mkdir(dir, { recursive: true })));

const files = (await readdir(sourceDir)).filter((name) => /\.(?:jpe?g|png|webp)$/i.test(name));
for (const file of files) {
  const input = join(sourceDir, file);
  const stem = basename(file, extname(file)).toLowerCase();
  await copyFile(input, join(originalDir, file));
  await sharp(input).rotate().resize({ width: 1600, height: 1200, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(join(displayDir, `${stem}.webp`));
  await sharp(input).rotate().resize({ width: 260, height: 180, fit: "cover", position: "centre" }).webp({ quality: 76 }).toFile(join(thumbnailDir, `${stem}.webp`));
}
console.log(`Prepared ${files.length} property images.`);
