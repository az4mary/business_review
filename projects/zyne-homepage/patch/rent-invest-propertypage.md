---

# ⚠️ MANDATORY RULES: THE RULES TAKE PRECEDENCE OVER THE TASK.

1. DO NOT MODIFY THE RULES AND DO NOT DELETE/MODIFY ANY CONTENT IN THIS FILE.
2. ⚠️ Always adhere to ALL instructions/steps/format or ask for approvals before you deviate from the plan.
3. READ complete file without skipping/search chunk from top to bottom before you start the task so you can understand the correct sequence to execute the task.
4. Find/Replace/edit ONLY (NOTHING ELSE) requested blocks exactly as in the Patch Instructions.
5. Follow the steps of the task and just report as-is even if it was not the expected outcome, do not skip a step even though there is a delay.
6. Honor the work breaks in any to update the report and pause for next instruction.
7. Commit changes regularly - Push to github origin via the existing MAIN branch. 
8. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know the required file has been updated with your comment/report.
9. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
10. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts. Report any blocking issues to me directly inside the chat and stop working until I inform you of next step. No trying to solve the problems - your job is just to follow the instructions, report blocking issues and only update the report with real independently verified facts (not fake) after successfully completing the tasks.
11. ⛔ STOP HERE - Reply back to the chat with short response if you understand the complete instructions.

---

# PATCH 1

You are perfectly positioned to drop `template-investment.mjs` right into the `scripts/templates/` folder.

Once the file is in place, here are the exact two Find and Replace actions to "flip the switch" and activate it in your router.

---

### Step 1: Import the New Template

**File:** `scripts/generate-property-route.mjs`

**Find the existing rental import at the top:**

```javascript
import { buildRentalPage } from "./templates/template-rental.mjs";

```

**Replace with:**

```javascript
import { buildRentalPage } from "./templates/template-rental.mjs";
import { buildInvestmentPage } from "./templates/template-investment.mjs";

```

---

### Step 2: Activate the Router Block

**File:** `scripts/generate-property-route.mjs`

**Find the placeholder block we left earlier:**

```javascript
  } else if (prop.template === "investment") {
    // html = buildInvestmentPage(...) -> We will add this next!
  }

```

**Replace with:**

```javascript
  } else if (prop.template === "investment") {
    html = buildInvestmentPage(prop, photos, visible, primaryImage, navItems);
  }

```

Run `npm run build` from your root one last time. Both property types will now seamlessly generate side-by-side using the exact same data pipeline.

⚠️ Open the file "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\rent-invest-propertypage-report.md” and write report. Reply `DONE` in the chat conversation after you have updated the file with your comment.
