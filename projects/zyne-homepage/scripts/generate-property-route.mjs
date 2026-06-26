import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const route = "homedetail/7101-wendemere-st-houston-tx-77088";
const outputDir = join("dist", route);

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const facts = [
  ["Monthly rent", "$1,495/mo"],
  ["Bedrooms", "3"],
  ["Baths", "1 full"],
  ["Interior", "1,064 sqft"],
  ["Lot", "7,250 sqft"],
  ["Type", "Rental - Single Family Detached"]
];

const tags = [
  "large lot",
  "no HOA",
  "near schools",
  "close to amenities",
  "spacious bedrooms",
  "walk-in closets",
  "en-suite bathroom",
  "open kitchen/dining",
  "covered porch",
  "potential for value"
];

const rooms = [
  ["Living", "17 × 14, 1st"],
  ["Dining", "10 × 7, 1st"],
  ["Kitchen", "9 × 8, 1st"],
  ["Primary Bedroom", "14 × 14, 1st"],
  ["Bedroom", "14 × 11, 1st"],
  ["Bedroom", "11 × 10, 1st"],
  ["Primary Bath", "10 × 7, 1st"],
  ["Utility Room", "10 × 6, 1st"]
];

const interior = [
  ["Pets allowed", "Case by case"],
  ["Smoking allowed", "No"],
  ["Floors", "Carpet, vinyl plank, wood"],
  ["Primary bath", "Tub/shower combo"],
  ["Bedroom description", "En-suite bath"],
  ["Kitchen", "Soft-closing drawers"],
  ["Cooling", "Central electric"],
  ["Heating", "Central gas"],
  ["Energy features", "Ceiling fans, digital program thermostat, HVAC >13 SEER, structural insulated panels"]
];

const exterior = [
  ["Private pool", "No"],
  ["Lot description", "Cleared"],
  ["Water / sewer", "Public sewer, public water"],
  ["Area pool", "No"],
  ["Exterior", "Back yard, back yard fenced, patio/deck, satellite dish"]
];

const lease = [
  ["Application fee", "$50"],
  ["Pet deposit", "Yes"],
  ["Date available", "06/01/26"],
  ["Rental terms", "One year"],
  ["Rental type", "Free standing"],
  ["Other fees", "No"]
];

