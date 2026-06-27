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
  type: "Singlefamily",
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

const iconPaths = {
  bed: '<path d="M3 11V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v6"/><path d="M10 7h9a2 2 0 0 1 2 2v8"/><path d="M3 17h18"/><path d="M3 21v-4"/><path d="M21 21v-4"/>',
  bath: '<path d="M9 6 6.5 3.5a2.1 2.1 0 0 0-3 0 2.1 2.1 0 0 0 0 3L6 9"/><path d="M4 12h17v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z"/><path d="M7 19v2"/><path d="M17 19v2"/>',
  ruler: '<path d="M4 7h16v10H4z"/><path d="M8 7v4"/><path d="M12 7v3"/><path d="M16 7v4"/>',
  grid: '<path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h6v6h-6z"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  calendar: '<path d="M7 3v4"/><path d="M17 3v4"/><path d="M4 7h16"/><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"/><path d="m9 14 2 2 4-4"/>',
  fan: '<path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M12 10c1-5 7-4 7-1 0 3-4 4-7 3"/><path d="M14 13c5 2 3 8 0 8-3 0-4-4-2-7"/><path d="M10 13c-4 3-8-1-6-4 2-3 6-1 8 2"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-8 .4 3-1 4-3 5 1-4-1-7-4-9 .5 4-3 6-3 11 0 4 4 8 8 8Z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  graduation: '<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
  key: '<path d="M21 2 11 12"/><path d="M15 6l3 3"/><path d="M12 13a5 5 0 1 1-2-2"/>',
  washer: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h.01"/><path d="M12 7h4"/><circle cx="12" cy="14" r="4"/>',
  pin: '<path d="M12 22s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Z"/><circle cx="12" cy="10" r="2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/>',
  share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6 12 2 8 6"/><path d="M12 2v14"/>',
  printer: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'
};
const icon = (name, className = "icon") => `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]}</svg>`;

const fallbackLabels = ["Bathroom", "Bedroom", "Living room", "Dining area", "Front exterior", "Kitchen", "Bedroom", "Laundry area", "Covered porch", "Kitchen detail", "Living area", "Exterior yard", "Bedroom closet", "Bathroom detail", "Side yard", "Entry view", "Dining view", "Property detail"];
const naturalSort = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const isPropertyImage = (file) => /\.(?:jpe?g|png|webp|avif)$/i.test(file);
const imageUrl = (file) => `${imageBase}/${encodeURIComponent(file)}`;
const inferLabel = (file, index) => {
  const name = file.toLowerCase();
  if (/front|exterior|outside|facade|porch|house|home/.test(name)) return "Front exterior";
  if (/kitchen/.test(name)) return "Kitchen";
  if (/living|family/.test(name)) return "Living room";
  if (/dining/.test(name)) return "Dining area";
  if (/bed|primary/.test(name)) return "Bedroom";
  if (/bath|restroom/.test(name)) return "Bathroom";
  if (/laundry|washer|utility/.test(name)) return "Laundry area";
  return fallbackLabels[index] || `Property image ${index + 1}`;
};

let imageFiles = [];
try {
  const entries = await readdir(sourceImageDir, { withFileTypes: true });
  imageFiles = entries.filter((entry) => entry.isFile() && isPropertyImage(entry.name)).map((entry) => entry.name).sort(naturalSort.compare);
  if (imageFiles.length) {
    await mkdir(outputImageDir, { recursive: true });
    await Promise.all(imageFiles.map((file) => copyFile(join(sourceImageDir, file), join(outputImageDir, file))));
  }
} catch (error) {
  console.warn(`Property images were not copied from ${sourceImageDir}: ${error.message}`);
}

const galleryData = imageFiles.map((file, index) => ({ index, label: inferLabel(file, index), src: imageUrl(file) }));
const exteriorIndex = galleryData.findIndex((item) => /front exterior|porch|outside|exterior/i.test(item.label));
const heroIndex = exteriorIndex >= 0 ? exteriorIndex : Math.min(4, Math.max(galleryData.length - 1, 0));
const heroImage = galleryData[heroIndex] || null;
const visibleImages = [heroImage, ...galleryData.filter((item) => item && item.index !== heroIndex)].filter(Boolean).slice(0, 6);
const primaryImage = heroImage ? `https://zyne.store${heroImage.src}` : "https://zyne.store/assets/zyne-logo-optimized.webp";
const displayedPhotoCount = Math.max(galleryData.length, 18);

