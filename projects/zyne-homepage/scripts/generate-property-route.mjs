import { copyFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Icons } from "./property-icons.mjs";

const route = "homedetail/7101-wendemere-st-houston-tx-77088";
const outputDir = join("dist", route);
const sourceImageDir = join("..", "..", route, "images");
const outputImageDir = join(outputDir, "images");
const imageBase = `/${route}/images`;
const canonical = "https://zyne.store/homedetail/7101-wendemere-st-houston-tx-77088/";

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
  status: "For Rent · Active",
  description:
    "Three-bedroom Houston bungalow with a covered porch, Texas-size lot, no HOA, spacious bedrooms, walk-in closets, and open kitchen/dining flow."
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

const labels = [
  "Bathroom",
  "Bedroom",
  "Living room",
  "Dining area",
  "Front exterior",
  "Kitchen",
  "Living room",
  "Kitchen",
  "Bedroom",
  "Laundry",
  "Exterior",
  "Bedroom",
  "Bathroom",
  "Kitchen",
  "Closet",
  "Yard",
  "Entry",
  "Detail"
];

const sorter = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base"
});

let imageFiles = [];

try {
  imageFiles = (await readdir(sourceImageDir, { withFileTypes: true }))
    .filter(
      (entry) =>
        entry.isFile() && /\.(?:jpe?g|png|webp|avif)$/i.test(entry.name)
    )
    .map((entry) => entry.name)
    .sort(sorter.compare);

  await mkdir(outputImageDir, { recursive: true });

  await Promise.all(
    imageFiles.map((file) =>
      copyFile(join(sourceImageDir, file), join(outputImageDir, file))
    )
  );
} catch (error) {
  console.warn(`Property images were not copied: ${error.message}`);
}

const photos = imageFiles.map((file, index) => ({
  index,
  label: labels[index] || `Photo ${index + 1}`,
  src: `${imageBase}/${encodeURIComponent(file)}`
}));

const order = [4, 2, 3, 5, 1, 6, 0, 7, 8].filter((index) => photos[index]);

const visible = [
  ...order.map((index) => photos[index]),
  ...photos.filter((photo) => !order.includes(photo.index))
].slice(0, 6);

const primaryImage = visible[0]
  ? `https://zyne.store${visible[0].src}`
  : "https://zyne.store/assets/zyne-logo-optimized.webp";

const nav = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

const tile = (photo, className = "") => {
  if (!photo) return "";

  return `
    <button class="tile ${className}" type="button" data-photo="${photo.index}">
      <img src="${photo.src}" alt="${photo.label} at ${property.address}">
      ${
        className === "hero-photo"
          ? `<b class="status">${property.status}</b>`
          : ""
      }
    </button>
  `;
};

const item = (icon, title, copy) => `
  <article class="highlight-item">
    ${icon}
    <div>
      <h3>${title}</h3>
      <p>${copy}</p>
    </div>
  </article>
`;

const stat = (icon, value, label) => `
  <article class="stat">
    ${icon}
    <b>${value}</b>
    <small>${label}</small>
  </article>
`;

const metric = (icon, label, value) => `
  <article>
    ${icon}
    <div>
      <small>${label}</small>
      <b>${value}</b>
    </div>
  </article>
`;

const tag = (value) => `<span>${value}</span>`;

const row = (label, value) => `
  <div>
    <span>${label}</span>
    <b>${value}</b>
  </div>
`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "7101 Wendemere St Houston TX 77088 Rental | ZYNE Property Detail",
      url: canonical,
      description: "Three-bedroom Houston rental property detail.",
      primaryImageOfPage: primaryImage
    },
    {
      "@type": "SingleFamilyResidence",
      name: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
      url: canonical,
      image: photos.map((photo) => `https://zyne.store${photo.src}`),
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: property.state,
        postalCode: property.zip,
        addressCountry: "US"
      },
      offers: {
        "@type": "Offer",
        price: 1495,
        priceCurrency: "USD",
        url: canonical
      }
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

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, "Segoe UI", Arial, sans-serif;
  font-size: 16px;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  cursor: pointer;
}

