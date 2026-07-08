import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  catalogProducts,
  categories,
  deliveryFamilies,
  getProduct,
  intelligenceProductIds
} from "../src/data/products.js";
import { categoryPageContent, collectionPageContent } from "../src/data/category-content.js";
import { getProductDetailContent } from "../src/data/product-detail-content.js";
import { renderRepairSchedulePage } from "./templates/template-repair-schedule.mjs";
import {
  globalHeaderFooterStyles,
  renderGlobalFavicons,
  renderGlobalFooter,
  renderGlobalHeader
} from "./global-header-footer.mjs";

const siteUrl = "https://zyne.store";
const arrow = "&#8599;";

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const normalizePath = (path) => path.endsWith("/") ? path : `${path}/`;
const absoluteUrl = (url) => url.startsWith("http") ? url : `${siteUrl}${normalizePath(url)}`;
const productRoute = (product) => product.internalUrl || `/services/${product.slug}/`;
const productList = (ids = []) => ids.map(getProduct).filter(Boolean);
const uniqueProducts = (items = []) => Array.from(new Map(items.filter(Boolean).map((item) => [item.id, item])).values());
const byPrice = (a, b) => (a.priceValue || 0) - (b.priceValue || 0);
const listItems = (items = []) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]));

const defaultBuyerResponsibilities = [
  "Complete the required intake form after checkout.",
  "Provide accurate business context, access, files, or examples needed for delivery.",
  "Review delivered materials inside the stated revision window."
];

const defaultExclusions = [
  "Ongoing consulting, management, or implementation outside the purchased scope.",
  "Paid advertising spend, third-party software fees, or platform charges.",
  "Guaranteed revenue, ranking, traffic, or lead-generation outcomes."
];

const baseStyles = `
*{box-sizing:border-box}html{background:#070706;color:#f1eadc}body{margin:0;background:radial-gradient(circle at top right,rgba(201,169,103,.14),transparent 34rem),#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}a:focus-visible,button:focus-visible{outline:2px solid #c9a967;outline-offset:4px}${globalHeaderFooterStyles}.button{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:1rem 1.2rem;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:800;border:1px solid #c9a967}.button.ghost{background:transparent;color:#f1eadc}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.66rem;font-weight:800}.skip-link{position:absolute;left:-999px;top:1rem}.skip-link:focus{left:1rem;z-index:99;background:#c9a967;color:#080807;padding:.8rem 1rem}.container{width:min(1180px,88vw);margin:0 auto}.hero{padding:clamp(4rem,9vw,8rem) 0}.hero-grid{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.85fr);gap:clamp(2rem,5vw,5rem);align-items:center}.panel,.card,.buybox,.table-wrap{border:1px solid rgba(201,169,103,.26);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));box-shadow:0 24px 80px rgba(0,0,0,.22)}.panel{padding:clamp(2rem,5vw,4rem)}h1{font-size:clamp(2.7rem,6.4vw,5.6rem);line-height:.95;margin:.65rem 0 1rem;font-weight:500;letter-spacing:-.055em}h2{font-size:clamp(2rem,4vw,3.4rem);line-height:1;margin:0 0 1rem;font-weight:500;letter-spacing:-.04em}h3{font-size:1.15rem;margin:.2rem 0 .65rem}p,li,dd{color:#b4aea3;line-height:1.72}.lede{font-size:1.15rem;max-width:68ch}.section{padding:clamp(3.5rem,7vw,6rem) 0;border-top:1px solid rgba(201,169,103,.12)}.section-heading{display:flex;justify-content:space-between;gap:2rem;align-items:end;margin-bottom:2rem}.section-heading>p{max-width:52ch}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.card{padding:1.35rem;min-height:100%}.card strong,.price{color:#c9a967}.card .meta{display:flex;gap:.7rem;flex-wrap:wrap;margin:.9rem 0}.tag{display:inline-flex;border:1px solid rgba(201,169,103,.25);color:#c9a967;padding:.28rem .5rem;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#302815;border:1px solid #302815;margin:1.25rem 0}.facts div{background:#0d0d0b;padding:1rem}.facts span{display:block;color:#746f67;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em}.visual{background:#e9e3d9;color:#171511;min-height:460px;display:grid;place-items:stretch;text-align:center;text-transform:uppercase;letter-spacing:.12em;overflow:hidden}.visual img{display:block;width:100%;height:100%;min-height:460px;object-fit:cover;object-position:center}.product-layout{display:grid;grid-template-columns:minmax(260px,.9fr) minmax(320px,1.1fr) 340px;gap:2rem;align-items:start}.buybox{padding:1.4rem;position:sticky;top:106px}.note{font-size:.78rem;color:#8a8378}.comparison{width:100%;border-collapse:collapse}.comparison th,.comparison td{border-bottom:1px solid rgba(201,169,103,.18);text-align:left;padding:1rem;vertical-align:top}.comparison th{color:#c9a967;text-transform:uppercase;letter-spacing:.12em;font-size:.68rem}.ladder{counter-reset:step}.ladder li{list-style:none;position:relative;padding-left:3rem;margin:1rem 0}.ladder li:before{counter-increment:step;content:counter(step,decimal-leading-zero);position:absolute;left:0;top:.1rem;color:#c9a967}.fine-print{border-top:1px solid rgba(201,169,103,.18);margin-top:1rem;padding-top:1rem}.cta-strip{display:flex;gap:1rem;flex-wrap:wrap;align-items:center;justify-content:space-between;border:1px solid rgba(201,169,103,.26);padding:1.4rem;background:#10100e}.hero-actions{display:flex;gap:1rem;flex-wrap:wrap;margin:1.4rem 0}.step-label{display:block;color:#c9a967;text-transform:uppercase;letter-spacing:.12em;font-size:.62rem;font-weight:800}.breadcrumb{color:#8f887c;font-size:.78rem;margin-bottom:1rem}details{border-top:1px solid rgba(201,169,103,.18);padding:1rem 0}summary{cursor:pointer;color:#f1eadc;font-weight:700}@media(max-width:1000px){.hero-grid,.product-layout,.grid,.grid.two{grid-template-columns:1fr}.buybox{position:static}.section-heading{display:block}.visual,.visual img{min-height:300px}.cta-strip{display:block}.hero-actions .button{width:100%}}`;

