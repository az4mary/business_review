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

### 🛠️ Developer Implementation Plan (Using the Download)

**Step 1: Extract the Web Fonts**
Open the `web/` directory from the `inter-4.1` folder. Locate the `.woff2` files for `InterVariable`  ****and `InterVariable-Italic` 

**Step 2: Seed the Master Asset Tree**

Move those specific `.woff2` files into your master directory at:

`projects/zyne-homepage/public/assets/fonts/`

**Step 3: Satisfy the Legal License**
To comply with Condition 2 of the SIL Open Font License, take the `LICENSE` text file from the root of your downloaded folder and copy it directly into the `public/assets/fonts/` directory alongside the `.woff2` files.

**Step 4: Create the Global CSS**
Open the `inter.css` file located inside the downloaded `web/` folder. Copy the `@font-face` rules for `InterVariable`  ****and `InterVariable-Italic` . Paste them into a new file located at `projects/zyne-homepage/public/assets/fonts/fonts.css`

### Step 5: Write the All-In-One `fonts.css`

Instead of writing dozens of messy font rules, paste these two clean blocks at the top of `projects/zyne-homepage/public/assets/fonts/fonts.css`. Notice the `100 900` range—this unlocks every single weight variant automatically:

```css
/* public/assets/fonts/fonts.css */

/* Centralized Variable Axis (Unlocks Weights 100 through 900 instantly) */
@font-face {
  font-family: 'Inter Var';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/assets/fonts/InterVariable.woff2') format('woff2-variations'),
       url('/assets/fonts/InterVariable.woff2') format('woff2');
}

/* Centralized Italic Variable Axis (Unlocks Italic Weights 100 through 900 instantly) */
@font-face {
  font-family: 'Inter Var';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('/assets/fonts/InterVariable-Italic.woff2') format('woff2-variations'),
       url('/assets/fonts/InterVariable-Italic.woff2') format('woff2');
}
```

### Step 6: Developer Variety Usage

Now, you have complete freedom to use whatever variety you want in the site styles. You can dial in exact custom weights to match your visual aesthetic perfectly:

```css
/* Example of developers utilizing infinite variety without performance bloat */
h1 { font-family: 'Inter Var', sans-serif; font-weight: 250; } /* Elegant, ultra-thin headers */
p  { font-family: 'Inter Var', sans-serif; font-weight: 400; } /* Standard body copy */
h3 { font-family: 'Inter Var', sans-serif; font-weight: 650; } /* Custom medium-bold sub-headings */
b  { font-family: 'Inter Var', sans-serif; font-weight: 900; } /* Heavy emphasis text */
```

**Step 7: Enforce and Purge**

- Now that the file is a static public asset, the link path will perfectly match. Inject this exact line into the `<head>` of `index.html`, `template-rental.mjs`, and `template-investment.mjs`:
    
    `<link rel="stylesheet" href="/assets/fonts/fonts.css">`
    
- Delete all `fonts.googleapis.com` and `fonts.gstatic.com` external links from the property templates.

**Step 8  `src/styles/main.css`**
Update the `body` rule to prioritize the variable font while keeping standard fallbacks:

```css
body { margin:0; color:var(--cream); background:var(--black); font-family:'Inter var', Inter, "Segoe UI", Arial, sans-serif; overflow-x:hidden; }
```

**Step 9 `template-rental.mjs` & `template-investment.mjs`**

Update the `body` rule inside the template CSS string to match:

```css
body {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter var', Inter, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

⚠️ Open the file "E:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\inter-4.1-integration-report.md” and write report. Reply DONE in the chat conversation after you have updated the file with your comment.

⛔ STOP HERE - Reply back to the chat with short response if you understand the complete task.
