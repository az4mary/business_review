import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const route = "homedetail/7101-wendemere-st-houston-tx-77088";
const outputDir = join("dist", route);
const imageBase = "/homedetail/7101-wendemere-st-houston-tx-77088/images";
const sourceImageDir = join("..", "..", route, "images");
const outputImageDir = join(outputDir, "images");
const canonical = "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/";
const title = "7101 Wendemere St Houston TX 77088 Rental | ZYNE Property Detail";
const description = "Tour 7101 Wendemere St, a three-bedroom Houston rental with covered porch, large lot, open layout, walk-in closets, local amenities, and clear leasing details.";

const property = {
  address: "7101 Wendemere St",
  city: "Houston",
  state: "TX",
  zip: "77088",
  price: "$1,495/month",
  beds: "3",
  baths: "1 full",
  interior: "1,064 sqft",
  lot: "7,250 sqft",
  type: "Singlefamily Home",
  availability: "Available now",
  cooling: "Electric ceiling fan",
  heating: "Natural gas"
};

const navItems = [
  ["Services", "/services/"],
  ["Visibility", "/grow-my-visibility/"],
  ["Brand", "/build-my-brand/"],
  ["Business", "/improve-my-business/"],
  ["AI", "/use-ai/"],
  ["Conversion", "/convert-more-clients/"],
  ["Intelligence", "/intelligence/"],
  ["Delivery", "/delivery/"]
];

const fallbackLabels = [
  "Bathroom",
  "Bedroom",
  "Living room",
  "Dining area",
  "Front exterior",
  "Kitchen",
  "Bedroom",
  "Laundry area",
  "Covered porch",
  "Kitchen detail",
  "Living area",
  "Exterior yard",
  "Bedroom closet",
  "Bathroom detail",
  "Side yard",
  "Entry view",
  "Dining view",
  "Property detail"
];

