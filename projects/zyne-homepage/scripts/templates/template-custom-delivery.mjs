import { readFileSync } from "node:fs";
import { customDeliveryContent } from "../../src/data/custom-delivery-content.js";
import {
  globalHeaderFooterStyles,
  renderGlobalFavicons,
  renderGlobalFooter,
  renderGlobalHeader,
  renderGlobalHeaderFooterScript
} from "../global-header-footer.mjs";
import { formatDate, formatMoney, getBrowserLocale, pickLocalePack } from "../../src/lib/localization.mjs";

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

const pageTitle = customDeliveryContent.seoTitle;
const pageDescription = customDeliveryContent.shareDescription || customDeliveryContent.description;
const pageImage = `${siteUrl}${customDeliveryContent.shareImage}`;
const translations = customDeliveryContent.translations || {};
const translationJson = JSON.stringify({
  translations,
  fitNotes: customDeliveryContent.translationsFitNotes || {},
  fallbackLocale: {
    rateLinePrefix: "$1",
    rateLineEquals: "="
  }
}).replaceAll("</", "<\\/");

export const renderCustomDeliveryPage = () => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(customDeliveryContent.description)}">
<meta property="og:title" content="${escapeHtml(pageTitle)}">
<meta property="og:description" content="${escapeHtml(pageDescription)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${absoluteUrl(customDeliveryContent.canonicalPath)}">
<meta property="og:site_name" content="ZYNE">
<meta property="og:image" content="${escapeHtml(pageImage)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(pageTitle)}">
<meta name="twitter:description" content="${escapeHtml(pageDescription)}">
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
      <p class="eyebrow" data-i18n="eyebrow">${escapeHtml(customDeliveryContent.eyebrow)}</p>
      <h1 data-i18n="title">${escapeHtml(customDeliveryContent.title)}</h1>
      <p class="lede" data-i18n="description">${escapeHtml(customDeliveryContent.description)}</p>
      <p data-i18n="intro">${escapeHtml(customDeliveryContent.intro)}</p>
      <div class="custom-actions">
        <a class="button ghost" href="${escapeHtml(customDeliveryContent.secondaryCta.href)}" data-i18n="viewBreakdown">${escapeHtml(customDeliveryContent.secondaryCta.label)}</a>
        <a class="button" href="${escapeHtml(customDeliveryContent.primaryCta.href)}" target="_blank" rel="noopener noreferrer external" data-i18n="payNow">${escapeHtml(customDeliveryContent.primaryCta.label)}</a>
      </div>
    </div>
    <aside class="custom-card custom-status" aria-label="Custom delivery status">
      <p class="eyebrow" data-i18n="checkoutLabel">Checkout</p>
      <h2 data-i18n="checkoutTitle">Stan checkout</h2>
      <p><span data-i18n="deliveryDateLabel">Delivery date</span>: <span data-i18n="deliveryDate">${escapeHtml(customDeliveryContent.deliveryDate)}</span>.</p>
      <p data-i18n="checkoutBody">Review the bill here, then complete payment on Stan.</p>
      <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external" data-i18n="payNow">Pay now</a>
    </aside>
  </section>
  <section id="invoice-breakdown" class="custom-invoice" aria-label="Invoice breakdown">
    <div class="custom-invoice-head">
      <div>
        <p class="eyebrow" data-i18n="invoiceService">${escapeHtml(customDeliveryContent.invoice.service)}</p>
        <h2 data-i18n="invoiceTitle">Invoice preview</h2>
      </div>
      <div class="custom-rate">
        <span class="custom-rate-line"><span data-i18n="rateLinePrefix">${escapeHtml(customDeliveryContent.currency.secondarySymbol)}1</span><span data-i18n="rateLineEquals">=</span><span data-i18n="rateLineSuffix">${escapeHtml(customDeliveryContent.currency.code)}</span> <span data-i18n-rate-value>${formatMoney(customDeliveryContent.currency.exchangeRate, "en", customDeliveryContent.currency.code)}</span></span>
        <strong>${escapeHtml(customDeliveryContent.currency.code)}</strong>
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
            <td data-i18n="invoiceItemLabel">${escapeHtml(item.label)}</td>
            <td>${escapeHtml(item.start)}</td>
            <td>${escapeHtml(item.end)}</td>
            <td>${escapeHtml(formatDuration(item.durationMinutes))}</td>
            <td><span data-i18n="rateCurrency">${escapeHtml(customDeliveryContent.currency.code)}</span> <span data-i18n-rate-value>${formatMoney(item.ratePerHour, "en", customDeliveryContent.currency.code)}</span><span data-i18n="ratePerHourSuffix">/hr</span></td>
            <td><span data-i18n="totalCurrencyPrefix">${escapeHtml(customDeliveryContent.currency.code)}</span> <span data-i18n-rate-value>${formatMoney(item.cost, "en", customDeliveryContent.currency.code)}</span></td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <div class="custom-summary">
      <div>
        <span data-i18n="totalLabel">Total</span>
        <strong><span data-i18n="totalCurrencyPrefix">${escapeHtml(customDeliveryContent.currency.code)}</span> <span data-i18n-rate-value>${formatMoney(buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).total, "en", customDeliveryContent.currency.code)}</span></strong>
      </div>
      <div>
        <span data-i18n="deliveryDateLabel">Delivery date</span>
        <strong data-i18n-delivery-date>${escapeHtml(customDeliveryContent.deliveryDate)}</strong>
      </div>
      <div>
        <span data-i18n="approxUsdLabel">Approx. USD</span>
        <strong><span data-i18n="approxCurrencyPrefix">${escapeHtml(customDeliveryContent.currency.secondarySymbol)}</span> <span data-i18n-rate-value>${formatMoney(buildInvoice(customDeliveryContent.invoice, customDeliveryContent.currency).usdTotal, "en", "USD")}</span></strong>
      </div>
      <div>
        <a class="button" href="${escapeHtml(customDeliveryContent.checkoutUrl)}" target="_blank" rel="noopener noreferrer external" data-i18n="continueToStan">Continue to Stan</a>
      </div>
    </div>
  </section>
  <section id="delivery-fit" class="custom-notes">
    <p class="eyebrow" data-i18n="beforePay">Before you pay</p>
    <h2 data-i18n="quickChecks">Quick checks</h2>
    <ul data-i18n-fit-notes>${listItems(customDeliveryContent.fitNotes)}</ul>
  </section>
