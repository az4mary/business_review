---

# ⚠️ MANDATORY RULES:

1. DO NOT MODIFY THE RULES AND DO NOT DELETE/MODIFY ANY CONTENT IN THIS FILE.
2. ⚠️ Always adhere to ALL instructions/steps/format or ask for approvals before you deviate from the plan.
3. READ complete file without skipping/search chunk from top to bottom before you start the task so you can understand the correct sequence to execute the task.
4. Find/Replace/edit ONLY (NOTHING ELSE) requested blocks exactly as in the Patch Instructions.
5. Follow the steps of the task and just report as-is even if it was not the expected outcome, do not skip a step even though there is a delay.
6. Honor the work breaks in any to update the report and pause for next instruction.
7. Commit changes regularly - Push to github origin via the existing MAIN branch. 
8. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know the required file has been updated with your comment/report.
9. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
10. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts.

---

# PATCH 1 - Modular Architecture Blueprint
Here is the exact developer blueprint to tear down the monolithic script and rebuild it into the robust, 3-file modular architecture.
D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage

### Step 1: Create the Data Layer

Create a new file to hold our property data separately from the design.

**Create File:** `src/data/properties.mjs`
**Code:**

```javascript
export const properties = [
  {
    id: "7101-wendemere-st-houston-tx-77088",
    template: "rental", // The routing key
    canonical: "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/",
    details: {
      address: "7101 Wendemere St",
      city: "Houston",
      state: "TX",
      zip: "77088",
      price: "$1,495/month",
      beds: "3",
      baths: "1 full",
      interior: "1,064 sqft",
      lot: "7,250 sqft",
      status: "For Rent · Active",
      description: "This well-maintained three-bedroom bungalow offers comfort, space, and convenience. Enjoy a covered front porch, a large lot, and an open layout that connects the kitchen and dining area seamlessly. With no HOA and easy access to major roads, schools, and shopping, this home is ready for you."
    },
    agent: {
      name: "Carissa Weber",
      badge: "PLATINUM",
      brokerage: "Better Homes and Gardens Real Estate",
      market: "Gary Greene - Sugar Land",
      profileUrl: "https://www.har.com/carissa-weber/agent_WEBERC",
      photo: "/assets/agents/carissa-weber.png"
    }
  }
];

export const navItems = [
  ["Services", "/services/"],
  ["Visibility", "/grow-my-visibility/"],
  ["Brand", "/build-my-brand/"],
  ["Business", "/improve-my-business/"],
  ["AI", "/use-ai/"],
  ["Conversion", "/convert-more-clients/"],
  ["Intelligence", "/intelligence/"],
  ["Delivery", "/delivery/"]
];

```

### Step 2: Create the Rental Template Factory

This file will contain all the CSS, bespoke SVGs, and HTML string literals currently cluttering your main script. It takes data as an input and returns the finalized HTML string.

**Create File:** `scripts/templates/template-rental.mjs`
*(Note: Place the custom SVG constants like `cloverleafIcon`, `lotIcon`, etc. at the top of this file, just below the import).*

**Code:**

```javascript
import { Icons } from "../property-icons.mjs";

// [INSERT ALL BESPOKE SVGs HERE: cloverleafIcon, lotIcon, porchIcon, etc. from the original script]

export function buildRentalPage(propertyData, agentData, photos, visiblePhotos, primaryImage, navItems) {
  const property = propertyData;
  const agent = agentData;
  const canonical = property.canonical;

  const nav = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

  const tile = (photo, className = "") => {
    if (!photo) return "";
    return `
      <button class="tile ${className}" type="button" data-photo="${photo.index}">
        <img src="${photo.src}" alt="${photo.label} at ${property.address}">
        ${className === "hero-photo" ? `<b class="status">${property.status}</b>` : ""}
      </button>
    `;
  };

  const item = (icon, title, copy) => `
    <article class="highlight-item">
      ${icon}<div><h3>${title}</h3><p>${copy}</p></div>
    </article>
  `;

  const cleanItem = (icon, title, copy) => `
    <article class="highlight-item clean-icon">
      ${icon}<div><h3>${title}</h3><p>${copy}</p></div>
    </article>
  `;

  const stat = (icon, value, label) => `<article class="stat">${icon}<b>${value}</b><small>${label}</small></article>`;
  const metric = (icon, label, value) => `<article>${icon}<div class="metric-info"><b>${value}</b><small>${label}</small></div></article>`;
  const feature = (icon, title, copy) => `<article class="feature-item">${icon}<h3>${title}</h3><p>${copy}</p></article>`;
  const tag = (value) => `<span>${value}</span>`;
  const row = (label, value) => `<div><span>${label}</span><b>${value}</b></div>`;

  // [INSERT const schema = {...} HERE from original script]
  // [INSERT const css = \`...\` HERE from original script]
  // [INSERT const header, topbar, gallery, summary, stats, special, overview, homeFeatures, neighborhood, cta, footer, lightbox, clientScript HERE from original script]

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#050505">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800;900&display=block" rel="stylesheet">
  <title>${property.address} ${property.city} ${property.state} ${property.zip} Rental | ZYNE Property Detail</title>
  <meta name="description" content="Three-bedroom Houston rental with covered porch, large lot, open layout, and clear property details.">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg">
  <meta property="og:title" content="${property.address} Rental | ZYNE Property Detail">
  <meta property="og:description" content="Three-bedroom Houston rental with covered porch, large lot, open layout.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="ZYNE">
  <meta property="og:image" content="${primaryImage}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>${css}</style>
</head>
<body>
  ${header}
  <main class="page">
    ${topbar}
    <div class="hero">
      <div class="left">${gallery}${stats}</div>
      ${summary}
    </div>
    ${special}${overview}${homeFeatures}${neighborhood}${cta}${footer}
  </main>
  ${lightbox}${clientScript}
</body>
</html>`;
}

```

### Step 3: Rewrite the Build Script (The Router)

This script replaces your old monolithic generator. It acts solely as a controller: it reads the filesystem, handles image sorting, passes the payload to the correct template, and writes the output.

**File to Overwrite:** `scripts/generate-property-route.mjs`
*(Note: You can rename this file to `generate-properties.mjs` in your `package.json` build step later if you choose).*

**Code:**

```javascript
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
    html = buildRentalPage(prop.details, prop.agent, photos, visible, primaryImage, navItems);
  } else if (prop.template === "investment") {
    // html = buildInvestmentPage(...) -> We will add this next!
  }

  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html);

  console.log(`Generated ${route}/index.html using '${prop.template}' template with ${photos.length} image(s)`);
}

```

### Step 4: Dry Run & Validation

Implement these file splits, then run `npm run build`.
The result should be visually identical to the live site right now. The output log should read: `Generated homedetail/7101-wendemere-st-houston-tx-77088/index.html using 'rental' template with 9 image(s)`.

### Developer Report Format

```text
## Modular Architecture Migration Report
- Commit Hash: [Insert Short Hash]
- Build Status: [Pass / Fail]
- Validation Checks:
  - [ ] `src/data/properties.mjs` created and populated.
  - [ ] `scripts/templates/template-rental.mjs` established with all SVGs/CSS.
  - [ ] `scripts/generate-property-route.mjs` rewritten to act as router.
  - [ ] Local build completes successfully.
  - [ ] Generated `dist/homedetail/.../index.html` matches original layout.
- Notes / Friction points: [Any issues encountered]

```

Once this is confirmed passing, we can drop the new `template-investment.mjs` right into the `templates/` folder and flip the switch!
