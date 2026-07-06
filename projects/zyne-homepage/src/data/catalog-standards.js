export const catalogAssetPolicy = {
  canonicalRootAssetDir: "projects/zyne-homepage/public/assets/catalog/products/",
  canonicalSourceAssetDir: "projects/zyne-homepage/public/assets/catalog/products/",
  imagePathPrefix: "catalog/products/",
  filenamePattern: "product-slug-thumbnail.ext",
  preferredExtension: ".webp",
  allowedExtensions: [".png", ".webp", ".avif", ".jpg", ".jpeg"],
  forbiddenFragments: ["thumnail", "Thumnail", "Thumbnail"],
  replacementRule: "Replace the same filename and extension in the canonical products folder. No code change is required when the filename and extension do not change."
};

export const canonicalImageName = (slug, extension = catalogAssetPolicy.preferredExtension) => {
  const normalizedExtension = extension.startsWith(".") ? extension : `.${extension}`;
  return `${slug}-thumbnail${normalizedExtension}`;
};

export const canonicalImagePath = (slug, extension = catalogAssetPolicy.preferredExtension) => {
  return `${catalogAssetPolicy.imagePathPrefix}${canonicalImageName(slug, extension)}`;
};

export const catalogValidationModes = {
  migration: "migration",
  strict: "strict"
};
