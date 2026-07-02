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