const schemaScript = (schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

const layout = ({ title, description, main, schema }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${absoluteUrl(schema?.url || "/")}">
${renderGlobalFavicons()}
<style>${baseStyles}</style>
${schema ? schemaScript(schema) : ""}
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
${renderGlobalHeader()}
<main id="main-content">${main}</main>
${renderGlobalFooter()}
</body>
</html>`;

const productCard = (product) => `<article class="card">
  <p class="eyebrow">${escapeHtml(product.category.replaceAll("-", " "))}</p>
  <h3>${escapeHtml(product.name)}</h3>
  <strong class="price">${escapeHtml(product.price)}</strong>
  <p>${escapeHtml(product.shortDescription || product.description)}</p>
  <div class="meta"><span class="tag">${escapeHtml(product.timeline)}</span><span class="tag">${escapeHtml(product.productType)}</span></div>
  <p><strong>Best for:</strong> ${escapeHtml(product.bestFor)}</p>
  <a class="button ghost" href="${productRoute(product)}" data-event="related_product_click" data-product="${escapeHtml(product.id)}">View Product ${arrow}</a>
</article>`;

const comparisonTable = (products) => `<div class="table-wrap"><table class="comparison">
  <thead><tr><th>Product</th><th>Best for</th><th>Timeline</th><th>Price</th><th>Next step</th></tr></thead>
  <tbody>${products.map((product) => `<tr><td><strong>${escapeHtml(product.name)}</strong><br><span>${escapeHtml(product.shortDescription || product.description)}</span></td><td>${escapeHtml(product.bestFor)}</td><td>${escapeHtml(product.timeline)}</td><td>${escapeHtml(product.price)}</td><td><a href="${productRoute(product)}">View details ${arrow}</a></td></tr>`).join("")}</tbody>
</table></div>`;

const faqBlock = (items = []) => items.map(([question, answer]) => `<details data-event="product_faq_expand"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("");

const pageSchema = ({ type = "CollectionPage", title, description, url, products = [] }) => ({
  "@context": "https://schema.org",
  "@type": type,
  "name": title,
  "description": description,
  "url": absoluteUrl(url),
  "mainEntity": products.length ? {
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": product.schemaType || "Service",
        "name": product.name,
        "description": product.description,
        "url": absoluteUrl(productRoute(product)),
        "offers": {
          "@type": "Offer",
          "price": product.priceValue,
          "priceCurrency": product.currency || "USD",
          "availability": product.checkoutStatus === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
        }
      }
    }))
  } : undefined
});

