import { Icons } from "../property-icons.mjs";

// [INSERT ALL BESPOKE SVGs HERE: cloverleafIcon, lotIcon, porchIcon, etc. from the original script]

export function buildRentalPage(propertyData, agentData, photos, visiblePhotos, primaryImage, navItems) {
  const property = propertyData;
  const agent = agentData;
  const canonical = property.canonical;

  const nav = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

  const tile = (photo, className = "") => {
    if (!photo) return "";
    return `
      <button class="tile ${className}" type="button" data-photo="${photo.index}">
        <img src="${photo.src}" alt="${photo.label} at ${property.address}">
        ${className === "hero-photo" ? `<b class="status">${property.status}</b>` : ""}
      </button>
    `;
  };

  const item = (icon, title, copy) => `
    <article class="highlight-item">
      ${icon}<div><h3>${title}</h3><p>${copy}</p></div>
    </article>
  `;

  const cleanItem = (icon, title, copy) => `
    <article class="highlight-item clean-icon">
      ${icon}<div><h3>${title}</h3><p>${copy}</p></div>
    </article>
  `;

  const stat = (icon, value, label) => `<article class="stat">${icon}<b>${value}</b><small>${label}</small></article>`;
  const metric = (icon, label, value) => `<article>${icon}<div class="metric-info"><b>${value}</b><small>${label}</small></div></article>`;
  const feature = (icon, title, copy) => `<article class="feature-item">${icon}<h3>${title}</h3><p>${copy}</p></article>`;
  const tag = (value) => `<span>${value}</span>`;
  const row = (label, value) => `<div><span>${label}</span><b>${value}</b></div>`;

  // [INSERT const schema = {...} HERE from original script]
  // [INSERT const css = \`...\` HERE from original script]
  // [INSERT const header, topbar, gallery, summary, stats, special, overview, homeFeatures, neighborhood, cta, footer, lightbox, clientScript HERE from original script]

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#050505">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;800;900&display=block" rel="stylesheet">
  <title>${property.address} ${property.city} ${property.state} ${property.zip} Rental | ZYNE Property Detail</title>
  <meta name="description" content="Three-bedroom Houston rental with covered porch, large lot, open layout, and clear property details.">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg">
  <meta property="og:title" content="${property.address} Rental | ZYNE Property Detail">
  <meta property="og:description" content="Three-bedroom Houston rental with covered porch, large lot, open layout.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="ZYNE">
  <meta property="og:image" content="${primaryImage}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>${css}</style>
</head>
<body>
  ${header}
  <main class="page">
    ${topbar}
    <div class="hero">
      <div class="left">${gallery}${stats}</div>
      ${summary}
    </div>
    ${special}${overview}${homeFeatures}${neighborhood}${cta}${footer}
  </main>
  ${lightbox}${clientScript}
</body>
</html>`;
}
