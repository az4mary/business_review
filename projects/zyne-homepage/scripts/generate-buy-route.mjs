import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { listing as sourceListing } from "../../zyne-buy/src/data/listing.js";
import { renderGallery } from "../../zyne-buy/src/components/gallery.js";
import { renderContextBar, renderPropertyPanel } from "../../zyne-buy/src/components/propertyPanel.js";
import { icon } from "../../zyne-buy/src/components/icons.js";
import {
  globalHeaderFooterStyles,
  renderGlobalFooter,
  renderGlobalHeader,
  renderGlobalHeaderFooterScript
} from "./global-header-footer.mjs";

const listing = structuredClone(sourceListing);
listing.status = "FOR SALE • SELLER FINANCING";
listing.agent.office = "Gary Greene – Sugar Land";

const route = "homedetail/7101-wendemere-st-houston-tx-77088/buy";
const outputDir = join("dist", route);

const cssFiles = [
  "../zyne-buy/src/styles/tokens.css",
  "../zyne-buy/src/styles/page.css",
  "../zyne-buy/src/styles/lightbox.css"
];

const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const readBuyCss = async () => {
  const parts = await Promise.all(cssFiles.map((file) => readFile(file, "utf8")));
  return parts.join("\n");
};

const photoById = new Map(listing.photos.map((photo) => [photo.id, photo]));
const mobilePreviewPhotos = ["bedroom-red", "bedroom-office", "kitchen", "bathroom"].map((id) => photoById.get(id)).filter(Boolean);

