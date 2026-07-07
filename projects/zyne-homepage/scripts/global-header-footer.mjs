export const globalHeaderFooterStyles = `@font-face{font-family:"Inter Var";font-style:normal;font-weight:100 900;font-display:swap;src:url("/assets/fonts/InterVariable.woff2") format("woff2-variations"),url("/assets/fonts/InterVariable.woff2") format("woff2")}@font-face{font-family:"Inter Var";font-style:italic;font-weight:100 900;font-display:swap;src:url("/assets/fonts/InterVariable-Italic.woff2") format("woff2-variations"),url("/assets/fonts/InterVariable-Italic.woff2") format("woff2")}header,.footer{font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif}header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee;position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}header img{width:110px;height:auto}nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18)}.footer p{color:#b4aea3;font-size:1rem;font-weight:300;line-height:1.72}.footer-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}.footer-links a{color:#c9a967;font-weight:400}@media(max-width:1000px){nav{display:none}}`;

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
</header>`;

export const renderGlobalFooter = () => `<footer class="footer">
  <p>Product education and service details are provided on ZYNE. Secure checkout is completed through Stan Store.</p>
  <p>ZYNE controls service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.</p>
  <nav class="footer-links" aria-label="Legal links">${renderLinks(footerLinks)}</nav>
</footer>`;
