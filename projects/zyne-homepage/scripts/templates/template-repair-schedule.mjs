import { readFileSync } from "node:fs";
import { repairScheduleContent } from "../../src/data/repair-schedule-content.js";
import {
  globalHeaderFooterStyles,
  renderGlobalFooter,
  renderGlobalHeader
} from "../global-header-footer.mjs";

const siteUrl = "https://zyne.store";
const styles = readFileSync(new URL("../../src/styles/repair-schedule.css", import.meta.url), "utf8");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const absoluteUrl = (path) => `${siteUrl}${path.endsWith("/") ? path : `${path}/`}`;

const listItems = (items = []) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": repairScheduleContent.title,
  "description": repairScheduleContent.description,
  "url": absoluteUrl(repairScheduleContent.canonicalPath)
};

export const renderRepairSchedulePage = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>${escapeHtml(repairScheduleContent.seoTitle)}</title>
<meta name="description" content="${escapeHtml(repairScheduleContent.description)}">
<link rel="canonical" href="${absoluteUrl(repairScheduleContent.canonicalPath)}">
<style>${globalHeaderFooterStyles}${styles}</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
${renderGlobalHeader()}
<main id="main-content" class="repair-page">
  <section class="repair-hero">
    <div class="repair-panel">
      <p class="eyebrow">${escapeHtml(repairScheduleContent.eyebrow)}</p>
      <h1>${escapeHtml(repairScheduleContent.title)}</h1>
      <p class="lede">${escapeHtml(repairScheduleContent.description)}</p>
      <p>${escapeHtml(repairScheduleContent.intro)}</p>
      <div class="repair-actions">
        <a class="button" href="${escapeHtml(repairScheduleContent.primaryCta.href)}">${escapeHtml(repairScheduleContent.primaryCta.label)}</a>
        <a class="button ghost" href="${escapeHtml(repairScheduleContent.secondaryCta.href)}">${escapeHtml(repairScheduleContent.secondaryCta.label)}</a>
      </div>
    </div>
    <aside class="repair-card repair-status" aria-label="Repair schedule status">
      <p class="eyebrow">Page status</p>
      <h2>Content in progress</h2>
      <p>This route is now available for the repair scheduling workflow. Operational content can be added incrementally as the process is finalized.</p>
    </aside>
  </section>
  <section id="repair-request" class="repair-grid" aria-label="Repair schedule workflow">
    ${repairScheduleContent.sections.map((section) => `<article class="repair-card">
      <p class="eyebrow">${escapeHtml(section.label)}</p>
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.body)}</p>
    </article>`).join("")}
  </section>
  <section id="next-steps" class="repair-next">
    <p class="eyebrow">Next steps</p>
    <h2>Build out the repair workflow gradually</h2>
    <ol>${listItems(repairScheduleContent.nextSteps)}</ol>
  </section>
</main>
${renderGlobalFooter()}
</body>
</html>`;
