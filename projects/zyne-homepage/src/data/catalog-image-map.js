import { canonicalImagePath } from "./catalog-standards.js";

export const productImageMigrationMap = [
  { id: "google-bp-mini-audit", current: "catalog/products/google-business-profile-mini-audit-thumbnail.webp", canonical: canonicalImagePath("google-business-profile-mini-audit") },
  { id: "website-quick-win-audit", current: "catalog/products/website-quick-win-audit-thumbnail.webp", canonical: canonicalImagePath("website-quick-win-audit") },
  { id: "social-media-quick-audit", current: "catalog/products/social-media-quick-audit-thumbnail.webp", canonical: canonicalImagePath("social-media-quick-audit") },
  { id: "homepage-fix-pack", current: "catalog/products/homepage-fix-pack-thumbnail.webp", canonical: canonicalImagePath("homepage-fix-pack") },
  { id: "starter-brand-kit", current: "catalog/products/starter-brand-kit-thumbnail.webp", canonical: canonicalImagePath("starter-brand-kit") },
  { id: "growth-brand-kit", current: "catalog/products/growth-brand-kit-thumbnail.webp", canonical: canonicalImagePath("growth-brand-kit") },
  { id: "premium-brand-kit", current: "catalog/products/premium-brand-kit-thumbnail.webp", canonical: canonicalImagePath("premium-brand-kit") },
  { id: "realtor-gpt-starter-kit", current: "catalog/products/realtor-gpt-starter-kit-thumbnail.webp", canonical: canonicalImagePath("realtor-gpt-starter-kit") },
  { id: "realtor-gpt-growth-kit", current: "catalog/products/realtor-gpt-growth-kit-thumbnail.webp", canonical: canonicalImagePath("realtor-gpt-growth-kit") },
  { id: "executive-briefing", current: "catalog/products/executive-briefing-thumbnail.webp", canonical: canonicalImagePath("executive-briefing") },
  { id: "visibility-audit", current: "catalog/products/visibility-audit-thumbnail.webp", canonical: canonicalImagePath("visibility-audit") },
  { id: "growth-roadmap", current: "catalog/products/growth-roadmap-thumbnail.webp", canonical: canonicalImagePath("growth-roadmap") },
  { id: "market-positioning", current: "catalog/products/market-positioning-thumbnail.webp", canonical: canonicalImagePath("market-positioning") },
  { id: "ai-integration", current: "catalog/products/ai-integration-thumbnail.webp", canonical: canonicalImagePath("ai-integration") },
  { id: "starter-ai-chatbot-kit", current: "catalog/products/starter-ai-chatbot-kit-thumbnail.webp", canonical: canonicalImagePath("starter-ai-chatbot-kit") },
  { id: "experience-bank", current: "catalog/products/experience-bank-thumbnail.webp", canonical: canonicalImagePath("experience-bank") },
  { id: "referral-kit", current: "catalog/products/referral-kit-thumbnail.webp", canonical: canonicalImagePath("referral-kit") },
  { id: "origination-system", current: "catalog/products/origination-system-thumbnail.webp", canonical: canonicalImagePath("origination-system") },
  { id: "sector-authority", current: "catalog/products/sector-authority-thumbnail.webp", canonical: canonicalImagePath("sector-authority") },
  { id: "web-architecture", current: "catalog/products/web-architecture-thumbnail.webp", canonical: canonicalImagePath("web-architecture") },
  { id: "operational-audit", current: "catalog/products/operational-audit-thumbnail.webp", canonical: canonicalImagePath("operational-audit") },
  { id: "competitor-readiness", current: "catalog/products/competitor-readiness-thumbnail.webp", canonical: canonicalImagePath("competitor-readiness") }
];

export const canonicalImageByProductId = Object.fromEntries(
  productImageMigrationMap.map((item) => [item.id, item.canonical])
);
