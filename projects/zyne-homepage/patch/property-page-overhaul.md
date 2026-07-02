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

I have overwritten a hardened version of **`projects/zyne-homepage/scripts/generate-property-route.mjs`** file.

The replacement script integrates all the structural layout fixes, fixes the photo count logic, eliminates the broken table grid matrix, overrides icon vector profiles globally, and adjusts the broken 3-column CTA section to properly frame the gold pillars.

---

### Verification and Delivery Plan

1. **Local Pre-flight Check:** Execute the local generation engine to compile the property route and ensure no errors are thrown:
```powershell
npm run build

```

2. **Push Patch:** Commit the changes to `generate-property-route.mjs` and push to `main`.
3. ⚠️ Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\property-page-overhaul-report.md” and write report. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---

# PATCH 1
This patch contains the raw, handcrafted SVG geometry for the missing bespoke icons, the double-chevron replacement, and the high-contrast CSS adjustment for the photo badge.

---

### 1. The Bespoke SVG Assets & Double Chevron

Add these custom SVG strings to `generate-property-route.mjs` directly below where `cloverleafIcon` is defined:

```javascript
// Bespoke Vector: 4-Quadrant Property Lot Map
const lotIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"></rect>
    <path d="M12 3v18M3 12h18"></path>
    <circle cx="7.5" cy="7.5" r="1"></circle>
    <circle cx="16.5" cy="7.5" r="1"></circle>
    <circle cx="7.5" cy="16.5" r="1"></circle>
    <circle cx="16.5" cy="16.5" r="1"></circle>
  </svg>
`;

// Bespoke Vector: House with Front Porch & Pillars
const porchIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9l6-5 6 5"></path>
    <path d="M8 9v12h8V9"></path>
    <path d="M3 14h18"></path>
    <path d="M4 14v7"></path>
    <path d="M20 14v7"></path>
    <path d="M4 21h16"></path>
  </svg>
`;

// Bespoke Vector: Kitchen Stove & Oven
const ovenIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="7" width="16" height="15" rx="1"></rect>
    <path d="M4 11h16"></path>
    <rect x="7" y="14" width="10" height="5" rx="1"></rect>
    <circle cx="8" cy="9" r="0.5"></circle>
    <circle cx="12" cy="9" r="0.5"></circle>
    <circle cx="16" cy="9" r="0.5"></circle>
    <path d="M5 7V4h14v3"></path>
    <path d="M8 4v3M16 4v3"></path>
  </svg>
`;

// Missing Mockup Asset: Double Trailing Chevron
const doubleChevronIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px; margin-left: 2px;">
    <path d="M7 17l5 -5l-5 -5M13 17l5 -5l-5 -5"></path>
  </svg>
`;

```

---

### 2. Injecting the Vectors into the Layout

**A. Update the "What's Special" block:**
Find the `const special = ...` variable and swap out the generic fallback icons with your new bespoke SVGs:

```javascript
const special = `
  <section class="section">
    <div class="title">
      <h2>What's Special</h2>
    </div>

    <div class="feature-grid">
      ${item(lotIcon, "Texas-size lot", "Spacious lot with outdoor potential.")}
      ${item(porchIcon, "Covered porch", "Classic covered front porch.")}
      ${item(Icons.shieldCheck, "No HOA", "More flexibility without HOA restrictions.")}
      ${item(Icons.graduationCap, "Near schools", "Near local schools and amenities.")}
      ${item(Icons.key, "Walk-in closets", "Generous bedroom storage.")}
      ${item(ovenIcon, "Open layout", "Open kitchen and dining flow.")}
    </div>
  </section>
`;

```

**B. Update the Buttons with the Double Chevron:**
Find the `summary` and `cta` variables. Replace `Icons.arrowRight` with `doubleChevronIcon`:

```javascript
// Inside const summary:
    <a class="button primary" href="#schedule">
      Schedule a Viewing ${doubleChevronIcon}
    </a>

// Inside const cta:
      <a id="schedule" class="button primary" href="/services/executive-briefing/">
        Schedule a Viewing ${doubleChevronIcon}
      </a>

```

---

### 3. Photo Count Badge Contrast Fix

Finally, to make the dynamic photo badge pop off the background image, we need to upgrade its CSS border from the faint `--line` to pure `--gold`, and slightly darken the background plate.

Locate the `.see-all span` block in the `css` string and replace it with this:

```css
.see-all span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: .55rem;
  align-items: center;
  background: rgba(5, 5, 5, .94);
  border: 1px solid var(--gold);
  color: var(--gold2);
  padding: .75rem 1.15rem;
  white-space: nowrap;
  font-weight: 850;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.see-all span .zyne-icon {
  color: var(--gold);
}

```

Drop these strings in, rebuild the file.

⚠️ Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\property-page-overhaul-report.md” and write report. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---

# PATCH 2
This is a fantastic approach. Regenerating 1,600+ lines of code risks introducing regression errors, hallucinated variables, or truncating the file entirely.

A targeted patch is the absolute safest, most professional way to handle this in a production environment.

Here is the comprehensive Developer Blueprint to execute the 11-point Master Hit List we compiled from the high-resolution mockups. Hand this directly to your developer.

---

# Technical Blueprint: Property Layout Precision Patch

**Target File:** `projects/zyne-homepage/scripts/generate-property-route.mjs`
**Objective:** Resolve 11 specific layout, typography, and vector asset discrepancies derived from high-resolution UI mockups.

## Part 1: Concrete Implementation Steps

1. **Inject Bespoke Assets:** Add the 9 new custom SVG strings into the variable declaration block.
2. **Update HTML Generators:** Add the `feature()` and `cleanItem()` template literal functions to handle the specific alignments and borderless states of the lower grids.
3. **Apply Targeted Find-and-Replace:** Overwrite specific constant variables (`special`, `overview`, `topbar`, etc.) to map the new icons, correct the descriptive copy, and fix the CTA button.
4. **Patch the CSS Block:** Replace specific CSS classes to correct the horizontal title line, the breadcrumb opacity, the sidebar typography, and the overview gutter constraint.

---

## Part 2: The Code Patch

### A. Asset Injection

**Find:** The line defining `doubleChevronIcon` (around line 52).
**Action:** Paste these new bespoke SVG assets directly below it:

```javascript
// Bespoke Vector: Single Back Arrow (Premium)
const arrowLeftIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; margin-right: 4px;">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
`;

// Bespoke Vector: Square Floorplan
const floorplanIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <path d="M3 9h18M9 21V9M15 3v6"/>
  </svg>
`;

// Bespoke Vector: Real Estate Yard Sign
const yardSignIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 22V4h12v8H8"/><path d="M4 22h16"/><path d="M11 4v-2"/><path d="M17 4v-2"/>
  </svg>
`;

// Bespoke Vector: Double Keys
const doubleKeysIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 18l2-2v-2h2v-2h2l4-4a3.5 3.5 0 1 0-5-5l-7 7v4h2v2z"/>
    <path d="M14 18l1-1v-1h1v-1h1l2-2a2 2 0 1 0-3-3l-4 4v2h1v1z"/>
  </svg>
`;

// Bespoke Vector: Refrigerator & Cabinetry
const fridgeIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="3" width="10" height="18" rx="1"/>
    <path d="M4 10h10M7 5v3M7 12v3M14 11h6M14 15h6M14 19h6"/>
  </svg>
`;

// Bespoke Vector: Open Double Doors
const doubleDoorsIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 22h16"/><path d="M6 22V4h12v18"/><path d="M12 4v18"/>
    <path d="M10 13h1M13 13h1"/>
  </svg>
`;

// Bespoke Vector: Layered Flooring
const flooringIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 14l10-5 10 5-10 5z"/><path d="M2 14v4l10 5 10-5v-4"/>
    <path d="M2 9l10-5 10 5-10 5z"/>
  </svg>
`;

// Bespoke Vector: Radar Target
const radarIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
    <path d="M12 3v18M3 12h18"/>
  </svg>
`;

// Bespoke Vector: Schoolhouse Building
const schoolIcon = `
  <svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3l8 5v14H4V8l8-5z"/><path d="M12 12v10"/>
    <path d="M8 22v-4a2 2 0 0 1 4 0v4"/><path d="M12 3v4"/><circle cx="12" cy="9" r="1"/>
  </svg>
`;

```

### B. Add Structure Functions

**Find:** The `const tag = ...` function definition.
**Action:** Add these two layout generator functions immediately above it:

```javascript
const feature = (icon, title, copy) => `
  <article class="feature-item">
    ${icon}
    <h3>${title}</h3>
    <p>${copy}</p>
  </article>
