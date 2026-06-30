

Here is the concrete implementation plan to eliminate the execution bloat, implement caching, and resolve the redundant double-builds. Hand this directly to your developer.

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

---

## 2. Pipeline Dry-Run & Verification Procedure

Because these changes affect the CI/CD environment, the "dry-run" must be executed by pushing the changes to a new branch and observing the GitHub Actions behavior.

1. **Create a Test Branch:** Create a new branch named `chore/optimize-pipelines` and commit the YAML changes.
2. **Open a Pull Request:** Open a PR from `chore/optimize-pipelines` into `main`.
3. **Verify the PR Trigger:** Navigate to the GitHub Actions tab. Confirm that `ZYNE Homepage Validation` automatically triggers for the PR.
4. **Verify Step Reduction & Cache:** Open the running validation workflow. Ensure it executes the single `Build and validate generated site (Full Suite)` step instead of the previous individual script calls. Confirm the `Set up Node.js` step logs a successful cache save or hit.
5. **Merge to Main:** Merge the PR into `main`.
6. **Verify Mutual Exclusion:** Check the Actions tab again. Confirm that `Publish ZYNE Homepage` triggers to deploy the site, but `ZYNE Homepage Validation` **does not** trigger (verifying we eliminated the redundant `main` branch double-run).

---

## 3. Mandatory Verification Report Format

The developer must submit this exact verification report upon completing the merge:

```markdown
### [ZYNE-PIPELINE-01] Verification Report — Pipeline Optimization

#### 1. Validation Workflow Reductions (`zyne-homepage-validation.yml`)
- [ ] Confirmed `push` trigger removed; workflow now exclusively runs on `pull_request` and `workflow_dispatch`.
- [ ] Confirmed individual build/generate steps removed and replaced by single `npm run build` execution.
- Runtime Reduction: Decreased from [X] minutes to [Y] minutes.

#### 2. Caching Implementation
- [ ] `cache: "npm"` added to both workflow files.
- [ ] Verified `Set up Node.js` step successfully restores/saves cache using `projects/zyne-homepage/package-lock.json`.

#### 3. Trigger Isolation Check
- [ ] Verified that pushing/merging to `main` ONLY triggers `Publish ZYNE Homepage` and no longer triggers `ZYNE Homepage Validation`.

#### 4. Developer Notes / Anomalies
[Enter any pipeline execution warnings or cache miss errors here]

```
