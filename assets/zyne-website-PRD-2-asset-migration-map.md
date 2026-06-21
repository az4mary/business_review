# PRD 2 — Product Asset Migration Map

## Canonical folders

```txt
assets/catalog/
projects/zyne-homepage/public/assets/catalog/
```

## Canonical filename rule

```txt
product-slug-thumbnail.png
```

## Migration map

| Product ID | Current catalog reference | Canonical target |
|---|---|---|
| google-bp-mini-audit | catalog/Google_BP_Mini_Audit_thumbnail.webp | catalog/google-business-profile-mini-audit-thumbnail.png |
| website-quick-win-audit | catalog/Website_Quick_Win_Audit_thumbnail.webp | catalog/website-quick-win-audit-thumbnail.png |
| social-media-quick-audit | catalog/Social_Media_Quick_Audit_thumbnail.webp | catalog/social-media-quick-audit-thumbnail.png |
| homepage-fix-pack | catalog/Homepage_Fix_Pack_thumbnail.webp | catalog/homepage-fix-pack-thumbnail.png |
| starter-brand-kit | catalog/Starter_Brand_Kit_thumbnail.webp | catalog/starter-brand-kit-thumbnail.png |
| growth-brand-kit | catalog/Growth_Brand_Kit_thumbnail.webp | catalog/growth-brand-kit-thumbnail.png |
| premium-brand-kit | catalog/Premium_Brand_Kit_thumbnail.webp | catalog/premium-brand-kit-thumbnail.png |
| realtor-gpt-starter-kit | catalog/Realtor_GPT_Starter_Kit_thumbnail.webp | catalog/realtor-gpt-starter-kit-thumbnail.png |
| realtor-gpt-growth-kit | catalog/Realtor_GPT_Growth_Kit_thumbnail.webp | catalog/realtor-gpt-growth-kit-thumbnail.png |
| executive-briefing | catalog/Executive_Briefing_thumbnail.webp | catalog/executive-briefing-thumbnail.png |
| visibility-audit | catalog/Visibility_Audit_thumbnail.webp | catalog/visibility-audit-thumbnail.png |
| growth-roadmap | catalog/Growth_Roadmap_thumbnail.webp | catalog/growth-roadmap-thumbnail.png |
| market-positioning | catalog/Market_Positioning_thumbnail.webp | catalog/market-positioning-thumbnail.png |
| ai-integration | catalog/AI_Integration_thumbnail.webp | catalog/ai-integration-thumbnail.png |
| starter-ai-chatbot-kit | catalog/Starter_AI_Chatbot_Kit_thumbnail.webp | catalog/starter-ai-chatbot-kit-thumbnail.png |
| experience-bank | catalog/Experience_Bank_thumbnail.webp | catalog/experience-bank-thumbnail.png |
| referral-kit | catalog/Referral_Kit_thumbnail.webp | catalog/referral-kit-thumbnail.png |
| origination-system | catalog/Origination_System_thumbnail.webp | catalog/origination-system-thumbnail.png |
| sector-authority | catalog/Sector_Authority_thumbnail.webp | catalog/sector-authority-thumbnail.png |
| web-architecture | catalog/Web_Architecture_thumbnail.webp | catalog/web-architecture-thumbnail.png |
| operational-audit | catalog/Operational_Audit_thumbnail.webp | catalog/operational-audit-thumbnail.png |
| competitor-readiness | catalog/Competitor_Readiness_thumbnail.png | catalog/competitor-readiness-thumbnail.png |

## Operator rule after migration

To replace a product image after PRD 2 standardization:

1. Keep the exact canonical filename and extension.
2. Replace the file in `assets/catalog/`.
3. Replace the same file in `projects/zyne-homepage/public/assets/catalog/`.
4. Rebuild only if the source site must regenerate static output.

No code change should be required when the filename and extension do not change.
