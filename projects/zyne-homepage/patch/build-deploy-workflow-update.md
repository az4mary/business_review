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

# Implementation Plan: CI/CD Pipeline Optimization

**Target Files:**

* `.github/workflows/zyne-homepage-validation.yml`

* `.github/workflows/zyne-homepage-pages.yml`


## 1. Concrete Code Patches

### Patch A: Overhaul the Validation Pipeline

This patch restricts the validation workflow so it only runs on Pull Requests (preventing redundant runs on `main`), implements NPM caching, and removes the 9 duplicate manual execution steps that are already handled natively by the `npm run build` command.

Replace the entire contents of `.github/workflows/zyne-homepage-validation.yml` with the following:

```yaml
name: ZYNE Homepage Validation

on:
  pull_request:
    paths:
      - "projects/zyne-homepage/**"
      - "assets/catalog/**"
      - "assets/project-docs/prd/zyne-website-PRD-2-product-data-model.md"
      - "assets/project-docs/prd/zyne-website-PRD-2-asset-migration-map.md"
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

### Patch B: Add Caching to the Deployment Pipeline

This patch implements the dependency cache into the live publish workflow, slashing cold-boot installation times.

Update the `build` job steps inside `.github/workflows/zyne-homepage-pages.yml`:

```yaml
# Inside zyne-homepage-pages.yml, locate the `jobs.build.steps` block and update the node setup:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
          cache-dependency-path: "projects/zyne-homepage/package-lock.json"
      - run: npm install
      - run: npm run build
      # ... keep the rest of the PRD 1.1 inline verification step exactly as is ...

```

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\build-deploy-workflow-update-report.md” and write report in the below requested format. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---

## 2. The Trunk-Based Verification Procedure
### What Happens When You Push Directly to `main`

1. **The Publish Workflow Will Fire:** The `Publish ZYNE Homepage` workflow will trigger automatically. This is perfect, because you will instantly see the new `cache: "npm"` step in action during the deployment.
2. **The Validation Workflow Will Stay Quiet:** The `ZYNE Homepage Validation` workflow will **not** trigger. This instantly proves that Patch A worked, successfully isolating the validation bloat away from your live deployment pushes.

Use the **manual trigger** (`workflow_dispatch`) that we explicitly kept in the YAML file to run the dry-run.

1. **Commit and Push:** Commit both YAML file updates directly to `main` and push.
2. **Verify the Deployment Cache:** Navigate to the GitHub Actions tab, click on the running `Publish ZYNE Homepage` workflow, and verify that the `Set up Node.js` step successfully creates the npm cache.
3. **Manually Trigger the Validation Pipeline:** On the left sidebar, click `ZYNE Homepage Validation`. On the right side of the screen, click the **"Run workflow"** dropdown button and run it on the `main` branch.
4. **Verify the Validation Optimization:** Open that manually triggered run. Confirm that it executes the single `Build and validate generated site (Full Suite)` step instead of the 9 individual scripts, and check that it successfully hits the cache we just created in step 2.

---

## 3. Mandatory Verification Report Format (Direct-to-Main)

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\build-deploy-workflow-update-report.md” and write report in the below requested format. Reply `DONE` in the chat conversation after you have updated the file with your comment.

```markdown
### [ZYNE-PIPELINE-01] Verification Report — Direct to Main Optimization

#### 1. Trigger Isolation Check
- [ ] Verified that pushing to `main` ONLY triggered `Publish ZYNE Homepage`.
- [ ] `ZYNE Homepage Validation` stayed completely quiet during the push.

#### 2. Caching Implementation
- [ ] `cache: "npm"` successfully executed in the `Publish ZYNE Homepage` deployment run.
- [ ] `Set up Node.js` step correctly utilized `projects/zyne-homepage/package-lock.json`.

#### 3. Validation Workflow Reductions (Tested via Manual Dispatch)
- [ ] Manually triggered `ZYNE Homepage Validation` via `workflow_dispatch`.
- [ ] Confirmed individual build/generate steps are gone, replaced by the single `npm run build` execution.
- Runtime Reduction: Decreased from [X] minutes to [Y] minutes.

