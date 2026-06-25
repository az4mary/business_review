import "./styles/main.css";
import "./styles/header-hero-alignment.css";
import "./styles/mobile-sticky-cta.css";
import "./styles/prd-1-2a.css";
import { products } from "./data/products.js";
import { buildSchema, renderHomePage } from "./render.js";

const track = (event, properties = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties });
};

const app = document.querySelector("#app");

if (app && !app.innerHTML.trim()) {
  app.innerHTML = renderHomePage();
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");

const setMenuOpen = (open) => {
  if (!menuToggle || !mainNavigation) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  mainNavigation.classList.toggle("is-open", open);
  document.body.classList.toggle("mobile-menu-open", open);
  const label = menuToggle.querySelector("b");
  if (label) label.textContent = open ? "Close" : "Menu";
};

const updateMobileStickyCta = () => {
  const stickyCta = document.querySelector(".mobile-sticky-cta");
  const hero = document.querySelector(".hero");
  if (!stickyCta || !hero) return;

  const mobileViewport = window.matchMedia("(max-width: 640px)").matches;
  const heroTrigger = hero.offsetTop + hero.offsetHeight * 0.55;
  document.body.classList.toggle("show-mobile-sticky-cta", mobileViewport && window.scrollY > heroTrigger);
};

window.addEventListener("scroll", updateMobileStickyCta, { passive: true });
window.addEventListener("resize", updateMobileStickyCta);
updateMobileStickyCta();

const diagnosticForm = document.querySelector("[data-diagnostic-search]");
const diagnosticSelect = document.querySelector("#diagnostic-select");
const diagnosticResults = document.querySelector("[data-diagnostic-results]");
const diagnosticReset = document.querySelector("[data-diagnostic-reset]");

const revealDiagnosticResult = (routeId, options = {}) => {
  if (!diagnosticResults || !diagnosticSelect || !routeId) return false;
  const cards = [...diagnosticResults.querySelectorAll("[data-diagnostic-result]")];
  const activeCard = cards.find((card) => card.dataset.diagnosticResult === routeId);
  if (!activeCard) return false;

  diagnosticSelect.value = routeId;
  diagnosticResults.hidden = false;
  cards.forEach((card) => {
    card.hidden = card !== activeCard;
  });
  document.body.classList.add("has-diagnostic-result");

  if (options.updateHash !== false) {
    window.history.replaceState(null, "", `#diagnostic-${routeId}`);
  }

  if (options.scrollIntoView) {
    diagnosticResults.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return true;
};

if (diagnosticForm && diagnosticSelect) {
  diagnosticForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const routeId = diagnosticSelect.value;
    if (!routeId) {
      diagnosticSelect.focus();
      return;
    }
    if (revealDiagnosticResult(routeId, { scrollIntoView: true })) {
      track("diagnostic_search_submit", { diagnostic_id: routeId });
    }
  });
}