const table = (items) => items.map(([label, value]) => `<div class="detail-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
const tagList = tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");

const schema = {
  "@context": "https://schema.org",
  "@type": "Residence",
  "name": "7101 Wendemere St, Houston, TX 77088",
  "url": "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7101 Wendemere St",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77088",
    "addressCountry": "US"
  },
  "floorSize": { "@type": "QuantitativeValue", "value": 1064, "unitText": "SQFT" },
  "numberOfRooms": 3,
  "description": "Three-bedroom, one-bath rental bungalow near Watonga Park with a covered porch, large lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow."
};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#070706">
<title>7101 Wendemere St Houston TX 77088 | ZYNE Property Detail</title>
<meta name="description" content="Property detail page for 7101 Wendemere St, Houston, TX 77088. Three-bedroom, one-bath rental bungalow with covered porch, large lot, and no HOA.">
<link rel="canonical" href="https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/">
<meta name="robots" content="noindex,nofollow">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>
*{box-sizing:border-box}html{background:#070706;color:#f1eadc;scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 80% 0,rgba(201,169,103,.17),transparent 32rem),#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}a:focus-visible,button:focus-visible{outline:2px solid #c9a967;outline-offset:4px}.skip-link{position:absolute;left:-999px;top:1rem}.skip-link:focus{left:1rem;z-index:99;background:#c9a967;color:#070706;padding:.8rem 1rem}header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee;position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}header img{width:110px;height:auto}.nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}.nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.container{width:min(1180px,88vw);margin:0 auto}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.66rem;font-weight:800}.button{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:1rem 1.2rem;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:800;border:1px solid #c9a967}.button.ghost{background:transparent;color:#f1eadc}.hero{padding:clamp(3rem,7vw,6.4rem) 0 4rem}.hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:clamp(1.4rem,4vw,4rem);align-items:start}.gallery{display:grid;grid-template-columns:1.2fr .8fr;gap:.7rem}.photo-main,.photo-small{border:1px solid rgba(201,169,103,.24);background:linear-gradient(135deg,#e5eedc,#77a55f 38%,#315d30 39%,#0e160e);position:relative;overflow:hidden;min-height:420px}.photo-main:before{content:"";position:absolute;inset:auto 9% 13% 9%;height:48%;background:linear-gradient(180deg,#b6dfb0,#77a55f);clip-path:polygon(0 30%,50% 0,100% 30%,100% 100%,0 100%);box-shadow:0 20px 60px rgba(0,0,0,.28)}.photo-main:after{content:"Covered porch · green bungalow";position:absolute;left:1rem;bottom:1rem;color:#070706;background:#f1eadc;padding:.55rem .7rem;font-size:.66rem;text-transform:uppercase;letter-spacing:.12em;font-weight:800}.photo-small{min-height:204px;display:grid;place-items:center;text-align:center;color:#0b0b09;background:#e8e1d4}.photo-stack{display:grid;gap:.7rem}.panel,.card,.sticky-card{border:1px solid rgba(201,169,103,.26);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));box-shadow:0 24px 80px rgba(0,0,0,.22)}.panel{padding:clamp(1.4rem,3.5vw,3rem)}h1{font-size:clamp(2.5rem,5.6vw,5.2rem);line-height:.95;margin:.65rem 0 1rem;font-weight:500;letter-spacing:-.055em}h2{font-size:clamp(1.9rem,3.6vw,3.2rem);line-height:1;margin:0 0 1rem;font-weight:500;letter-spacing:-.04em}h3{font-size:1.1rem;margin:.2rem 0 .65rem}.price{display:block;color:#c9a967;font-size:clamp(2rem,4vw,3.1rem);letter-spacing:-.05em}.lede,p,li{color:#b4aea3;line-height:1.72}.lede{font-size:1.1rem;max-width:64ch}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#302815;border:1px solid #302815;margin:1.25rem 0}.facts div{background:#0d0d0b;padding:1rem}.facts span,.detail-row span{display:block;color:#746f67;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em}.tag-row{display:flex;flex-wrap:wrap;gap:.55rem;margin:1.2rem 0}.tag{display:inline-flex;border:1px solid rgba(201,169,103,.28);color:#c9a967;padding:.34rem .55rem;font-size:.66rem;text-transform:uppercase;letter-spacing:.1em}.layout{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:2rem;align-items:start}.section{padding:clamp(3.2rem,6vw,5.5rem) 0;border-top:1px solid rgba(201,169,103,.12)}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.card{padding:1.35rem}.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#302815;border:1px solid #302815}.detail-row{background:#0d0d0b;padding:1rem}.detail-row strong{display:block;margin-top:.35rem;color:#f1eadc;font-weight:500}.sticky-card{position:sticky;top:106px;padding:1.25rem}.sticky-card .button{width:100%;margin:.45rem 0}.map-card{min-height:340px;border:1px solid rgba(201,169,103,.24);background:linear-gradient(90deg,rgba(241,234,220,.08) 1px,transparent 1px),linear-gradient(rgba(241,234,220,.08) 1px,transparent 1px),#141411;background-size:50px 50px;position:relative;overflow:hidden}.map-card:before{content:"Wendemere St";position:absolute;left:50%;top:0;bottom:0;width:42px;display:grid;place-items:center;background:#2a2a25;color:#c9a967;writing-mode:vertical-rl;text-orientation:mixed;font-size:.7rem;text-transform:uppercase;letter-spacing:.1em}.map-card:after{content:"7101";position:absolute;left:calc(50% + 52px);top:46%;background:#c9a967;color:#080807;padding:.45rem .6rem;font-weight:800;border-radius:999px}.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18)}.mobile-actions{display:none}@media(max-width:1000px){header{height:68px}.nav{display:none}.hero-grid,.layout,.grid,.gallery{grid-template-columns:1fr}.photo-main{min-height:330px}.photo-stack{grid-template-columns:1fr 1fr}.photo-small{min-height:140px}.facts,.detail-grid{grid-template-columns:repeat(2,1fr)}.sticky-card{position:static}.mobile-actions{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;position:fixed;left:0;right:0;bottom:0;z-index:20;padding:.75rem .9rem;background:rgba(7,7,6,.94);border-top:1px solid rgba(201,169,103,.22);backdrop-filter:blur(18px)}.mobile-actions .button{padding:.78rem .65rem}.footer{padding-bottom:6rem}}@media(max-width:560px){.container{width:min(100% - 1.6rem,1180px)}.hero{padding-top:2rem}.panel,.card{padding:1rem}.facts,.detail-grid,.photo-stack{grid-template-columns:1fr}.photo-main{min-height:270px}h1{font-size:2.55rem}.price{font-size:2.15rem}}
</style>
</head>
<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
<header>
  <a href="/" aria-label="ZYNE home"><img src="/assets/zyne-logo-optimized.webp" alt="ZYNE"></a>
  <nav class="nav" aria-label="Main navigation"><a href="/services/">Services</a><a href="/grow-my-visibility/">Visibility</a><a href="/build-my-brand/">Brand</a><a href="/improve-my-business/">Business</a><a href="/use-ai/">AI</a><a href="/delivery/">Delivery</a></nav>
</header>
<main id="main-content">
<section class="hero"><div class="container hero-grid"><div class="gallery" aria-label="Property visual summary"><div class="photo-main"></div><div class="photo-stack"><div class="photo-small"><strong>3 beds</strong><br>1 full bath</div><div class="photo-small"><strong>7,250 sqft lot</strong><br>covered porch</div></div></div><aside class="panel"><p class="eyebrow">For rent · Active</p><h1>7101 Wendemere St</h1><strong class="price">$1,495/month</strong><p class="lede">Three-bedroom Houston bungalow with a covered porch, Texas-size lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow.</p><div class="facts">${facts.map(([label,value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div><div class="tag-row">${tagList}</div><div class="hero-actions"><a class="button" href="#contact">Request Details</a><a class="button ghost" href="#details">View Details</a></div></aside></div></section>
<section class="section"><div class="container layout"><div><article class="card"><p class="eyebrow">What's special</p><h2>Covered porch, large lot, and value-add potential.</h2><p>Cozy bungalow situated on a Texas-size lot with no HOA and conveniently located near Watonga Park, Drew Academy, Anderson Academy, shopping, dining, and quick access to I-45. The home needs cosmetic work and is ready for a renter or investor-minded resident who sees the value in space, access, and flexibility.</p></article><article class="card" style="margin-top:1rem"><p class="eyebrow">About this property</p><p>A covered porch leads inside the home to spacious bedrooms with walk-in closets, a primary bedroom with an en-suite bathroom, open kitchen/dining area, and a large living room. The property offers generous yard space and a flexible security-deposit discussion for qualified renters able to make necessary improvements.</p></article></div><aside class="sticky-card" id="contact"><p class="eyebrow">Listing snapshot</p><strong class="price">$1,495/mo</strong><p>7101 Wendemere St, Houston, TX 77088</p><a class="button" href="mailto:?subject=7101%20Wendemere%20St%20Houston%20TX%2077088">Request details</a><a class="button ghost" href="#lease">Review lease info</a><p class="lede" style="font-size:.9rem">Source data extracted from provided property-listing screenshots. Confirm current availability, fees, terms, and application requirements with the listing manager before relying on this page.</p></aside></div></section>
<section class="section" id="details"><div class="container grid"><article class="card"><p class="eyebrow">Rooms</p><h2>Room dimensions</h2><div class="detail-grid">${table(rooms)}</div></article><article class="card"><p class="eyebrow">Interior</p><h2>Interior features</h2><div class="detail-grid">${table(interior)}</div></article></div></section>
<section class="section"><div class="container grid"><article class="card"><p class="eyebrow">Exterior</p><h2>Exterior and utility details</h2><div class="detail-grid">${table(exterior)}</div></article><article class="card"><p class="eyebrow">Lot information</p><h2>Cleared lot near local access points.</h2><div class="map-card" aria-label="Illustrative map card for 7101 Wendemere St"></div><p class="lede" style="font-size:.9rem">Lot configuration and dimensions should be independently confirmed.</p></article></div></section>
<section class="section" id="lease"><div class="container grid"><article class="card"><p class="eyebrow">Lease information</p><h2>Application and rental terms</h2><div class="detail-grid">${table(lease)}</div></article><article class="card"><p class="eyebrow">Financial information</p><h2>Known fee notes</h2><p><strong>Other fees:</strong> No.</p><p>Estimated electricity savings and energy-cost claims shown in source screenshots should be verified through the relevant utility or listing platform before use.</p></article></div></section>
<section class="section"><div class="container"><div class="card"><p class="eyebrow">ZYNE page treatment</p><h2>Clean property detail flow with fewer distractions.</h2><p>This page keeps the ZYNE header, footer, dark luxury visual system, quick-facts hierarchy, sticky conversion card, mobile bottom actions, tag-driven property highlights, and segmented property details inspired by the supplied HAR and Zillow screenshots.</p></div></div></section>
</main>
<div class="mobile-actions"><a class="button" href="#contact">Request Details</a><a class="button ghost" href="#details">Details</a></div>
<footer class="footer">ZYNE property detail concept page. Source information is extracted from supplied screenshots and should be confirmed with the listing manager. Secure checkout language is not used for this real-estate detail page.</footer>
</body>
</html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html`);
