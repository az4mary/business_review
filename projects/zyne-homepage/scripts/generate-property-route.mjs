import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { properties, navItems } from "../src/data/properties.mjs";
import { buildRentalPage } from "./templates/template-rental.mjs";

const labels = [
  "Bathroom", "Bedroom", "Living room", "Dining area", "Front exterior",
  "Kitchen", "Living room", "Kitchen", "Bedroom", "Laundry", "Exterior",
  "Bedroom", "Bathroom", "Kitchen", "Closet", "Yard", "Entry", "Detail"
];

const sorter = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

for (const prop of properties) {
  const route = `homedetail/${prop.id}`;
  const outputDir = join("dist", route);
  const sourceImageDir = join("..", "..", route, "images");
  const outputImageDir = join(outputDir, "images");
  const imageBase = `/${route}/images`;

  let imageFiles = [];
  try {
    imageFiles = (await readdir(sourceImageDir, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && /\.(?:jpe?g|png|webp|avif)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort(sorter.compare);

    await mkdir(outputImageDir, { recursive: true });

    await Promise.all(
      imageFiles.map((file) => copyFile(join(sourceImageDir, file), join(outputImageDir, file)))
    );
  } catch (error) {
    console.warn(`Images not copied for ${prop.id}: ${error.message}`);
  }

  const photos = imageFiles.map((file, index) => ({
    index,
    label: labels[index] || `Photo ${index + 1}`,
    src: `${imageBase}/${encodeURIComponent(file)}`
  }));

  const order = [4, 2, 3, 5, 1, 6, 0, 7, 8].filter((index) => photos[index]);
  const visible = [
    ...order.map((index) => photos[index]),
    ...photos.filter((photo) => !order.includes(photo.index))
  ].slice(0, 6);

  const primaryImage = visible[0]
    ? `https://zyne.store${visible[0].src}`
    : "https://zyne.store/assets/zyne-logo-optimized.webp";

  let html = "";

  // Template Routing Logic
  if (prop.template === "rental") {
    html = buildRentalPage(prop, photos, visible, primaryImage, navItems);
  } else if (prop.template === "investment") {
    // html = buildInvestmentPage(...) -> We will add this next!
  }

  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html);

  console.log(`Generated ${route}/index.html using '${prop.template}' template with ${photos.length} image(s)`);
}
