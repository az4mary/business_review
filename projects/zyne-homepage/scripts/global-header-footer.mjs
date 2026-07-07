export const globalHeaderFooterStyles = `@font-face{font-family:"Inter Var";font-style:normal;font-weight:100 900;font-display:swap;src:url("/assets/fonts/InterVariable.woff2") format("woff2-variations"),url("/assets/fonts/InterVariable.woff2") format("woff2")}@font-face{font-family:"Inter Var";font-style:italic;font-weight:100 900;font-display:swap;src:url("/assets/fonts/InterVariable-Italic.woff2") format("woff2-variations"),url("/assets/fonts/InterVariable-Italic.woff2") format("woff2")}header,.footer{font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee;position:sticky;top:0;z-index:50;backdrop-filter:blur(18px)}header img{width:110px;height:auto}header nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}header nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.header-briefing{display:inline-flex;align-items:center;justify-content:center;margin-left:auto;padding:.95rem 1.25rem;border:1px solid #c9a967;color:#c9a967;background:transparent;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;font-weight:800}.mobile-menu-toggle{display:none;margin-left:.8rem;border:0;background:transparent;color:#f1eadc}.mobile-menu-toggle span{display:block;width:30px;height:2px;margin:6px 0;background:#f1eadc}.mobile-menu{display:none}.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18)}.footer p{color:#b4aea3;font-size:1rem;font-weight:300}.footer-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}.footer-links a{color:#c9a967;font-weight:400}.footer-copy{margin-top:1.25rem;color:#77736a;font-size:.8rem}@media(max-width:1000px){header{min-height:92px;padding:0 4vw}header img{width:150px}header>nav{display:none}.header-briefing{margin-left:auto;padding:.85rem 1rem;font-size:.7rem}.mobile-menu-toggle{display:block}.mobile-menu{position:fixed;inset:0;z-index:100;display:grid;grid-template-rows:auto 1fr;background:#050505f8;opacity:0;visibility:hidden;pointer-events:none;transition:.2s ease}.mobile-menu.is-open{opacity:1;visibility:visible;pointer-events:auto}.mobile-menu-head{min-height:92px;padding:0 4vw;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(201,169,103,.22)}.mobile-menu-head img{width:150px}.mobile-menu-close{border:1px solid rgba(201,169,103,.55);background:transparent;color:#f1eadc;padding:.7rem .85rem;text-transform:uppercase;letter-spacing:.12em}.mobile-menu nav{display:grid;align-content:center;gap:1.2rem;margin:0;padding:8vw}.mobile-menu nav a{color:#f1eadc;font-size:1.35rem;letter-spacing:.12em;text-transform:uppercase}.footer{padding:2rem 6vw}.footer-links{display:grid;gap:.8rem}body.mobile-menu-open{overflow:hidden}}@media(max-width:520px){header img,.mobile-menu-head img{width:145px}.header-briefing{font-size:.65rem;padding:.8rem .9rem}.mobile-menu-toggle span{width:28px}}`;

export const headerLinks = [
  ["Services", "/services/"],
  ["Visibility", "/grow-my-visibility/"],
  ["Brand", "/build-my-brand/"],
  ["Business", "/improve-my-business/"],
  ["AI", "/use-ai/"],
  ["Conversion", "/convert-more-clients/"],
  ["Intelligence", "/intelligence/"],
  ["Delivery", "/delivery/"],
];

export const footerLinks = [
  ["Privacy Policy", "/privacy/"],
  ["Terms of Service", "/terms/"],
  ["Refund and Scope Policy", "/refund-policy/"],
  ["Cookie Policy", "/cookie-policy/"],
];

const renderLinks = (links) => links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

export const renderGlobalHeader = () => `<header>
  <a href="/" aria-label="ZYNE home"><img src="/assets/brand/zyne-logo.png" alt="ZYNE"></a>
  <nav aria-label="Main navigation">${renderLinks(headerLinks)}</nav>
  <a class="header-briefing" href="/services/executive-briefing/">Schedule Briefing</a>
  <button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-mobile-menu-open><span></span><span></span><span></span><b class="sr-only">Menu</b></button>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="mobile-menu-head"><a href="/" aria-label="ZYNE home"><img src="/assets/brand/zyne-logo.png" alt="ZYNE"></a><button class="mobile-menu-close" type="button" data-mobile-menu-close>Close</button></div>
  <nav aria-label="Mobile navigation">${renderLinks(headerLinks)}</nav>
</div>`;

export const renderGlobalFooter = () => `<footer class="footer">
  <p>Product education and service details are provided on ZYNE. Secure checkout is completed through Stan Store.</p>
  <p>ZYNE controls service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.</p>
  <nav class="footer-links" aria-label="Legal links">${renderLinks(footerLinks)}</nav>
  <p class="footer-copy">© ZYNE 2026</p>
</footer>`;

export const renderGlobalHeaderFooterScript = () => `<script>
(() => {
  const menu = document.getElementById("mobile-menu");
  const openButton = document.querySelector("[data-mobile-menu-open]");
  const closeButton = document.querySelector("[data-mobile-menu-close]");
  if (!menu || !openButton || !closeButton) return;
  const open = () => {
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("mobile-menu-open");
    closeButton.focus();
  };
  const close = () => {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-menu-open");
    openButton.focus();
  };
  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  menu.addEventListener("click", (event) => { if (event.target.matches("a")) close(); });
  addEventListener("keydown", (event) => { if (event.key === "Escape" && menu.classList.contains("is-open")) close(); });
})();
</script>`;