</main>
${renderGlobalFooter()}
<script>window.__CUSTOM_DELIVERY_TRANSLATIONS__=${translationJson};</script>
${renderGlobalHeaderFooterScript()}
<script>
(() => {
  const localeData = window.__CUSTOM_DELIVERY_TRANSLATIONS__ || {};
  const translations = localeData.translations || {};
  const translationsFitNotes = localeData.fitNotes || {};
  const page = document.documentElement;
  const browserLocale = navigator.languages?.[0] || navigator.language || "en";
  const locale = (navigator.languages && navigator.languages[0]) || navigator.language || browserLocale;
  const strings = (${pickLocalePack.toString()})(locale, translations, "en").pack;
  const lang = (${pickLocalePack.toString()})(locale, translations, "en").key;
  if (!strings) return;
  page.lang = strings.htmlLang || lang;
  if (lang === "ar") page.dir = "rtl";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key || !(key in strings)) return;
    node.textContent = strings[key];
  });
  const formatMoney = (value, currency) => new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(value));
  document.querySelectorAll("[data-i18n-rate-value]").forEach((node) => {
    const currency = node.parentElement?.textContent?.includes("USD") ? "USD" : "SAR";
    node.textContent = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(node.textContent.replace(/[^0-9.]/g, "")));
  });
  const fitNotes = translationsFitNotes?.[lang];
  const fitNotesList = document.querySelector("[data-i18n-fit-notes]");
  if (fitNotesList && Array.isArray(fitNotes) && fitNotes.length) {
    fitNotesList.innerHTML = fitNotes.map((item) => '<li>' + item + '</li>').join('');
  }
  const deliveryDateNode = document.querySelector("[data-i18n-delivery-date]");
  if (deliveryDateNode) {
    deliveryDateNode.textContent = (${formatDate.toString()})(new Date("2026-08-04"), locale);
  }
})();
</script>
</body>
</html>`;