p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

.zyne-icon {
  width: 36px;
  height: 36px;
  color: var(--gold);
  flex: 0 0 auto;
  filter:
    drop-shadow(0 0 6px rgba(201, 154, 46, .20))
    drop-shadow(0 0 14px rgba(201, 154, 46, .08));
}

.site-header {
  height: 92px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line);
  background: #050505;
  position: sticky;
  top: 0;
  z-index: 20;
}

.brand {
  display: flex;
  align-items: center;
  gap: .85rem;
  min-width: 235px;
}

.brand img {
  width: 58px;
  height: auto;
}

.brand b {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--gold2);
  font-size: 2rem;
  letter-spacing: .08em;
}

.main-nav {
  display: flex;
  gap: 1.55rem;
  margin-left: auto;
  align-items: center;
}

.main-nav a,
.header-cta {
  font-size: .72rem;
  font-weight: 900;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.main-nav a {
  color: var(--text);
  opacity: .92;
}

.main-nav a:hover {
  color: var(--gold2);
}

.header-cta {
  margin-left: 1.5rem;
  border: 1px solid var(--gold);
  padding: .9rem 1.05rem;
  color: var(--gold2);
}

.header-cta:hover {
  background: rgba(201, 154, 46, .1);
}

.page {
  width: calc(100% - 3rem);
  max-width: 1500px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 2.55rem 0 1.55rem;
  font-size: .83rem;
  color: var(--muted);
}

.breadcrumbs,
.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.actions button {
  display: flex;
  gap: .42rem;
  align-items: center;
  background: none;
  border: 0;
  color: var(--text);
}

.actions .zyne-icon {
  width: 19px;
  height: 19px;
  color: var(--text);
  filter: none;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(420px, .95fr);
  gap: 1.5rem;
  align-items: stretch;
}

.left {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 100%;
}

.photo-grid {
  height: 100%;
  min-height: 610px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr .72fr;
  gap: .58rem;
}

.tile {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--line);
  background: #10100d;
  padding: 0;
}

.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .45s ease, opacity .45s ease;
}

.tile:hover img {
  transform: scale(1.035);
  opacity: .92;
}

.hero-photo {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.status {
  position: absolute;
  left: 1rem;
  top: 1rem;
  background: linear-gradient(180deg, var(--gold2), var(--gold));
  color: #060504;
  padding: .62rem .82rem;
  text-transform: uppercase;
  font-size: .68rem;
  letter-spacing: .12em;
}

.see-all span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: .55rem;
  align-items: center;
  background: rgba(5, 5, 5, .82);
  border: 1px solid var(--line);
  padding: .72rem 1rem;
  white-space: nowrap;
  font-weight: 850;
}

.see-all .zyne-icon,
.button .zyne-icon {
  width: 18px;
  height: 18px;
  color: currentColor;
  filter: none;
}

.summary {
  height: 100%;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.012));
  padding: 2.8rem 2.5rem;
}

.eyebrow {
  color: var(--gold2);
  font-size: .72rem;
  font-weight: 950;
  letter-spacing: .19em;
  text-transform: uppercase;
}

h1 {
  font-size: clamp(3.45rem, 5vw, 5.2rem);
  line-height: .92;
  letter-spacing: -.055em;
  margin: .8rem 0 .35rem;
  font-weight: 500;
}

.location {
  font-size: 1.25rem;
  margin: 0 0 1.2rem;
}

.price {
  display: block;
  color: var(--gold2);
  font-size: clamp(2.35rem, 3.55vw, 3.25rem);
  font-weight: 850;
  margin: 0 0 1rem;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--line);
  margin: 1.55rem 0;
}

