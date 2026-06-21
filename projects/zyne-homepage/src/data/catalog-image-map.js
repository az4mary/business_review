import { canonicalImagePath } from "./catalog-standards.js";

export const productImageMigrationMap = [
  { id: "google-bp-mini-audit", current: "catalog/Google_BP_Mini_Audit_thumbnail.webp", canonical: canonicalImagePath("google-business-profile-mini-audit") },
  { id: "website-quick-win-audit", current: "catalog/Website_Quick_Win_Audit_thumbnail.webp", canonical: canonicalImagePath("website-quick-win-audit") },
  { id: "social-media-quick-audit", current: "catalog/Social_Media_Quick_Audit_thumbnail.webp", canonical: canonicalImagePath("social-media-quick-audit") },
  { id: "homepage-fix-pack", current: "catalog/Homepage_Fix_Pack_thumbnail.webp", canonical: canonicalImagePath("homepage-fix-pack") },
  { id: "starter-brand-kit", current: "catalog/Starter_Brand_Kit_thumbnail.webp", canonical: canonicalImagePath("starter-brand-kit") },
  { id: "growth-brand-kit", current: "catalog/Growth_Brand_Kit_thumbnail.webp", canonical: canonicalImagePath("growth-brand-kit") },
  { id: "premium-brand-kit", current: "catalog/Premium_Brand_Kit_thumbnail.webp", canonical: canonicalImagePath("premium-brand-kit") },
  { id: "realtor-gpt-starter-kit", current: "catalog/Realtor_GPT_Starter_Kit_thumbnail.webp", canonical: canonicalImagePath("realtor-gpt-starter-kit") },
  { id: "realtor-gpt-growth-kit", current: "catalog/Realtor_GPT_Growth_Kit_thumbnail.webp", canonical: canonicalImagePath("realtor-gpt-growth-kit") },
  { id: "executive-briefing", current: "catalog/Executive_Briefing_thumbnail.webp", canonical: canonicalImagePath("executive-briefing") },
  { id: "visibility-audit", current: "catalog/Visibility_Audit_thumbnail.webp", canonical: canonicalImagePath("visibility-audit") },
  { id: "growth-roadmap", current: "catalog/Growth_Roadmap_thumbnail.webp", canonical: canonicalImagePath("growth-roadmap") },
  { id: "market-positioning", current: "catalog/Market_Positioning_thumbnail.webp", canonical: canonicalImagePath("market-positioning") },
  { id: "ai-integration", current: "catalog/AI_Integration_thumbnail.webp", canonical: canonicalImagePath("ai-integration") },
  { id: "starter-ai-chatbot-kit", current: "catalog/Starter_AI_Chatbot_Kit_thumbnail.webp", canonical: canonicalImagePath("starter-ai-chatbot-kit") },
  { id: "experience-bank", current: "catalog/Experience_Bank_thumbnail.webp", canonical: canonicalImagePath("experience-bank") },
  { id: "referral-kit", current: "catalog/Referral_Kit_thumbnail.webp", canonical: canonicalImagePath("referral-kit") },
  { id: "origination-system", current: "catalog/Origination_System_thumbnail.webp", canonical: canonicalImagePath("origination-system") },
  { id: "sector-authority", current: "catalog/Sector_Authority_thumbnail.webp", canonical: canonicalImagePath("sector-authority") },
  { id: "web-architecture", current: "catalog/Web_Architecture_thumbnail.webp", canonical: canonicalImagePath("web-architecture") },
  { id: "operational-audit", current: "catalog/Operational_Audit_thumbnail.webp", canonical: canonicalImagePath("operational-audit") },
  { id: "competitor-readiness", current: "catalog/Competitor_Readiness_thumbnail.png", canonical: canonicalImagePath("competitor-readiness") }
];

export const canonicalImageByProductId = Object.fromEntries(
  productImageMigrationMap.map((item) => [item.id, item.canonical])
);
