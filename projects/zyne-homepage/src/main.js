import "./styles/main.css";
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

document.addEventListener("click", (event) => {
  const menu = event.target.closest(".menu-toggle");
  if (menu) {
    const expanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!expanded));
    document.querySelector("#main-navigation").classList.toggle("is-open", !expanded);
  }
  const link = event.target.closest("[data-event]");
  if (!link) return;
  const product = products.find((item) => item.id === link.dataset.product);
  track(link.dataset.event, {
    product_id: product?.id,
    product_name: product?.name,
    category: link.dataset.category || product?.category,
    price: product?.price,
    destination_type: link.href.includes("stan.store") ? "stan_checkout" : "internal_product_page",
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
  item.addEventListener("click", () => {
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector("#main-navigation").classList.remove("is-open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelector("#main-navigation").classList.remove("is-open");
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