const chromeCss = `
*{box-sizing:border-box}
html{background:#070706;color:#f1eadc;scrollbar-color:#6e5700 #050606}
body{margin:0;background:#070706;color:#f1eadc;font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit}
a:focus-visible,button:focus-visible{outline:2px solid #c9a967;outline-offset:4px}
.buy-page-stack{background:#020303}
.viewport-page{position:relative;width:100%;height:100dvh;min-height:1px;overflow:hidden;scroll-snap-align:start;scroll-snap-stop:normal;background:#020303}
.design-canvas{position:absolute;left:50vw;top:50%;width:var(--canvas-width);height:var(--canvas-height);transform:translate(-50%,-50%) scale(var(--canvas-scale));transform-origin:center;overflow:hidden;background:#020303}
.canvas-header-space{height:82px}
.icon{width:42px;height:42px;fill:none;stroke:currentColor;stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round}
.small-icon{width:18px;height:18px;stroke-width:1.8}
button[aria-disabled="true"]{cursor:default}
.lightbox-open{position:fixed;width:100%;overflow:hidden}
.mobile-buy-pages{display:none}
.mobile-canvas{position:absolute;left:50vw;top:50%;width:941px;height:1672px;transform:translate(-50%,-50%) scale(var(--canvas-scale));transform-origin:center;overflow:hidden;background:#020303;padding:16px 30px 34px;color:#f2f2f0}
.mobile-page-one{font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif}
.mobile-gallery-hero{position:relative;display:block;width:100%;height:358px;border:1px solid #8a6900;border-radius:12px;overflow:hidden;background:#111}.mobile-gallery-hero img{width:100%;height:100%;object-fit:cover;object-position:center 45%;display:block}.mobile-sale-badge{position:absolute;left:16px;top:10px;width:180px;height:120px;padding:18px 16px;color:#fff;background:#060606;border:2px solid #f2c400;clip-path:polygon(0 0,100% 0,100% 82%,50% 100%,0 82%)}.mobile-sale-badge strong{display:block;color:#f2cc00;font-size:24px;line-height:1.1;letter-spacing:.06em}.mobile-sale-badge span{display:block;margin-top:10px;font-size:16px;font-weight:800;line-height:1.35;letter-spacing:.04em}
.mobile-thumbs{height:144px;margin-top:8px;display:grid;grid-template-columns:repeat(4,1fr) 136px;gap:6px}.mobile-thumbs button{padding:0;border:1px solid #725600;border-radius:10px;overflow:hidden;background:#050606;color:#f2f2f0}.mobile-thumbs img{width:100%;height:100%;object-fit:cover;display:block}.mobile-see-all{display:grid;place-items:center;text-align:center;font-size:18px;font-weight:700;line-height:1.35}.mobile-see-all .icon{width:34px;height:34px;margin-bottom:8px;color:#aaa}
.mobile-copy{padding:28px 20px 0}.mobile-price{margin:0 0 8px;color:#f3c45a;font-size:58px;font-weight:800;line-height:.95;letter-spacing:-.045em}.mobile-copy h1{margin:0 0 6px;color:#f2f2f0;font-size:34px;line-height:1.05;letter-spacing:-.035em}.mobile-location{display:flex;align-items:center;gap:7px;margin:0 0 18px;color:#f3c45a;font-size:18px;line-height:1.2}.mobile-location svg{width:17px;height:17px;fill:#f3c45a}.mobile-description{max-width:790px;margin:0;color:#dedbd3;font-size:25px;line-height:1.34}.mobile-facts{margin:24px 20px 30px;padding:24px 0 0;border-top:1px solid rgba(114,86,0,.55)}.mobile-facts h2{margin:0 0 16px;color:#f2f2f0;font-size:27px;line-height:1.1;font-weight:700;letter-spacing:-.02em}.mobile-fact-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.mobile-fact{min-height:84px;padding:17px 15px;border-radius:10px;background:#080909;border:1px solid rgba(114,86,0,.42)}.mobile-fact strong{display:block;color:#f2f2f0;font-size:27px;line-height:1;font-weight:800;letter-spacing:-.025em}.mobile-fact span{display:block;margin-top:8px;color:#b9b7b1;font-size:16px;line-height:1.2}
.mobile-cta-stack{display:grid;gap:16px;margin:0 20px 36px}.mobile-cta{height:72px;border-radius:7px;border:1px solid rgba(167,125,17,.85);display:flex;align-items:center;justify-content:center;gap:14px;text-transform:uppercase;letter-spacing:.075em;font-size:21px;font-weight:800}.mobile-cta.primary{background:linear-gradient(180deg,#f9d77c 0%,#e9b84a 52%,#d89720 100%);color:#070707;box-shadow:0 12px 28px rgba(0,0,0,.28)}.mobile-cta.outline{height:64px;background:#030303;color:#e8c400;border-color:rgba(201,160,0,.7)}.mobile-cta .icon{width:28px;height:28px}
.mobile-tags{margin:0 36px 24px;display:flex;flex-wrap:wrap;justify-content:center;gap:10px}.mobile-tags span{height:45px;padding:0 21px;border:1px solid rgba(114,86,0,.55);border-radius:999px;display:inline-flex;align-items:center;gap:9px;color:#dedbd3;font-size:18px;line-height:1}.mobile-tags .icon{width:22px;height:22px;color:#d9b900}
.mobile-agent-card{margin:0 20px;border:1px solid rgba(114,86,0,.58);border-radius:16px;padding:22px 24px;display:grid;grid-template-columns:138px 1fr;gap:22px;background:#050606}.mobile-agent-card img{width:138px;height:138px;object-fit:cover;border-radius:10px;border:1px solid #607080}.mobile-agent-copy h2{margin:0 0 8px;font-size:28px;line-height:1}.mobile-agent-copy em{display:inline-flex;align-items:center;gap:7px;margin-left:8px;padding:5px 10px;border-radius:4px;background:#5b6472;color:#fff;font-size:14px;font-style:normal;text-transform:uppercase;letter-spacing:.08em}.mobile-agent-copy p{margin:0;color:#d6d2ca;font-size:19px;line-height:1.42}.mobile-agent-actions{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}.mobile-agent-actions a{height:54px;border:1px solid rgba(201,160,0,.75);border-radius:5px;display:flex;align-items:center;justify-content:center;gap:9px;color:#e8c400;text-transform:uppercase;font-size:16px;font-weight:800;letter-spacing:.075em}.mobile-agent-actions .icon{width:22px;height:22px}
@media(max-width:767px){.desktop-buy-pages{display:none}.mobile-buy-pages{display:block}.viewport-page{height:calc(1672px * var(--canvas-scale));overflow:hidden}.mobile-canvas{top:0;transform:translateX(-50%) scale(var(--canvas-scale));transform-origin:top center}.global-footer-spacer{display:none}}
@media(min-width:768px){.desktop-buy-pages{display:block}.mobile-buy-pages{display:none}}
`;

