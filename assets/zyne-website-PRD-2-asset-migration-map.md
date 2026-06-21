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

## Known blocker / unresolved

An automated asset migration script was attempted during PRD 2 implementation, but the GitHub write action was blocked by safety checks. The migration must therefore be handled manually unless a smaller script is later approved and committed safely.

This blocker does not change the canonical asset rule. It only changes the execution method for moving files into the canonical folders.

## Manual asset migration steps

### Step 1 — Open the migration map

Use the table above as the working list. Each row contains:

- Product ID
- Current catalog reference
- Canonical target

### Step 2 — Locate the current source image

For each product, look for the current file in these locations:

```txt
assets/
assets/catalog/
projects/zyne-homepage/public/assets/
projects/zyne-homepage/public/assets/catalog/
```

Start with the current catalog reference from the table. If the file is not found under `assets/catalog/`, check the matching root filename under `assets/` and the source copy under `projects/zyne-homepage/public/assets/`.

### Step 3 — Create the canonical filename

Rename or copy the product image to the canonical target shown in the table.

The canonical rule is:

```txt
product-slug-thumbnail.png
```

Example:

```txt
Executive_Briefing_thumbnail.webp
```

becomes:

```txt
executive-briefing-thumbnail.png
```

If the existing image is `.webp` and the canonical target is `.png`, export or convert the image to PNG before final placement.

### Step 4 — Place the file in both canonical folders

Each final image must exist in both of these locations:

```txt
assets/catalog/[canonical-filename]
projects/zyne-homepage/public/assets/catalog/[canonical-filename]
```

The first path supports the currently published static site. The second path preserves the asset through future project builds.

### Step 5 — Update product catalog image references

After the files exist in both folders, update the product object in:

```txt
projects/zyne-homepage/src/data/products.js
```

Change the product `image` field from the current reference to the canonical reference.

Example:

```js
image: "catalog/Executive_Briefing_thumbnail.webp"
```

becomes:

```js
image: "catalog/executive-briefing-thumbnail.png"
```

### Step 6 — Update the image migration map status

After a product image has been migrated, update its row in this file if needed so the current reference and canonical target no longer conflict.

If keeping historical mapping, add a note that the product has been migrated instead of deleting the row.

### Step 7 — Search for legacy references

Search the repository for the old filename and common legacy patterns:

```txt
thumnail
_thumbnail
Product_Name_thumbnail
Executive_Briefing_thumbnail
Competitor_Readiness_thumbnail
```

Any production template or generated static page that still references the old filename should be updated to the canonical path.

### Step 8 — Rebuild generated routes

From the project folder, run:

```bash
cd projects/zyne-homepage
npm run validate:catalog
npm run report:catalog-migration
npm run build
```

During migration, `validate:catalog` may show migration warnings. Once all assets are canonical, run strict validation:

```bash
npm run validate:catalog:strict
```

### Step 9 — Verify live/static output

Check these generated or published locations:

```txt
/
/services/[product-slug]/
assets/catalog/[canonical-filename]
projects/zyne-homepage/public/assets/catalog/[canonical-filename]
```

Confirm that:

- The homepage product image loads.
- The product detail page image loads.
- No old filename is required for the product to display.
- The image fits the product stage without extra inner padding.

### Step 10 — Replacement rule after migration

Once a product is migrated, future image replacement should require only this:

1. Keep the same canonical filename and extension.
2. Replace the file in `assets/catalog/`.
3. Replace the same file in `projects/zyne-homepage/public/assets/catalog/`.
4. Rebuild only if generated static output needs to be refreshed.

No product data change should be required when the filename and extension remain unchanged.

## Operator rule after migration

To replace a product image after PRD 2 standardization:

1. Keep the exact canonical filename and extension.
2. Replace the file in `assets/catalog/`.
3. Replace the same file in `projects/zyne-homepage/public/assets/catalog/`.
4. Rebuild only if the source site must regenerate static output.

No code change should be required when the filename and extension do not change.