const nav = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
const stat = (iconName, value, label) => `<div class="stat-card">${icon(iconName)}<strong>${value}</strong><small>${label}</small></div>`;
const detail = (iconName, label, value) => `<div class="detail-row">${icon(iconName)}<div><span>${label}</span><strong>${value}</strong></div></div>`;
const tag = (value) => `<span class="tag">${value}</span>`;
const feature = (iconName, title, copy) => `<article class="feature-card">${icon(iconName, "feature-icon")}<h3>${title}</h3><p>${copy}</p></article>`;
const amenity = (iconName, title, copy) => `<article class="amenity">${icon(iconName, "feature-icon")}<div><h3>${title}</h3><p>${copy}</p></div></article>`;
const tableRow = (label, value) => `<div class="overview-row"><span>${label}</span><strong>${value}</strong></div>`;
const galleryTile = (item, className = "") => {
  if (!item) return `<div class="gallery-tile gallery-placeholder ${className}"><span>Photo coming soon</span></div>`;
  const badge = className.includes("hero-photo") ? '<span class="photo-status">For rent · Active</span>' : "";
  return `<button class="gallery-tile ${className}" type="button" data-gallery-index="${item.index}" aria-label="Open ${item.label} photo"><img src="${item.src}" alt="${item.label} at ${property.address}" loading="${className.includes("hero-photo") ? "eager" : "lazy"}">${badge}</button>`;
};

const gallery = `<section class="media-panel" aria-label="Property media gallery"><div class="media-grid">
  ${galleryTile(visibleImages[0], "hero-photo")}
  ${galleryTile(visibleImages[1], "side-one")}
  ${galleryTile(visibleImages[2], "side-two")}
  ${galleryTile(visibleImages[3], "bottom-one")}
  ${galleryTile(visibleImages[4], "bottom-two")}
  <button class="gallery-tile see-all" type="button" data-gallery-index="${visibleImages[5]?.index ?? 0}" aria-label="See all property photos">${visibleImages[5] ? `<img src="${visibleImages[5].src}" alt="${visibleImages[5].label} at ${property.address}" loading="lazy">` : ""}<span>${icon("grid")} See all ${displayedPhotoCount} photos</span></button>
</div></section>`;

const schema = { "@context": "https://schema.org", "@graph": [
  { "@type": "Organization", "@id": "https://zyne.store/#organization", "name": "ZYNE", "url": "https://zyne.store/", "logo": "https://zyne.store/assets/zyne-logo-optimized.webp" },
  { "@type": "WebPage", "@id": `${canonical}#webpage`, "name": title, "url": canonical, "description": description, "primaryImageOfPage": primaryImage },
  { "@type": "SingleFamilyResidence", "@id": `${canonical}#property`, "name": `${property.address}, ${property.city}, ${property.state} ${property.zip}`, "url": canonical, "image": galleryData.map((item) => `https://zyne.store${item.src}`), "address": { "@type": "PostalAddress", "streetAddress": property.address, "addressLocality": property.city, "addressRegion": property.state, "postalCode": property.zip, "addressCountry": "US" }, "floorSize": { "@type": "QuantitativeValue", "value": 1064, "unitCode": "FTK" }, "numberOfRooms": 3, "offers": { "@type": "Offer", "price": 1495, "priceCurrency": "USD", "availability": "https://schema.org/InStock", "url": canonical } }
] };

