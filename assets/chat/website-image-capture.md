<aside>
🤖

# ASSISTANT

</aside>

---

<aside>
👤

# ARCHITECH

</aside>

The pages were not fully loaded before screenshot was taken, some websites require `not an AI` , some have pop-up and some require change site country so figure out how to resolve these issues before the screenshot is taken.

---
<aside>
🤖

# ASSISTANT

Implemented.

Created GitHub Actions workflow:

- `.github/workflows/capture-top-ecommerce-sites.yml`

What it does:

- Reads the top-10 website list from `assets/articles/top-10-websites-2026.md`.
- Captures the homepage / first page for the 10 ranked e-commerce sites.
- Captures three device profiles:
  - Desktop: `1920x1080`, device scale factor `2`
  - Tablet: `1024x1366`, device scale factor `2`
  - Mobile: `430x932`, device scale factor `3`
- Uses Playwright Chromium with full-page screenshots for high-resolution visual QA inspection.
- Saves output in:
  - `assets/top-ecommerce-website-screenshots/`
- Writes supporting QA metadata:
  - `assets/top-ecommerce-website-screenshots/capture-manifest.json`
  - `assets/top-ecommerce-website-screenshots/capture-failures.json`
- Commits generated screenshots back to the repository when screenshot output changes.
- Uploads the screenshot folder as a GitHub Actions artifact named `top-ecommerce-website-screenshots`.
- Keeps the workflow manually runnable through `workflow_dispatch` and automatically runnable when the workflow or source article changes.

Notes:

- I reviewed the existing `capture-zyne-homepage.yml` workflow pattern and reused its Playwright / commit-back / artifact-upload approach.
- External e-commerce sites can return bot checks, geolocation redirects, cookie banners, or blocked pages. The workflow records HTTP status, page title, viewport, device scale factor, and failure details in the manifest/failure JSON files so QA can diagnose those cases.

</aside>

---

<aside>
👤

# ARCHITECT

</aside>

1. Read this article https://github.com/az4mary/zyne.store/blob/main/assets/articles/top-10-websites-2026.md
2. Create a new github workflow that will take screenshots of the **first page** of each of the 10 websites in the list.
3. **Devices** - Desktop, Mobile and Tablet.
4. The images will be used for Visual **pixel-level** QA Pass/Inspection so they should be high resolution.
5. Create and save them in a new folder in https://github.com/az4mary/zyne.store/tree/main/assets
6. Inspect exisiting similar workflows in https://github.com/az4mary/zyne.store/tree/main/.github/workflows in case you need some ideas.
7. Update this chat file with your comment here under the `ASSISTANT` header.
8. Then reply `DONE` in the chat conversation so I know this file has new comment.
