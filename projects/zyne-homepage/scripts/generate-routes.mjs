import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { catalogProducts } from "../src/data/products.js";

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
  ["terms", "Terms", "ZYNE Terms are being prepared for publication."],
  ["refund-policy", "Refund Policy", "Product-specific refund and scope terms are provided before checkout."]
];

const baseStyles = `*{box-sizing:border-box}body{margin:0;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}header{height:82px;padding:0 6vw;display:flex;align-items:center;border-bottom:1px solid #302815;background:#070706ee}header img{width:110px}header a:last-child{margin-left:auto}.button{display:inline-block;padding:1rem 1.25rem;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:700;border:1px solid #c9a967}main{padding:6vw}.card,.layout{max-width:1180px;margin:auto}.card{padding:clamp(2rem,6vw,5rem);border:1px solid rgba(201,169,103,.3);background:#10100e}.layout{display:grid;grid-template-columns:minmax(280px,.9fr) minmax(320px,1.1fr) 330px;gap:3vw}.visual{background:#e9e3d9;color:#171511;min-height:460px;display:grid;place-items:stretch;padding:0;text-align:center;text-transform:uppercase;letter-spacing:.12em;overflow:hidden}.visual img{display:block;width:100%;height:100%;min-height:460px;object-fit:cover;object-position:center center}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.65rem}h1{font-size:clamp(2.6rem,6vw,5rem);line-height:1;margin:.5rem 0 1rem;font-weight:500}p,li{color:#b4aea3;line-height:1.7}.price{color:#c9a967;font:2rem Georgia,serif}.buybox{border:1px solid #4a3d20;background:#10100e;padding:1.5rem}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#302815;border:1px solid #302815}.facts div{background:#0d0d0b;padding:1rem}.facts span{display:block;color:#746f67;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em}.note{font-size:.75rem;color:#777168;margin-top:1rem}@media(max-width:950px){.layout{grid-template-columns:1fr}.visual{min-height:280px}.visual img{min-height:280px}}`;

const page = ({ title, description, price, checkout }) => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#070706"><title>${title} | ZYNE</title><style>${baseStyles}</style></head><body><header><a href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"></a><a href="/" class="button">Back to homepage</a></header><main><section class="card"><div class="eyebrow">ZYNE · Paid productized service</div><h1>${title}</h1>${price ? `<strong class="price">${price}</strong>` : ""}<p>${description}</p>${checkout ? `<a class="button" href="${checkout}" target="_blank" rel="noopener noreferrer external">Checkout on Stan Store</a><div class="note">Secure checkout opens in a new tab through Stan Store.</div>` : `<a class="button" href="/#services">Explore available services</a><div class="note">Full product details and checkout access are being finalized.</div>`}</section></main></body></html>`;

const productPage = (item) => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#070706"><title>${item.name} | ZYNE</title><style>${baseStyles}</style></head><body><header><a href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"></a><a href="/#services">Services</a></header><main><div class="layout"><section class="visual">${item.image ? `<img src="/assets/${item.image}" alt="${item.name} product package">` : `<strong>ZYNE</strong><br>${item.name}`}</section><section><div class="eyebrow">Fixed-price strategic service</div><h1>${item.name}</h1><strong class="price">${item.price}</strong><p>${item.description}</p><ul><li>Clear scope and transparent fixed pricing before checkout.</li><li>Actionable deliverables designed for practical implementation.</li><li>Defined timeline and guided post-purchase intake.</li></ul><div class="facts"><div><span>Delivery</span><strong>${item.timeline}</strong></div><div><span>Format</span><strong>Digital service</strong></div><div><span>Checkout</span><strong>Stan Store</strong></div></div></section><aside class="buybox"><div class="eyebrow">Purchase this service</div><strong class="price">${item.price}</strong><p>Review service details on ZYNE, then continue to secure checkout.</p><a class="button" href="${item.stanCheckoutUrl}" target="_blank" rel="noopener noreferrer external">Checkout on Stan Store</a><div class="note">After checkout, follow the product-specific intake and fulfillment instructions.</div></aside></div></main></body></html>`;

for (const [route, title, description] of routes) {
  const dir = join("dist", route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), page({ title, description }));
}

for (const item of catalogProducts) {
  const dir = join("dist", "services", item.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), productPage(item));
}

await writeFile(join("dist", "404.html"), page({ title: "Page in progress", description: "This ZYNE page is being prepared. Return to the homepage to explore currently available paid services." }));