const buyShell = `
  <main id="main-content" class="buy-page-stack desktop-buy-pages">
    <section class="viewport-page property-page" aria-label="Property overview">
      <div class="design-canvas">
        <div class="canvas-header-space" aria-hidden="true"></div>
        <main class="page-one-main">
          ${renderContextBar(listing)}
          <div class="main-grid">${renderGallery(listing)}${renderPropertyPanel(listing)}</div>
        </main>
      </div>
    </section>
    <section class="viewport-page placeholder-page" aria-label="Property details placeholder"><div class="design-canvas"><div class="canvas-header-space" aria-hidden="true"></div><div class="placeholder-content"><span>PAGE 2</span><div class="placeholder-rule"></div><p>Future property detail section</p></div></div></section>
    <section class="viewport-page placeholder-page" aria-label="Property disclosures placeholder"><div class="design-canvas"><div class="canvas-header-space" aria-hidden="true"></div><div class="placeholder-content"><span>PAGE 3</span><div class="placeholder-rule"></div><p>Future property disclosure section</p></div></div></section>
  </main>`;

const mobileFacts = [
  { value: "$30K", label: "down payment" },
  { value: "6.51%", label: "note rate" },
  { value: "~$400/mo", label: "target cash flow" },
];
const mobileTagIcon = ["document", "dollar", "percent", "shield", "chart"];
const mobileShell = `
  <main class="buy-page-stack mobile-buy-pages" aria-label="Mobile property listing">
    <section class="viewport-page mobile-page-one" aria-label="Mobile property overview">
      <div class="mobile-canvas">
        <button class="mobile-gallery-hero gallery-slot" type="button" data-photo-id="front-yard" aria-label="Open gallery at front yard exterior"><img src="${photoById.get("front-yard")?.src}" alt="${photoById.get("front-yard")?.alt}"><span class="mobile-sale-badge"><strong>FOR SALE</strong><span>SELLER FINANCING AVAILABLE</span></span></button>
        <div class="mobile-thumbs">${mobilePreviewPhotos.map((photo) => `<button class="gallery-slot" type="button" data-photo-id="${photo.id}" aria-label="Open gallery at ${photo.label}"><img src="${photo.src}" alt="${photo.alt}"></button>`).join("")}<button class="mobile-see-all gallery-slot" type="button" data-photo-id="exterior" aria-label="See all ${listing.photos.length} photos">${icon("share")}<span>See all<br>${listing.photos.length} photos</span></button></div>
        <section class="mobile-copy"><p class="mobile-price">${listing.price}</p><h1>${listing.addressLine1} ${listing.addressLine2}</h1><p class="mobile-location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>${listing.location}</p><p class="mobile-description">Seller-financed investment property with a clear path to target rent.</p></section>
        <section class="mobile-facts" aria-label="Investment terms"><h2>Seller financing available</h2><div class="mobile-fact-row">${mobileFacts.map((fact) => `<article class="mobile-fact"><strong>${fact.value}</strong><span>${fact.label}</span></article>`).join("")}</div></section>
        <section class="mobile-cta-stack"><a href="mailto:lisibeth@zyne.store?subject=Investment%20Packet%20Request%20-%207101%20Wendemere%20St" class="mobile-cta primary">${icon("document")}Request Investment Packet ${icon("arrow")}</a><a href="tel:+13465924718" class="mobile-cta outline">${icon("heart")}Contact Listing Agent</a></section>
        <section class="mobile-tags">${listing.tags.map((tag, index) => `<span>${icon(mobileTagIcon[index] || "tag")}${tag}</span>`).join("")}</section>
        <section class="mobile-agent-card"><img src="${listing.agent.photo.src}" alt="${listing.agent.photo.alt}"><div class="mobile-agent-copy"><h2>${listing.agent.name}<em>★ Platinum</em></h2><p>${listing.agent.brokerage}<br>${listing.agent.office}</p><div class="mobile-agent-actions"><a href="https://www.har.com/carissa-weber/agent_WEBERC" target="_blank" rel="noopener noreferrer">${icon("heart")}View Profile</a><a href="tel:+13465924718">${icon("share")}Contact Agent</a></div></div></section>
      </div>
    </section>
    <section class="viewport-page placeholder-page" aria-label="Mobile property details placeholder"><div class="mobile-canvas"><div class="placeholder-content"><span>PAGE 2</span><div class="placeholder-rule"></div><p>Future mobile property detail section</p></div></div></section>
    <section class="viewport-page placeholder-page" aria-label="Mobile property disclosures placeholder"><div class="mobile-canvas"><div class="placeholder-content"><span>PAGE 3</span><div class="placeholder-rule"></div><p>Future mobile property disclosure section</p></div></div></section>
  </main>`;

