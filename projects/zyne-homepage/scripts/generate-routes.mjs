import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const routes = [
  ["services", "ZYNE Paid Services", "Browse fixed-price services for visibility, branding, AI, websites, intelligence, and client conversion."],
  ["grow-my-visibility", "Grow My Visibility", "Google Business Profile, social presence, website, and public-visibility services."],
  ["build-my-brand", "Build My Brand", "Brand identity, positioning, and sector-authority services."],
  ["improve-my-business", "Improve My Business", "Strategic briefings, audits, roadmaps, and competitor intelligence."],
  ["use-ai", "Use AI", "AI integration, chatbot, and Realtor GPT systems."],
  ["use-ai/realtor-gpt", "Realtor GPT Products", "Purpose-built AI assistants for real estate professionals."],
  ["convert-more-clients", "Convert More Clients", "Proof, referral, origination, and web-architecture services."],
  ["intelligence", "ZYNE Intelligence", "Paid strategic reports, audits, and executive briefings."],
  ["delivery", "ZYNE Delivery", "Done-for-you brand, website, AI, and conversion systems."],
  ["privacy", "Privacy Policy", "ZYNE privacy information is being prepared for publication."],
  ["terms", "Terms", "ZYNE service terms are being prepared for publication."],
  ["refund-policy", "Refund Policy", "Product-specific refund and scope terms are provided before checkout."]
];

const products = [
  ["google-business-profile-mini-audit", "Google Business Profile Mini Audit", "$49.99", "https://stan.store/ZYNE_store/p/google-business-profile-mini-audit", "Google_BP_Mini_Audit_thumbnail.png", "2 business days"],
  ["website-quick-win-audit", "Website Quick-Win Audit", "$49.99", "https://stan.store/ZYNE_store/p/website-quickwin-audit", "Website_Quick_Win_Audit_thumbnail.png", "2 business days"],
  ["social-media-quick-audit", "Social Media Quick Audit", "$49.99", "https://stan.store/ZYNE_store/p/social-media-quick-audit", "Social_Media_Quick_Audit_thumbnail.png", "2 business days"],
  ["homepage-fix-pack", "Homepage Fix Pack", "$149.99", "https://stan.store/ZYNE_store/p/homepage-fix-pack", "Homepage_Fix_Pack_thumbnail.png", "3 business days"],
  ["starter-brand-kit", "Starter Brand Kit", "$400", "https://stan.store/ZYNE_store/p/starter-brand-kit-14zdq78a", "Starter_Brand_Kit_thumbnail.png", "7–10 business days"],
  ["realtor-gpt-starter-kit", "Realtor GPT Starter Kit", "$500", "https://stan.store/ZYNE_store/p/realtor-gpt-starter-kit", "Realtor_GPT_Starter_Kit_thumbnail.png", "3–4 business days"],
  ["executive-briefing", "Executive Briefing", "$750", "https://stan.store/ZYNE_store/p/executive-briefing", "Executive_Briefing_thumbnail.png", "3–5 business days"],
  ["visibility-audit", "Visibility Audit", "$950", "https://stan.store/ZYNE_store/p/visibility-audit", "Visibility_Audit_thumbnail.jpg", "5–7 business days"],
  ["growth-roadmap", "Growth Roadmap", "$1,500", "https://stan.store/ZYNE_store/p/growth-roadmap", "Growth_Roadmap_thumbnail.jpg", "5–7 business days"],
  ["market-positioning", "Market Positioning", "$1,750", "https://stan.store/ZYNE_store/p/market-positioning", "Market_Positioning_thumbnail.jpg", "7–10 business days"],
  ["ai-integration", "AI Integration", "$1,750", "https://stan.store/ZYNE_store/p/ai-integration", "AI_Integration_thumbnail.jpg", "7–10 business days"],
  ["origination-system", "Origination System", "$1,950", "https://stan.store/ZYNE_store/p/origination-system", "Origination_System_thumbnail.jpg", "7–10 business days"],
  ["sector-authority", "Sector Authority", "$1,950", "https://stan.store/ZYNE_store/p/sector-authority", "Sector_Authority_thumbnail.jpg", "7–10 business days"],
  ["web-architecture", "Web Architecture", "$2,500", "https://stan.store/ZYNE_store/p/web-architecture", "Web_Architecture_thumbnail.jpg", "7–10 business days"],
  ["operational-audit", "Operational Audit", "$2,500", "https://stan.store/ZYNE_store/p/operational-audit", "Operational_Audit_thumbnail.jpg", "10–15 business days"],
  ["competitor-readiness", "Competitor Readiness", "$2,950", "https://stan.store/ZYNE_store/p/competitor-readiness", "Competitor_Readiness_thumnail.png", "7–10 business days"]
];

