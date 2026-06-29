---

# ⚠️ MANDATORY RULES:

1. DO NOT MODIFY THE RULES AND DO NOT DELETE/MODIFY ANY CONTENT IN THIS FILE.
2. ⚠️ Always adhere to ALL instructions/steps/format or ask for approvals before you deviate from the plan.
3. READ complete file without skipping/search chunk from top to bottom before you start the task so you can understand the correct sequence to execute the task.
4. Follow the steps of the task and just report as-is even if it was not the expected outcome.
5. Commit changes regularly - Push to github origin via the existing MAIN branch.
6. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know the required file has been updated with your comment/report.
7. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
8. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts.

---
# TASK 1 - Quick Site Function Findings
Quick Scan and Inspect the files and structure of the local repo for this project:

1. D:\PROJECTS\GITHUB\az4mary\zyne.store\sitemap.xml
2. D:\PROJECTS\GITHUB\az4mary\zyne.store
3. D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage
4. D:\PROJECTS\GITHUB\az4mary\zyne.store\homedetail\7101-wendemere-st-houston-tx-77088
5. D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\README.md

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\assets\chat\zyne-store-site-map-report.md” and write your quick findings about how this website functions. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---

# TASK 2

There are lots of files inside this repo that will not impact the customer facing website so perform another quick read of each file/title and reorganize them into folders by moving based on relationships without breaking the website. 

⚠️ DO NOT Delete any content or file or folder - instead mark them for deletion with rationale in your report.

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\assets\chat\zyne-store-site-map-report.md” and write a summary of file structure and organization done. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---

# TASK 3 - Technical Environment & Repository Architecture Request

Please provide direct answers to the following five questions using the exact reply formats specified below. This data is required to align our automated testing environments with the local development build.

### Question 1: Repository Directory Layout

**Direct Question:** What is the structural layout of the repository? Please map out the file tree from the root directory down to two levels deep, explicitly showing where the build generation scripts, source assets, and output directories reside.

**Required Reply Format:**

```
[Root Directory Name]
├── [Directory A]
│   ├── file_example.js
│   └── [Sub-directory]
├── [Directory B]
└── package.json
```

### Question 2: Static Asset Management Paths

**Direct Question:** Where are public static assets (such as the `zyne-logo.png`, font files, or decorator images referenced in the build scripts) stored in the source tree, and where do they copy out during the build phase?

**Required Reply Format:**

- **Source Asset Path:** `[e.g., /src/assets/ or /public/assets/]`
- **Compiled Output Path:** `[e.g., /dist/assets/]`
- **Font Asset Delivery Method:** `[e.g., Self-hosted local files / Google Fonts CDN / None currently loaded]`

### Question 3: Package Configuration & Manifest

**Direct Question:** What are the exact generation scripts and package dependencies defined for this project environment?

**Required Reply Format:**

```json
{
  "scripts": {
    // Paste the exact "scripts" object from package.json here
  },
  "dependencies": {
    // Paste the exact "dependencies" object here
  },
  "devDependencies": {
    // Paste the exact "devDependencies" object here
  }
}
```

### Question 4: CI/CD Workflow Configuration

**Direct Question:** What is the complete configuration file for the GitHub Actions workflow currently capturing screenshots or running automation tests on this repository?

**Required Reply Format:**

```yaml
# Paste the entire contents of the relevant .github/workflows/[your-workflow].yml file here
```

### Question 5: Local Testing & Runtime Parameters

**Direct Question:** What exact software tools, execution commands, and operating systems are being used on the local machine to run the generation script and preview the compiled output?

**Required Reply Format:**

- **Local Developer OS:** `[e.g., Windows 11 Pro / macOS Sequoia 15.2]`
- **Local Node.js Version:** `[e.g., Node v20.11.0]`
- **Automation/Testing Engine:** `[e.g., Playwright v1.44 / Puppeteer v22.1 / None]`
- **Local Preview Method:** `[e.g., Opening index.html directly / Live Server extension / Vite dev server]`

Open the file "D:\PROJECTS\GITHUB\az4mary\zyne.store\assets\chat\zyne-store-site-map-report.md” and write a summary of file structure and organization done. Reply `DONE` in the chat conversation after you have updated the file with your comment.

---
