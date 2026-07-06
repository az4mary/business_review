import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { listing as sourceListing } from "../../zyne-buy/src/data/listing.js";
import { renderGallery } from "../../zyne-buy/src/components/gallery.js";
import { renderContextBar, renderPropertyPanel } from "../../zyne-buy/src/components/propertyPanel.js";

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

const header = `
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="ZYNE home"><img src="/assets/brand/zyne-logo-optimized.webp" alt="ZYNE" width="500" height="333"></a>
    <nav aria-label="Main navigation"><a href="/services/">Services</a><a href="/grow-my-visibility/">Growth Paths</a><a href="/intelligence/">Intelligence</a><a href="/delivery/">Delivery</a><a href="/#industries">Industries</a><a href="/#faq">FAQ</a></nav>
    <a class="button button-small" href="/services/">Shop Services</a>
  </header>`;

const footer = `
  <footer class="footer">
    <p>Product education and service details are provided on ZYNE. Secure checkout is completed through Stan Store.</p>
    <p>ZYNE controls service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.</p>
    <nav class="footer-links" aria-label="Legal links"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Service</a><a href="/refund-policy/">Refund and Scope Policy</a><a href="/cookie-policy/">Cookie Policy</a></nav>
  </footer>`;

const chromeCss = `
*{box-sizing:border-box}
html{background:#070706;color:#f1eadc;scroll-snap-type:y proximity;scrollbar-color:#6e5700 #050606}
body{margin:0;background:#070706;color:#f1eadc;font-family:"Inter Var",Inter,"Segoe UI",Arial,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
button{font:inherit}
a:focus-visible,button:focus-visible{outline:2px solid #c9a967;outline-offset:4px}
.skip-link{position:absolute;left:-999px;top:1rem}
.skip-link:focus{left:1rem;z-index:99;background:#c9a967;color:#080807;padding:.8rem 1rem}
.site-header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee;position:sticky;top:0;z-index:40;backdrop-filter:blur(18px)}
.site-header img{width:110px;height:auto;display:block}
.site-header nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}
.site-header nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}
.site-header nav a:hover{color:#f1eadc}
.button{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:1rem 1.2rem;background:#c9a967;color:#080807;text-transform:uppercase;letter-spacing:.1em;font-size:.72rem;font-weight:800;border:1px solid #c9a967}
.buy-page-stack{background:#020303}
.page-stack{margin-top:0}
.viewport-page{position:relative;width:100%;height:100dvh;min-height:1px;overflow:hidden;scroll-snap-align:start;scroll-snap-stop:normal;background:#020303}
.design-canvas{position:absolute;left:50vw;top:50%;width:var(--canvas-width);height:var(--canvas-height);transform:translate(-50%,-50%) scale(var(--canvas-scale));transform-origin:center;overflow:hidden;background:#020303}
.canvas-header-space{height:82px}
.icon{width:42px;height:42px;fill:none;stroke:currentColor;stroke-width:1.15;stroke-linecap:round;stroke-linejoin:round}
.small-icon{width:18px;height:18px;stroke-width:1.8}
button[aria-disabled="true"]{cursor:default}
.lightbox-open{position:fixed;width:100%;overflow:hidden}
.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18);background:#050606}
.footer p{max-width:980px;color:#c9c9c6;line-height:1.55}
.footer-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}
.footer-links a{color:#c9a967;text-transform:uppercase;letter-spacing:.12em;font-size:.7rem}
@media(max-width:1000px){.site-header nav{display:none}}
`;

const buyShell = `
  <main id="main-content" class="buy-page-stack">
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

const clientScript = `
const listing=${escapeJson(listing)};
const canvasWidth=1672,canvasHeight=941;
const updateScale=()=>document.documentElement.style.setProperty("--canvas-scale",String(Math.min(1,innerWidth/canvasWidth,innerHeight/canvasHeight)));
addEventListener("resize",updateScale,{passive:true});updateScale();
const byId=new Map(listing.photos.map(photo=>[photo.id,photo]));
const ordered=listing.galleryOrder.map(id=>byId.get(id)).filter(Boolean);
let active=0,opener=null,savedScrollY=0;
const root=document.getElementById("overlay-root");
const render=()=>{const photo=ordered[active];root.innerHTML='<div class="lightbox" role="dialog" aria-modal="true" aria-label="Property photo gallery"><div class="lightbox-toolbar"><span>'+(active+1)+' / '+ordered.length+'</span><button type="button" data-close aria-label="Close gallery">×</button></div><div class="lightbox-stage"><button type="button" data-prev aria-label="Previous photo">‹</button><figure><img src="'+photo.fullSrc+'" alt="'+photo.alt+'"><figcaption>'+photo.label+'</figcaption></figure><button type="button" data-next aria-label="Next photo">›</button></div><div class="lightbox-thumbs">'+ordered.map((item,index)=>'<button type="button" data-thumb="'+index+'" class="'+(index===active?'is-active':'')+'"><img src="'+item.thumbnailSrc+'" alt=""></button>').join("")+'</div></div>';root.querySelector("[data-close]").focus();};
const open=(id,button)=>{active=Math.max(0,ordered.findIndex(photo=>photo.id===id));opener=button;savedScrollY=window.scrollY;document.body.classList.add("lightbox-open");document.body.style.top="-"+savedScrollY+"px";render();};
const close=()=>{root.innerHTML="";document.body.classList.remove("lightbox-open");document.body.style.top="";scrollTo(0,savedScrollY);opener?.focus();};
const move=delta=>{active=(active+delta+ordered.length)%ordered.length;render();};
document.querySelectorAll(".gallery-slot").forEach(button=>button.addEventListener("click",()=>open(button.dataset.photoId,button)));
root.addEventListener("click",event=>{if(event.target===root.firstElementChild||event.target.closest("[data-close]")) close(); if(event.target.closest("[data-prev]")) move(-1); if(event.target.closest("[data-next]")) move(1); const thumb=event.target.closest("[data-thumb]"); if(thumb){active=Number(thumb.dataset.thumb);render();}});
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
  <style>${chromeCss}${await readBuyCss()}</style>
  <script type="application/ld+json">${escapeJson(schema)}</script>
</head>
<body>
  ${header}
  ${buyShell}
  ${footer}
  <div id="overlay-root"></div>
  <script>${clientScript}</script>
</body>
</html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);
console.log(`Generated ${route}/index.html using buy template with ${listing.photos.length} image(s)`);