const sharedCategoryFaq = (category, recommended) => [
  [`Which ${category.shortTitle.toLowerCase()} product should I start with?`, `Start with ${recommended?.name || "the recommended starting point"} if you need the fastest focused diagnostic or foundational service in this path.`],
  ["Are these free consultations?", "No. ZYNE services are paid productized offers with defined price, scope, timeline, and internal product detail pages."],
  ["Where does checkout happen?", "Secure checkout is completed through Stan Store after you have reviewed the relevant ZYNE product details."],
  ["Can I compare services before buying?", "Yes. Compare fit, price, timeline, best-for labels, and internal product detail pages before checkout."],
  ["What happens after purchase?", "After checkout, the buyer follows the intake and fulfillment process for the selected product."]
];

const categoryPage = (category) => {
  const content = categoryPageContent[category.id] || {};
  const products = productList(category.productIds);
  const recommended = getProduct(category.recommendedStarterProductId) || products[0];
  const sortedProducts = products.slice().sort(byPrice);
  const relatedCategories = (content.relatedCategoryIds?.length ? content.relatedCategoryIds.map((id) => categoryById[id]).filter(Boolean) : categories.filter((item) => item.id !== category.id).slice(0, 3));
  const title = category.seoTitle || `${category.title} | ZYNE`;
  const description = category.seoDescription || category.description;
  const faqItems = [...sharedCategoryFaq(category, recommended), ...(content.faqs || [])];
  return layout({
    title,
    description,
    schema: pageSchema({ title, description, url: category.url, products }),
    main: `
<section class="hero"><div class="container hero-grid"><div class="panel">
  <p class="eyebrow">Growth path ${escapeHtml(category.number)}</p>
  <h1>${escapeHtml(category.title)}</h1>
  <p class="lede">${escapeHtml(category.description)}</p>
  <p>${escapeHtml(content.positioning || category.description)}</p>
  <p><strong>Buyer problem:</strong> ${escapeHtml(category.problemStatement)}</p>
  <div class="hero-actions"><a class="button" href="#product-comparison">Compare Products</a><a class="button ghost" href="${recommended ? productRoute(recommended) : "/services/"}">View Recommended Starting Point ${arrow}</a></div>
  <p class="note">Secure checkout is completed through Stan Store after you review ZYNE product details.</p>
</div><aside class="card"><p class="eyebrow">Recommended starting point:</p><h2>${escapeHtml(recommended?.name || "View Services")}</h2><strong class="price">${escapeHtml(recommended?.price || "")}</strong><p>${escapeHtml(recommended?.shortDescription || recommended?.description || "Compare the fixed-price services in this path.")}</p><p><strong>Best for:</strong> ${escapeHtml(recommended?.bestFor || "Buyers choosing a first step")}</p><p><strong>Timeline:</strong> ${escapeHtml(recommended?.timeline || "Defined by scope")}</p><a class="button" href="${recommended ? productRoute(recommended) : "/services/"}">View Product ${arrow}</a></aside></div></section>
<section class="section"><div class="container grid two"><article class="card"><p class="eyebrow">Diagnostic context</p><h2>What this path solves</h2>${(content.diagnosticContext || [category.problemStatement]).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</article><article class="card"><p class="eyebrow">How to choose</p><h2>Choose by current constraint</h2><ul>${listItems(content.decisionGuide || [`Start with ${recommended?.name || "the recommended service"}.`, "Move to higher-value services when the scope requires deeper strategy or implementation."])}</ul></article></div></section>
<section id="product-comparison" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Compare offers</p><h2>${escapeHtml(category.shortTitle)} Product comparison</h2></div><p>Compare fit, timeline, and price before choosing an internal product detail page.</p></div>${comparisonTable(products)}</div></section>
<section class="section"><div class="container grid two"><div class="card"><p class="eyebrow">Product ladder</p><h2>From first step to deeper buildout</h2><ol class="ladder">${sortedProducts.map((product, index) => `<li><span class="step-label">${escapeHtml(content.ladderLabels?.[index] || `Step ${index + 1}`)}</span><a href="${productRoute(product)}"><strong>${escapeHtml(product.name)}</strong></a><br><span>${escapeHtml(product.price)} · ${escapeHtml(product.timeline)}</span><p>${escapeHtml(product.bestFor)}</p></li>`).join("")}</ol></div><div class="card"><p class="eyebrow">Internal routing</p><h2>Review details before checkout</h2><p>Category pages educate and compare. Product pages explain scope, buyer responsibilities, exclusions, and checkout details before the buyer leaves ZYNE.</p><a class="button ghost" href="/services/">View All Paid Services ${arrow}</a>${content.subpageCta ? `<p class="fine-print"><a href="${content.subpageCta.url}">${escapeHtml(content.subpageCta.label)} ${arrow}</a></p>` : ""}</div></div></section>
<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Available services</p><h2>Choose the right fixed-price service</h2></div><p>Every product card routes to an internal ZYNE product detail page first.</p></div><div class="grid">${products.map(productCard).join("")}</div></div></section>
<section class="section"><div class="container grid two"><div class="card"><p class="eyebrow">Category FAQ</p><h2>Common questions</h2>${faqBlock(faqItems)}</div><div class="card"><p class="eyebrow">Related growth paths</p><h2>Explore adjacent constraints</h2>${relatedCategories.map((item) => `<p><a href="${item.url}"><strong>${escapeHtml(item.title)}</strong> ${arrow}</a><br>${escapeHtml(item.description)}</p>`).join("")}<p class="fine-print">Secure checkout is completed through Stan Store only after the buyer reviews ZYNE service details.</p></div></div></section>`
  });
};