`;

const cleanItem = (icon, title, copy) => `
  <article class="highlight-item clean-icon">
    ${icon}
    <div>
      <h3>${title}</h3>
      <p>${copy}</p>
    </div>
  </article>
`;

```

### C. Overwrite Data & Grid Constants

**Action:** Carefully locate and *replace* these exact constant blocks to update the text copy, inject the new layout functions, map the bespoke icons, and fix the CTA chevron:

```javascript
// 1. Update Property Copy
const property = {
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
};

// 2. Fix Breadcrumb Arrow
const topbar = `
  <div class="topbar">
    <div class="breadcrumbs">
      <a href="/" style="display:flex;align-items:center;">${arrowLeftIcon} Back to Listings</a>
      <span class="slash">/</span>
      <span>${property.city}, ${property.state}</span>
      <span class="slash">/</span>
      <b>${property.address}</b>
    </div>
    <div class="actions">
      <button type="button">${Icons.heart} Save</button>
      <button type="button">${Icons.share} Share</button>
      <button type="button">${Icons.printer} Print</button>
    </div>
  </div>
`;

// 3. Fix Sidebar Icons (Interior & Lot Size)
// (Inside const summary ... locate the metrics div and replace it with:)
    <div class="metrics">
      ${metric(Icons.bed, "Bedrooms", property.beds)}
      ${metric(Icons.bath, "Baths", property.baths)}
      ${metric(floorplanIcon, "Interior", property.interior)}
      ${metric(lotIcon, "Lot size", property.lot)}
    </div>

// 4. Update Stats Bar (Available Now icon)
const stats = `
  <section class="stats">
    ${stat(Icons.home, "Singlefamily", "Property Type")}
    ${stat(yardSignIcon, "Available now", "Availability")}
    ${stat(Icons.fan, "Electric ceiling fan", "Cooling")}
    ${stat(Icons.flame, "Natural gas", "Heating")}
  </section>
`;

// 5. Update What's Special (Centered stack layout + text copy sync + Double keys)
const special = `
  <section class="section">
    <div class="title">
      <h2>What's Special</h2>
      <div class="title-line"></div>
    </div>
    <div class="feature-grid">
      ${feature(lotIcon, "Texas-size lot", "Spacious lot with plenty of outdoor potential.")}
      ${feature(porchIcon, "Covered porch", "Relax on the covered front porch with classic charm.")}
      ${feature(Icons.shieldCheck, "No HOA", "No HOA fees or restrictions for greater flexibility.")}
      ${feature(Icons.graduationCap, "Near schools", "Conveniently located near local schools and amenities.")}
      ${feature(doubleKeysIcon, "Walk-in closets", "Generous closet space in the bedrooms.")}
      ${feature(ovenIcon, "Open layout", "Open kitchen and dining flow for easy living and entertaining.")}
    </div>
  </section>
`;

// 6. Update Property Overview ("Singlefamily Home" data match)
const overview = `
  <section class="section">
    <div class="title">
      <h2>Property Overview</h2>
      <div class="title-line"></div>
    </div>
    <div class="overview">
      <p>${property.description}</p>
      <div class="overview-table">
        ${row("Address", `${property.address}, ${property.city}, ${property.state} ${property.zip}`)}
        ${row("Property type", "Singlefamily Home")}
        ${row("Status", "Available Now")}
        ${row("Monthly rent", property.price)}
        ${row("Beds", property.beds)}
        ${row("Baths", property.baths)}
        ${row("Interior", property.interior)}
        ${row("Lot size", property.lot)}
      </div>
    </div>
  </section>
`;

// 7. Update Home Features (Borderless cleanItem + SVG sync)
const homeFeatures = `
  <section class="section home-features">
    <div class="title">
      <h2>Home Features</h2>
      <div class="title-line"></div>
    </div>
    <div class="highlight-grid">
      ${cleanItem(Icons.fan, "Electric ceiling fan", "Comfortable airflow in living spaces")}
      ${cleanItem(Icons.flame, "Natural gas", "Efficient and reliable heating")}
      ${cleanItem(flooringIcon, "Hardwood & carpet", "Durable flooring with soft-touch comfort")}
      ${cleanItem(fridgeIcon, "Open kitchen", "Functional layout with ample cabinet space")}
      ${cleanItem(doubleDoorsIcon, "Walk-in closets", "Spacious storage in bedrooms")}
      ${cleanItem(Icons.washingMachine, "Washer / dryer hookups", "Convenient in-home laundry connections")}
    </div>
  </section>
