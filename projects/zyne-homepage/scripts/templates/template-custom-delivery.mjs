import { readFileSync } from "node:fs";
import { customDeliveryContent } from "../../src/data/custom-delivery-content.js";
import { customDeliveryLocales } from "../../src/data/custom-delivery-locales.js";
import { localizationSettings } from "../../src/data/localization-settings.mjs";
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

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return [hours ? `${hours}h` : "", mins ? `${mins}m` : ""].filter(Boolean).join(" ");
};

const buildInvoice = (invoice, currency) => {
  const rows = invoice.items.map((item) => ({ ...item, cost: (item.durationMinutes / 60) * item.ratePerHour }));
  const total = rows.reduce((sum, row) => sum + row.cost, 0);
  const usdTotal = total / currency.exchangeRate;
  return { rows, total, usdTotal };
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Custom Delivery",
  "description": "Review your custom delivery bill, confirm the total, and continue to Stan for checkout.",
  "url": absoluteUrl(customDeliveryContent.canonicalPath)
};

const pageImage = `${siteUrl}${customDeliveryContent.shareImage}`;
const localePayload = JSON.stringify({
  locales: customDeliveryLocales,
  settings: localizationSettings
}).replaceAll("</", "<\\/");

export const renderCustomDeliveryPage = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>Custom Delivery | ZYNE</title>
<meta name="description" content="Review your custom delivery bill, confirm the total, and continue to Stan for checkout.">
<meta property="og:title" content="Custom Delivery | ZYNE">
<meta property="og:description" content="Read-only invoice preview for custom delivery. Confirm the SAR 282.50 total, then continue to Stan for checkout.">
<meta property="og:type" content="website">
<meta property="og:url" content="${absoluteUrl(customDeliveryContent.canonicalPath)}">
<meta property="og:site_name" content="ZYNE">
<meta property="og:image" content="${escapeHtml(pageImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Custom Delivery | ZYNE">
<meta name="twitter:description" content="Read-only invoice preview for custom delivery. Confirm the SAR 282.50 total, then continue to Stan for checkout.">
<meta name="twitter:image" content="${escapeHtml(pageImage)}">
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
      <p class="eyebrow" data-i18n="eyebrow">View bill</p>
      <h1 data-i18n="title">Custom Delivery</h1>
      <p class="lede" data-i18n="description">Review your custom delivery bill, confirm the total, and continue to Stan for checkout.</p>
      <p data-i18n="intro">This is a read-only bill preview. It shows the breakdown, the total, and the checkout path to Stan.</p>
      <div class="custom-actions">
        <a class="button ghost" href="#invoice-breakdown" data-i18n="viewBreakdown">View breakdown</a>
        <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external" data-i18n="payNow">Pay now</a>
      </div>
    </div>
    <aside class="custom-card custom-status" aria-label="Custom delivery status">
      <p class="eyebrow" data-i18n="checkoutLabel">Checkout</p>
      <h2 data-i18n="checkoutTitle">Stan checkout</h2>
      <p><span data-i18n="deliveryDateLabel">Delivery date</span>: <span data-i18n-delivery-date>${escapeHtml(customDeliveryContent.deliveryDate)}</span>.</p>
      <p data-i18n="checkoutBody">Review the bill here, then complete payment on Stan.</p>
      <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external" data-i18n="payNow">Pay now</a>
    </aside>
  </section>
  <section id="invoice-breakdown" class="custom-invoice" aria-label="Invoice breakdown">
    <div class="custom-invoice-head">
      <div>
        <p class="eyebrow" data-i18n="invoiceService">Delivery Fee</p>
        <h2 data-i18n="invoiceTitle">Invoice preview</h2>
      </div>
      <div class="custom-rate">
        <span class="custom-rate-line"><span data-i18n="rateLinePrefix">$1</span><span data-i18n="rateLineEquals">=</span><span data-i18n="rateLineSuffix">SAR</span> <span data-i18n-rate-value>${customDeliveryContent.currency.exchangeRate}</span></span>
        <strong data-i18n="currencyCodeLabel">SAR</strong>
      </div>
    </div>
    <div class="custom-table-wrap">
      <table class="custom-table">
        <thead>
          <tr>
            <th data-i18n="task">Task</th>
            <th data-i18n="start">Start</th>
            <th data-i18n="end">End</th>
            <th data-i18n="duration">Duration</th>
            <th data-i18n="rate">Rate</th>
            <th data-i18n="cost">Cost</th>
          </tr>
        </thead>
        <tbody>
          ${buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).rows.map((item) => `<tr>
            <td data-i18n="invoiceItemLabel">Delivery Fee</td>
            <td>${escapeHtml(item.start)}</td>
            <td>${escapeHtml(item.end)}</td>
            <td>${escapeHtml(formatDuration(item.durationMinutes))}</td>
            <td><span data-i18n="currencyCodeLabel">SAR</span> <span data-i18n-rate-value>${item.ratePerHour}</span><span data-i18n="ratePerHourSuffix">/hr</span></td>
            <td><span data-i18n="currencyCodeLabel">SAR</span> <span data-i18n-rate-value>${item.cost}</span></td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div class="custom-summary">
      <div>
        <span data-i18n="totalLabel">Total</span>
        <strong><span data-i18n="currencyCodeLabel">SAR</span> <span data-i18n-rate-value>${buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).total}</span></strong>
      </div>
      <div>
        <span data-i18n="deliveryDateLabel">Delivery date</span>
        <strong data-i18n-delivery-date>${escapeHtml(customDeliveryContent.deliveryDate)}</strong>
      </div>
      <div>
        <span data-i18n="approxUsdLabel">Approx. USD</span>
        <strong>$${buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).usdTotal.toFixed(2)}</strong>
      </div>
      <div>
        <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external" data-i18n="continueToStan">Continue to Stan</a>
      </div>
    </div>
  </section>
  <section id="delivery-fit" class="custom-notes">
    <p class="eyebrow" data-i18n="beforePay">Before you pay</p>
    <h2 data-i18n="quickChecks">Quick checks</h2>
    <ul data-i18n-fit-notes>${listItems(["Review the bill before checkout.", "If anything looks off, confirm the invoice details before paying on Stan."])}</ul>
  </section>
</main>
${renderGlobalFooter()}
<script>window.__CUSTOM_DELIVERY_LOCALES__=${localePayload};</script>
${renderGlobalHeaderFooterScript()}
<script>
(() => {
  const localeData = window.__CUSTOM_DELIVERY_LOCALES__ || {};
  const locales = localeData.locales || {};
  const settings = localeData.settings || {};
  const locale = (navigator.languages && navigator.languages[0]) || navigator.language || settings.defaultLocale || "en";
  const normalized = String(locale).toLowerCase();
  const resolved = Object.entries(settings.localeAliases || {}).find(([, aliases]) => aliases.includes(normalized) || aliases.includes(normalized.split("-")[0]))?.[0] || normalized.split("-")[0] || settings.defaultLocale || "en";
  const strings = locales[resolved] || locales[settings.defaultLocale || "en"] || locales.en || {};
  const page = document.documentElement;
  page.lang = strings.htmlLang || resolved;
  if ((settings.rtlLocales || []).includes(resolved)) page.dir = "rtl";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key && key in strings) node.textContent = strings[key];
  });
  const formatNumber = (value, currency) => new Intl.NumberFormat(locale, { style: "currency", currency, currencyDisplay: "symbol", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
  document.querySelectorAll("[data-i18n-rate-value]").forEach((node) => {
    const text = String(node.textContent || "");
    const currency = text.includes("SAR") ? "SAR" : "USD";
    const numeric = Number(text.replace(/[^0-9.]/g, ""));
    node.textContent = formatNumber(numeric, currency);
  });
  const fitNotesList = document.querySelector("[data-i18n-fit-notes]");
  if (fitNotesList && Array.isArray(strings.fitNotes) && strings.fitNotes.length) {
    fitNotesList.innerHTML = strings.fitNotes.map((item) => "<li>" + item + "</li>").join("");
  }
  const deliveryDateNode = document.querySelector("[data-i18n-delivery-date]");
  if (deliveryDateNode) {
    deliveryDateNode.textContent = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date("2026-08-04T00:00:00Z"));
  }
})();
</script>
</body>
</html>`;
