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


4. **Inspect Layout Engine Font Delivery:** Open the preview link in your in-app browser or launch and connect the edge browser with remote debugging enabled connection, launch the Developer Tools Console (`F12`), and execute the following evaluation check:
```javascript
document.fonts.check("16px Inter") ? "PASS: Inter loaded" : "FAIL: Inter missing";

```



---

## 4. Mandatory Verification Report Format

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\uniform-font-asset-report.md” and write report in the below requested format. Reply `DONE` in the chat conversation after you have updated the file with your comment.

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

# PATCH 2 - NPM Migration Continued

Based on the repository architecture, the `projects/zyne-homepage/` directory currently contains a `pnpm-lock.yaml` file, **not** a `package-lock.json` file.

Here are the concrete steps updated to explicitly handle the file creation and cleanup.

---

## 1. Concrete Code Patches (Updated with Lockfile Generation)

### Patch A: Generate the NPM Lockfile & Cleanup

1. Open a terminal and navigate to the project directory:
```bash
cd projects/zyne-homepage

```

2. Delete the obsolete pnpm lockfile so the repository doesn't have conflicting package managers:


```bash
rm pnpm-lock.yaml

```


3. Generate the new `package-lock.json` file by running a fresh install using the native `npm` you installed earlier:
```bash
npm install

```


4. Stage the newly created `projects/zyne-homepage/package-lock.json` file and the deletion of the `pnpm-lock.yaml` file to be committed to Git.

### Patch B: Surgical Triggers & Cache for Validation Workflow

**File:** `.github/workflows/zyne-homepage-validation.yml`

Replace the entire contents of the file with this code. It applies the surgical whitelist, adds the caching directive pointing to the new lockfile, and removes the redundant double-build steps:

```yaml
name: ZYNE Homepage Validation

on:
  pull_request:
    paths:
      - "projects/zyne-homepage/src/**"
      - "projects/zyne-homepage/scripts/**"
      - "projects/zyne-homepage/public/**"
      - "projects/zyne-homepage/index.html"
      - "projects/zyne-homepage/package.json"
      - "projects/zyne-homepage/package-lock.json"
      - "assets/catalog/**"
      - ".github/workflows/zyne-homepage-validation.yml"
  workflow_dispatch:

jobs:
  validate-homepage:
    name: Validate PRD catalog and build
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: projects/zyne-homepage

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
          cache-dependency-path: "projects/zyne-homepage/package-lock.json"

      - name: Install dependencies
        run: npm install

      - name: Report catalog migration status
        run: npm run report:catalog-migration

      - name: Build and validate generated site (Full Suite)
        run: npm run build

      - name: Strict catalog validation
        run: npm run validate:catalog:strict

```

### Patch C: Surgical Triggers & Cache for Publish Workflow

**File:** `.github/workflows/zyne-homepage-pages.yml`

Update the `on:` block to use the strict whitelist, and update the `setup-node` step to use the cache:

```yaml
name: Publish ZYNE Homepage

on:
  push:
    branches: [main]
    paths:
      - "projects/zyne-homepage/src/**"
      - "projects/zyne-homepage/scripts/**"
      - "projects/zyne-homepage/public/**"
      - "projects/zyne-homepage/index.html"
      - "projects/zyne-homepage/package.json"
      - "projects/zyne-homepage/package-lock.json"
      - "assets/catalog/**"
      - "homedetail/**"
      - "services/**"
      - "grow-my-visibility/**"
      - "build-my-brand/**"
      - "improve-my-business/**"
      - "use-ai/**"
      - "convert-more-clients/**"
      - "intelligence/**"
      - "delivery/**"
      - "privacy/**"
      - "terms/**"
      - "refund-policy/**"
      - "cookie-policy/**"
      - "404.html"
      - ".github/workflows/zyne-homepage-pages.yml"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: zyne-homepage-pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: projects/zyne-homepage
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
          cache-dependency-path: "projects/zyne-homepage/package-lock.json"
      - run: npm install
      - run: npm run build
      
      # Keep the rest of the Verify PRD 1.1 publish artifact step exactly as it was...

```

---

## 2. Direct-to-Main Verification Procedure

1. **Commit the Bundle:** Commit the new `package-lock.json`, the deletion of `pnpm-lock.yaml`, and both updated `.yml` files. Push to `main`.
2. **Verify Publish & Caching:** Check the Actions tab. The `Publish ZYNE Homepage` workflow will trigger automatically. Ensure the `Set up Node.js` step logs a successful cache save.
3. **Verify Silence on Validation:** Confirm that `ZYNE Homepage Validation` **did not** trigger.
4. **Ignored Path Dry-Run:** Modify a documentation file (e.g., `projects/zyne-homepage/docs/README.md` or a PRD in `assets/project-docs/prd/`). Commit and push to `main`. Verify **neither** workflow triggers.
5. **Manual Validation Execution:** Manually trigger `ZYNE Homepage Validation` via `workflow_dispatch` on `main`. Confirm it runs the single, optimized `npm run build` step and successfully restores the cache.

---

## 3. Mandatory Verification Report Format

```markdown
### [ZYNE-PIPELINE-02] Verification Report — Cache & Surgical Triggers

#### 1. Manifest Generation & Cleanup
- [ ] Confirmed `projects/zyne-homepage/package-lock.json` was generated and committed.
- [ ] Confirmed `projects/zyne-homepage/pnpm-lock.yaml` was deleted.

#### 2. Caching Implementation (Tested via Publish trigger)
- [ ] Verified `Set up Node.js` step successfully utilized `projects/zyne-homepage/package-lock.json` to create/restore the npm cache.

#### 3. Trigger Path Replacements & Isolation
- [ ] Verified that pushing the initial commit to `main` ONLY triggered `Publish ZYNE Homepage`.
- Modified Ignored File: `[Enter path to modified doc/PRD]`
- [ ] Verified that pushing the documentation change triggered ZERO workflows.

#### 4. Validation Workflow Reductions (Tested via Manual Dispatch)
- [ ] Manually triggered `ZYNE Homepage Validation` via `workflow_dispatch`.
- [ ] Confirmed individual build/generate steps are gone, replaced by the single `npm run build` execution.

```
