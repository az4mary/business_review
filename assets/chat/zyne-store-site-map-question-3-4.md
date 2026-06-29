# Task 3 — Technical Environment & Repository Architecture

## Question 3: Package Configuration & Manifest

The generation manifest is `projects/zyne-homepage/package.json`. It has no `dependencies` object, represented below as an empty object so the requested structure remains explicit.

```json
{
  "scripts": {
    "dev": "vite",
    "validate:catalog": "node scripts/validate-catalog.mjs",
    "validate:catalog:strict": "ENFORCE_CANONICAL_ASSETS=true node scripts/validate-catalog.mjs",
    "validate:routes": "node scripts/validate-generated-routes.mjs && node scripts/validate-legal-layer.mjs && node scripts/validate-seo-layer.mjs",
    "validate:prd1.1": "node scripts/validate-prd-1-1.mjs",
    "validate:prd1.2a": "node scripts/validate-prd-1-2a.mjs",
    "prebuild": "npm run validate:prd1.2a",
    "postbuild": "node scripts/generate-property-route.mjs",
    "report:catalog-migration": "node scripts/report-catalog-migration.mjs",
    "build": "npm run validate:catalog && npm run validate:prd1.1 && vite build && node scripts/prerender.mjs && node scripts/generate-routes.mjs && node scripts/generate-legal-layer.mjs && node scripts/generate-property-route.mjs && node scripts/generate-seo-layer.mjs && npm run validate:routes",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {
    "vite": "^7.0.0"
  }
}
```

The separate root automation manifest defines `"capture:property-local": "node scripts/capture-property-listings-local.mjs"` and `"playwright": "latest"` as its only development dependency.

## Question 4: CI/CD Workflow Configuration

The main automation-test workflow, `.github/workflows/zyne-homepage-validation.yml`, is:

```yaml
name: ZYNE Homepage Validation

on:
  push:
    paths:
      - "projects/zyne-homepage/**"
      - "assets/catalog/**"
      - "assets/project-docs/prd/zyne-website-PRD-2-product-data-model.md"
      - "assets/project-docs/prd/zyne-website-PRD-2-asset-migration-map.md"
      - ".github/workflows/zyne-homepage-validation.yml"
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

      - name: Install dependencies
        run: npm install

      - name: Validate catalog
        run: npm run validate:catalog

      - name: Report catalog migration status
        run: npm run report:catalog-migration

      - name: Validate PRD 1.1 homepage UX
        run: npm run validate:prd1.1

      - name: Build Vite bundle
        run: npx vite build

      - name: Prerender crawler-readable homepage
        run: node scripts/prerender.mjs

      - name: Generate category and product routes
        run: node scripts/generate-routes.mjs

      - name: Generate legal layer
        run: node scripts/generate-legal-layer.mjs

      - name: Generate SEO layer
        run: node scripts/generate-seo-layer.mjs

      - name: Build and validate generated site
        run: npm run build

      - name: Validate legal layer
        run: node scripts/validate-legal-layer.mjs

      - name: Validate SEO layer
        run: node scripts/validate-seo-layer.mjs

      - name: Strict catalog validation
        run: npm run validate:catalog:strict
```

