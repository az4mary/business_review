#!/usr/bin/env node

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const defaultTargets = [
  {
    name: 'HAR',
    slug: '01-har',
    url: 'https://www.har.com/homedetail/7101-wendemere-st-houston-tx-77088/11143299',
  },
  {
    name: 'Zillow',
    slug: '02-zillow',
    url: 'https://www.zillow.com/homedetails/7101-Wendemere-St-Houston-TX-77088/27755092_zpid/',
  },
];

const customUrls = process.argv.slice(2).filter(Boolean);
const targets = customUrls.length > 0
  ? customUrls.map((url, index) => ({
      name: new URL(url).hostname.replace(/^www\./, ''),
      slug: `${String(index + 1).padStart(2, '0')}-${new URL(url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`,
      url,
    }))
  : defaultTargets;

const devices = [
  {
    name: 'Desktop',
    suffix: 'desktop',
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  },
  {
    name: 'Tablet',
    suffix: 'tablet',
    viewport: { width: 1024, height: 1366 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  },
  {
    name: 'Mobile',
    suffix: 'mobile',
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  },
];

const outputDir = process.env.OUTPUT_DIR || 'local-captures/property-listing-screenshots';
const profileDir = process.env.PLAYWRIGHT_PROFILE_DIR || '.playwright-local-profile/property-listings';
const manualMode = process.env.AUTO !== '1';
const browserChannel = process.env.PW_CHANNEL || undefined;
const rl = readline.createInterface({ input, output });
const manifest = {
  generatedAt: new Date().toISOString(),
  outputDir,
  profileDir,
  manualMode,
  targets,
  captures: [],
  issues: [],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function prompt(message) {
  if (!manualMode) return;
  await rl.question(`${message}\nPress Enter when ready... `);
}

async function clickFirstVisible(page, locator, label) {
  const count = await locator.count().catch(() => 0);
  for (let index = 0; index < Math.min(count, 10); index += 1) {
    const candidate = locator.nth(index);
    if (!(await candidate.isVisible().catch(() => false))) continue;
    await candidate.click({ timeout: 2500 }).catch(() => null);
    await sleep(400);
    console.log(`Closed/dismissed: ${label}`);
    return true;
  }
  return false;
}

async function closeCommonOverlays(page) {
  const closeSelectors = [
    'button[aria-label="Close"]',
    'button[aria-label*="close" i]',
    'button[aria-label*="dismiss" i]',
    '[role="button"][aria-label*="close" i]',
    '[role="button"][aria-label*="dismiss" i]',
    '[data-testid*="close" i]',
    '[data-test*="close" i]',
    '[class*="close" i]',
    '[class*="modal-close" i]',
    '[class*="dialog-close" i]',
    'button:has-text("×")',
    'button:has-text("✕")',
    '[role="button"]:has-text("×")',
    '[role="button"]:has-text("✕")',
  ];

  const buttonLabels = [
    'Accept all',
    'Accept Cookies',
    'Allow all',
    'Agree',
    'I agree',
    'OK',
    'Okay',
    'Got it',
    'No thanks',
    'Not now',
    'Maybe later',
    'Skip',
    'Close',
    'Continue',
  ];

  let clicked = false;

  for (const selector of closeSelectors) {
    clicked = (await clickFirstVisible(page, page.locator(selector), selector)) || clicked;
  }

  for (const label of buttonLabels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const exact = new RegExp(`^\\s*${escaped}\\s*$`, 'i');
    clicked = (await clickFirstVisible(page, page.getByRole('button', { name: exact }), `button:${label}`)) || clicked;
    clicked = (await clickFirstVisible(page, page.getByRole('link', { name: exact }), `link:${label}`)) || clicked;
  }

  if (clicked) await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  return clicked;
}

async function waitForImagesAndFonts(page) {
  await page.evaluate(async () => {
    const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (document.fonts && document.fonts.ready) {
      await Promise.race([document.fonts.ready, timeout(5000)]);
    }

    const images = Array.from(document.images || []);
    await Promise.race([
      Promise.all(images.map((image) => {
        if (image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      })),
      timeout(12000),
    ]);
  }).catch(() => {});
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
  await waitForImagesAndFonts(page);
  await sleep(1000);
}

async function stabilizeAtTop(page) {
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
    `,
  }).catch(() => {});

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }).catch(() => {});

  await page.waitForFunction(() => window.scrollY === 0 && window.scrollX === 0, null, { timeout: 10000 }).catch(() => {});
  await waitForImagesAndFonts(page);
  await sleep(750);
}

async function captureOne(target, device) {
  const targetDir = path.join(outputDir, target.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const outputPath = path.join(targetDir, `${target.slug}-${device.suffix}.png`);
  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    channel: browserChannel,
    viewport: device.viewport,
    deviceScaleFactor: device.deviceScaleFactor,
    isMobile: device.isMobile,
    hasTouch: device.hasTouch,
    userAgent: device.userAgent,
    locale: 'en-US',
    timezoneId: 'America/Chicago',
    geolocation: { latitude: 29.7604, longitude: -95.3698 },
    permissions: ['geolocation'],
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
  });

  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(45000);
  page.setDefaultNavigationTimeout(120000);

  try {
    console.log(`\nOpening ${target.name} / ${device.name}: ${target.url}`);
    const response = await page.goto(target.url, { waitUntil: 'commit', timeout: 120000 }).catch((error) => {
      manifest.issues.push({ site: target.name, device: device.name, type: 'navigation-warning', message: error.message });
      return null;
    });

    await page.waitForLoadState('domcontentloaded', { timeout: 45000 }).catch(() => {});
    await page.waitForLoadState('load', { timeout: 60000 }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await closeCommonOverlays(page);

    await prompt(`Resolve human checks / login prompts / popups for ${target.name} ${device.name} in the visible browser window.`);

    await waitForImagesAndFonts(page);
    await autoScroll(page);
    await stabilizeAtTop(page);

    await prompt(`Final check for ${target.name} ${device.name}. Leave the page exactly as it should be captured.`);

    await page.screenshot({ path: outputPath, fullPage: true, animations: 'disabled' }).catch(async () => {
      await page.screenshot({ path: outputPath, fullPage: false, animations: 'disabled' });
    });

    const record = {
      site: target.name,
      requestedUrl: target.url,
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
      })).catch(() => null),
    };
    manifest.captures.push(record);
    console.log(`Saved ${outputPath}`);
  } catch (error) {
    const issue = {
      site: target.name,
      requestedUrl: target.url,
      finalUrl: page.url ? page.url() : target.url,
      device: device.name,
      outputPath,
      type: 'capture-error',
      message: error instanceof Error ? error.message : String(error),
    };
    manifest.issues.push(issue);
    console.error(`Capture failed for ${target.name} / ${device.name}: ${issue.message}`);
  } finally {
    await context.close();
  }
}

try {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(profileDir, { recursive: true });

  console.log('Local property listing screenshot capture');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Persistent browser profile: ${profileDir}`);
  console.log(`Manual mode: ${manualMode ? 'on' : 'off'}\n`);

  for (const target of targets) {
    for (const device of devices) {
      await captureOne(target, device);
    }
  }

  const manifestPath = path.join(outputDir, 'capture-manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nDone. Manifest: ${manifestPath}`);
} finally {
  rl.close();
}
