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

# PATCH 1
# Concrete patch
"D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\scripts"
In `validate-generated-routes.mjs`, add this block **after the Realtor GPT validation block** and before the product loop:

```js
const propertyRoute = join("homedetail", "7101-wendemere-st-houston-tx-77088");
const propertyDetail = await assertFile(propertyRoute);
allRouteHtml.push([propertyRoute, propertyDetail]);

assertOneH1(propertyDetail, propertyRoute);
assertSchema(propertyDetail, propertyRoute, ["SingleFamilyResidence", "Offer"]);

assertIncludes(propertyDetail, propertyRoute, [
  "7101 Wendemere St",
  "Houston, TX 77088",
  "$1,495/month",
  "For Rent · Active",
  "Schedule a Viewing",
  "Request to Apply",
  "Listing Agent",
  "Carissa Weber",
  "PLATINUM",
  "Better Homes and Gardens Real Estate",
  "Gary Greene - Sugar Land",
  "https://www.har.com/carissa-weber/agent_WEBERC",
  "/assets/agents/carissa-weber.png",
  "/assets/decor/zyne-gold-pillars.png",
  "See all 18 photos",
  "max-width: 1440px",
  "grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr)",
  "width: 88px",
  "Wendemere St"
]);
```

This makes the build fail if the property page is not generated with the correct desktop version.

## Important note

Only include these markers if they match the final intended source.

Your currently uploaded generated HTML still shows older values like `max-width: 1360px`, `1.55fr / 420px`, and `76px` agent image.   

Your diagnostic showed newer values, so this validation will force the repo/deployment to settle on one real state.

# Dry run

Run:

```bash
npm run build
```

Expected final output should include:

```text
Generated route validation passed
```

If it fails, that is useful. It means the generated property page does not contain the intended final desktop markers.

# Validation commands

After build:

```bash
grep -n "max-width: 1440px" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
grep -n "grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr)" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
grep -n "width: 88px" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
grep -n "https://www.har.com/carissa-weber/agent_WEBERC" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Post update: D:\PROJECTS\GITHUB\az4mary\zyne.store\homedetail\7101-wendemere-st-houston-tx-77088\patch\validate-deploy-report.md 