const collectionFaq = (key) => collectionPageContent[key]?.faq || [
  ["Where does checkout happen?", "Secure checkout is completed through Stan Store after the buyer reviews ZYNE product details."],
  ["Are these free consultations?", "No. ZYNE services are paid productized offers with defined scope, price, and timelines."],
  ["How should I choose?", "Use the comparison grid and internal product detail pages before checkout."]
];

const collectionPage = ({ url, title, eyebrow, description, products, sections = [], cta = "/services/", key = "services", families = [] }) => {
  const content = collectionPageContent[key] || {};
  return layout({
    title: `${title} | ZYNE`,
    description,
    schema: pageSchema({ title: `${title} | ZYNE`, description, url, products }),
    main: `
<section class="hero"><div class="container hero-grid"><div class="panel"><p class="eyebrow">${escapeHtml(eyebrow)}</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(description)}</p><div class="hero-actions"><a class="button" href="#product-comparison">Compare Products</a><a class="button ghost" href="${cta}">View recommended services ${arrow}</a></div><p class="note">Secure checkout is completed through Stan Store after product education on ZYNE.</p></div><aside class="card"><p class="eyebrow">What this page helps you do</p><ul>${listItems(sections.length ? sections : ["Compare relevant ZYNE offers.", "Review fit, timeline, and price before checkout.", "Move from education to internal product detail pages."])}</ul></aside></div></section>
<section id="product-comparison" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Product comparison</p><h2>Relevant offers</h2></div><p>Every product links to a ZYNE detail page before external checkout.</p></div>${comparisonTable(products)}</div></section>
${families.length ? `<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Service families</p><h2>${escapeHtml(content.sequenceTitle || "Service families")}</h2></div><p>Delivery families route into internal category or product pages before checkout.</p></div><div class="grid">${families.map((family) => `<article class="card"><p class="eyebrow">${escapeHtml(family.icon)}</p><h3>${escapeHtml(family.name)}</h3><p>${escapeHtml(family.description)}</p><a class="button ghost" href="${family.url}">Explore family ${arrow}</a></article>`).join("")}</div></div></section>` : `<section class="section"><div class="container grid two"><div class="card"><p class="eyebrow">Recommended sequence</p><h2>${escapeHtml(content.sequenceTitle || "Recommended sequence")}</h2><ol class="ladder">${(content.sequence || sections).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol></div><div class="card"><p class="eyebrow">How to choose</p><h2>Start with the clearest constraint</h2><p>Use Intelligence when the central constraint is unclear. Use Delivery when the build path is already defined.</p><a class="button ghost" href="/delivery/">Compare Delivery ${arrow}</a></div></div></section>`}
<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Available services</p><h2>Internal product pages</h2></div><p>Review service details on ZYNE before Stan Store checkout.</p></div><div class="grid">${products.map(productCard).join("")}</div></div></section>
<section class="section"><div class="container grid two"><div class="card"><p class="eyebrow">FAQ</p><h2>Collection questions</h2>${faqBlock(collectionFaq(key))}</div><div class="card"><p class="eyebrow">Checkout disclosure</p><h2>Education before payment</h2><p>ZYNE owns the education, comparison, routing, and buyer qualification layer. Secure checkout is completed through Stan Store after product details are reviewed.</p><a href="/services/">View All Paid Services ${arrow}</a></div></div></section>`
  });
};

const productSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": product.schemaType || "Service",
  "name": product.name,
  "description": product.description,
  "url": absoluteUrl(productRoute(product)),
  "image": product.image ? absoluteUrl(`/assets/${product.image}`) : undefined,
  "offers": {
    "@type": "Offer",
    "price": product.priceValue,
    "priceCurrency": product.currency || "USD",
    "availability": product.checkoutStatus === "live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    "url": product.stanCheckoutUrl || absoluteUrl(productRoute(product))
  }
});

