import { catalogProducts } from "../src/data/products.js";
import { catalogAssetPolicy } from "../src/data/catalog-standards.js";
import { canonicalImageByProductId } from "../src/data/catalog-image-map.js";

const rows = catalogProducts.map((product) => {
  const canonical = canonicalImageByProductId[product.id];
  const isCanonical = product.image === canonical;
  return {
    id: product.id,
    slug: product.slug,
    currentImage: product.image,
    canonicalImage: canonical,
    status: isCanonical ? "canonical" : "needs-migration"
  };
});

const needsMigration = rows.filter((row) => row.status === "needs-migration");

console.log("ZYNE catalog image migration report");
console.log(`Canonical root asset folder: ${catalogAssetPolicy.canonicalRootAssetDir}`);
console.log(`Canonical source asset folder: ${catalogAssetPolicy.canonicalSourceAssetDir}`);
console.log(`Products checked: ${rows.length}`);
console.log(`Needs migration: ${needsMigration.length}`);
console.table(rows);

if (needsMigration.length) {
  console.log("Migration copy targets:");
  for (const row of needsMigration) {
    console.log(`- ${row.id}: ${row.currentImage} -> ${row.canonicalImage}`);
  }
}
