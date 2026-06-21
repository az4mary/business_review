export const catalogAssetPolicy = {
  canonicalRootAssetDir: "assets/catalog/",
  canonicalSourceAssetDir: "projects/zyne-homepage/public/assets/catalog/",
  imagePathPrefix: "catalog/",
  filenamePattern: "product-slug-thumbnail.ext",
  preferredExtension: ".png",
  allowedExtensions: [".png", ".webp", ".avif", ".jpg", ".jpeg"],
  forbiddenFragments: ["thumnail", "Thumnail", "Thumbnail"],
  replacementRule: "Replace the same filename and extension in both canonical asset folders. No code change is required when the filename and extension do not change."
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