The manual page capture workflow, `.github/workflows/capture-zyne-property-fullpage.yml`, is:
```yaml
name: Capture ZYNE Property Current Full Page

on:
  push:
    branches:
      - main
    paths:
      - ".github/workflows/capture-zyne-property-fullpage.yml"
      - "assets/chat/website-image-capture.md"
  workflow_dispatch:
    inputs:
      target_url:
        description: "Live property page URL to capture"
        required: false
        default: "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/"
      wait_seconds:
        description: "Maximum seconds to wait for the live page to become current"
        required: false
        default: "300"

permissions:
  contents: write
  actions: read

concurrency:
  group: zyne-property-current-fullpage-screenshots
  cancel-in-progress: false

jobs:
  capture:
    name: Capture current live property page
    runs-on: ubuntu-latest
    timeout-minutes: 25

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          persist-credentials: true

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Install Playwright
        run: |
          npm install
          npx playwright install --with-deps chromium

      - name: Capture current full-page screenshots
        env:
          TARGET_URL: ${{ github.event.inputs.target_url || 'https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/' }}
          WAIT_SECONDS: ${{ github.event.inputs.wait_seconds || '300' }}
          RUN_ID: ${{ github.run_id }}
          RUN_ATTEMPT: ${{ github.run_attempt }}
          COMMIT_SHA: ${{ github.sha }}
        run: |
          rm -rf assets/zyne-property-current-fullpage-screenshots
          mkdir -p assets/zyne-property-current-fullpage-screenshots
          node --input-type=module <<'NODE'
          import { chromium } from 'playwright';
          import { mkdirSync, writeFileSync } from 'node:fs';
          import path from 'node:path';

          const targetUrl = process.env.TARGET_URL || 'https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/';
          const waitSeconds = Number(process.env.WAIT_SECONDS || 300);
          const runId = process.env.RUN_ID || String(Date.now());
          const runAttempt = process.env.RUN_ATTEMPT || '1';
          const commitSha = process.env.COMMIT_SHA || '';
          const outputDir = 'assets/zyne-property-current-fullpage-screenshots';

          mkdirSync(outputDir, { recursive: true });

          const captureStartedAt = new Date().toISOString();
          const cacheBust = `${encodeURIComponent(runId)}-${encodeURIComponent(runAttempt)}-${Date.now()}`;

          function withCacheBust(url) {
            const parsed = new URL(url);
            parsed.searchParams.set('_zyne_capture', cacheBust);
            parsed.searchParams.set('_ts', String(Date.now()));
            return parsed.toString();
          }

          const freshUrl = withCacheBust(targetUrl);

          const requiredMarkers = [
            '7101 Wendemere St',
            'Houston, TX 77088',
            'Schedule a Viewing',
            'Request to Apply',
            'Listing Agent',
            'Carissa Weber',
            'Better Homes and Gardens Real Estate',
            'Wendemere St'
          ];

          const devices = [
            {
              name: 'Desktop',
              fileSuffix: 'desktop',
              viewport: { width: 1920, height: 1080 },
              deviceScaleFactor: 2,
              isMobile: false,
              hasTouch: false,
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            },
            {
              name: 'Tablet',
              fileSuffix: 'tablet',
              viewport: { width: 1024, height: 1366 },
              deviceScaleFactor: 2,
              isMobile: true,
              hasTouch: true,
              userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
            },
            {
              name: 'Mobile',
              fileSuffix: 'mobile',
              viewport: { width: 430, height: 932 },
              deviceScaleFactor: 3,
              isMobile: true,
              hasTouch: true,
              userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
            }
          ];

          const manifest = {
            capturedAt: captureStartedAt,
            runId,
            runAttempt,
            commitSha,
            targetUrl,
            freshUrl,
            outputDir,
            cacheFreshnessControls: [
              'unique _zyne_capture and _ts query parameters per run',
              'fresh incognito browser context per device',
              'service workers blocked',
              'Cache-Control/Pragma/Expires request headers',
              'route-level cache-bypass headers for every request',
              'verified-current-page.html saved from the same fresh URL before screenshots'
            ],
            requiredMarkers,
            devices,
            captures: [],
            issues: []
          };

          const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

          async function installNoCacheRoute(context) {
            await context.route('**/*', async (route) => {
              const request = route.request();
              await route.continue({
                headers: {
                  ...request.headers(),
                  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                  Pragma: 'no-cache',
                  Expires: '0'
                }
              });
            });
          }

          async function waitForImagesAndFonts(page) {
            await page.evaluate(async () => {
              const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
              if (document.fonts && document.fonts.ready) {
                await Promise.race([document.fonts.ready, timeout(5000)]);
              }

              const images = Array.from(document.images || []);
              await Promise.race([
                Promise.all(images.map((img) => {
                  if (img.complete) return Promise.resolve();
                  return new Promise((resolve) => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                  });
                })),
                timeout(12000)
              ]);
            }).catch(() => {});
          }

          async function waitForStableLayout(page) {
            let previous = null;
            let stableCount = 0;

            for (let attempt = 0; attempt < 10; attempt += 1) {
              const snapshot = await page.evaluate(() => ({
                scrollWidth: document.documentElement.scrollWidth,
                scrollHeight: document.documentElement.scrollHeight,
                bodyTextLength: document.body ? document.body.innerText.length : 0,
                imageCount: document.images ? document.images.length : 0,
                completeImageCount: document.images ? Array.from(document.images).filter((image) => image.complete).length : 0,
                busyCount: document.querySelectorAll('[aria-busy="true"], [data-loading="true"], .loading, .spinner, .skeleton').length
              })).catch(() => null);

              if (previous && snapshot && JSON.stringify(snapshot) === JSON.stringify(previous) && snapshot.busyCount === 0) {
                stableCount += 1;
              } else {
                stableCount = 0;
              }

              previous = snapshot;
              if (stableCount >= 2) return snapshot;
              await sleep(1000);
            }

            return previous;
          }

          async function stabilizePage(page) {
            await page.waitForLoadState('domcontentloaded', { timeout: 45000 }).catch(() => {});
            await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {});
            await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
            await page.locator('body').waitFor({ state: 'attached', timeout: 45000 }).catch(() => {});
            await waitForImagesAndFonts(page);
            await waitForStableLayout(page);
          }

          async function autoScroll(page) {
            await page.evaluate(async () => {
              document.documentElement.style.scrollBehavior = 'auto';
              document.body.style.scrollBehavior = 'auto';

              await new Promise((resolve) => {
                let lastScrollY = -1;
                const distance = Math.max(700, Math.floor(window.innerHeight * 0.8));
                const timer = setInterval(() => {
                  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
                  window.scrollBy(0, distance);

                  if (window.scrollY === lastScrollY || window.scrollY >= maxScrollY) {
                    clearInterval(timer);
                    resolve();
                    return;
                  }

                  lastScrollY = window.scrollY;
                }, 175);
              });
            }).catch(() => {});

            await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            await waitForImagesAndFonts(page);
            await sleep(1000);
          }

          async function returnToTopAndFreeze(page) {
            await page.addStyleTag({
              content: `
                *, *::before, *::after {
                  animation-delay: -1ms !important;
                  animation-duration: 1ms !important;
                  animation-iteration-count: 1 !important;
                  caret-color: transparent !important;
                  transition-delay: 0s !important;
                  transition-duration: 0s !important;
                }
                html, body { scroll-behavior: auto !important; }
              `
            }).catch(() => {});

            await page.evaluate(() => {
              document.documentElement.style.scrollBehavior = 'auto';
              document.body.style.scrollBehavior = 'auto';
              if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }).catch(() => {});

            await page.waitForFunction(() => window.scrollY === 0 && window.scrollX === 0, null, { timeout: 10000 }).catch(() => {});
            await waitForImagesAndFonts(page);
            await waitForStableLayout(page);
            await sleep(750);
          }

          async function newFreshContext(browser, device) {
            const context = await browser.newContext({
              serviceWorkers: 'block',
              ignoreHTTPSErrors: true,
              bypassCSP: true,
              viewport: device.viewport,
              deviceScaleFactor: device.deviceScaleFactor,
              isMobile: device.isMobile,
              hasTouch: device.hasTouch,
              userAgent: device.userAgent,
              locale: 'en-US',
              timezoneId: 'America/Chicago',
              geolocation: { latitude: 29.7604, longitude: -95.3698 },
              permissions: ['geolocation'],
              extraHTTPHeaders: {
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                Pragma: 'no-cache',
                Expires: '0'
              }
            });

            await installNoCacheRoute(context);
            return context;
          }

          async function verifyCurrentLivePage(browser) {
            const context = await newFreshContext(browser, devices[0]);
            const page = await context.newPage();
            page.setDefaultTimeout(45000);
            page.setDefaultNavigationTimeout(120000);

            const deadline = Date.now() + waitSeconds * 1000;
            let attempt = 0;
            let lastHtml = '';
            let lastStatus = null;
            let lastFinalUrl = freshUrl;

            try {
              while (Date.now() < deadline) {
                attempt += 1;
                const response = await page.goto(freshUrl, { waitUntil: 'commit', timeout: 120000 }).catch((error) => {
                  manifest.issues.push({ type: 'navigation-warning', attempt, message: error.message });
                  return null;
                });

                await stabilizePage(page);

                const html = await page.content();
                const missing = requiredMarkers.filter((marker) => !html.includes(marker));
                lastHtml = html;
                lastStatus = response ? response.status() : null;
                lastFinalUrl = page.url();

                console.log(`Current-page check attempt ${attempt}: status=${lastStatus}, finalUrl=${lastFinalUrl}, missing=${missing.length ? missing.join(' | ') : 'none'}`);

                if (!missing.length) {
                  writeFileSync(path.join(outputDir, 'verified-current-page.html'), html, 'utf8');
                  return {
                    attempt,
                    httpStatus: lastStatus,
                    finalUrl: lastFinalUrl,
                    htmlLength: html.length,
                    missingMarkers: []
                  };
                }

                await sleep(15000);
              }

              const missingMarkers = requiredMarkers.filter((marker) => !lastHtml.includes(marker));
              writeFileSync(path.join(outputDir, 'stale-or-incomplete-page-debug.html'), lastHtml, 'utf8');
              throw new Error(`Live page did not pass current-content marker verification. Missing markers: ${missingMarkers.join(', ')}`);
            } finally {
              await context.close();
            }
          }

          async function captureDevice(browser, device) {
            const outputPath = path.join(outputDir, `zyne-property-detail-${device.fileSuffix}.png`);
            const context = await newFreshContext(browser, device);
            const page = await context.newPage();
            page.setDefaultTimeout(45000);
            page.setDefaultNavigationTimeout(120000);

            try {
              const response = await page.goto(freshUrl, { waitUntil: 'commit', timeout: 120000 });
              await stabilizePage(page);
              await autoScroll(page);
              await returnToTopAndFreeze(page);

              await page.screenshot({ path: outputPath, fullPage: true, animations: 'disabled' });

              const record = {
                site: 'Zyne Property Detail',
                requestedUrl: targetUrl,
                freshUrl,
                finalUrl: page.url(),
                device: device.name,
                viewport: device.viewport,
                deviceScaleFactor: device.deviceScaleFactor,
                outputPath,
                httpStatus: response ? response.status() : null,
                title: await page.title().catch(() => ''),
                documentSize: await page.evaluate(() => ({
                  width: document.documentElement.scrollWidth,
                  height: document.documentElement.scrollHeight,
                  imageCount: document.images ? document.images.length : 0,
                  completeImageCount: document.images ? Array.from(document.images).filter((image) => image.complete).length : 0
                })).catch(() => null)
              };

              manifest.captures.push(record);
              console.log(`Captured ${device.name}: ${outputPath}`);
              console.log(JSON.stringify(record, null, 2));
            } finally {
              await context.close();
            }
          }

          const browser = await chromium.launch({
            args: [
              '--disable-dev-shm-usage',
              '--font-render-hinting=none'
            ]
          });

          try {
            manifest.currentPageVerification = await verifyCurrentLivePage(browser);

            for (const device of devices) {
              await captureDevice(browser, device);
            }

            writeFileSync(path.join(outputDir, 'capture-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
            console.log('Capture completed successfully with current/live page verification.');
          } catch (error) {
            manifest.issues.push({ type: 'capture-error', message: error instanceof Error ? error.message : String(error) });
            writeFileSync(path.join(outputDir, 'capture-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
            console.error(error);
            process.exit(1);
          } finally {
            await browser.close();
          }
          NODE

      - name: Commit screenshots to repository
        if: always()
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add assets/zyne-property-current-fullpage-screenshots
          if git diff --cached --quiet; then
            echo "No screenshot changes to commit."
          else
            git commit -m "Capture current Zyne property full-page screenshots"
            git pull --rebase --autostash
            git push
          fi

      - name: Upload screenshots and capture evidence
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: zyne-property-current-fullpage-screenshots
          path: assets/zyne-property-current-fullpage-screenshots
          if-no-files-found: error
```

Screenshot-specific automation is separately defined in `capture-zyne-homepage.yml`, `capture-zyne-property-fullpage.yml`, and `capture-top-ecommerce-sites.yml`. Deployment is handled by `zyne-homepage-pages.yml`.