#### 4. Developer Notes / Anomalies
[Enter any pipeline execution warnings or cache miss errors here]

```

---

## 4. Surgical Triggers

To make the triggers surgical, we will abandon the broad wildcard and explicitly whitelist **only the source code, build scripts, dependency manifests, and static assets**.

Update the `on:` trigger blocks in **both** workflow files to use the explicit whitelist.

### Patch A: Surgical Triggers for Validation Workflow

**File:** `.github/workflows/zyne-homepage-validation.yml`

Update the `on:` block at the top of the file to this exact configuration:

```yaml
on:
  pull_request:
    paths:
      # 1. EXPLICIT SOURCE & BUILD DIRECTORIES
      - "projects/zyne-homepage/src/**"
      - "projects/zyne-homepage/scripts/**"
      - "projects/zyne-homepage/public/**"
      # 2. CORE MANIFESTS & ROOT HTML
      - "projects/zyne-homepage/index.html"
      - "projects/zyne-homepage/package.json"
      - "projects/zyne-homepage/package-lock.json"
      # 3. EXTERNAL CATALOG DEPENDENCIES
      - "assets/catalog/**"
      # 4. THE WORKFLOW FILE ITSELF
      - ".github/workflows/zyne-homepage-validation.yml"
  workflow_dispatch:

```

*(Note: We removed the PRD documentation paths from the trigger entirely so that modifying data models or asset maps no longer triggers a build).*

### Patch B: Surgical Triggers for Publish Workflow

**File:** `.github/workflows/zyne-homepage-pages.yml`

Update the `on:` block at the top of the file to replace the broad `projects/zyne-homepage/` catch-all with the same strict whitelist:

```yaml
on:
  push:
    branches: [main]
    paths:
      # 1. EXPLICIT SOURCE & BUILD DIRECTORIES
      - "projects/zyne-homepage/src/**"
      - "projects/zyne-homepage/scripts/**"
      - "projects/zyne-homepage/public/**"
      # 2. CORE MANIFESTS & ROOT HTML
      - "projects/zyne-homepage/index.html"
      - "projects/zyne-homepage/package.json"
      - "projects/zyne-homepage/package-lock.json"
      # 3. SHARED REPO ASSETS & GENERATED OUTPUTS
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

```

---

## 2. Direct-to-Main Verification Procedure

Because we are targeting documentation ignores, you must verify this by explicitly altering a documentation file and ensuring the pipeline *ignores* it.

1. **Apply and Commit the Patches:** Commit the updated YAML files to `main` and push. *(This push will trigger the Publish workflow because the `.yml` files themselves are in the whitelist).*
2. **Execute the Ignored Path Dry-Run:** Create or modify a markdown file inside the `projects/zyne-homepage/docs/` directory (e.g., add a comment to a PRD). Commit and push this single change to `main`.


3. **Verify the Silence:** Navigate to the GitHub Actions tab. Confirm that **neither** `ZYNE Homepage Validation` nor `Publish ZYNE Homepage` triggered.
4. **Execute the Monitored Path Dry-Run:** Make a minor, reversible change to a CSS or JS file inside `projects/zyne-homepage/src/`. Commit and push to `main`.


5. **Verify the Trigger:** Check the Actions tab. Confirm that `Publish ZYNE Homepage` automatically triggers, successfully catching the source-code modification.

---

## 3. Mandatory Verification Report Format

```markdown
### [ZYNE-PIPELINE-02] Verification Report — Surgical Triggers

#### 1. Trigger Path Replacements
- [ ] Broad `projects/zyne-homepage/**` wildcard successfully removed from both workflow files.
- [ ] Explicit whitelists for `src/`, `scripts/`, `public/`, and manifests applied.

#### 2. Ignored Path Verification (The "Silence" Test)
- Modified File: `projects/zyne-homepage/docs/[filename].md`
- [ ] Verified that pushing this documentation change to `main` triggered ZERO workflows.

#### 3. Monitored Path Verification (The "Active" Test)
- Modified File: `projects/zyne-homepage/src/[filename].[ext]`
- [ ] Verified that pushing this source code change to `main` successfully triggered the `Publish ZYNE Homepage` workflow.

```