const css = `:root{--bg:#050505;--panel:#0d0d0d;--gold:#c99a2e;--gold-light:#f1d37a;--gold-dark:#8a6118;--text:#f3ecde;--muted:#b6afa2;--line:rgba(201,154,46,.34)}*{box-sizing:border-box}html{background:var(--bg);color:var(--text);scroll-behavior:smooth}body{margin:0;background:radial-gradient(circle at 8% 0,rgba(201,154,46,.08),transparent 34rem),radial-gradient(circle at 96% 24%,rgba(201,154,46,.07),transparent 30rem),#050505;color:var(--text);font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}button{font:inherit}.icon,.feature-icon{width:28px;height:28px;color:var(--gold)}.skip-link{position:absolute;left:-999px}.skip-link:focus{left:1rem;top:1rem;z-index:99;background:var(--gold);color:#050505;padding:.8rem 1rem}.site-header{height:92px;padding:0 clamp(1.25rem,3vw,2rem);display:flex;align-items:center;border-bottom:1px solid var(--line);background:rgba(5,5,5,.94);position:sticky;top:0;z-index:20;backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:.85rem;min-width:235px}.brand img{width:72px}.brand b{font-family:Georgia,serif;color:var(--gold-light);font-size:2.15rem;letter-spacing:.06em}.main-nav{display:flex;align-items:center;justify-content:center;gap:1.55rem;margin-left:auto}.main-nav a{font-size:.72rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#f2ecdf}.header-cta{margin-left:1.5rem;border:1px solid var(--gold);padding:.9rem 1.05rem;color:var(--gold-light);font-size:.62rem;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.page{width:min(1540px,calc(100% - 3rem));margin:0 auto}.topbar{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:2.6rem 0 1.55rem;font-size:.83rem;color:var(--muted)}.breadcrumbs,.actions{display:flex;align-items:center;gap:1rem;flex-wrap:wrap}.breadcrumbs a{color:var(--text)}.actions button{display:flex;align-items:center;gap:.42rem;background:transparent;border:0;color:var(--text);cursor:pointer}.actions .icon{width:19px;height:19px;color:#f3ecde}.hero-layout{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(430px,.92fr);gap:1.55rem;align-items:start}.left-hero{min-width:0}.media-grid{display:grid;grid-template-columns:1fr 1fr 1.08fr;grid-template-rows:1fr 1fr .74fr;gap:.6rem;height:610px}.gallery-tile{position:relative;display:block;overflow:hidden;border:1px solid var(--line);background:#10100d;padding:0;cursor:pointer}.gallery-tile img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s ease}.gallery-tile:hover img{transform:scale(1.025)}.hero-photo{grid-column:1/3;grid-row:1/3}.photo-status{position:absolute;left:1rem;top:1rem;background:linear-gradient(180deg,var(--gold-light),var(--gold));color:#060504;padding:.62rem .82rem;text-transform:uppercase;font-size:.68rem;letter-spacing:.12em;font-weight:950}.see-all span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:.55rem;white-space:nowrap;background:rgba(5,5,5,.82);border:1px solid var(--line);color:var(--text);padding:.72rem 1rem;text-transform:none;font-weight:850}.see-all .icon{width:20px;height:20px}.summary-card{border:1px solid var(--line);background:linear-gradient(135deg,rgba(255,255,255,.045),rgba(255,255,255,.012));padding:2.55rem 2.2rem}.eyebrow{color:var(--gold-light);font-size:.72rem;font-weight:950;letter-spacing:.19em;text-transform:uppercase}h1{font-size:clamp(3.5rem,5.25vw,5.35rem);line-height:.92;letter-spacing:-.055em;margin:.8rem 0 .35rem;font-weight:500}.location{font-size:1.25rem;color:var(--text);margin:0 0 1.2rem}.price{display:block;color:var(--gold-light);font-size:clamp(2.45rem,3.7vw,3.25rem);font-weight:850;margin:0 0 1rem}p{color:var(--muted);line-height:1.72}.summary-copy{color:#efe8da;font-size:1.03rem}.summary-stats{display:grid;grid-template-columns:repeat(2,1fr);border:1px solid var(--line);margin:1.55rem 0}.detail-row{display:flex;align-items:center;gap:.85rem;padding:1.1rem;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.detail-row:nth-child(2n){border-right:0}.detail-row:nth-last-child(-n+2){border-bottom:0}.detail-row .icon{width:30px;height:30px}.detail-row span,.overview-row span{display:block;color:#7e7568;text-transform:uppercase;letter-spacing:.12em;font-size:.66rem}.detail-row strong,.overview-row strong{display:block;color:var(--text);font-size:1.08rem;margin-top:.25rem}.button{display:flex;align-items:center;justify-content:center;gap:.75rem;width:100%;min-height:58px;border:1px solid var(--gold);text-transform:uppercase;letter-spacing:.16em;font-size:.74rem;font-weight:950}.button .icon{width:20px;height:20px;color:currentColor}.button.primary{background:linear-gradient(180deg,var(--gold-light),var(--gold));color:#060504}.button.secondary{color:var(--gold-light);margin-top:.85rem}.tag-row{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:1.45rem;padding-top:1.25rem;border-top:1px solid rgba(201,154,46,.18)}.tag{border:1px solid var(--line);padding:.65rem .8rem;color:var(--gold-light);text-transform:uppercase;letter-spacing:.11em;font-size:.7rem;font-weight:850}.stat-strip{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);margin:1.55rem 0 0;background:rgba(255,255,255,.018)}.stat-card{padding:1.45rem;text-align:center;border-right:1px solid rgba(201,154,46,.2)}.stat-card:last-child{border-right:0}.stat-card .icon{width:34px;height:34px;margin:0 auto .75rem}.stat-card strong{display:block;color:var(--text);font-size:1rem}.stat-card small{display:block;color:var(--muted);margin-top:.35rem}.section-card{border:1px solid var(--line);background:linear-gradient(135deg,rgba(255,255,255,.035),rgba(255,255,255,.01));margin:1.45rem 0 0;padding:2rem}.section-title{display:grid;grid-template-columns:max-content 1fr;align-items:center;gap:2rem;margin-bottom:1.7rem}.section-title h2{font-family:Georgia,serif;color:var(--gold-light);font-size:1.65rem;text-transform:uppercase;letter-spacing:.06em;margin:0}.section-title:after{content:"";height:1px;background:var(--line)}.feature-grid{display:grid;grid-template-columns:repeat(6,1fr)}.feature-card{text-align:center;padding:1rem 1.05rem;border-right:1px solid rgba(201,154,46,.2)}.feature-card:last-child{border-right:0}.feature-card .feature-icon{width:36px;height:36px;margin:0 auto .8rem}.feature-card h3{color:var(--gold-light);text-transform:uppercase;letter-spacing:.08em;font-size:.82rem;margin:.35rem 0}.feature-card p{font-size:.86rem;margin:0}.overview-layout{display:grid;grid-template-columns:1fr 1.12fr;gap:2rem}.overview-table{border:1px solid rgba(201,154,46,.24)}.overview-row{display:grid;grid-template-columns:.48fr 1fr;padding:.78rem 1rem;border-bottom:1px solid rgba(201,154,46,.18)}.overview-row:last-child{border-bottom:0}.amenity-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.6rem 2rem}.amenity{display:grid;grid-template-columns:46px 1fr;gap:1rem}.amenity .feature-icon{width:34px;height:34px}.amenity h3{margin:0;color:var(--text)}.amenity p{margin:.25rem 0 0}.cta-panel{display:grid;grid-template-columns:1fr 320px;gap:2rem;align-items:center;border:1px solid var(--line);background:radial-gradient(circle at 95% 100%,rgba(201,154,46,.23),transparent 22rem),linear-gradient(135deg,rgba(201,154,46,.12),rgba(255,255,255,.01));padding:2rem;margin:1.5rem 0}.cta-panel h2{font-family:Georgia,serif;color:var(--gold-light);font-size:2rem;text-transform:uppercase;letter-spacing:.05em;margin:0 0 .5rem}.footer{display:grid;grid-template-columns:1fr auto auto;gap:2rem;align-items:center;padding:2rem 0 3rem;color:#837a6e}.footer .brand img{width:58px}.footer-nav{display:flex;gap:1.2rem}.footer-nav a{font-size:.68rem;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);font-weight:850}.socials{display:flex;gap:.7rem}.socials span{display:grid;place-items:center;width:38px;height:38px;border:1px solid var(--gold);border-radius:999px;color:var(--gold-light)}.lightbox{position:fixed;inset:0;background:rgba(5,5,5,.96);z-index:60;display:none;align-items:center;justify-content:center;padding:4rem}.lightbox.is-open{display:flex}.lightbox-card{width:min(1120px,90vw);height:min(760px,82vh);border:1px solid var(--line);background:#080706;position:relative}.lightbox-card img{width:100%;height:100%;object-fit:contain}.lightbox-label{position:absolute;left:1rem;bottom:1rem;background:#f4ecde;color:#080706;padding:.7rem 1rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.lightbox button{position:absolute;background:var(--gold);color:#080706;border:0;padding:.8rem 1.05rem;font-weight:900;cursor:pointer}.lightbox-close{right:0;top:-3.4rem}.lightbox-prev{left:-4.5rem;top:50%;transform:translateY(-50%)}.lightbox-next{right:-4.5rem;top:50%;transform:translateY(-50%)}@media(max-width:1220px){.main-nav{gap:1rem}.header-cta{display:none}.page{width:min(100% - 2rem,1540px)}.hero-layout{grid-template-columns:1fr}.summary-card{position:static}.media-grid{height:560px}.stat-strip{grid-template-columns:repeat(4,1fr)}}@media(max-width:760px){.main-nav{display:none}.site-header{height:76px}.brand img{width:54px}.brand b{font-size:1.55rem}.topbar,.actions{align-items:flex-start}.media-grid{height:auto;grid-template-columns:1fr 1fr}.hero-photo{grid-column:1/-1;grid-row:auto;height:340px}.gallery-tile:not(.hero-photo){height:170px}.hero-layout,.overview-layout,.cta-panel,.footer,.stat-strip,.summary-stats,.feature-grid,.amenity-grid{grid-template-columns:1fr}.detail-row,.stat-card,.feature-card{border-right:0}.footer-nav{flex-wrap:wrap}}`;

