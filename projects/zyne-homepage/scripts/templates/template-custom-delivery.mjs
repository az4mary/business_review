import { readFileSync } from "node:fs";
import { customDeliveryContent } from "../../src/data/custom-delivery-content.js";
import {
  globalHeaderFooterStyles,
  renderGlobalFavicons,
  renderGlobalFooter,
  renderGlobalHeader,
  renderGlobalHeaderFooterScript
} from "../global-header-footer.mjs";

const siteUrl = "https://zyne.store";
const styles = readFileSync(new URL("../../src/styles/custom-delivery.css", import.meta.url), "utf8");

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
  "name": customDeliveryContent.title,
  "description": customDeliveryContent.description,
  "url": absoluteUrl(customDeliveryContent.canonicalPath)
};

export const renderCustomDeliveryPage = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>${escapeHtml(customDeliveryContent.seoTitle)}</title>
<meta name="description" content="${escapeHtml(customDeliveryContent.description)}">
<link rel="canonical" href="${absoluteUrl(customDeliveryContent.canonicalPath)}">
${renderGlobalFavicons()}
<style>${globalHeaderFooterStyles}${styles}</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
${renderGlobalHeader()}
<main id="main-content" class="custom-page">
  <section class="custom-hero">
    <div class="custom-panel">
      <p class="eyebrow">${escapeHtml(customDeliveryContent.eyebrow)}</p>
      <h1>${escapeHtml(customDeliveryContent.title)}</h1>
      <p class="lede">${escapeHtml(customDeliveryContent.description)}</p>
      <p>${escapeHtml(customDeliveryContent.intro)}</p>
      <div class="custom-actions">
        <a class="button" href="${escapeHtml(customDeliveryContent.primaryCta.href)}">${escapeHtml(customDeliveryContent.primaryCta.label)}</a>
        <a class="button ghost" href="${escapeHtml(customDeliveryContent.secondaryCta.href)}">${escapeHtml(customDeliveryContent.secondaryCta.label)}</a>
      </div>
    </div>
    <aside class="custom-card custom-status" aria-label="Custom delivery status">
      <p class="eyebrow">Page status</p>
      <h2>Content in progress</h2>
      <p>This route is available for custom delivery requests. More service detail, examples, and qualification content can be added gradually.</p>
    </aside>
  </section>
  <section id="custom-scope" class="custom-grid" aria-label="Custom delivery workflow">
    ${customDeliveryContent.cards.map((card) => `<article class="custom-card">
      <p class="eyebrow">${escapeHtml(card.label)}</p>
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.body)}</p>
    </article>`).join("")}
  </section>
  <section id="delivery-fit" class="custom-notes">
    <p class="eyebrow">Delivery fit</p>
    <h2>When custom delivery makes sense</h2>
    <ul>${listItems(customDeliveryContent.fitNotes)}</ul>
  </section>
</main>
${renderGlobalFooter()}
${renderGlobalHeaderFooterScript()}
</body>
</html>`;
