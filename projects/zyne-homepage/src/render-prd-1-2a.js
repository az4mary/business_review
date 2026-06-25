import { renderHomePage as renderBaseHomePage, buildSchema } from "./render.js";
import { diagnosticRoutes } from "./data/diagnostics.js";
import { getProduct } from "./data/products.js";

const categoryLabel = (category) => category.replaceAll("-", " ");
const sourceAttr = (section) => `data-source-section="${section}"`;
const arrow = "&#8599;";

const productLink = (productId) => {
  const product = getProduct(productId);
  if (!product) return "";
  return `<a class="diagnostic-product" href="${product.internalUrl}" ${sourceAttr("diagnostic-search")} data-event="diagnostic_product_click" data-product="${product.id}"><span>${categoryLabel(product.category)}</span><b>${product.name}</b><small>${product.price} · ${product.timeline}</small></a>`;
};

const resultCard = (route) => {
  const starter = getProduct(route.starterProductId);
  const diagnostic = getProduct(route.diagnosticProductId);
  return `<article class="diagnostic-result-card" data-diagnostic-result="${route.id}" hidden><p class="eyebrow">Curated recommendation</p><h3>${route.resultTitle}</h3><p>${route.why}</p><dl class="diagnostic-meta"><div><dt>Likely path</dt><dd><a href="${route.pathUrl}" ${sourceAttr("diagnostic-search")}>${route.pathTitle}</a></dd></div><div><dt>Start here</dt><dd><a href="${starter?.internalUrl || route.pathUrl}" ${sourceAttr("diagnostic-search")}>${starter?.name || "Recommended starter"}</a></dd></div><div><dt>If unsure</dt><dd><a href="${diagnostic?.internalUrl || route.pathUrl}" ${sourceAttr("diagnostic-search")}>${diagnostic?.name || "Paid diagnostic"}</a></dd></div></dl><div class="diagnostic-products" aria-label="Relevant products">${route.relatedProductIds.map(productLink).join("")}</div><p class="diagnostic-next"><strong>Next action:</strong> ${route.nextAction}</p><div class="actions diagnostic-actions"><a class="button" href="${starter?.internalUrl || route.pathUrl}" ${sourceAttr("diagnostic-search")} data-event="diagnostic_primary_recommendation_click" data-product="${starter?.id || ""}">View Starting Point <span>${arrow}</span></a><a class="button button-ghost" href="${route.pathUrl}" ${sourceAttr("diagnostic-search")} data-event="diagnostic_path_click" data-category="${route.pathUrl}">View Path</a></div></article>`;
};

const diagnosticSection = () => `<section class="diagnostic-section section" id="diagnostic-search" aria-labelledby="diagnostic-title"><div class="section-heading diagnostic-heading"><div><p class="eyebrow">Reduce the guesswork</p><h2 id="diagnostic-title">Find the Right <em>ZYNE Service</em></h2></div><p>Start with the business symptom. ZYNE will show a curated path, starter product, diagnostic option, and next step without requiring you to read the full catalog first.</p></div><form class="diagnostic-search" data-diagnostic-search><label for="diagnostic-select">What do you need help with?</label><div class="diagnostic-controls"><select id="diagnostic-select" name="diagnostic"><option value="">Select your biggest bottleneck</option>${diagnosticRoutes.map((route) => `<option value="${route.id}">${route.symptom}</option>`).join("")}</select><button class="button diagnostic-submit" type="submit">Find My Solution</button></div><p class="diagnostic-helper">Recommendations use approved ZYNE catalog data. If the problem is unclear, the route points to a paid diagnostic instead of a free call.</p></form><div class="diagnostic-results" data-diagnostic-results hidden aria-live="polite">${diagnosticRoutes.map(resultCard).join("")}<button class="diagnostic-reset" type="button" data-diagnostic-reset>Show full homepage</button></div></section>`;

const addSourceContext = (html) => html
  .replaceAll('href="/services/" data-event="header_shop_services_click"', `href="/services/" ${sourceAttr("header")} data-event="header_shop_services_click"`)
  .replaceAll('href="/services/" data-event="hero_shop_services_click"', `href="/services/" ${sourceAttr("hero")} data-event="hero_shop_services_click"`)
  .replaceAll('href="/services/" data-event="mobile_sticky_shop_services_click"', `href="/services/" ${sourceAttr("mobile-sticky-cta")} data-event="mobile_sticky_shop_services_click"`)
  .replaceAll('data-event="growth_path_card_click"', `${sourceAttr("growth-paths")} data-event="growth_path_card_click"`)
  .replaceAll('data-event="product_card_view_product_click"', `${sourceAttr("services")} data-event="product_card_view_product_click"`)
  .replaceAll('<a href="/intelligence/">View Intelligence Products</a>', `<a class="button button-ghost" href="/intelligence/" ${sourceAttr("intelligence")}>View Intelligence Products</a>`)
  .replaceAll('<a class="family-card" href="', `<a class="family-card" ${sourceAttr("delivery")} href="`)
  .replaceAll('data-event="industry_cta_click"', `${sourceAttr("industries")} data-event="industry_cta_click"`)
  .replaceAll('href="/services/" data-event="final_cta_shop_services_click"', `href="/services/" ${sourceAttr("final-cta")} data-event="final_cta_shop_services_click"`);

export const renderHomePage = () => {
  let html = renderBaseHomePage();
  html = html.replace('href="#growth-paths" data-event="hero_find_growth_path_click"', 'href="#diagnostic-search" data-event="hero_find_growth_path_click"');
  html = html.replace('href="#growth-paths" data-event="mobile_sticky_find_growth_path_click"', 'href="#diagnostic-search" data-event="mobile_sticky_find_growth_path_click"');
  html = html.replace('href="#growth-paths" data-event="final_cta_find_growth_path_click"', 'href="#diagnostic-search" data-event="final_cta_find_growth_path_click"');
  html = html.replace('</nav>\n    <a class="button button-small"', '<span class="mobile-menu-actions"><a class="button" href="#diagnostic-search" data-event="mobile_menu_find_growth_path_click">Find My Growth Path</a><a class="button button-ghost" href="/services/" data-source-section="mobile-menu" data-event="mobile_menu_shop_services_click">Shop Services</a></span></nav>\n    <a class="button button-small"');
  html = html.replace('</nav>\n  <main id="main-content">', '</nav>\n  <div class="return-context" data-return-context hidden role="status" aria-live="polite"><p>Continue where you left off?</p><button type="button" data-return-action>Return to section</button><button type="button" data-return-dismiss aria-label="Dismiss return prompt">×</button></div>\n  <main id="main-content">');
  html = html.replace('<section class="hero">', '<section class="hero" id="hero">');
  html = html.replace('</section>\n    <section class="trust-strip"', '</section>\n    <section class="trust-strip"');
  html = html.replace('</section>\n    <section class="section" id="growth-paths">', `</section>\n    ${diagnosticSection()}\n    <section class="section" id="growth-paths">`);
  html = html.replace('<section class="section process">', '<section class="section process" id="process">');
  html = html.replace('<section class="section premium">', '<section class="section premium" id="strategic-services">');
  html = html.replace('<section class="final-cta">', '<section class="final-cta" id="final-cta">');
  html = html.replace('<a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/refund-policy/">Refund policy</a>', '<a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/refund-policy/">Refund policy</a><a href="/cookie-policy/">Cookie policy</a>');
  return addSourceContext(html);
};

export { buildSchema };