const naturalSort = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const isPropertyImage = (file) => /\.(?:jpe?g|png|webp|avif)$/i.test(file);
const imageUrl = (file) => `${imageBase}/${encodeURIComponent(file)}`;
const titleCase = (value) => value.split(/[\s_-]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
const inferLabel = (file, index) => {
  const name = file.toLowerCase();
  if (/front|exterior|outside|facade|porch|house|home/.test(name)) return "Front exterior";
  if (/kitchen/.test(name)) return "Kitchen";
  if (/living|family/.test(name)) return "Living room";
  if (/dining/.test(name)) return "Dining area";
  if (/bed|primary/.test(name)) return "Bedroom";
  if (/bath|restroom/.test(name)) return "Bathroom";
  if (/laundry|washer|utility/.test(name)) return "Laundry area";
  return fallbackLabels[index] || titleCase(file.replace(/\.[^.]+$/, "")) || `Property image ${index + 1}`;
};

let imageFiles = [];
try {
  const entries = await readdir(sourceImageDir, { withFileTypes: true });
  imageFiles = entries
    .filter((entry) => entry.isFile() && isPropertyImage(entry.name))
    .map((entry) => entry.name)
    .sort(naturalSort.compare);

  if (imageFiles.length) {
    await mkdir(outputImageDir, { recursive: true });
    await Promise.all(imageFiles.map((file) => copyFile(join(sourceImageDir, file), join(outputImageDir, file))));
  }
} catch (error) {
  console.warn(`Property images were not copied from ${sourceImageDir}: ${error.message}`);
}

const galleryData = imageFiles.map((file, index) => ({
  index,
  label: inferLabel(file, index),
  src: imageUrl(file)
}));
const exteriorIndex = galleryData.findIndex((item) => /front exterior|porch|outside|exterior/i.test(item.label));
const heroIndex = exteriorIndex >= 0 ? exteriorIndex : Math.min(4, Math.max(galleryData.length - 1, 0));
const heroImage = galleryData[heroIndex] || null;
const visibleImages = [
  heroImage,
  ...galleryData.filter((item) => item && item.index !== heroIndex)
].filter(Boolean).slice(0, 6);
const primaryImage = heroImage ? `https://zyne.store${heroImage.src}` : "https://zyne.store/assets/zyne-logo-optimized.webp";
const photoCount = galleryData.length || visibleImages.length;

const nav = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
const stat = (icon, value, label) => `<div class="stat-card"><span class="icon">${icon}</span><strong>${value}</strong><small>${label}</small></div>`;
const detail = (label, value) => `<div class="detail-row"><span>${label}</span><strong>${value}</strong></div>`;
const tag = (value) => `<span class="tag">${value}</span>`;
const feature = (icon, title, copy) => `<article class="feature-card"><span class="feature-icon">${icon}</span><h3>${title}</h3><p>${copy}</p></article>`;
const tableRow = (label, value) => `<div class="overview-row"><span>${label}</span><strong>${value}</strong></div>`;
const galleryTile = (item, className = "") => item
  ? `<button class="gallery-tile ${className}" type="button" data-gallery-index="${item.index}" aria-label="Open ${item.label} photo"><img src="${item.src}" alt="${item.label} at ${property.address}" loading="${className.includes("hero-photo") ? "eager" : "lazy"}"><span>${item.label}</span></button>`
  : `<div class="gallery-tile gallery-placeholder ${className}"><span>Photo coming soon</span></div>`;

const gallery = `<section class="media-panel" aria-label="Property media gallery">
  <div class="media-grid">
    ${galleryTile(visibleImages[0], "hero-photo")}
    ${galleryTile(visibleImages[1])}
    ${galleryTile(visibleImages[2])}
    ${galleryTile(visibleImages[3])}
    ${galleryTile(visibleImages[4])}
    <button class="gallery-tile see-all" type="button" data-gallery-index="${visibleImages[5]?.index ?? 0}" aria-label="See all property photos">
      ${visibleImages[5] ? `<img src="${visibleImages[5].src}" alt="${visibleImages[5].label} at ${property.address}" loading="lazy">` : ""}
      <span>See all ${photoCount} photos</span>
    </button>
  </div>
</section>`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://zyne.store/#organization", "name": "ZYNE", "url": "https://zyne.store/", "logo": "https://zyne.store/assets/zyne-logo-optimized.webp" },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, "name": title, "url": canonical, "description": description, "primaryImageOfPage": primaryImage },
    { "@type": "SingleFamilyResidence", "@id": `${canonical}#property`, "name": `${property.address}, ${property.city}, ${property.state} ${property.zip}`, "url": canonical, "image": galleryData.map((item) => `https://zyne.store${item.src}`), "address": { "@type": "PostalAddress", "streetAddress": property.address, "addressLocality": property.city, "addressRegion": property.state, "postalCode": property.zip, "addressCountry": "US" }, "floorSize": { "@type": "QuantitativeValue", "value": 1064, "unitCode": "FTK" }, "numberOfRooms": 3, "offers": { "@type": "Offer", "price": 1495, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": canonical, "businessFunction": "https://purl.org/goodrelations/v1#LeaseOut" } }
  ]
};

const css = `:root{--bg:#050504;--panel:#0c0b09;--panel2:#11100d;--gold:#c9a967;--gold2:#e2b85b;--text:#f3ecde;--muted:#b6afa2;--line:rgba(201,169,103,.28)}*{box-sizing:border-box}html{background:var(--bg);color:var(--text);scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 12% 0,rgba(201,169,103,.08),transparent 30rem),radial-gradient(circle at 94% 22%,rgba(201,169,103,.08),transparent 28rem),#050504;color:var(--text);font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}button{font:inherit}a:focus-visible,button:focus-visible{outline:2px solid var(--gold);outline-offset:4px}.skip-link{position:absolute;left:-999px;top:1rem}.skip-link:focus{left:1rem;z-index:99;background:var(--gold);color:#050504;padding:.8rem 1rem}.site-header{height:92px;padding:0 clamp(1.3rem,3vw,2rem);display:flex;align-items:center;border-bottom:1px solid var(--line);background:rgba(5,5,4,.92);position:sticky;top:0;z-index:20;backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:.75rem;min-width:180px}.brand img{width:70px;height:auto}.brand b{font-family:Georgia,serif;font-size:2rem;color:var(--gold);letter-spacing:.08em}.main-nav{display:flex;gap:1.65rem;align-items:center;margin-left:auto}.main-nav a{font-size:.73rem;text-transform:uppercase;letter-spacing:.14em;color:#e9e2d6;font-weight:800}.header-cta{margin-left:1.4rem;border:1px solid var(--gold);padding:.78rem 1rem;color:var(--gold);font-size:.64rem;text-transform:uppercase;letter-spacing:.12em;font-weight:900}.page{width:min(1180px,calc(100% - 3rem));margin:0 auto}.topbar{display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:3rem 0 1.6rem;color:var(--muted);font-size:.83rem}.breadcrumbs,.actions{display:flex;gap:1rem;align-items:center;flex-wrap:wrap}.breadcrumbs a,.actions button{color:var(--text);background:none;border:0;padding:0;cursor:pointer}.actions button{display:flex;gap:.4rem;align-items:center}.hero-layout{display:grid;grid-template-columns:minmax(0,1.52fr) minmax(350px,.86fr);gap:1.6rem}.media-grid{display:grid;grid-template-columns:2fr 1fr;grid-template-rows:repeat(3,1fr);gap:.55rem;height:680px}.gallery-tile{position:relative;display:block;border:1px solid var(--line);background:#12110e;padding:0;overflow:hidden;cursor:pointer}.gallery-tile img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}.gallery-tile:hover img{transform:scale(1.025)}.hero-photo{grid-row:span 2}.gallery-tile span,.status-badge{position:absolute;left:1rem;top:1rem;background:linear-gradient(180deg,#f3cc6c,#ba8a2d);color:#070604;padding:.55rem .7rem;text-transform:uppercase;letter-spacing:.12em;font-size:.68rem;font-weight:950}.gallery-tile span{top:auto;bottom:1rem;background:#f4ecde;color:#080706}.see-all span{left:50%;top:50%;bottom:auto;transform:translate(-50%,-50%);white-space:nowrap;background:rgba(5,5,4,.82);color:var(--text);border:1px solid var(--line)}.summary-card{border:1px solid var(--line);background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.012));padding:2.2rem;position:sticky;top:112px}.eyebrow{color:var(--gold2);text-transform:uppercase;letter-spacing:.18em;font-size:.7rem;font-weight:900}h1{font-size:clamp(3rem,5vw,5.15rem);line-height:.92;letter-spacing:-.055em;margin:.7rem 0 .4rem;font-weight:500}.location{color:var(--text);font-size:1.25rem;margin:0 0 1.1rem}.price{display:block;color:var(--gold2);font-size:clamp(2.25rem,4vw,3.25rem);font-weight:800;margin:0 0 1rem}p{color:var(--muted);line-height:1.72}.summary-copy{font-size:1.03rem;color:#efe8da}.summary-stats{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid var(--line);margin:1.6rem 0}.summary-stats .detail-row{border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:1.1rem}.summary-stats .detail-row:nth-child(2n){border-right:0}.summary-stats .detail-row:nth-last-child(-n+2){border-bottom:0}.detail-row span,.overview-row span{display:block;color:#7f7668;text-transform:uppercase;letter-spacing:.12em;font-size:.66rem}.detail-row strong,.overview-row strong{display:block;margin-top:.35rem;color:var(--text);font-size:1.12rem}.button{display:flex;align-items:center;justify-content:center;gap:.8rem;width:100%;min-height:56px;border:1px solid var(--gold);text-transform:uppercase;letter-spacing:.16em;font-size:.74rem;font-weight:950}.button.primary{background:linear-gradient(180deg,#f1c769,#b7802b);color:#070604}.button.secondary{color:var(--gold2);margin-top:.85rem}.tag-row{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:1.6rem}.tag{border:1px solid var(--line);padding:.62rem .8rem;color:var(--gold2);text-transform:uppercase;letter-spacing:.11em;font-size:.7rem;font-weight:800}.stat-strip{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);margin:2.1rem 0;background:rgba(255,255,255,.02)}.stat-card{padding:1.4rem;text-align:center;border-right:1px solid rgba(201,169,103,.18)}.stat-card:last-child{border-right:0}.icon,.feature-icon{display:block;color:var(--gold2);font-size:2rem;line-height:1;margin-bottom:.9rem}.stat-card strong{display:block;color:var(--text);font-size:1rem}.stat-card small{display:block;color:var(--muted);font-size:.82rem;margin-top:.35rem}.section-card{border:1px solid var(--line);background:linear-gradient(135deg,rgba(255,255,255,.035),rgba(255,255,255,.01));margin:1rem 0 0;padding:2.1rem}.section-title{display:grid;grid-template-columns:max-content 1fr;gap:2rem;align-items:center;margin:0 0 1.8rem}.section-title h2{font-family:Georgia,serif;color:var(--gold2);font-size:1.7rem;text-transform:uppercase;letter-spacing:.06em;margin:0}.section-title:after{content:"";height:1px;background:var(--line)}.feature-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:0}.feature-card{padding:1rem 1.1rem;text-align:center;border-right:1px solid rgba(201,169,103,.2)}.feature-card:last-child{border-right:0}.feature-card h3{color:var(--gold2);text-transform:uppercase;letter-spacing:.08em;font-size:.82rem;margin:.4rem 0}.feature-card p{font-size:.86rem;margin:0}.overview-layout{display:grid;grid-template-columns:1fr 1.08fr;gap:2rem}.overview-table{border:1px solid rgba(201,169,103,.2)}.overview-row{display:grid;grid-template-columns:.48fr 1fr;padding:.78rem 1rem;border-bottom:1px solid rgba(201,169,103,.18)}.overview-row:last-child{border-bottom:0}.amenity-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem 2rem}.amenity{display:grid;grid-template-columns:48px 1fr;gap:1rem;align-items:start}.amenity .feature-icon{margin:0}.amenity h3{margin:0;color:var(--text)}.amenity p{margin:.25rem 0 0}.cta-panel{display:grid;grid-template-columns:1fr 320px;gap:2rem;align-items:center;border:1px solid var(--line);background:radial-gradient(circle at 95% 100%,rgba(201,169,103,.22),transparent 20rem),linear-gradient(135deg,rgba(201,169,103,.12),rgba(255,255,255,.01));padding:2rem;margin:1.6rem 0}.cta-panel h2{font-family:Georgia,serif;color:var(--gold2);font-size:2rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem}.footer{display:grid;grid-template-columns:1fr auto auto;gap:2rem;align-items:center;padding:2rem 0 3rem;color:#837a6e}.footer .brand img{width:58px}.footer-nav{display:flex;gap:1.25rem}.footer-nav a{font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);font-weight:800}.socials{display:flex;gap:.7rem}.socials span{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--gold);border-radius:999px;color:var(--gold)}.lightbox{position:fixed;inset:0;background:rgba(5,5,4,.96);z-index:60;display:none;align-items:center;justify-content:center;padding:4rem}.lightbox.is-open{display:flex}.lightbox-card{width:min(1120px,90vw);height:min(760px,82vh);border:1px solid var(--line);background:#080706;position:relative}.lightbox-card img{width:100%;height:100%;object-fit:contain}.lightbox-label{position:absolute;left:1rem;bottom:1rem;background:#f4ecde;color:#080706;padding:.7rem 1rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.lightbox button{position:absolute;background:var(--gold);color:#080706;border:0;padding:.8rem 1.05rem;font-weight:900;cursor:pointer}.lightbox-close{right:0;top:-3.4rem}.lightbox-prev{left:-4.5rem;top:50%;transform:translateY(-50%)}.lightbox-next{right:-4.5rem;top:50%;transform:translateY(-50%)}@media(max-width:1050px){.main-nav,.header-cta{display:none}.hero-layout,.overview-layout,.cta-panel,.footer{grid-template-columns:1fr}.summary-card{position:static}.media-grid{height:auto;grid-template-columns:1fr 1fr}.hero-photo{grid-column:1/-1;height:360px}.gallery-tile:not(.hero-photo){height:180px}.feature-grid,.amenity-grid,.stat-strip{grid-template-columns:repeat(2,1fr)}.feature-card:nth-child(2n){border-right:0}.lightbox{padding:4rem 1rem}.lightbox-prev{left:1rem}.lightbox-next{right:1rem}.lightbox-close{right:1rem}}@media(max-width:640px){.page{width:min(100% - 1.2rem,1180px)}.site-header{height:74px}.brand img{width:54px}.brand b{font-size:1.55rem}.topbar,.actions{align-items:flex-start}.hero-layout{gap:1rem}.summary-card,.section-card,.cta-panel{padding:1.2rem}h1{font-size:3rem}.feature-grid,.amenity-grid,.stat-strip,.summary-stats,.media-grid{grid-template-columns:1fr}.summary-stats .detail-row,.stat-card,.feature-card{border-right:0}.footer-nav{flex-wrap:wrap}}`;

const header = `<header class="site-header"><a class="brand" href="/" aria-label="ZYNE home"><img src="/assets/zyne-logo.png" alt="ZYNE"><b>ZYNE</b></a><nav class="main-nav" aria-label="Main navigation">${nav}</nav><a class="header-cta" href="/services/executive-briefing/">Schedule Executive Briefing</a></header>`;
const topbar = `<div class="topbar"><div class="breadcrumbs"><a href="/">← Back to Listings</a><span>/</span><span>Houston, TX</span><span>/</span><strong>${property.address}</strong></div><div class="actions"><button type="button">♡ Save</button><button type="button">⇧ Share</button><button type="button">⎙ Print</button></div></div>`;
const summary = `<aside class="summary-card"><p class="eyebrow">For rent · Active</p><h1>7101<br>Wendemere St</h1><p class="location">${property.city}, ${property.state} ${property.zip}</p><strong class="price">${property.price}</strong><p class="summary-copy">Three-bedroom Houston bungalow with a covered porch, Texas-size lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow.</p><div class="summary-stats">${detail("Bedrooms", property.beds)}${detail("Baths", property.baths)}${detail("Interior", property.interior)}${detail("Lot size", property.lot)}</div><a class="button primary" href="mailto:hello@zyne.store?subject=Schedule%20a%20viewing%20for%207101%20Wendemere%20St">Schedule a Viewing <span>›</span></a><a class="button secondary" href="mailto:hello@zyne.store?subject=Request%20to%20apply%20for%207101%20Wendemere%20St">Request to Apply</a><div class="tag-row">${tag("Large lot")}${tag("No HOA")}${tag("Covered porch")}${tag("Near schools")}${tag("Available now")}</div></aside>`;
const statStrip = `<section class="stat-strip">${stat("⌂", property.type, "Property Type")}${stat("▣", property.availability, "Availability")}${stat("✤", property.cooling, "Cooling")}${stat("♨", property.heating, "Heating")}</section>`;
const whatsSpecial = `<section class="section-card"><div class="section-title"><h2>What's Special</h2></div><div class="feature-grid">${feature("▦", "Texas-size lot", "Spacious lot with plenty of outdoor potential.")}${feature("⌂", "Covered porch", "Relax on the covered front porch with classic charm.")}${feature("◇", "No HOA", "No HOA fees or restrictions for greater flexibility.")}${feature("▱", "Near schools", "Conveniently located near local schools and amenities.")}${feature("⚿", "Walk-in closets", "Generous closet space in the bedrooms.")}${feature("▤", "Open layout", "Open kitchen and dining flow for easy living and entertaining.")}</div></section>`;
const overview = `<section class="section-card"><div class="section-title"><h2>Property Overview</h2></div><div class="overview-layout"><p>This well-maintained three-bedroom bungalow offers comfort, space, and convenience. Enjoy a covered front porch, a large lot, and an open layout that connects the kitchen and dining area seamlessly. With easy access to major roads, schools, and shopping, this home is ready for you.</p><div class="overview-table">${tableRow("Address", `${property.address}, ${property.city}, ${property.state} ${property.zip}`)}${tableRow("Property type", property.type)}${tableRow("Status", property.availability)}${tableRow("Monthly rent", property.price)}${tableRow("Beds", property.beds)}${tableRow("Baths", property.baths)}${tableRow("Interior", property.interior)}${tableRow("Lot size", property.lot)}</div></div></section>`;
const homeFeatures = `<section class="section-card"><div class="section-title"><h2>Home Features</h2></div><div class="amenity-grid">${feature("✤", "Electric ceiling fan", "Comfortable airflow in living spaces")}${feature("♨", "Natural gas", "Efficient and reliable heating")}${feature("▥", "Hardwood & carpet", "Durable flooring with soft-touch comfort")}${feature("▣", "Open kitchen", "Functional layout with ample cabinet space")}${feature("▥", "Walk-in closets", "Spacious storage in bedrooms")}${feature("▤", "Washer / dryer hookups", "Convenient in-home laundry connection")}</div></section>`;
const neighborhood = `<section class="section-card"><div class="section-title"><h2>Neighborhood Highlights</h2></div><div class="amenity-grid">${feature("⌘", "Easy Access", "Quick access to major highways and commuting routes")}${feature("◎", "Local Amenities", "Close to shopping, dining, and everyday conveniences")}${feature("⌂", "Community", "Established neighborhood with local schools nearby")}</div></section>`;
const cta = `<section class="cta-panel"><div><h2>Ready to call this home?</h2><p>Schedule a private viewing or request to apply today. Our team will assist you every step of the way.</p></div><div><a class="button primary" href="mailto:hello@zyne.store?subject=Schedule%20a%20viewing%20for%207101%20Wendemere%20St">Schedule a Viewing <span>›</span></a><a class="button secondary" href="mailto:hello@zyne.store?subject=Request%20to%20apply%20for%207101%20Wendemere%20St">Request to Apply</a></div></section>`;
const footer = `<footer class="footer"><a class="brand" href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"><b>ZYNE</b></a><nav class="footer-nav" aria-label="Footer navigation">${nav}</nav><div class="socials"><span>in</span><span>𝕏</span><span>✉</span></div><small>© 2025 ZYNE. All rights reserved.</small></footer>`;
const lightbox = `<div class="lightbox" data-lightbox aria-hidden="true"><div class="lightbox-card"><img data-lightbox-image alt="Expanded property gallery image"><button class="lightbox-close" type="button">Close</button><button class="lightbox-prev" type="button">Prev</button><button class="lightbox-next" type="button">Next</button><div class="lightbox-label" data-lightbox-label></div></div></div>`;
const script = `<script>const galleryData=${JSON.stringify(galleryData)};let active=0;const box=document.querySelector('[data-lightbox]');const zoom=document.querySelector('[data-lightbox-image]');const label=document.querySelector('[data-lightbox-label]');const close=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true')};function show(i){if(!galleryData.length)return;active=(i+galleryData.length)%galleryData.length;zoom.src=galleryData[active].src;label.textContent=galleryData[active].label+' · Image '+(active+1)+' of '+galleryData.length;box.classList.add('is-open');box.setAttribute('aria-hidden','false')}document.querySelectorAll('[data-gallery-index]').forEach((button)=>button.addEventListener('click',()=>show(Number(button.dataset.galleryIndex))));document.querySelector('.lightbox-close')?.addEventListener('click',close);document.querySelector('.lightbox-prev')?.addEventListener('click',()=>show(active-1));document.querySelector('.lightbox-next')?.addEventListener('click',()=>show(active+1));document.addEventListener('keydown',(event)=>{if(!box.classList.contains('is-open'))return;if(event.key==='Escape')close();if(event.key==='ArrowLeft')show(active-1);if(event.key==='ArrowRight')show(active+1)});document.querySelectorAll('.actions button').forEach((button)=>button.addEventListener('click',()=>button.blur()));</script>`;

const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#050504"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/favicon.svg"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="ZYNE"><meta property="og:image" content="${primaryImage}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${primaryImage}"><script type="application/ld+json">${JSON.stringify(schema)}</script><style>${css}</style></head><body><a class="skip-link" href="#main-content">Skip to main content</a>${header}<main id="main-content" class="page">${topbar}<div class="hero-layout">${gallery}${summary}</div>${statStrip}${whatsSpecial}${overview}${homeFeatures}${neighborhood}${cta}${footer}</main>${lightbox}${script}</body></html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html with ${galleryData.length} copied image(s)`);