if (diagnosticReset && diagnosticResults && diagnosticSelect) {
  diagnosticReset.addEventListener("click", () => {
    diagnosticSelect.value = "";
    diagnosticResults.hidden = true;
    diagnosticResults.querySelectorAll("[data-diagnostic-result]").forEach((card) => {
      card.hidden = true;
    });
    document.body.classList.remove("has-diagnostic-result");
    window.history.replaceState(null, "", "#diagnostic-search");
    document.querySelector("#diagnostic-search")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

const diagnosticHash = window.location.hash.match(/^#diagnostic-(.+)$/)?.[1];
if (diagnosticHash) {
  revealDiagnosticResult(diagnosticHash, { updateHash: false });
}

const returnContextKey = "zyneHomepageReturnContext";
const sectionLabels = {
  hero: "the homepage hero",
  "diagnostic-search": "the diagnostic search",
  "growth-paths": "Growth Paths",
  services: "Services",
  intelligence: "ZYNE Intelligence",
  delivery: "ZYNE Delivery",
  process: "How ZYNE Works",
  "strategic-services": "Featured Strategic Services",
  industries: "Industries",
  faq: "FAQ",
  "final-cta": "the final CTA",
  header: "the homepage header",
  footer: "the footer",
  "mobile-menu": "the mobile menu",
  "mobile-sticky-cta": "the mobile sticky CTA"
};

const storeReturnContext = (link) => {
  const section = link.dataset.sourceSection;
  if (!section) return;
  const href = link.getAttribute("href") || "";
  if (href.startsWith("#")) return;

  let destination;
  try {
    destination = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (destination.origin !== window.location.origin) return;
  if (destination.pathname === "/" && destination.hash) return;

  const payload = {
    section,
    label: sectionLabels[section] || section.replaceAll("-", " "),
    scrollY: Math.max(0, Math.round(window.scrollY)),
    timestamp: Date.now()
  };
  sessionStorage.setItem(returnContextKey, JSON.stringify(payload));
};

const showReturnContextPrompt = () => {
  const prompt = document.querySelector("[data-return-context]");
  if (!prompt || window.location.pathname !== "/" || window.location.hash) return;

  let payload;
  try {
    payload = JSON.parse(sessionStorage.getItem(returnContextKey) || "null");
  } catch {
    payload = null;
  }

  if (!payload?.section || Date.now() - Number(payload.timestamp || 0) > 1000 * 60 * 45) return;

  const target = document.querySelector(`#${CSS.escape(payload.section)}`);
  if (!target) return;

  const action = prompt.querySelector("[data-return-action]");
  const dismiss = prompt.querySelector("[data-return-dismiss]");
  const label = payload.label || sectionLabels[payload.section] || payload.section;
  if (action) action.textContent = `Return to ${label}`;
  prompt.hidden = false;

  action?.addEventListener("click", () => {
    prompt.hidden = true;
    target.scrollIntoView({ block: "start", behavior: "smooth" });
    sessionStorage.removeItem(returnContextKey);
  }, { once: true });

  dismiss?.addEventListener("click", () => {
    prompt.hidden = true;
    sessionStorage.removeItem(returnContextKey);
  }, { once: true });
};

showReturnContextPrompt();

if (window.location.hash && !diagnosticHash) {
  const target = document.querySelector(window.location.hash);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}

document.addEventListener("click", (event) => {
  const menu = event.target.closest(".menu-toggle");
  if (menu) {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    setMenuOpen(!expanded);
    return;
  }

  const sourceLink = event.target.closest("a[data-source-section]");
  if (sourceLink) storeReturnContext(sourceLink);

  const link = event.target.closest("[data-event]");
  if (!link) return;
  const product = products.find((item) => item.id === link.dataset.product);
  track(link.dataset.event, {
    product_id: product?.id || link.dataset.product,
    product_name: product?.name,
    category: link.dataset.category || product?.category,
    price: product?.price,
    destination_type: link.href?.includes("stan.store") ? "stan_checkout" : "internal_product_page",
    destination_url: link.href
  });
});

document.querySelectorAll('a[href*="stan.store"]').forEach((link) => {
  link.dataset.event = "stan_store_redirect_click";
  link.addEventListener("click", () => {
    track("product_buy_now_click", {
      product_id: link.dataset.product,
      destination_type: "stan_checkout",
      destination_url: link.href
    });
  });
});

document.querySelectorAll("#main-navigation a").forEach((item) => {
  item.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setMenuOpen(false);
});

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) track("faq_expand", { question: detail.querySelector("summary").textContent.trim() });
  });
});

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  if (new URL(link.href).origin === window.location.origin) return;
  link.target = "_blank";
  link.rel = "noopener noreferrer external";
});

track("homepage_view");

window.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.closest(".premium-grid")) return;
  image.closest("article")?.classList.add("image-load-failed");
}, true);

if (!document.querySelector('script[type="application/ld+json"]')) {
  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.textContent = JSON.stringify(buildSchema());
  document.head.append(schemaScript);
}
