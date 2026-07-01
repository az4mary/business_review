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

# Implementation Plan: Restrict Screenshot Workflow (Manual Only)

**Target File:** `.github/workflows/capture-zyne-homepage.yml`

## 1. Concrete Code Patch

Completely remove the `push` array from the `on:` block at the top of the file.

Replace the top section of `.github/workflows/capture-zyne-homepage.yml` with this exact configuration:

```yaml
name: Capture ZYNE Homepage Screenshots

on:
  workflow_dispatch:

permissions:
  contents: write
  actions: read

jobs:
  capture:
    runs-on: ubuntu-latest
# ... (keep the rest of the file exactly as is) ...

```

*(Note: By leaving only `workflow_dispatch:`, this workflow can now exclusively be triggered by a human clicking the "Run workflow" button in the GitHub UI, or via an explicit API call).*

---

## 2. Direct-to-Main Verification Procedure

1. **Commit the Patch:** Update the `.github/workflows/capture-zyne-homepage.yml` file with the patch above, commit, and push directly to `main`.
2. **Execute the "Active" CSS Dry-Run:** Make another minor, reversible change to `projects/zyne-homepage/src/styles/main.css`. Commit and push to `main`.
3. **Verify the Silence:** Navigate to the GitHub Actions tab.
* Confirm that `Publish ZYNE Homepage` triggers (as expected).
* Confirm that `Capture ZYNE Homepage Screenshots` **does not** trigger.


4. **Verify Manual Execution:** Select `Capture ZYNE Homepage Screenshots` from the left sidebar and manually trigger it using the "Run workflow" button to ensure the dispatch trigger still functions correctly.

---

## 3. Mandatory Verification Report — Screenshot Workflow Restriction

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\screenshot-restrict-manual-report.md” and write report in the below requested format. Reply `DONE` in the chat conversation after you have updated the file with your comment.

```markdown
### [ZYNE-PIPELINE-02B] Verification Report — Screenshot Workflow Restriction

#### 1. Workflow Patch
- [ ] Confirmed `push` trigger block completely removed from `capture-zyne-homepage.yml`.
- [ ] Confirmed `workflow_dispatch:` is the only remaining trigger.

#### 2. Trigger Silence Verification
- Modified File: `projects/zyne-homepage/src/styles/main.css`
- [ ] Verified that pushing this source code change to `main` DID NOT trigger `Capture ZYNE Homepage Screenshots`.

#### 3. Manual Dispatch Verification
- [ ] Successfully triggered `Capture ZYNE Homepage Screenshots` manually via the GitHub UI.

```