.metrics article {
  display: flex;
  gap: .85rem;
  padding: 1.1rem;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.metrics article:nth-child(2n) {
  border-right: 0;
}

.metrics article:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.metrics .zyne-icon {
  width: 30px;
  height: 30px;
}

.metrics small,
.overview span {
  display: block;
  color: var(--muted-dark);
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: .66rem;
}

.metrics b,
.overview b {
  display: block;
  color: var(--text);
  font-size: 1.08rem;
  margin-top: .25rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .75rem;
  width: 100%;
  min-height: 60px;
  border: 1px solid var(--gold);
  text-transform: uppercase;
  letter-spacing: .16em;
  font-size: .74rem;
  font-weight: 950;
}

.button.primary {
  background: linear-gradient(180deg, var(--gold2), var(--gold));
  color: #060504;
}

.button.primary:hover {
  background: linear-gradient(180deg, #ffe79b, #d4a63a);
}

.button.secondary {
  color: var(--gold2);
  margin-top: .85rem;
}

.button.secondary:hover {
  background: rgba(201,154,46,.09);
}

.tags {
  display: flex;
  gap: .55rem;
  flex-wrap: wrap;
  margin-top: 1.45rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(201,154,46,.18);
}

.tags span {
  border: 1px solid var(--line);
  padding: .65rem .8rem;
  color: var(--gold2);
  text-transform: uppercase;
  letter-spacing: .11em;
  font-size: .7rem;
  font-weight: 850;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
  margin: 1.35rem 0 0;
  background: rgba(255,255,255,.018);
}

.stat {
  padding: 1.45rem;
  text-align: center;
  border-right: 1px solid rgba(201,154,46,.2);
}

.stat:last-child {
  border-right: 0;
}

.stat .zyne-icon {
  width: 34px;
  height: 34px;
  margin-bottom: .7rem;
}

.stat b {
  display: block;
}

.stat small {
  display: block;
  color: var(--muted);
  margin-top: .35rem;
}

.section {
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(255,255,255,.035), rgba(255,255,255,.01));
  margin: 1.75rem 0 0;
  padding: 2.4rem 2.25rem;
}

.title {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2rem;
  align-items: center;
  margin-bottom: 2rem;
}

.title h2 {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--gold2);
  font-size: 1.9rem;
  text-transform: uppercase;
  letter-spacing: .075em;
  margin: 0;
}

.title::after {
  content: "";
  height: 1px;
  background: var(--line);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.feature-grid article {
  text-align: center;
  padding: 1.25rem 1rem;
  border-right: 1px solid rgba(201,154,46,.2);
}

.feature-grid article:last-child {
  border-right: 0;
}

.feature-grid .zyne-icon {
  width: 44px;
  height: 44px;
  margin: 0 auto 1rem;
  padding: 7px;
  border: 1px solid rgba(201,154,46,.26);
  background: rgba(201,154,46,.045);
}

.feature-grid h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .85rem;
  line-height: 1.35;
}

.feature-grid p {
  font-size: 14px;
  line-height: 1.6;
}

.overview {
  display: grid;
  grid-template-columns: 1fr 1.12fr;
  gap: 2rem;
}

.overview-table {
  border: 1px solid rgba(201,154,46,.24);
}

.overview-table div {
  display: grid;
  grid-template-columns: .48fr 1fr;
  padding: .78rem 1rem;
  border-bottom: 1px solid rgba(201,154,46,.18);
}

.overview-table div:last-child {
  border-bottom: 0;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px;
  align-items: start;
}

.highlight-item {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 18px;
  align-items: start;
  min-width: 0;
}

.highlight-item .zyne-icon {
  width: 42px;
  height: 42px;
  padding: 8px;
  border: 1px solid rgba(201,154,46,.32);
  background: rgba(201,154,46,.055);
  color: var(--gold);
}

.highlight-item h3 {
  margin: 0 0 8px;
  color: #f5f1e8;
  font-size: 15px;
  font-weight: 800;
}

.highlight-item p {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.65;
}

.home-features .highlight-grid {
  gap: 40px 56px;
}