const clientScript = `
const listing=${escapeJson(listing)};
const updateScale=()=>{const mobile=matchMedia("(max-width: 767px)").matches;const canvasWidth=mobile?941:1672;const canvasHeight=mobile?1672:941;const width=visualViewport?.width||innerWidth;const scale=mobile?Math.min(1,width/canvasWidth):Math.min(1,innerWidth/canvasWidth,innerHeight/canvasHeight);document.documentElement.style.setProperty("--canvas-scale",String(scale));};
addEventListener("resize",updateScale,{passive:true});updateScale();
const byId=new Map(listing.photos.map(photo=>[photo.id,photo]));
const ordered=listing.galleryOrder.map(id=>byId.get(id)).filter(Boolean);
let active=0,opener=null,savedScrollY=0;
const root=document.getElementById("overlay-root");
const render=()=>{const photo=ordered[active];root.innerHTML='<div class="lightbox" role="dialog" aria-modal="true" aria-label="Property gallery"><button class="lightbox-backdrop" aria-label="Close gallery"></button><div class="lightbox-shell"><div class="lightbox-toolbar"><span>'+(active+1)+' / '+ordered.length+'</span><button class="lightbox-close" type="button" aria-label="Close gallery">×</button></div><div class="lightbox-stage"><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><figure><img src="'+photo.fullSrc+'" alt="'+photo.alt+'"><figcaption>'+photo.label+'</figcaption></figure><button class="lightbox-next" type="button" aria-label="Next image">›</button></div><div class="lightbox-thumbnails">'+ordered.map((item,index)=>'<button type="button" data-index="'+index+'" class="'+(index===active?'active':'')+'" aria-label="View '+item.label+'"><img src="'+item.thumbnailSrc+'" alt=""></button>').join("")+'</div></div></div>';root.querySelector(".lightbox-close").focus();};
const open=(id,button)=>{active=Math.max(0,ordered.findIndex(photo=>photo.id===id));opener=button;savedScrollY=window.scrollY;document.body.classList.add("lightbox-open");document.body.style.top="-"+savedScrollY+"px";render();};
const close=()=>{root.innerHTML="";document.body.classList.remove("lightbox-open");document.body.style.top="";scrollTo(0,savedScrollY);opener?.focus();};
const move=delta=>{active=(active+delta+ordered.length)%ordered.length;render();};
document.querySelectorAll(".gallery-slot").forEach(button=>button.addEventListener("click",()=>open(button.dataset.photoId,button)));
document.querySelectorAll("[data-reveal-phone]").forEach(button=>button.addEventListener("click",()=>{button.textContent="(346) 592-4718";button.setAttribute("aria-label","Phone number (346) 592-4718");}));
root.addEventListener("click",event=>{if(event.target.classList.contains("lightbox-backdrop")||event.target.closest(".lightbox-close")) close(); if(event.target.closest(".lightbox-prev")) move(-1); if(event.target.closest(".lightbox-next")) move(1); const thumb=event.target.closest("[data-index]"); if(thumb){active=Number(thumb.dataset.index);render();}});
addEventListener("keydown",event=>{if(!root.innerHTML)return; if(event.key==="Escape")close(); if(event.key==="ArrowLeft")move(-1); if(event.key==="ArrowRight")move(1);});
`;

const schema = {
  "@context": "https://schema.org",
  "@type": "SingleFamilyResidence",
  name: `${listing.addressLine1} ${listing.addressLine2}`,
  address: listing.location,
  url: `https://zyne.store/${route}/`,
  image: listing.photos.map((photo) => `https://zyne.store${photo.fullSrc}`),
  offers: {
    "@type": "Offer",
    price: "150000",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock"
  }
};

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#020303">
  <link rel="stylesheet" href="/assets/fonts/fonts.css">
  <link rel="icon" type="image/svg+xml" href="/assets/brand/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/brand/zyne-touch-icon.png">
  <link rel="canonical" href="https://zyne.store/${route}/">
  <meta name="description" content="Seller-financed investment opportunity at 7101 Wendemere St, Houston, Texas.">
  <title>7101 Wendemere St | Seller Financing Investment Property</title>
  <style>${globalHeaderFooterStyles}${chromeCss}${await readBuyCss()}</style>
  <script type="application/ld+json">${escapeJson(schema)}</script>
</head>
<body>
  ${renderGlobalHeader()}
  ${buyShell}
  ${mobileShell}
  ${renderGlobalFooter()}
  <div id="overlay-root"></div>
  <script>${clientScript}</script>
  ${renderGlobalHeaderFooterScript()}
</body>
</html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html using buy template with ${listing.photos.length} image(s)`);
