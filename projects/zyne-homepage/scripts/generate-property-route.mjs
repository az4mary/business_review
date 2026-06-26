import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const route = "homedetail/7101-wendemere-st-houston-tx-77088";
const outputDir = join("dist", route);

const header = `<header>
  <a href="/" aria-label="ZYNE home"><img src="/assets/zyne-logo.png" alt="ZYNE"></a>
  <nav aria-label="Main navigation">
    <a href="/services/">Services</a>
    <a href="/grow-my-visibility/">Visibility</a>
    <a href="/build-my-brand/">Brand</a>
    <a href="/improve-my-business/">Business</a>
    <a href="/use-ai/">AI</a>
    <a href="/convert-more-clients/">Conversion</a>
    <a href="/intelligence/">Intelligence</a>
    <a href="/delivery/">Delivery</a>
  </nav>
</header>`;

const footer = `<footer class="footer">Product education, service details, comparison logic, and buyer qualification are provided by ZYNE. Secure checkout is completed through Stan Store.</footer>`;

const css = `*{box-sizing:border-box}body{margin:0;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee;position:sticky;top:0;z-index:10;backdrop-filter:blur(18px)}header img{width:110px;height:auto}nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18)}.container{width:min(1180px,88vw);margin:0 auto}.hero,.section{padding:clamp(3rem,7vw,6rem) 0;border-top:1px solid rgba(201,169,103,.12)}.hero{border-top:0}.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:2rem}.card,.panel{border:1px solid rgba(201,169,103,.26);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.012));padding:1.4rem}.visual{min-height:420px;border:1px solid rgba(201,169,103,.24);background:linear-gradient(135deg,#e5eedc,#77a55f 38%,#315d30 39%,#0e160e);position:relative}.visual:after{content:"Covered porch · green bungalow";position:absolute;left:1rem;bottom:1rem;background:#f1eadc;color:#070706;padding:.55rem .7rem;font-size:.66rem;text-transform:uppercase;letter-spacing:.12em;font-weight:800}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.66rem;font-weight:800}h1{font-size:clamp(2.6rem,6vw,5.2rem);line-height:.95;margin:.65rem 0 1rem;font-weight:500;letter-spacing:-.055em}h2{font-size:clamp(1.8rem,4vw,3.1rem);line-height:1;margin:.2rem 0 1rem;font-weight:500;letter-spacing:-.04em}.price{display:block;color:#c9a967;font-size:clamp(2rem,4vw,3rem);letter-spacing:-.05em}p,li{color:#b4aea3;line-height:1.72}.facts{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#302815;border:1px solid #302815}.facts div{background:#0d0d0b;padding:1rem}.facts span{display:block;color:#746f67;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em}.tag{display:inline-flex;margin:.25rem;border:1px solid rgba(201,169,103,.28);color:#c9a967;padding:.34rem .55rem;font-size:.66rem;text-transform:uppercase;letter-spacing:.1em}@media(max-width:1000px){header{height:68px}nav{display:none}.grid{grid-template-columns:1fr}.visual{min-height:300px}}`;

const fact = (label, value) => `<div><span>${label}</span><strong>${value}</strong></div>`;
const tag = (value) => `<span class="tag">${value}</span>`;

const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>7101 Wendemere St Houston TX 77088 | ZYNE Property Detail</title><meta name="description" content="Property detail page for 7101 Wendemere St, Houston, TX 77088."><link rel="canonical" href="https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/"><meta name="robots" content="noindex,nofollow"><style>${css}</style></head><body>${header}<main><section class="hero"><div class="container grid"><div class="visual"></div><aside class="panel"><p class="eyebrow">For rent · Active</p><h1>7101 Wendemere St</h1><strong class="price">$1,495/month</strong><p>Three-bedroom Houston bungalow with a covered porch, Texas-size lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow.</p><div class="facts">${fact("Bedrooms","3")}${fact("Baths","1 full")}${fact("Interior","1,064 sqft")}${fact("Lot","7,250 sqft")}</div>${tag("large lot")}${tag("no HOA")}${tag("covered porch")}${tag("near schools")}</aside></div></section><section class="section"><div class="container grid"><article class="card"><p class="eyebrow">About this property</p><h2>Covered porch, large lot, and value-add potential.</h2><p>Cozy bungalow near Watonga Park, Drew Academy, Anderson Academy, shopping, dining, and I-45. Screenshot data describes spacious bedrooms with walk-in closets, a primary bedroom with en-suite bathroom, an open kitchen/dining area, and a large living room.</p></article><article class="card"><p class="eyebrow">Lease details</p><h2>Known listing facts</h2><div class="facts">${fact("Application fee","$50")}${fact("Pet deposit","Yes")}${fact("Date available","06/01/26")}${fact("Rental terms","One year")}${fact("Pets","Case by case")}${fact("Smoking","No")}</div></article></div></section><section class="section"><div class="container grid"><article class="card"><p class="eyebrow">Room dimensions</p><div class="facts">${fact("Living","17 x 14")}${fact("Dining","10 x 7")}${fact("Kitchen","9 x 8")}${fact("Primary Bedroom","14 x 14")}</div></article><article class="card"><p class="eyebrow">Exterior</p><div class="facts">${fact("Private pool","No")}${fact("Lot","Cleared")}${fact("Water / sewer","Public sewer, public water")}${fact("Exterior","Back yard, fenced, patio/deck")}</div></article></div></section></main>${footer}</body></html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html`);
