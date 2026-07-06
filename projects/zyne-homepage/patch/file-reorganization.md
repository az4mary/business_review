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

### 🧹 Developer Housekeeping Mandate: Pre-Migration Asset Cleanup

**Objective:** Reorganize the existing scattered assets into the strict **Master Asset Tree** hierarchy. You must execute these file migrations and update the corresponding data scripts to match.

"E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-buy" is completely excluded from this task.

### 🗂️ The Master Asset Tree Structure

This is the exact hierarchy you must create and follow. Any media files living outside of these specific buckets will trigger a failure in the validation script. Files should be relocated, duplicate should be deleted.

**Target:** "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage”

- `public/assets/`
    - `brand/` *(Global logos, favicons, site-wide UI graphics)*
    - `fonts/` *(The single source of truth for all typography)*
    - `catalog/` *(The central database for all non-UI media)*
        - `agents/` *(Agent headshots and profiles)*
        - `products/` *(Global services, e.g., `/executive-briefing/`)*
        - `properties/` *(Strictly segregated by property ID)*
            - `7101-wendemere-st/`
                - `gallery/` *(High-res originals and WebP display assets)*
                - `thumbnails/` *(Optimized preview assets)*

### ⚙️ Image Conversion Specifications

1. **Gallery Display Images (Full-Screen Lightbox)**
These are the high-resolution assets used when a user clicks into the nine-image full-screen lightbox. Because real estate relies heavily on visual fidelity, we prioritize quality here while letting WebP's superior compression algorithm keep the payload light.
    - **Format:** WebP
    - **Quality:** 85%
    - **Dimensions:** Max 1920px width by 1080px height (maintain original aspect ratio)
2. **Thumbnail Images (Dashboard Grid)**
These are the lightweight preview images loaded into the six explicitly assigned Page 1 gallery positions. Since the largest "hero" masonry slot spans slightly more than half of the 1672px canvas, the thumbnails need enough resolution to look crisp in that dominant spot without wasting bandwidth in the smaller side slots.
    - **Format:** WebP
    - **Quality:** 75%
    - **Dimensions:** Max 1024px width (maintain original aspect ratio)
3. Modern smartphones feature high-DPI (Retina) displays. While a mobile viewport might only be 390 CSS pixels wide, the physical screen renders at double or triple that resolution. If you use 480px, the thumbnails will look visibly blurred or pixelated on almost every modern phone. 768px provides the exact pixel density needed for a crisp, premium appearance without adding unnecessary payload bloat.
    
    Here are the exact specifications to lock in for that phase:
    
    - **Format:** WebP
    - **Quality:** 75%
    - **Dimensions:** Max 768px width (maintain original aspect ratio)

---

#### Action 1: Relocate Agent Media

Currently, agent headshots are stored outside the central catalog hierarchy.

* **Current Location:** `public/assets/agents/carissa-weber.png`

* **Target Location:** Move to `public/assets/catalog/agents/carissa-weber.png`
* **Script Update:** Open `src/data/properties.mjs`. You must update the `photo` and `agentImage` values for both Wendemere property entries to point to the new `/assets/catalog/agents/carissa-weber.png` path.



#### Action 2: Organize Product Media

Currently, product thumbnails are dumped loosely into a generic `catalog/` folder using Title_Case naming conventions (e.g., `catalog/Google_BP_Mini_Audit_thumbnail.webp`). They must be bucketed properly.

* **Current Location:** All 22 thumbnails currently mapped in `public/assets/catalog/`

* **Target Location:** Create a new subdirectory at `public/assets/catalog/products/`. Move all 22 product images into this folder.
* **Script Update:** Open `src/data/catalog-image-map.js`. Update the `current` key paths in the `productImageMigrationMap` array to reflect the new subfolder (e.g., change `"catalog/Google_BP_Mini_Audit_thumbnail.webp"` to `"catalog/products/Google_BP_Mini_Audit_thumbnail.webp"`).



#### Action 3: Prevent Property Gallery Duplication

In `properties.mjs`, you have two separate objects for the exact same physical property:

1. `id: "7101-wendemere-st-houston-tx-77088"` (Rental Template)


2. `id: "7101-wendemere"` (Investment Template)



* **Enforcement Rule:** You must **not** create two separate image folders for these IDs. Both routes must pull their gallery images and thumbnails from a single, unified property directory: `public/assets/catalog/properties/7101-wendemere-st/`. Ensure the gallery rendering logic for both templates points to this exact same folder to guarantee zero property image duplication.

⚠️ Open the file "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\file-reorganization-report.md” and write report. Reply DONE in the chat conversation after you have updated the file with your comment.

⛔ STOP HERE - Reply back to the chat with short response if you understand the complete task.
