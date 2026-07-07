import { Icons } from "../property-icons.mjs";

// Bespoke SVGs (1.25px Stroke) for Investment Metrics
const tagIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`;
const piggyIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 7v4"/></svg>`;
const percentIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="9" y1="15" x2="15" y2="9"/><circle cx="10" cy="10" r="0.5"/><circle cx="14" cy="14" r="0.5"/></svg>`;
const coinsIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`;
const docIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>`;
const dollarCoinIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M10 10h4"/><path d="M10 14h4"/></svg>`;
const trendIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-5 5"/><path d="M18 9h-4"/><path d="M18 9v4"/></svg>`;
const shieldIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`;
const arrowRightIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
const arrowLeftIcon = `<svg class="zyne-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; margin-right: 4px;"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`;

export function buildInvestmentPage(prop, photos, visible, primaryImage, navItems) {
  const property = prop.details || prop;
  const agent = prop.agent || prop;
  const canonical = prop.canonical || "https://zyne.store";

  // Inherited tile component from rental template
  const tile = (photo, className = "") => {
    if (!photo) return `<div class="tile ${className}" style="background:#111;"></div>`;
    return `
      <button class="tile ${className}" type="button" data-photo="${photo.index}">
        <img src="${photo.thumbnailSrc}" srcset="${photo.mobileThumbnailSrc} 768w, ${photo.thumbnailSrc} 1024w" sizes="(max-width: 768px) 100vw, 50vw" alt="${photo.label} at ${property.address}">
        ${className.includes("hero-photo") ? `<b class="status-chevron">FOR SALE • SELLER FINANCING</b>` : ""}
      </button>
    `;
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Investment Prospectus | ${property.address} | ZYNE`,
        url: canonical,
        primaryImageOfPage: primaryImage
      }
    ]
  };

  const css = `
  :root {
    --bg: #050505;
    --panel: #0d0d0d;
    --panel-soft: #111111;
    --gold: #c99a2e;
    --gold2: #f1d37a;
    --gold-dark: #8a6118;
    --text: #f3ecde;
    --muted: #c9c3b8;
    --muted-dark: #7e7568;
    --line: rgba(201, 154, 46, .34);
  }

  .page *, .page *::before, .page *::after, .lightbox, .lightbox *, .lightbox *::before, .lightbox *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-variant-numeric: tabular-nums;
    font-size: 16px;
  }
  
  body {
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter var', Inter, sans-serif;
    line-height: 1.5;
  }
  
  img, svg { display: block; max-width: 100%; height: auto; }
  main a, .lightbox a { color: inherit; text-decoration: none; }
  button { font: inherit; background: none; border: none; cursor: pointer; }
  main p { color: var(--muted); font-size: 15px; line-height: 1.7; }
  
  .zyne-icon {
    width: 36px; height: 36px; color: var(--gold); flex: 0 0 auto;
    filter: drop-shadow(0 0 6px rgba(201, 154, 46, .20));
  }
  .zyne-icon stroke, .zyne-icon path, .zyne-icon circle { stroke-width: 1.25px !important; }
  
  .page { width: calc(100% - 3rem); max-width: 1440px; margin: 0 auto; padding-bottom: 3rem; }
  .topbar { display: flex; justify-content: space-between; gap: 1rem; padding: 2.55rem 0 1.55rem; font-size: .83rem; color: var(--muted); }
  .breadcrumbs, .actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  .breadcrumbs .slash { color: var(--muted-dark); opacity: 0.5; }
  .actions button { display: flex; gap: .42rem; align-items: center; color: var(--text); }
  .actions .zyne-icon { width: 19px; height: 19px; filter: none; }
  
  .hero { display: grid; grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr); gap: 1.5rem; align-items: stretch; }
  .left { display: grid; grid-template-rows: minmax(0, 1fr) auto; min-height: 100%; }
  
  .tile { position: relative; overflow: hidden; border: 1px solid var(--line); background: #10100d; padding: 0; }
  .tile img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .45s ease, opacity .45s ease; }
  .tile:hover img { transform: scale(1.035); opacity: .92; }
  
  .summary { height: 100%; border: 1px solid var(--line); background: linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.012)); padding: 2.6rem 2.35rem; }
  .eyebrow { color: var(--gold2); font-size: .72rem; font-weight: 950; letter-spacing: .19em; text-transform: uppercase; }
  h1 { font-size: clamp(3rem, 4vw, 4.25rem); line-height: .96; letter-spacing: -.052em; margin: .8rem 0 .35rem; font-weight: 500; }
  .location { font-size: 1.25rem; margin: 0 0 1.2rem; }
  .price { display: block; color: var(--gold2); font-size: clamp(2.35rem, 3.55vw, 3.25rem); font-weight: 850; margin: 0 0 1rem; }
  
  /* Base Buttons */
  .button-group { display: flex; gap: 1rem; margin: 1.5rem 0; }
  .button { display: flex; justify-content: center; align-items: center; gap: .75rem; flex: 1; min-height: 60px; border: 1px solid var(--gold); text-transform: uppercase; letter-spacing: .16em; font-size: .74rem; font-weight: 950; }
  .button.primary { background: linear-gradient(180deg, var(--gold2), var(--gold)); color: #060504; }
  .button.secondary { color: var(--gold2); }
  
  /* Tags */
  .tags { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: 1.25rem; }
  .tags span { border: 1px solid var(--line); padding: .65rem .8rem; color: var(--gold2); font-size: .7rem; font-weight: 600; letter-spacing: .05em; }
  
  /* Agent Card Inherited */
  .agent-card { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid rgba(201,154,46,.28); }
  .agent-card h2 { margin: 0 0 1rem; font-size: .78rem; color: var(--gold2); text-transform: uppercase; letter-spacing: .18em; font-weight: 950; }
  .agent-profile { display: grid; grid-template-columns: 88px 1fr; gap: 1rem; align-items: center; }
  .agent-profile img { width: 88px; height: 88px; object-fit: cover; border: 1px solid rgba(201,154,46,.45); background: #090909; }
  .agent-profile h3 { margin: 0; font-size: 1rem; line-height: 1.25; color: var(--text); }
  .agent-badge { display: inline-block; margin-left: .45rem; padding: .12rem .42rem; border: 1px solid #3f66ff; background: #03117a; color: #fff; font-size: .58rem; font-style: italic; letter-spacing: .08em; vertical-align: middle; }
  .agent-profile p { margin: .22rem 0 0; font-size: 12.5px; line-height: 1.35; color: var(--muted); }
  .agent-actions { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; margin-top: 1rem; }
  .agent-actions a { min-height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--gold); color: var(--gold2); text-transform: uppercase; letter-spacing: .12em; font-size: .62rem; font-weight: 950; }
  
  .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.92); z-index: 50; display: none; align-items: center; justify-content: center; padding: 2rem; }
  .lightbox.open { display: flex; }
  .lightbox img { max-width: min(96vw, 1300px); max-height: 86vh; object-fit: contain; border: 1px solid var(--line); }
  .lightbox button { position: absolute; background: rgba(5,5,5,.75); border: 1px solid var(--line); color: var(--gold2); padding: .8rem 1rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 900; }
  .lightbox-close { top: 1.5rem; right: 1.5rem; }
  .lightbox-prev { left: 1.5rem; }
  .lightbox-next { right: 1.5rem; }

  /* ==========================================================================
     INVESTMENT SPECIFIC ARCHITECTURE OVERRIDES
     ========================================================================== */
  
  /* 1. The 6-Photo Masonry Grid */
  .investment-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1.3fr;
    gap: .58rem;
    height: 100%;
    min-height: 720px;
  }
  .investment-grid .hero-photo { grid-column: 1; grid-row: 1 / 4; }
  .investment-grid .bl-photo { grid-column: 1; grid-row: 4; }
  .investment-grid .tr-photo { grid-column: 2; grid-row: 1; }
  .investment-grid .mr-photo { grid-column: 2; grid-row: 2; }
  .investment-grid .br-photo { grid-column: 2; grid-row: 3; }
  .investment-grid .bb-photo { grid-column: 2; grid-row: 4; }

  /* 2. Chevron Badge */
  .status-chevron {
    position: absolute;
    left: 0;
    top: 1.25rem;
    background: linear-gradient(180deg, var(--gold2), var(--gold));
    color: #060504;
    padding: .55rem 1.6rem .55rem .85rem;
    text-transform: uppercase;
    font-size: .68rem;
    letter-spacing: .12em;
    font-weight: 850;
    clip-path: polygon(0 0, 100% 0, 93% 50%, 100% 100%, 0 100%);
    z-index: 2;
  }

  /* 3. The 2x2 Financial Grid (Label on Top, Value on Bottom) */
  .investment-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid var(--line);
    margin: 1.5rem 0;
  }
  .investment-metrics article {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1.35rem;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .investment-metrics article:nth-child(2n) { border-right: 0; }
  .investment-metrics article:nth-last-child(-n + 2) { border-bottom: 0; }
  .investment-metrics .metric-info {
    display: flex;
    flex-direction: column;
  }
  .investment-metrics b { color: var(--text); font-size: 1.45rem; font-weight: 700; line-height: 1.1; }
  .investment-metrics small { color: var(--muted-dark); text-transform: uppercase; letter-spacing: .12em; font-size: .62rem; margin-bottom: .35rem; order: -1; }

  /* 4. The 4-Column Highlight Bar */
  .highlight-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--line);
    margin: 1.5rem 0;
  }
  .highlight-bar article { padding: 1.25rem 0.5rem; text-align: center; border-right: 1px solid var(--line); }
  .highlight-bar article:last-child { border-right: 0; }
  .highlight-bar .zyne-icon { margin: 0 auto 0.75rem; width: 32px; height: 32px; }
  .highlight-bar b { display: block; color: var(--text); font-size: .75rem; margin-bottom: .25rem; }
  .highlight-bar small { display: block; color: var(--muted); font-size: .7rem; }
  `;

  const topbar = `
    <div class="topbar">
      <div class="breadcrumbs">
        <a href="/" style="display:flex;align-items:center;">${arrowLeftIcon} Back to Listings</a>
        <span class="slash">/</span>
        <span>${property.city}, ${property.state}</span>
        <span class="slash">/</span>
        <b>${property.address}</b>
      </div>
      <div class="actions">
        <button type="button">${Icons.heart || ''} Save</button>
        <button type="button">${Icons.share || ''} Share</button>
        <button type="button">${Icons.printer || '<svg class="zyne-icon icon-small" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>'} Print</button>
      </div>
    </div>
  `;

  const gallery = `
    <section class="media">
      <div class="investment-grid">
        ${tile(visible[0], "hero-photo")}
        ${tile(visible[1], "tr-photo")}
        ${tile(visible[2], "mr-photo")}
        ${tile(visible[3], "br-photo")}
        ${tile(visible[4], "bl-photo")}
        ${tile(visible[5], "bb-photo")}
      </div>
    </section>
  `;

  const summary = `
    <aside class="summary">
      <p class="eyebrow">FOR SALE • SELLER FINANCING</p>
      <h1>${property.address.split(' ')[0]}<br>${property.address.split(' ').slice(1).join(' ')}</h1>
      <p class="location">${property.city}, ${property.state} ${property.zip || ''}</p>
      <b class="price">${property.price || '$150,000'}</b>
      <p>${property.description}</p>

      <div class="investment-metrics">
        <article>${tagIcon}<div class="metric-info"><b>${property.price || '$150,000'}</b><small>Purchase Price</small></div></article>
        <article>${piggyIcon}<div class="metric-info"><b>$30,000</b><small>Down Payment</small></div></article>
        <article>${percentIcon}<div class="metric-info"><b>6.51%</b><small>Note Rate</small></div></article>
        <article>${coinsIcon}<div class="metric-info"><b>~$400/mo</b><small>Target Cash Flow</small></div></article>
      </div>

      <div class="button-group">
        <button class="button primary">Request Investment Packet ${arrowRightIcon}</button>
        <button class="button secondary">Contact Listing Agent</button>
      </div>

      <div class="tags">
        <span>Seller Financing</span>
        <span>20% Down</span>
        <span>6.51% Note</span>
        <span>Zero HOA</span>
        <span>Target DSCR 1.30</span>
      </div>

      <div class="highlight-bar">
        <article>${docIcon}<b>Seller-Financed Note</b><small>Financing</small></article>
        <article>${dollarCoinIcon}<b>20% Down</b><small>$30,000</small></article>
        <article>${trendIcon}<b>Target Rent</b><small>$1,700/mo</small></article>
        <article>${shieldIcon}<b>Target DSCR</b><small>1.30</small></article>
      </div>

      <div class="agent-card">
        <h2>Listing Agent</h2>
        <div class="agent-profile">
          <img src="${agent.photo || '/assets/catalog/agents/carissa-weber.webp'}" alt="${agent.name || 'Agent'}">
          <div>
            <h3>${agent.name || 'Carissa Weber'} <span class="agent-badge">${agent.badge || 'PLATINUM'}</span></h3>
            <p>${agent.brokerage || 'Better Homes and Gardens Real Estate'}</p>
            <p>${agent.market || 'Gary Greene - Sugar Land'}</p>
          </div>
        </div>
        <div class="agent-actions">
          <a href="${agent.profileUrl || '#'}" target="_blank">View Profile</a>
          <a href="${agent.profileUrl || '#'}" target="_blank">Contact Agent</a>
        </div>
      </div>
    </aside>
  `;

  const lightbox = `
    <div class="lightbox" id="lightbox" aria-hidden="true">
      <button class="lightbox-close" type="button">Close</button>
      <button class="lightbox-prev" type="button">Prev</button>
      <img src="" alt="">
      <button class="lightbox-next" type="button">Next</button>
    </div>
  `;

  const clientScript = `
  <script>
    const photos = ${JSON.stringify(photos)};
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const closeButton = lightbox?.querySelector(".lightbox-close");
    const prevButton = lightbox?.querySelector(".lightbox-prev");
    const nextButton = lightbox?.querySelector(".lightbox-next");
    let currentPhoto = 0;
    function openLightbox(index) {
      if (!photos.length || !lightbox || !lightboxImage) return;
      currentPhoto = Number(index) || 0;
      const photo = photos.find((item) => item.index === currentPhoto) || photos[0];
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.label;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }
    function closeLightbox() {
      if (!lightbox || !lightboxImage) return;
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
    }
    function movePhoto(direction) {
      if (!photos.length) return;
      const position = photos.findIndex((item) => item.index === currentPhoto);
      const nextPosition = (position + direction + photos.length) % photos.length;
      openLightbox(photos[nextPosition].index);
    }
    document.querySelectorAll("[data-photo]").forEach((button) => {
      button.addEventListener("click", () => openLightbox(button.dataset.photo));
    });
    closeButton?.addEventListener("click", closeLightbox);
    prevButton?.addEventListener("click", () => movePhoto(-1));
    nextButton?.addEventListener("click", () => movePhoto(1));
    lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (event) => {
      if (!lightbox?.classList.contains("open")) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") movePhoto(-1);
      if (event.key === "ArrowRight") movePhoto(1);
    });
  </script>
  `;

  return `<!doctype html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/assets/fonts/fonts.css">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#050505">
  <title>Investment Prospectus | ${property.address} | ZYNE</title>
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/brand/favicon.svg">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>${css}</style>
</head>
<body>
  <main class="page">
    ${topbar}
    <div class="hero">
      <div class="left">${gallery}</div>
      ${summary}
    </div>
  </main>
  ${lightbox}
  ${clientScript}
</body>
</html>`;
}