const productFaq = (product, detail) => [
  ["Where does checkout happen?", "Secure checkout is completed through Stan Store after you review product details on ZYNE."],
  ["What happens after purchase?", "After checkout, you complete the intake process and provide the context or materials required for delivery."],
  ["Are results guaranteed?", "No. ZYNE provides strategic services, assets, audits, and recommendations, but does not guarantee revenue, rankings, traffic, or leads."],
  ...(detail.faqs || [])
];

const productPage = (product) => {
  const category = categories.find((item) => item.id === product.category);
  const detail = getProductDetailContent(product, category);
  const related = uniqueProducts([
    ...productList(product.relatedProductIds),
    ...productList(category?.productIds || []).filter((item) => item.id !== product.id)
  ]).slice(0, 3);
  const responsibilities = detail.buyerResponsibilities?.length ? detail.buyerResponsibilities : defaultBuyerResponsibilities;
  const exclusions = detail.exclusions?.length ? detail.exclusions : defaultExclusions;
  const checkoutLink = product.checkoutStatus === "live" && product.stanCheckoutUrl;
  return layout({
    title: product.seoTitle || `${product.name} | ZYNE`,
    description: product.seoDescription || product.shortDescription || product.description,
    schema: productSchema(product),
    main: `
<section class="hero" data-event="product_page_view" data-product="${escapeHtml(product.id)}"><div class="container product-layout"><section class="visual">${product.image ? `<img src="/assets/${product.image}" alt="${escapeHtml(product.imageAlt || `${product.name} product package`)}">` : `<strong>ZYNE</strong><br>${escapeHtml(product.name)}`}</section><section class="panel"><p class="breadcrumb"><a href="/services/">Services</a> / <a href="${category?.url || "/services/"}">${escapeHtml(category?.title || "Product")}</a></p><p class="eyebrow">Fixed-price ${escapeHtml(product.productType.replaceAll("-", " "))}</p><h1>${escapeHtml(product.name)}</h1><strong class="price">${escapeHtml(product.price)}</strong><p class="lede">${escapeHtml(product.shortDescription || product.description)}</p><p><strong>Product positioning:</strong> ${escapeHtml(detail.positioning)}</p><p><strong>Who it is for:</strong> ${escapeHtml(product.bestFor)}</p><p><strong>Buyer problem:</strong> ${escapeHtml(detail.buyerProblem)}</p><div class="facts"><div><span>Timeline</span><strong>${escapeHtml(product.timeline)}</strong></div><div><span>Revisions</span><strong>${escapeHtml(product.revisions || "Defined by scope")}</strong></div><div><span>Category</span><strong>${escapeHtml(category?.shortTitle || product.category)}</strong></div></div></section><aside class="buybox"><p class="eyebrow">Purchase this service</p><strong class="price">${escapeHtml(product.price)}</strong><p>Review the scope on ZYNE, then continue to secure checkout.</p>${checkoutLink ? `<a class="button" href="${product.stanCheckoutUrl}" target="_blank" rel="noopener noreferrer external" data-event="product_buy_now_click" data-product="${escapeHtml(product.id)}" data-destination-type="stan_checkout" data-destination-url="${escapeHtml(product.stanCheckoutUrl)}">Checkout on Stan Store</a><div class="note">Secure checkout is completed through Stan Store.</div>` : `<a class="button ghost" href="/services/">View available services</a><div class="note">Checkout is not currently active for this product.</div>`}</aside></div></section>
<section class="section"><div class="container grid two"><article class="card"><p class="eyebrow">What is included</p><h2>Included in ${escapeHtml(product.shortName || product.name)}</h2><ul>${listItems(detail.included)}</ul></article><article class="card"><p class="eyebrow">Deliverables</p><h2>What you receive</h2><ul>${listItems(detail.deliverables)}</ul></article></div></section>
<section class="section"><div class="container grid two"><article class="card"><p class="eyebrow">Decision outcomes</p><h2>What this helps clarify</h2><ul>${listItems(detail.outcomes)}</ul></article><article class="card"><p class="eyebrow">Timeline and revisions</p><h2>Delivery terms</h2><p><strong>Timeline:</strong> ${escapeHtml(product.timeline)}</p><p><strong>Revisions:</strong> ${escapeHtml(product.revisions || "Defined by scope")}</p><p>After checkout, fulfillment begins from the completed intake and the product-specific scope.</p></article></div></section>
<section class="section"><div class="container grid two"><article class="card"><p class="eyebrow">Buyer responsibilities</p><h2>What you need to provide</h2><ul>${listItems(responsibilities)}</ul></article><article class="card"><p class="eyebrow">Scope exclusions</p><h2>What is not included</h2><ul>${listItems(exclusions)}</ul><p class="fine-print">Refund and scope handling depends on the purchased service and the work already performed. Product-specific checkout terms should be reviewed before purchase.</p><a href="/refund-policy/" data-event="refund_policy_click">Review refund and scope policy ${arrow}</a></article></div></section>
<section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">Related products</p><h2>Compare before checkout</h2></div><p>ZYNE owns product education and buyer qualification before Stan Store checkout.</p></div><div class="grid">${related.map(productCard).join("")}</div></div></section>
<section class="section"><div class="container grid two"><div class="card"><p class="eyebrow">Product FAQ</p><h2>Common purchase questions</h2>${faqBlock(productFaq(product, detail))}</div><div class="card"><p class="eyebrow">Final checkout note</p><h2>Review scope before payment</h2><p>Payment is processed externally through Stan Store. ZYNE controls service education, product scope, fulfillment expectations, and buyer-facing service information on this site.</p>${checkoutLink ? `<a class="button" href="${product.stanCheckoutUrl}" target="_blank" rel="noopener noreferrer external" data-event="stan_store_redirect_click" data-product="${escapeHtml(product.id)}" data-destination-type="stan_checkout" data-destination-url="${escapeHtml(product.stanCheckoutUrl)}">Purchase This Service ${arrow}</a><p class="note">Secure checkout is completed through Stan Store.</p>` : `<a class="button ghost" href="/services/">Compare available services ${arrow}</a>`}</div></div></section>`
  });
};

