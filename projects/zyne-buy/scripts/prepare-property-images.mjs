import { mkdir, readdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const sourceDir = process.argv[2];
if (!sourceDir) throw new Error("Usage: node scripts/prepare-property-images.mjs <source-directory>");

const root = fileURLToPath(new URL("../../zyne-homepage/public/assets/catalog/properties/7101-wendemere-st/", import.meta.url));
const galleryDir = join(root, "gallery");
const thumbnailDir = join(root, "thumbnails");
const mobileThumbnailDir = join(root, "thumbnails-mobile");
await Promise.all([galleryDir, thumbnailDir, mobileThumbnailDir].map((dir) => mkdir(dir, { recursive: true })));

const files = (await readdir(sourceDir)).filter((name) => /\.(?:jpe?g|png|webp)$/i.test(name));
for (const file of files) {
  const input = join(sourceDir, file);
  const stem = basename(file, extname(file)).toLowerCase();
  await sharp(input).rotate().resize({ width: 1920, height: 1080, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toFile(join(galleryDir, `${stem}.webp`));
  await sharp(input).rotate().resize({ width: 1024, fit: "inside", withoutEnlargement: true }).webp({ quality: 75 }).toFile(join(thumbnailDir, `${stem}.webp`));
  await sharp(input).rotate().resize({ width: 768, fit: "inside", withoutEnlargement: true }).webp({ quality: 75 }).toFile(join(mobileThumbnailDir, `${stem}.webp`));
}
console.log(`Prepared ${files.length} property images.`);
