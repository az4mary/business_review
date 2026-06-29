---

# ⚠️ MANDATORY RULES:

1. DO NOT MODIFY THE RULES AND DO NOT DELETE/MODIFY ANY CONTENT IN THIS FILE.
2. ⚠️ Always adhere to ALL instructions/steps/format or ask for approvals before you deviate from the plan.
3. READ complete file without skipping/search chunk from top to bottom before you start the task so you can understand the correct sequence to execute the task.
4. Find/Replace/edit ONLY (NOTHING ELSE) requested blocks exactly as in the Patch Instructions.
5. Follow the steps of the task and just report as-is even if it was not the expected outcome.
6. Commit changes regularly - Push to github origin via the existing MAIN branch. 
7. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know the required file has been updated with your comment/report.
8. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
9. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts.

---

# PATCH 1 - Implementation Plan: Typographic Determinism & Environmental Alignment

This comprehensive blueprint details the steps required to eliminate typographic layout drift across platforms and align the local development environment directly with the GitHub Actions automation layer.

---

## 1. Local Machine Environment Patch (Migrating to Native NPM)

To eliminate the brittle local `pnpm` workspace compatibility shims and match the execution layer defined in your GitHub Actions workflows, native `npm` must be restored to the local Windows 11 environment.

1. **Download and Run the Node.js Installer:** Download the official Node.js MSI installer (recommended LTS version or matching v22 to align with CI) to ensure full global tooling registration.
2. **Verify Environment Variables (`PATH`):** Ensure the installation path (typically `C:\Program Files\nodejs\`) is registered in the System Environment Variables under `PATH`.
3. **Confirm Native Execution:** Open a fresh Windows Terminal instance and verify both tools resolve natively:
```bash
node -v
npm -v

```



---

## 2. Codebase Patches (`generate-property-route.mjs`)

**Target File Path:** `projects/zyne-homepage/scripts/generate-property-route.mjs`

Apply the following two precise code modifications within the script:

### Part A: CSS Baseline Overhaul

Replace the upper portion of the `const css` template literal variable (stretching from `:root` down through the end of the `p { ... }` block) with this hardened, layout-stabilizing cross-platform reset:

```css
const css = `
:root {
  --bg: #050505;
  --panel: #0d0d0d;
  --panel-soft: #111111;
  --gold: #c99a2e;
  --gold2: #f1d37a;
  --gold-dark: #8a6118;
  --text: #f3ecde;
  --muted: #c9c3b8;
  --muted-dark: #7e7568;
  --line: rgba(201, 154, 46, .34);
}

/* ==========================================================================
   DETERMINISTIC BLUEPRINT CROSS-PLATFORM RESET
   ========================================================================== */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;

  /* Stabilize font rasterization engines across Windows/Linux */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-kerning: normal;
  
  /* Guarantee numeric widths align identically across platforms */
  font-variant-numeric: tabular-nums;
  font-size: 16px;
}

body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif; /* Explicitly prioritize the uniform web asset */
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, textarea, select {
  font: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

```

### Part B: HTML Head Font Injection

Locate the `const html` template literal variable and inject the Google Fonts preconnect and style element definitions directly above the `<title>` tag block to guarantee immediate, non-blocking font resolution:

```javascript
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#050505">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800;900&display=block" rel="stylesheet">

  <title>7101 Wendemere St Houston TX 77088 Rental | ZYNE Property Detail</title>

```

---

## 3. Local Dry-Run & Verification Procedure

With native `npm` fully operational on the local machine, you must verify execution matching the behavior of the GitHub runner environment:

1. **Navigate to the core workspace:**
```bash
cd projects/zyne-homepage

```


2. **Execute a clean production build using native npm:**
```bash
npm run build

```


3. **Boot the native local preview listener:**
```bash
npm run preview

```


4. **Inspect Layout Engine Font Delivery:** Open the preview link in your browser, launch the Developer Tools Console (`F12`), and execute the following evaluation check:
```javascript
document.fonts.check("16px Inter") ? "PASS: Inter loaded" : "FAIL: Inter missing";

```



---

## 4. Mandatory Verification Report Format

You must fill out and submit this exact verification report upon completing the implementation steps:

```markdown
### [ZYNE-TYPO-01] Verification Report — NPM Migration

#### 1. Environmental Alignment
- Local Host OS: [e.g., Windows 11 Pro Build 22631]
- Native Local Tooling: Node v_______ / npm v_______
- Path Status: Confirmed native `npm` execution without local shims/wrappers.

#### 2. Local Asset Verification
- [ ] Verified that `projects/zyne-homepage/scripts/generate-property-route.mjs` has been updated with the strict box-model reset (`*, *::before, *::after`).
- [ ] Verified that the Google Fonts `Inter` link element exists inside the compiled HTML header at `dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html`.
- [ ] Console command `document.fonts.check("16px Inter")` evaluates to `true` during a local native `npm run preview` testing session.

#### 3. Visual Layout Inspections (Local Browser vs. Cloud Runner)
- Font rendered for pricing ($1,495/month): [Inter / Segoe UI / Other]
- Bounding box alignment of text strings (No wrapping anomalies found on numbers): [Confirmed / Issues Observed]

#### 4. Developer Notes / Pipeline Observations
[Enter details here regarding any adjustments made during the dry-run]

```