const legalPage = ({ url, title, description, points }) => layout({
  title: `${title} | ZYNE`,
  description,
  schema: pageSchema({ type: "WebPage", title: `${title} | ZYNE`, description, url }),
  main: `<section class="hero"><div class="container"><div class="panel"><p class="eyebrow">Legal and checkout clarity</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(description)}</p><ul>${listItems(points)}</ul><p class="fine-print">This page provides operational policy information for ZYNE productized services. Secure checkout is completed through Stan Store.</p></div></div></section>`
});

const writeRoute = async (route, html) => {
  const dir = join("dist", route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), html);
};

await writeRoute("services", collectionPage({
  url: "/services/",
  title: "ZYNE Paid Services",
  eyebrow: "All fixed-price services",
  description: "Browse fixed-price ZYNE services for visibility, brand authority, business improvement, AI systems, and client conversion.",
  products: catalogProducts,
  sections: ["Compare every active ZYNE productized service.", "Use category pages to narrow the problem area.", "Open product detail pages before checkout."]
}));

for (const category of categories) {
  await writeRoute(category.slug, categoryPage(category));
}

await writeRoute("intelligence", collectionPage({
  url: "/intelligence/",
  title: "ZYNE Intelligence",
  eyebrow: "Before execution comes intelligence.",
  description: "Paid strategic services that clarify constraints, reveal opportunities, and define the next commercial move before execution.",
  products: productList(intelligenceProductIds),
  sections: ["Clarify constraints and priorities.", "Compare strategic services by price and timeline.", "Choose a product page before checkout."],
  key: "intelligence",
  cta: "/improve-my-business/"
}));

