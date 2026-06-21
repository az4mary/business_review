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
  ["google-business-profile-mini-audit", "Google Business Profile Mini Audit", "$49.99", "https://stan.store/ZYNE_store/p/google-business-profile-mini-audit"],
  ["website-quick-win-audit", "Website Quick-Win Audit", "$49.99", "https://stan.store/ZYNE_store/p/website-quickwin-audit"],
  ["social-media-quick-audit", "Social Media Quick Audit", "$49.99", "https://stan.store/ZYNE_store/p/social-media-quick-audit"],
  ["homepage-fix-pack", "Homepage Fix Pack", "$149.99", "https://stan.store/ZYNE_store/p/homepage-fix-pack"],
  ["starter-brand-kit", "Starter Brand Kit", "$400", "https://stan.store/ZYNE_store/p/starter-brand-kit-14zdq78a"],
  ["realtor-gpt-starter-kit", "Realtor GPT Starter Kit", "$500", "https://stan.store/ZYNE_store/p/realtor-gpt-starter-kit"],
  ["executive-briefing", "Executive Briefing", "$750", "https://stan.store/ZYNE_store/p/executive-briefing"],
  ["visibility-audit", "Visibility Audit", "$950", "https://stan.store/ZYNE_store/p/visibility-audit"],
  ["growth-roadmap", "Growth Roadmap", "$1,500", "https://stan.store/ZYNE_store/p/growth-roadmap"],
  ["market-positioning", "Market Positioning", "$1,750", "https://stan.store/ZYNE_store/p/market-positioning"],
  ["ai-integration", "AI Integration", "$1,750", "https://stan.store/ZYNE_store/p/ai-integration"],
  ["origination-system", "Origination System", "$1,950", "https://stan.store/ZYNE_store/p/origination-system"],
  ["sector-authority", "Sector Authority", "$1,950", "https://stan.store/ZYNE_store/p/sector-authority"],
  ["web-architecture", "Web Architecture", "$2,500", "https://stan.store/ZYNE_store/p/web-architecture"],
  ["operational-audit", "Operational Audit", "$2,500", "https://stan.store/ZYNE_store/p/operational-audit"],
  ["competitor-readiness", "Competitor Readiness", "$2,950", "https://stan.store/ZYNE_store/p/competitor-readiness"]
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
${checkout ? `<a class="button" href="${checkout}">Checkout on Stan Store ↗</a><div class="note">Secure checkout is completed through Stan Store.</div>` : `<a class="button" href="/#services">Explore available services</a><div class="note">Full product details and checkout access are being finalized.</div>`}
</section></main></body></html>`;

for (const [route, title, description] of routes) {
  const dir = join("dist", route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), shell({ title, description }));
}

for (const [slug, title, price, checkout] of products) {
  const dir = join("dist", "services", slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), shell({
    title,
    price,
    checkout,
    description: "This fixed-price ZYNE service page is being expanded with full scope, deliverables, timeline, and fulfillment details."
  }));
}

await writeFile(join("dist", "404.html"), shell({
  title: "Page in progress",
  description: "This ZYNE page is being prepared. Return to the homepage to explore currently available paid services."
}));
