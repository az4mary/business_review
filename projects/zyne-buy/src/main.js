import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/page.css";
import "./styles/lightbox.css";
import { listing } from "./data/listing.js";
import { validateListing } from "./data/validateListing.js";
import { renderHeader } from "./components/header.js";
import { renderGallery } from "./components/gallery.js";
import { renderContextBar, renderPropertyPanel } from "./components/propertyPanel.js";
import { renderPlaceholderPage } from "./components/placeholderPages.js";
import { Lightbox } from "./components/lightbox.js";
import { observeCanvasScale } from "./utils/scaling.js";

const errors = validateListing(listing);
if (errors.length) throw new Error(`Invalid listing:\n${errors.join("\n")}`);

document.querySelector("#app").innerHTML = `${renderHeader()}<div class="page-stack"><section class="viewport-page property-page" aria-label="Property overview"><div class="design-canvas"><div class="canvas-header-space" aria-hidden="true"></div><main class="page-one-main">${renderContextBar(listing)}<div class="main-grid">${renderGallery(listing)}${renderPropertyPanel(listing)}</div></main></div></section>${renderPlaceholderPage(2)}${renderPlaceholderPage(3, true)}</div>`;

const lightbox = new Lightbox(document.querySelector("#overlay-root"), listing);
document.querySelectorAll(".gallery-slot").forEach((button) => button.addEventListener("click", () => lightbox.open(button.dataset.photoId, button)));
observeCanvasScale();