.cta {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 360px 210px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 1.65rem 2rem;
  margin: 1.5rem 0;
  min-height: 150px;
  background:
    radial-gradient(circle at right center, rgba(201,154,46,.16), transparent 20rem),
    linear-gradient(90deg, rgba(32,24,9,.72), rgba(12,12,10,.96) 55%, rgba(6,6,6,.98));
}

.cta::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 230px;
  height: 100%;
  background-image: url("/assets/decor/zyne-gold-pillars.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  opacity: .86;
  pointer-events: none;
}

.cta > * {
  position: relative;
  z-index: 2;
}

.cta h2 {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--gold2);
  font-size: 1.85rem;
  line-height: 1.08;
  text-transform: uppercase;
  letter-spacing: .035em;
  margin: 0 0 .55rem;
}

.cta p {
  max-width: 640px;
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
}

.cta .button {
  min-height: 50px;
  font-size: .68rem;
  letter-spacing: .15em;
}

.cta .button.secondary {
  margin-top: .75rem;
}

.footer {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 2rem;
  align-items: center;
  padding: 2.75rem 0 3.25rem;
  color: #837a6e;
}

.footer .brand img {
  width: 62px;
}

.footer .brand b {
  font-size: 1.8rem;
}

.footer-nav {
  display: flex;
  gap: 1.2rem;
}

.footer-nav a {
  font-size: .68rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--muted);
  font-weight: 850;
}

.socials {
  display: flex;
  gap: .7rem;
}

.socials span {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--gold);
  border-radius: 999px;
  color: var(--gold2);
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.92);
  z-index: 50;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.lightbox.open {
  display: flex;
}

.lightbox img {
  max-width: min(96vw, 1300px);
  max-height: 86vh;
  object-fit: contain;
  border: 1px solid var(--line);
}

.lightbox button {
  position: absolute;
  background: rgba(5,5,5,.75);
  border: 1px solid var(--line);
  color: var(--gold2);
  padding: .8rem 1rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  font-weight: 900;
}

.lightbox-close {
  top: 1.5rem;
  right: 1.5rem;
}

.lightbox-prev {
  left: 1.5rem;
}

.lightbox-next {
  right: 1.5rem;
}