`;

// 8. Update Neighborhood (Borderless cleanItem + SVG sync)
const neighborhood = `
  <section class="section neighborhood">
    <div class="title">
      <h2>Neighborhood Highlights</h2>
      <div class="title-line"></div>
    </div>
    <div class="highlight-grid">
      ${cleanItem(cloverleafIcon, "Easy Access", "Quick access to major highways and commuting routes")}
      ${cleanItem(radarIcon, "Local Amenities", "Close to shopping, dining, and everyday conveniences")}
      ${cleanItem(schoolIcon, "Community", "Established neighborhood with local schools nearby")}
    </div>
  </section>
`;

// 9. Fix Bottom CTA Chevron
// (Inside const cta ... replace Schedule a Viewing link with:)
      <a id="schedule" class="button primary" href="/services/executive-briefing/">
        Schedule a Viewing ${Icons.arrowRight}
      </a>

```

### D. CSS Replacements

**Action:** Locate these exact CSS classes inside the `const css = `` block and replace them completely:

```css
/* Sidebar Typography Corrections */
.metrics small,
.overview span,
.stat small {
  display: block;
  color: var(--muted-dark);
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: .68rem;
  margin-top: .25rem;
}

/* Breadcrumb Opacity */
.breadcrumbs .slash {
  color: var(--muted-dark);
  opacity: 0.5;
}

/* Hardened Integrated Title Line */
.title {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
.title h2 {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--gold2);
  font-size: 1.9rem;
  text-transform: uppercase;
  letter-spacing: .075em;
  margin: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.title h2::after {
  content: " •";
  color: var(--gold);
  margin-left: 0.65rem;
  font-weight: 900;
}
.title-line {
  flex: 1;
  height: 1px;
  background: var(--line);
  margin-left: 1.5rem;
}
/* Ensure you remove the old .title::after {} block entirely! */

/* What's Special Vertical Stack (replaces .feature-grid article logic) */
.feature-item {
  text-align: center;
  padding: 1.25rem .75rem;
  border-right: 1px solid rgba(201,154,46,.2);
}
.feature-item:last-child {
  border-right: 0;
}
.feature-item .zyne-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1.2rem;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--gold);
}
.feature-item h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .88rem;
  line-height: 1.35;
  margin: 0 0 .55rem;
}
.feature-item p {
  font-size: 14.5px;
  line-height: 1.65;
}

/* Property Overview Gutter Constraint */
.overview {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  gap: 4.5rem;
  align-items: start;
}
.overview p {
  max-width: 520px;
  font-size: 15.5px;
  line-height: 1.75;
}

/* Lower Grids: Stripped Bounding Boxes */
.clean-icon .zyne-icon {
  width: 42px;
  height: 42px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--gold);
}

```

---

## Part 3: Dry-Run & Validation

1. **Apply the patch.** Ensure the developer removes the obsolete `.title::after` CSS rule, as the line is now handled dynamically by `<div class="title-line"></div>`.
2. **Execute Local Build:**
```powershell
npm run build

```


3. **Verify Generation:** Ensure the CLI output ends with "Generated homedetail/7101-wendemere-st-houston-tx-77088/index.html with 9 copied image(s)" (or however many images currently exist).
4. **Push to CI/CD:** Commit the file to `main` with a descriptive message: `feat(ui): implement 11-point property layout hardening patch`.
5. **Run Automation:** Execute the `.github/workflows/capture-zyne-property-fullpage.yml` GitHub action manually.

## Part 4: Mandatory Developer Report Format

Have the developer reply back to you using exactly this format upon completion:

```text
## Layout Patch Implementation Report
- Commit Hash: [Insert Short Hash]
- Build Status: [Pass / Fail]
- Validation Checks:
  - [ ] 9 new SVGs mapped correctly.
  - [ ] 'What's Special' items successfully stacked vertically.
  - [ ] Lower grids confirmed borderless/background-free.
  - [ ] Typography tracks and spacing updated.
  - [ ] Horizontal title lines properly stretch to right container edge.
- Notes / Friction points: [Any issues encountered]

```

This strict methodology ensures we don't accidentally break the node logic, retains the structural integrity of your generator, and meticulously addresses every single detail from our Master Hit List.
