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

### Step 3: Inject Dynamic Variables

**File:** `src/data/properties.mjs`

Open the file and add this second object to your exported array, right below your existing rental property. Make sure to include a comma after the rental object!

```javascript
export const properties = [
  {
    // ... (Your existing rental property object stays here)
  },
  {
    id: "7101-wendemere",
    template: "investment",
    status: "For Sale",
    address: "7101 Wendemere St",
    city: "Houston",
    state: "TX",
    zip: "77088",
    price: "$150,000",
    description: "Seller-financed Acres Homes investment opportunity with a 6.51% negotiated note, 20% down payment, oversized 7,250 sqft lot, zero HOA, and a value-add path toward $1,700/month target rent.",
    agentName: "Carissa Weber",
    brokerage: "Better Homes and Gardens Real Estate<br>Gary Greene - Sugar Land",
    agentImage: "/assets/agents/carissa-weber.png"
  }
];

```

The router will now iterate over the array, recognize `template: "investment"`, pass the Wendemere data directly into your newly created `template-investment.mjs`, and successfully output both property types side-by-side in your `dist/` folder.

### Step 4: The `[object Object]` Template

Because the router passes an array of objects (`{ src, label, index }`), we must explicitly target the `.src` property inside the template string.

**File:** `projects/zyne-homepage/scripts/templates/template-investment.mjs`

Find the entire `<!-- LEFT PANEL: Dynamic Masonry -->` block (around line 300) and replace it with this updated version that calls `.src`:

```javascript
        <!-- LEFT PANEL: Dynamic Masonry -->
        <div class="photo-masonry">
          <div class="masonry-col col-left">
            <div class="img-wrap">
              <span class="status-badge">${prop.status}</span>
              ${visible[0] ? `<img src="${visible[0].src}" alt="${prop.address}">` : '<div style="width:100%; height:100%; background:#1c2520;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[1] ? `<img src="${visible[1].src}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#153d5a;"></div>'}
            </div>
          </div>
          <div class="masonry-col col-right">
            <div class="img-wrap">
              ${visible[2] ? `<img src="${visible[2].src}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#d4cfc7;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[3] ? `<img src="${visible[3].src}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#bda316;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[4] ? `<img src="${visible[4].src}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#8c1d1d;"></div>'}
            </div>
          </div>
        </div>

```

---

### Step 5: The Image Directory

The build script will likely scan for the directory to process the images. We need to create the folder and populate it so the router has actual files to index.

**1. Create the directory:**
Run this from your root terminal to generate the correct folder structure (adjusting `public` to wherever your Vite static assets currently live, if different):

```powershell
New-Item -Path "projects\zyne-homepage\public\homedetail\7101-wendemere\images" -ItemType Directory -Force

```

**2. Add placeholder images:**
Drop all the image files contained in "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\dist\homedetail\7101-wendemere-st-houston-tx-77088\images" into that new `images` folder.

Once the `.src` targets are updated and those image files exist in the directory, your array mapping will work perfectly, the objects will resolve to valid URLs, and the template will render the photos seamlessly.

⚠️ Open the file "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\rent-invest-propertypage-report.md” and write report. Reply `DONE` in the chat conversation after you have updated the file with your comment.