@media (max-width: 1120px) {
  .main-nav,
  .header-cta {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .left {
    display: block;
  }

  .photo-grid {
    height: 560px;
    min-height: 0;
  }

  .summary {
    height: auto;
  }
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-grid article {
    border-right: 0;
    border-bottom: 1px solid rgba(201,154,46,.18);
  }

  .highlight-grid,
  .home-features .highlight-grid,
  .overview,
  .footer {
    grid-template-columns: 1fr;
  }

  .cta {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .cta::after {
    width: 155px;
    opacity: .28;
  }

  .footer-nav {
    flex-wrap: wrap;
  }
}

@media (max-width: 760px) {
  .site-header {
    height: 76px;
  }

  .brand img {
    width: 54px;
  }

  .brand b {
    font-size: 1.55rem;
  }

  .page {
    width: calc(100% - 1.2rem);
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .photo-grid {
    height: auto;
    grid-template-columns: 1fr 1fr;
  }

  .hero-photo {
    grid-column: 1 / -1;
    grid-row: auto;
    height: 340px;
  }

  .tile:not(.hero-photo) {
    height: 170px;
  }

  .stats,
  .metrics {
    grid-template-columns: 1fr;
  }

  .metrics article,
  .stat {
    border-right: 0;
  }

  h1 {
    font-size: 3.2rem;
  }

  .summary {
    padding: 2rem 1.5rem;
  }

  .section {
    padding: 1.7rem 1.35rem;
  }

  .title {
    grid-template-columns: 1fr;
    gap: .8rem;
  }

  .title h2 {
    font-size: 1.45rem;
  }

  .cta {
    min-height: 180px;
  }

  .cta::after {
    width: 135px;
    opacity: .22;
  }

  .cta h2 {
    font-size: 1.45rem;
  }

  .cta .button {
    min-height: 48px;
  }

  .lightbox-prev,
  .lightbox-next {
    bottom: 1.5rem;
    top: auto;
  }
}
`;

const header = `
  <header class="site-header">
    <a class="brand" href="/">
      <img src="/assets/zyne-logo.png" alt="ZYNE">
      <b>ZYNE</b>
    </a>

    <nav class="main-nav">
      ${nav}
    </nav>

    <a class="header-cta" href="/services/executive-briefing/">
      Schedule Executive Briefing
    </a>
  </header>
`;

const topbar = `
  <div class="topbar">
    <div class="breadcrumbs">
      <a href="/">← Back to Listings</a>
      <span>/</span>
      <span>${property.city}, ${property.state}</span>
      <span>/</span>
      <b>${property.address}</b>
    </div>

    <div class="actions">
      <button type="button">${Icons.heart} Save</button>
      <button type="button">${Icons.share} Share</button>
      <button type="button">${Icons.printer} Print</button>
    </div>
  </div>
`;

const gallery = `
  <section class="media">
    <div class="photo-grid">
      ${tile(visible[0], "hero-photo")}
      ${tile(visible[1])}
      ${tile(visible[2])}
      ${tile(visible[3])}
      ${tile(visible[4])}

      <button class="tile see-all" type="button" data-photo="${visible[5]?.index ?? 0}">
        ${
          visible[5]
            ? `<img src="${visible[5].src}" alt="${visible[5].label} at ${property.address}">`
            : ""
        }
        <span>${Icons.images} See all ${Math.max(photos.length, 18)} photos</span>
      </button>
    </div>
  </section>
`;

const summary = `
  <aside class="summary">
    <p class="eyebrow">${property.status}</p>

    <h1>7101<br>Wendemere St</h1>

    <p class="location">${property.city}, ${property.state} ${property.zip}</p>

    <b class="price">${property.price}</b>

    <p>${property.description}</p>

    <div class="metrics">
      ${metric(Icons.bed, "Bedrooms", property.beds)}
      ${metric(Icons.bath, "Baths", property.baths)}
      ${metric(Icons.ruler, "Interior", property.interior)}
      ${metric(Icons.grid, "Lot size", property.lot)}
    </div>

    <a class="button primary" href="#schedule">
      Schedule a Viewing ${Icons.arrowRight}
    </a>

    <a class="button secondary" href="#apply">
      Request to Apply
    </a>

    <div class="tags">
      ${tag("Large lot")}
      ${tag("No HOA")}
      ${tag("Covered porch")}
      ${tag("Near schools")}
      ${tag("Available now")}
    </div>
  </aside>
`;

const stats = `
  <section class="stats">
    ${stat(Icons.home, "Singlefamily", "Property Type")}
    ${stat(Icons.calendarCheck, "Available now", "Availability")}
    ${stat(Icons.fan, "Electric ceiling fan", "Cooling")}
    ${stat(Icons.flame, "Natural gas", "Heating")}
  </section>
`;

const special = `
  <section class="section">
    <div class="title">
      <h2>What's Special</h2>
    </div>

    <div class="feature-grid">
      ${item(Icons.grid, "Texas-size lot", "Spacious lot with outdoor potential.")}
      ${item(Icons.home, "Covered porch", "Classic covered front porch.")}
      ${item(Icons.shieldCheck, "No HOA", "More flexibility without HOA restrictions.")}
      ${item(Icons.graduationCap, "Near schools", "Near local schools and amenities.")}
      ${item(Icons.key, "Walk-in closets", "Generous bedroom storage.")}
      ${item(Icons.doorOpen, "Open layout", "Open kitchen and dining flow.")}
    </div>
  </section>
`;

const overview = `
  <section class="section">
    <div class="title">
      <h2>Property Overview</h2>
    </div>

    <div class="overview">
      <p>
        This three-bedroom bungalow offers comfort, space, and convenience with
        a covered front porch, large lot, and open kitchen/dining connection.
        With no HOA and easy access to major roads, schools, and shopping, this
        home is ready for you.
      </p>

      <div class="overview-table">
        ${row("Address", `${property.address}, ${property.city}, ${property.state} ${property.zip}`)}
        ${row("Property type", "Singlefamily")}
        ${row("Status", "Available Now")}
        ${row("Monthly rent", property.price)}
        ${row("Beds", property.beds)}
        ${row("Baths", property.baths)}
        ${row("Interior", property.interior)}
        ${row("Lot size", property.lot)}
      </div>
    </div>
  </section>
`;

const homeFeatures = `
  <section class="section home-features">
    <div class="title">
      <h2>Home Features</h2>
    </div>

    <div class="highlight-grid">
      ${item(Icons.fan, "Electric ceiling fan", "Comfortable airflow in living spaces")}
      ${item(Icons.flame, "Natural gas", "Efficient and reliable heating")}
      ${item(Icons.layers, "Hardwood & carpet", "Durable flooring with soft-touch comfort")}
      ${item(Icons.doorOpen, "Open kitchen", "Functional layout with ample cabinet space")}
      ${item(Icons.key, "Walk-in closets", "Spacious bedroom storage")}
      ${item(Icons.washingMachine, "Washer / dryer hookups", "Convenient in-home laundry connections")}
    </div>
  </section>
`;

const neighborhood = `
  <section class="section neighborhood">
    <div class="title">
      <h2>Neighborhood Highlights</h2>
    </div>

    <div class="highlight-grid">
      ${item(Icons.mapPin, "Easy Access", "Quick access to major highways and commuting routes")}
      ${item(Icons.compass, "Local Amenities", "Close to shopping, dining, and everyday conveniences")}
      ${item(Icons.community, "Community", "Established neighborhood with local schools nearby")}
    </div>
  </section>
`;

const cta = `
  <section class="cta">
    <div>
      <h2>Ready to call this home?</h2>
      <p>
        Schedule a private viewing or request to apply today.
        Our team will assist you every step of the way.
      </p>
    </div>

    <div>
      <a id="schedule" class="button primary" href="/services/executive-briefing/">
        Schedule a Viewing ${Icons.arrowRight}
      </a>

      <a id="apply" class="button secondary" href="/services/executive-briefing/">
        Request to Apply
      </a>
    </div>
  </section>
`;

const footer = `
  <footer class="footer">
    <a class="brand" href="/">
      <img src="/assets/zyne-logo.png" alt="ZYNE">
      <b>ZYNE</b>
    </a>

    <nav class="footer-nav">
      ${nav}
    </nav>

    <div class="socials">
      <span>in</span>
      <span>𝕏</span>
      <span>✉</span>
    </div>

    <small>© 2025 ZYNE. All rights reserved.</small>
  </footer>
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
    lightboxImage.alt = photo.label + " at ${property.address}";
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

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox?.classList.contains("open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  });
</script>
`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#050505">

  <title>7101 Wendemere St Houston TX 77088 Rental | ZYNE Property Detail</title>
  <meta name="description" content="Three-bedroom Houston rental with covered porch, large lot, open layout, and clear property details.">
  <meta name="robots" content="index,follow,max-image-preview:large">

  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg">

  <meta property="og:title" content="7101 Wendemere St Houston TX 77088 Rental | ZYNE Property Detail">
  <meta property="og:description" content="Three-bedroom Houston rental with covered porch, large lot, open layout, and clear property details.">
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
      <div class="left">
        ${gallery}
        ${stats}
      </div>

      ${summary}
    </div>

    ${special}
    ${overview}
    ${homeFeatures}
    ${neighborhood}
    ${cta}
    ${footer}
  </main>

  ${lightbox}
  ${clientScript}
</body>
</html>`;

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "index.html"), html);

console.log(`Generated ${route}/index.html with ${photos.length} copied image(s)`);
