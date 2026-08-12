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

const formatCurrency = (value) => new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value);

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return [
    hours ? `${hours}h` : "",
    mins ? `${mins}m` : ""
  ].filter(Boolean).join(" ");
};

const buildInvoice = (invoice, currency) => {
  const rows = invoice.items.map((item) => {
    const cost = (item.durationMinutes / 60) * item.ratePerHour;
    return { ...item, cost };
  });
  const total = rows.reduce((sum, row) => sum + row.cost, 0);
  const usdTotal = total / currency.exchangeRate;
  return { rows, total, usdTotal };
};

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
      <p class="eyebrow">Checkout handoff</p>
      <h2>Stan checkout</h2>
      <p>The customer reviews the invoice here, then completes payment on Stan. The preview on this page stays read-only.</p>
      <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external">Pay Now</a>
    </aside>
  </section>
  <section id="invoice-breakdown" class="custom-invoice" aria-label="Invoice breakdown">
    <div class="custom-invoice-head">
      <div>
        <p class="eyebrow">${escapeHtml(customDeliveryContent.invoice.service)}</p>
        <h2>Invoice preview</h2>
      </div>
      <div class="custom-rate">
        <span>${escapeHtml(customDeliveryContent.currency.secondarySymbol)}1 = ${escapeHtml(customDeliveryContent.currency.primarySymbol)}${formatCurrency(customDeliveryContent.currency.exchangeRate)}</span>
        <strong>${escapeHtml(customDeliveryContent.currency.code)}</strong>
      </div>
    </div>
    <div class="custom-table-wrap">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Rate</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          ${buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).rows.map((item) => `<tr>
            <td>${escapeHtml(item.label)}</td>
            <td>${escapeHtml(item.start)}</td>
            <td>${escapeHtml(item.end)}</td>
            <td>${escapeHtml(formatDuration(item.durationMinutes))}</td>
            <td>${escapeHtml(customDeliveryContent.currency.primarySymbol)}${formatCurrency(item.ratePerHour)}/hr</td>
            <td>${escapeHtml(customDeliveryContent.currency.primarySymbol)}${formatCurrency(item.cost)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div class="custom-summary">
      <div>
        <span>Total</span>
        <strong>${escapeHtml(customDeliveryContent.currency.primarySymbol)}${formatCurrency(buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).total)}</strong>
      </div>
      <div>
        <span>Approx. USD</span>
        <strong>${escapeHtml(customDeliveryContent.currency.secondarySymbol)}${formatCurrency(buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).usdTotal)}</strong>
      </div>
      <div>
        <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external">Continue to Stan</a>
      </div>
    </div>
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