await writeRoute("delivery", collectionPage({
  url: "/delivery/",
  title: "ZYNE Delivery",
  eyebrow: "From strategy to execution.",
  description: "Implementation-oriented services for brand presence, websites, AI automation, proof systems, referrals, and conversion infrastructure.",
  products: uniqueProducts(deliveryFamilies.flatMap((family) => productList(family.productIds))),
  sections: deliveryFamilies.map((family) => `${family.name}: ${family.description}`),
  key: "delivery",
  families: deliveryFamilies,
  cta: "/services/"
}));

await writeRoute("use-ai/realtor-gpt", collectionPage({
  url: "/use-ai/realtor-gpt/",
  title: "Realtor GPT Products",
  eyebrow: "Real estate AI systems",
  description: "Purpose-built AI assistant kits for real estate agents and teams that need practical workflow support without generic automation.",
  products: catalogProducts.filter((product) => product.id.includes("realtor-gpt")),
  sections: ["Compare Realtor GPT starter and growth options.", "Review fit and delivery timelines.", "Move to the right internal product page before checkout."],
  cta: "/use-ai/"
}));

await writeRoute("repair-schedule", renderRepairSchedulePage());

await writeRoute("privacy", legalPage({
  url: "/privacy/",
  title: "Privacy Policy",
  description: "How ZYNE handles information submitted for productized services, intake, fulfillment, and support.",
  points: ["ZYNE uses submitted business information to evaluate, fulfill, and support purchased services.", "Payment information is handled by Stan Store or its payment processors, not by ZYNE-hosted pages.", "Client materials should be limited to what is necessary for the purchased service scope."]
}));

await writeRoute("terms", legalPage({
  url: "/terms/",
  title: "Terms of Service",
  description: "Core service terms for fixed-price ZYNE productized services and external checkout flow.",
  points: ["Each purchase is governed by the service scope, deliverables, timeline, exclusions, and buyer responsibilities shown before checkout.", "ZYNE does not guarantee financial results, rankings, leads, traffic, or platform outcomes.", "Secure checkout is completed through Stan Store after product details are reviewed on ZYNE."]
}));

await writeRoute("refund-policy", legalPage({
  url: "/refund-policy/",
  title: "Refund and Scope Policy",
  description: "How ZYNE frames service scope, buyer responsibilities, revisions, and refund expectations for productized services.",
  points: ["Fixed-price services begin from a defined scope and require timely buyer intake.", "Completed strategy work, audits, digital deliverables, and started fulfillment work may not be refundable once delivery has begun.", "Revision handling is limited to the revision terms stated on the product detail page or checkout flow."]
}));

for (const product of catalogProducts) {
  await writeRoute(join("services", product.slug), productPage(product));
}

await writeFile(join("dist", "404.html"), layout({
  title: "Page in progress | ZYNE",
  description: "This ZYNE page is being prepared. Return to the services index to explore currently available paid services.",
  schema: pageSchema({ type: "WebPage", title: "Page in progress | ZYNE", description: "This ZYNE page is being prepared.", url: "/404/" }),
  main: `<section class="hero"><div class="container"><div class="panel"><p class="eyebrow">Page in progress</p><h1>This ZYNE page is being prepared.</h1><p class="lede">Return to the services index to compare fixed-price services and internal product detail pages.</p><a class="button" href="/services/">View services ${arrow}</a></div></div></section>`
}));