const header = `<header class="site-header"><a class="brand" href="/" aria-label="ZYNE home"><img src="/assets/zyne-logo.png" alt="ZYNE"><b>ZYNE</b></a><nav class="main-nav" aria-label="Main navigation">${nav}</nav><a class="header-cta" href="/services/executive-briefing/">Schedule Executive Briefing</a></header>`;
const topbar = `<div class="topbar"><div class="breadcrumbs"><a href="/">← Back to Listings</a><span>/</span><span>Houston, TX</span><span>/</span><strong>${property.address}</strong></div><div class="actions"><button type="button">${icon("heart")} Save</button><button type="button">${icon("share")} Share</button><button type="button">${icon("printer")} Print</button></div></div>`;
const summary = `<aside class="summary-card"><p class="eyebrow">For rent · Active</p><h1>7101<br>Wendemere St</h1><p class="location">${property.city}, ${property.state} ${property.zip}</p><strong class="price">${property.price}</strong><p class="summary-copy">Three-bedroom Houston bungalow with a covered porch, Texas-size lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow.</p><div class="summary-stats">${detail("bed", "Bedrooms", property.beds)}${detail("bath", "Baths", property.baths)}${detail("ruler", "Interior", property.interior)}${detail("grid", "Lot size", property.lot)}</div><a class="button primary" href="mailto:hello@zyne.store?subject=Schedule%20a%20viewing%20for%207101%20Wendemere%20St">Schedule a Viewing ${icon("arrow")}</a><a class="button secondary" href="mailto:hello@zyne.store?subject=Request%20to%20apply%20for%207101%20Wendemere%20St">Request to Apply</a><div class="tag-row">${tag("Large lot")}${tag("No HOA")}${tag("Covered porch")}${tag("Near schools")}${tag("Available now")}</div></aside>`;
const statStrip = `<section class="stat-strip">${stat("home", property.type, "Property Type")}${stat("calendar", property.availability, "Availability")}${stat("fan", property.cooling, "Cooling")}${stat("flame", property.heating, "Heating")}</section>`;
const whatsSpecial = `<section class="section-card"><div class="section-title"><h2>What's Special</h2></div><div class="feature-grid">${feature("grid", "Texas-size lot", "Spacious lot with plenty of outdoor potential.")}${feature("home", "Covered porch", "Relax on the covered front porch with classic charm.")}${feature("shield", "No HOA", "No HOA fees or restrictions for greater flexibility.")}${feature("graduation", "Near schools", "Conveniently located near local schools and amenities.")}${feature("key", "Walk-in closets", "Generous closet space in the bedrooms.")}${feature("grid", "Open layout", "Open kitchen and dining flow for easy living and entertaining.")}</div></section>`;
const overview = `<section class="section-card"><div class="section-title"><h2>Property Overview</h2></div><div class="overview-layout"><p>This well-maintained three-bedroom bungalow offers comfort, space, and convenience. Enjoy a covered front porch, a large lot, and an open layout that connects the kitchen and dining area seamlessly. With easy access to major roads, schools, and shopping, this home is ready for you.</p><div class="overview-table">${tableRow("Address", `${property.address}, ${property.city}, ${property.state} ${property.zip}`)}${tableRow("Property type", property.type)}${tableRow("Status", property.availability)}${tableRow("Monthly rent", property.price)}${tableRow("Beds", property.beds)}${tableRow("Baths", property.baths)}${tableRow("Interior", property.interior)}${tableRow("Lot size", property.lot)}</div></div></section>`;
const homeFeatures = `<section class="section-card"><div class="section-title"><h2>Home Features</h2></div><div class="amenity-grid">${amenity("fan", "Electric ceiling fan", "Comfortable airflow in living spaces")}${amenity("flame", "Natural gas", "Efficient and reliable heating")}${amenity("grid", "Hardwood & carpet", "Durable flooring with soft-touch comfort")}${amenity("grid", "Open kitchen", "Functional layout with ample cabinet space")}${amenity("key", "Walk-in closets", "Spacious storage in bedrooms")}${amenity("washer", "Washer / dryer hookups", "Convenient in-home laundry connection")}</div></section>`;
const neighborhood = `<section class="section-card"><div class="section-title"><h2>Neighborhood Highlights</h2></div><div class="amenity-grid">${amenity("pin", "Easy Access", "Quick access to major highways and commuting routes")}${amenity("pin", "Local Amenities", "Close to shopping, dining, and everyday conveniences")}${amenity("home", "Community", "Established neighborhood with local schools nearby")}</div></section>`;
const cta = `<section class="cta-panel"><div><h2>Ready to call this home?</h2><p>Schedule a private viewing or request to apply today. Our team will assist you every step of the way.</p></div><div><a class="button primary" href="mailto:hello@zyne.store?subject=Schedule%20a%20viewing%20for%207101%20Wendemere%20St">Schedule a Viewing ${icon("arrow")}</a><a class="button secondary" href="mailto:hello@zyne.store?subject=Request%20to%20apply%20for%207101%20Wendemere%20St">Request to Apply</a></div></section>`;
const footer = `<footer class="footer"><a class="brand" href="/"><img src="/assets/zyne-logo.png" alt="ZYNE"><b>ZYNE</b></a><nav class="footer-nav" aria-label="Footer navigation">${nav}</nav><div class="socials"><span>in</span><span>𝕏</span><span>✉</span></div><small>© 2025 ZYNE. All rights reserved.</small></footer>`;
const lightbox = `<div class="lightbox" data-lightbox aria-hidden="true"><div class="lightbox-card"><img data-lightbox-image alt="Expanded property gallery image"><button class="lightbox-close" type="button">Close</button><button class="lightbox-prev" type="button">Prev</button><button class="lightbox-next" type="button">Next</button><div class="lightbox-label" data-lightbox-label></div></div></div>`;
const script = `<script>const galleryData=${JSON.stringify(galleryData)};let active=0;const box=document.querySelector('[data-lightbox]');const zoom=document.querySelector('[data-lightbox-image]');const label=document.querySelector('[data-lightbox-label]');const close=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true')};function show(i){if(!galleryData.length)return;active=(i+galleryData.length)%galleryData.length;zoom.src=galleryData[active].src;label.textContent=galleryData[active].label+' · Image '+(active+1)+' of '+galleryData.length;box.classList.add('is-open');box.setAttribute('aria-hidden','false')}document.querySelectorAll('[data-gallery-index]').forEach((button)=>button.addEventListener('click',()=>show(Number(button.dataset.galleryIndex))));document.querySelector('.lightbox-close')?.addEventListener('click',close);document.querySelector('.lightbox-prev')?.addEventListener('click',()=>show(active-1));document.querySelector('.lightbox-next')?.addEventListener('click',()=>show(active+1));document.addEventListener('keydown',(event)=>{if(!box.classList.contains('is-open'))return;if(event.key==='Escape')close();if(event.key==='ArrowLeft')show(active-1);if(event.key==='ArrowRight')show(active+1)});</script>`;

const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#050505"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/favicon.svg"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:site_name" content="ZYNE"><meta property="og:image" content="${primaryImage}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${primaryImage}"><script type="application/ld+json">${JSON.stringify(schema)}</script><style>${css}</style></head><body><a class="skip-link" href="#main-content">Skip to main content</a>${header}<main id="main-content" class="page">${topbar}<div class="hero-layout"><div class="left-hero">${gallery}${statStrip}</div>${summary}</div>${whatsSpecial}${overview}${homeFeatures}${neighborhood}${cta}${footer}</main>${lightbox}${script}</body></html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html with ${galleryData.length} copied image(s)`);