const shell = ({ title, description, price, checkout }) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706"><title>${title} | ZYNE</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}
header{height:82px;padding:0 6vw;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(201,169,103,.25)}
header img{width:110px}a{color:inherit;text-decoration:none}.button{display:inline-block;padding:1rem 1.3rem;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;font-weight:700}
main{min-height:calc(100vh - 82px);display:grid;place-items:center;padding:8vw}.card{width:min(780px,100%);padding:clamp(2rem,6vw,5rem);border:1px solid rgba(201,169,103,.3);background:radial-gradient(circle at 80% 10%,rgba(201,169,103,.14),transparent 30%),#10100e}
.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.22em;font-size:.68rem}h1{font-size:clamp(2.8rem,7vw,5.8rem);line-height:1;margin:.5rem 0 1.5rem;font-weight:500}p{color:#aaa59c;line-height:1.8;font-size:1.05rem}.price{display:block;color:#c9a967;font-family:Georgia,serif;font-size:2rem;margin:1rem 0 2rem}.note{font-size:.75rem;color:#716d65;margin-top:1rem}
</style></head><body><header><a href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"></a><a href="/" class="button">Back to homepage</a></header>
<main><section class="card"><div class="eyebrow">ZYNE · Paid productized service</div><h1>${title}</h1>${price ? `<strong class="price">${price}</strong>` : ""}<p>${description}</p>
${checkout ? `<a class="button" href="${checkout}" target="_blank" rel="noopener noreferrer external">Checkout on Stan Store ↗</a><div class="note">Secure checkout opens in a new tab through Stan Store.</div>` : `<a class="button" href="/#services">Explore available services</a><div class="note">Full product details and checkout access are being finalized.</div>`}
</section></main></body></html>`;

const productShell = ({ title, price, checkout, image, timeline }) => `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706"><title>${title} | ZYNE</title>
<style>
*{box-sizing:border-box}html,body{overflow-x:hidden}body{margin:0;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}
header{height:82px;padding:0 6vw;display:flex;align-items:center;border-bottom:1px solid #302815;position:sticky;top:0;background:#070706ee;z-index:4}header img{width:110px}header>a:last-child{margin-left:auto}
.button{display:block;padding:1rem 1.25rem;text-align:center;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:700;border:1px solid #c9a967}
main{padding:5vw 6vw 8vw}.crumb{color:#817b70;font-size:.72rem;margin-bottom:2rem}.layout{display:grid;grid-template-columns:minmax(320px,.9fr) minmax(360px,1.1fr) 330px;gap:3vw;align-items:start;max-width:1500px;margin:auto}
.visual{position:sticky;top:110px;background:#e9e3d9;padding:2rem;min-height:540px;display:grid;place-items:center}.visual img{width:100%;height:500px;object-fit:contain}
.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.65rem}.details h1{font-size:clamp(2.7rem,5vw,5.2rem);line-height:.98;margin:.7rem 0 1rem;font-weight:500}.price{color:#c9a967;font:2.2rem Georgia,serif}.lead{color:#b4aea3;line-height:1.75;font-size:1.05rem}
.benefits{margin:2rem 0;padding:1.5rem 0;border-block:1px solid #302815}.benefits h2,.facts h2{font-size:1rem;text-transform:uppercase;letter-spacing:.12em;color:#c9a967}.benefits li{margin:.8rem 0;color:#d2ccc1;line-height:1.5}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#302815;border:1px solid #302815}.facts div{background:#0d0d0b;padding:1.2rem}.facts span{display:block;color:#746f67;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em}.facts strong{display:block;margin-top:.45rem;font-size:.84rem}
.buybox{position:sticky;top:110px;border:1px solid #4a3d20;background:linear-gradient(145deg,#15130e,#0c0c0a);padding:1.5rem}.buybox .price{display:block;margin:.5rem 0 1.2rem}.buybox p{color:#aaa59c;line-height:1.6;font-size:.85rem}.trust{margin:1rem 0;padding:1rem 0;border-block:1px solid #302815;font-size:.75rem;line-height:1.9;color:#b8b1a5}.note{font-size:.68rem;color:#777168;margin-top:1rem;line-height:1.5}
@media(max-width:1050px){.layout{grid-template-columns:1fr 1fr}.buybox{position:static;grid-column:1/-1}.visual{position:static}}@media(max-width:700px){header{height:68px;padding:0 1rem;gap:2rem}header img{width:76px}header>a:last-child{position:static;margin:0;font-size:.7rem;white-space:nowrap}main{padding:1.5rem 1.25rem 4rem}.crumb{margin-bottom:1.5rem}.layout{grid-template-columns:minmax(0,1fr);gap:1.5rem}.visual{min-height:0;padding:1rem}.visual img{height:auto;max-height:390px}.details{min-width:0}.details h1{font-size:2.65rem;overflow-wrap:anywhere}.lead{font-size:.98rem;overflow-wrap:anywhere}.facts{grid-template-columns:1fr}.buybox{grid-column:auto}}
</style></head><body><header><a href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"></a><a href="/#services">Services</a></header>
<main><div class="crumb"><a href="/">Home</a> / <a href="/services/">Services</a> / ${title}</div><div class="layout">
<section class="visual"><img src="/assets/${image}" alt="${title} product package"></section>
<section class="details"><div class="eyebrow">Fixed-price strategic service</div><h1>${title}</h1><strong class="price">${price}</strong>
<p class="lead">A focused ZYNE service with defined scope, clear deliverables, and a structured fulfillment process.</p>
<div class="benefits"><h2>Why buyers choose this service</h2><ul><li>Clear scope and transparent fixed pricing before checkout.</li><li>Actionable deliverables designed for practical implementation.</li><li>Defined timeline and a guided post-purchase intake process.</li><li>Professional output built for leadership and business use.</li></ul></div>
<div class="facts"><div><span>Delivery</span><strong>${timeline}</strong></div><div><span>Format</span><strong>Digital service</strong></div><div><span>Checkout</span><strong>Secure via Stan Store</strong></div></div></section>
<aside class="buybox"><div class="eyebrow">Purchase this service</div><strong class="price">${price}</strong><p>Review the service details, then continue to secure checkout in a new tab.</p>
<a class="button" href="${checkout}" target="_blank" rel="noopener noreferrer external">Checkout on Stan Store ↗</a>
<div class="trust">✓ Fixed-price offer<br>✓ Defined delivery timeline<br>✓ Secure external checkout<br>✓ ZYNE tab stays open</div>
<div class="note">After checkout, follow the product-specific intake and fulfillment instructions.</div></aside>
</div></main></body></html>`;

for (const [route, title, description] of routes) {
  const dir = join("dist", route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), shell({ title, description }));
}

for (const [slug, title, price, checkout, image, timeline] of products) {
  const dir = join("dist", "services", slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), productShell({ title, price, checkout, image, timeline }));
}

await writeFile(join("dist", "404.html"), shell({
  title: "Page in progress",
  description: "This ZYNE page is being prepared. Return to the homepage to explore currently available paid services."
}));
