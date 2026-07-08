import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { listing as sourceListing } from "../src/data/buy-page-content.js";
import { renderGallery } from "./templates/buy/gallery.mjs";
import { icon } from "./templates/buy/icons.mjs";
import { renderContextBar, renderPropertyPanel } from "./templates/buy/property-panel.mjs";
import { renderBuyPage } from "./templates/template-buy.mjs";

const listing = structuredClone(sourceListing);
listing.status = "FOR SALE • SELLER FINANCING";
listing.agent.office = "Gary Greene – Sugar Land";

const route = "homedetail/7101-wendemere-st-houston-tx-77088/buy";
const outputDir = join("dist", route);

const cssFiles = [
  "src/styles/buy-page-tokens.css",
  "src/styles/buy-page.css",
  "src/styles/buy-page-lightbox.css"
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
.mobile-canvas{background:#050505;color:#f7f3ea;font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif}
.mobile-page-one .mobile-canvas{position:relative;width:100%;max-width:430px;min-height:980px;margin:0 auto;overflow:hidden;background:#050505}
.mobile-gallery-hero{position:relative;display:block;width:328px;height:198px;margin:10px 16px 0;border:1px solid rgba(231,195,74,.42);border-radius:10px;overflow:hidden;background:#10100e}.mobile-gallery-hero img{width:100%;height:100%;object-fit:cover;object-position:center 42%;transform:scale(1.06);display:block}.mobile-sale-badge{position:absolute;left:12px;top:12px;width:100px;height:50px;padding:0;color:#f7f3ea;background:rgba(5,5,5,.9);border:1px solid rgba(242,204,77,.78);border-radius:3px;display:flex;flex-direction:column;align-items:center;justify-content:center}.mobile-sale-badge strong{display:block;color:#f2cc4d;font-size:14px;line-height:15px;font-weight:600;letter-spacing:.06em;white-space:nowrap}.mobile-sale-badge span{display:block;margin-top:3px;color:#fff;font-size:10px;font-weight:400;line-height:12px;letter-spacing:0;text-transform:none;white-space:nowrap}.mobile-photo-pill{position:absolute;right:10px;bottom:10px;height:23px;min-width:51px;padding:0 7px;border-radius:3px;background:rgba(5,5,5,.74);color:#f7f3ea;font-size:13px;font-weight:300;line-height:16px;display:flex;align-items:center;justify-content:center}
.mobile-copy{padding:0}.mobile-price{margin:16px 16px 0;color:#e7c34a;font-size:40px;font-weight:600;line-height:44px;letter-spacing:-.04em}.mobile-copy h1{margin:4px 16px 0;color:#f7f3ea;font-size:20px;line-height:24px;font-weight:500;letter-spacing:-.02em}.mobile-location{display:flex;align-items:center;gap:5px;margin:2px 16px 0;color:#f7f3ea;font-size:14px;font-weight:300;line-height:20px}.mobile-location svg{width:13px;height:13px;fill:#e7c34a;flex:none}.mobile-facts-line{width:328px;margin:8px 16px 0;color:#f7f3ea;font-size:15px;font-weight:300;line-height:20px;display:flex;align-items:center;gap:9px;white-space:nowrap}.mobile-facts-line .icon{width:15px;height:15px;color:#bdb7aa;stroke-width:1.5}.mobile-facts-line strong{font-weight:300}.mobile-financing-card{width:328px;height:78px;margin:10px 16px 0;padding:0 16px;background:#0b0b0a;border:1px solid rgba(231,195,74,.3);border-radius:9px;display:flex;align-items:center}.mobile-financing-card ul{width:100%;margin:0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(3,1fr)}.mobile-financing-card li{position:relative;color:#bdb7aa;font-size:12px;font-weight:300;line-height:16px;text-align:center}.mobile-financing-card li+li:before{content:"";position:absolute;left:0;top:2px;width:1px;height:28px;background:rgba(231,195,74,.3)}.mobile-financing-card strong{display:block;color:#f7f3ea;font-size:16px;font-weight:600;line-height:20px;white-space:nowrap}
.mobile-cta-stack{display:grid;gap:8px;margin:14px 16px 0}.mobile-cta{width:328px;border-radius:6px;display:flex;align-items:center;justify-content:center;gap:10px;text-transform:uppercase;letter-spacing:.08em;font-size:14px;line-height:16px;font-weight:900;text-decoration:none}.mobile-cta.primary{height:48px;border:0;background:linear-gradient(180deg,#f3d76a 0%,#c99d24 100%);color:#080808}.mobile-cta.outline{height:40px;border:1px solid #e7c34a;background:transparent;color:#e7c34a}.mobile-cta .icon{width:18px;height:18px}
.mobile-below-fold{margin:32px 16px 0;padding-top:0}.mobile-below-fold h2{margin:0 0 14px;color:#f7f3ea;font-size:18px;line-height:24px;font-weight:800}.mobile-tags{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:0 0 32px}.mobile-tags span{height:36px;padding:0 14px;border:1px solid rgba(231,195,74,.22);border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:7px;color:#f7f3ea;font-size:13px;line-height:16px;font-weight:500}.mobile-tags .icon{width:16px;height:16px;color:#e7c34a}
.mobile-agent-card{min-height:150px;border:1px solid rgba(231,195,74,.22);border-radius:12px;padding:16px;background:#0b0b0a;display:grid;grid-template-columns:72px 1fr;gap:14px}.mobile-agent-card img{width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #607080}.mobile-agent-copy h2{margin:0 0 5px;font-size:18px;line-height:22px;font-weight:800}.mobile-agent-copy em{display:inline-flex;align-items:center;margin-left:6px;padding:3px 6px;border-radius:3px;background:#5b6472;color:#fff;font-size:12px;line-height:14px;font-style:normal;text-transform:uppercase;letter-spacing:.06em}.mobile-agent-copy p{margin:0;color:#bdb7aa;font-size:13px;line-height:18px}.mobile-agent-actions{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.mobile-agent-actions a{height:40px;border:1px solid rgba(231,195,74,.42);border-radius:6px;display:flex;align-items:center;justify-content:center;gap:7px;color:#e7c34a;text-transform:uppercase;font-size:13px;font-weight:800;letter-spacing:.06em;text-decoration:none}.mobile-agent-actions .icon{width:16px;height:16px}
@media(max-width:480px){body{margin:0;background:#050505}.desktop-buy-pages{display:none}.mobile-buy-pages{display:block}.mobile-buy-pages .viewport-page{height:auto;min-height:100dvh;overflow:visible;background:#050505}.mobile-canvas{width:100%;max-width:430px;margin:0 auto;overflow-x:hidden}.placeholder-page .mobile-canvas{min-height:100dvh;display:grid;place-items:center}.global-footer-spacer{display:none}}
@media(min-width:481px) and (max-width:767px){.desktop-buy-pages{display:none}.mobile-buy-pages{display:block}.mobile-buy-pages .viewport-page{height:auto;min-height:100dvh;overflow:visible;background:#050505}.mobile-canvas{width:100%;max-width:430px;margin:0 auto;overflow-x:hidden}.placeholder-page .mobile-canvas{min-height:100dvh;display:grid;place-items:center}.global-footer-spacer{display:none}}
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

const mobileTagIcon = ["document", "dollar", "percent", "shield", "chart"];
const mobileBelowFoldTags = ["Zero HOA", "Target DSCR 1.30", "7,250 sqft lot", "Seller financing"];
const mobileShell = `
  <main class="buy-page-stack mobile-buy-pages" aria-label="Mobile property listing">
    <section class="viewport-page mobile-page-one" aria-label="Mobile property overview">
      <div class="mobile-canvas">
        <button class="mobile-gallery-hero gallery-slot" type="button" data-photo-id="front-yard" aria-label="Open gallery at front yard exterior"><img src="${photoById.get("front-yard")?.src}" alt="${photoById.get("front-yard")?.alt}"><span class="mobile-sale-badge"><strong>FOR SALE</strong><span>Seller financing</span></span><span class="mobile-photo-pill">1 of ${listing.photos.length}</span></button>
        <section class="mobile-copy"><p class="mobile-price">${listing.price}</p><h1>${listing.addressLine1} ${listing.addressLine2}</h1><p class="mobile-location"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>${listing.location}</p><p class="mobile-facts-line">${icon("bed")}<strong>3 br</strong>${icon("bath")}<strong>1 bath</strong>${icon("ruler")}<strong>1,064 sqft</strong></p></section>
        <section class="mobile-financing-card" aria-label="Investment terms"><ul><li><strong>${listing.metrics[1].value}</strong>down</li><li><strong>${listing.metrics[2].value}</strong>note</li><li><strong>${listing.metrics[3].value}</strong>cash flow</li></ul></section>
        <section class="mobile-cta-stack"><a href="mailto:lisibeth@zyne.store?subject=Investment%20Packet%20Request%20-%207101%20Wendemere%20St" class="mobile-cta primary">${icon("document")}Request Investment Packet ${icon("arrow")}</a><a href="tel:+13465924718" class="mobile-cta outline">${icon("user")}Contact Listing Agent</a></section>
        <section class="mobile-below-fold"><h2>Deal highlights</h2><div class="mobile-tags">${mobileBelowFoldTags.map((tag, index) => `<span>${icon(mobileTagIcon[index] || "tag")}${tag}</span>`).join("")}</div><section class="mobile-agent-card"><img src="${listing.agent.photo.src}" alt="${listing.agent.photo.alt}"><div class="mobile-agent-copy"><h2>${listing.agent.name}<em>★ Platinum</em></h2><p>${listing.agent.brokerage}<br>${listing.agent.office}</p></div><div class="mobile-agent-actions"><a href="https://www.har.com/carissa-weber/agent_WEBERC" target="_blank" rel="noopener noreferrer">${icon("heart")}View Profile</a><a href="tel:+13465924718">${icon("share")}Contact Agent</a></div></section></section>
      </div>
    </section>
    <section class="viewport-page placeholder-page" aria-label="Mobile property details placeholder"><div class="mobile-canvas"><div class="placeholder-content"><span>PAGE 2</span><div class="placeholder-rule"></div><p>Future mobile property detail section</p></div></div></section>
    <section class="viewport-page placeholder-page" aria-label="Mobile property disclosures placeholder"><div class="mobile-canvas"><div class="placeholder-content"><span>PAGE 3</span><div class="placeholder-rule"></div><p>Future mobile property disclosure section</p></div></div></section>
  </main>`;

const clientScript = `
const listing=${escapeJson(listing)};
const updateScale=()=>{const mobile=matchMedia("(max-width: 767px)").matches;if(mobile){document.documentElement.style.setProperty("--canvas-scale","1");return;}const canvasWidth=1672;const canvasHeight=941;const scale=Math.min(1,innerWidth/canvasWidth,innerHeight/canvasHeight);document.documentElement.style.setProperty("--canvas-scale",String(scale));};
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

const html = renderBuyPage({
  route,
  listing,
  styles: `${chromeCss}${await readBuyCss()}`,
  buyShell,
  mobileShell,
  clientScript,
  schema
});

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html using buy template with ${listing.photos.length} image(s)`);
