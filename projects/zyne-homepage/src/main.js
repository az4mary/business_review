import "./styles/main.css";
import "./styles/header-hero-alignment.css";
import "./styles/mobile-sticky-cta.css";
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

document.addEventListener("click", (event) => {
  const menu = event.target.closest(".menu-toggle");
  if (menu) {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    setMenuOpen(!expanded);
    return;
  }

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

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
}

if (!document.querySelector('script[type="application/ld+json"]')) {
  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify(buildSchema());
  document.head.append(schema);
}
