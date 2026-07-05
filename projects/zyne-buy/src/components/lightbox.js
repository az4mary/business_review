import { icon } from "./icons.js";

export class Lightbox {
  constructor(root, listing) {
    this.root = root;
    this.listing = listing;
    const byId = new Map(listing.photos.map((photo) => [photo.id, photo]));
    this.photos = listing.galleryOrder.map((id) => byId.get(id));
    this.index = 0;
    this.returnFocus = null;
    this.scrollY = 0;
    this.onKeydown = this.onKeydown.bind(this);
  }

  open(photoId, trigger) {
    this.index = Math.max(0, this.photos.findIndex((photo) => photo.id === photoId));
    this.returnFocus = trigger;
    this.scrollY = window.scrollY;
    document.body.classList.add("lightbox-open");
    document.body.style.top = `-${this.scrollY}px`;
    this.render();
    document.addEventListener("keydown", this.onKeydown);
    this.root.querySelector(".lightbox-close").focus();
  }

  close() {
    document.removeEventListener("keydown", this.onKeydown);
    this.root.replaceChildren();
    document.body.classList.remove("lightbox-open");
    document.body.style.top = "";
    window.scrollTo(0, this.scrollY);
    this.returnFocus?.focus();
  }

  move(delta) {
    this.index = (this.index + delta + this.photos.length) % this.photos.length;
    this.render();
    this.preloadAdjacent();
  }

  preloadAdjacent() {
    [-1, 1].forEach((offset) => {
      const image = new Image();
      image.src = this.photos[(this.index + offset + this.photos.length) % this.photos.length].fullSrc;
    });
  }

  onKeydown(event) {
    if (event.key === "Escape") this.close();
    if (event.key === "ArrowLeft") this.move(-1);
    if (event.key === "ArrowRight") this.move(1);
    if (event.key === "Tab") {
      const controls = [...this.root.querySelectorAll("button")];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }

  render() {
    const photo = this.photos[this.index];
    this.root.innerHTML = `<div class="lightbox" role="dialog" aria-modal="true" aria-label="Property gallery"><button class="lightbox-backdrop" aria-label="Close gallery"></button><div class="lightbox-shell"><div class="lightbox-toolbar"><span>${this.index + 1} / ${this.photos.length}</span><button class="lightbox-close" type="button" aria-label="Close gallery">×</button></div><div class="lightbox-stage"><button class="lightbox-prev" type="button" aria-label="Previous image">‹</button><figure><img src="${photo.fullSrc}" alt="${photo.alt}"/><figcaption>${photo.label}</figcaption></figure><button class="lightbox-next" type="button" aria-label="Next image">›</button></div><div class="lightbox-thumbnails">${this.photos.map((item, index) => `<button type="button" data-index="${index}" class="${index === this.index ? "active" : ""}" aria-label="View ${item.label}"><img src="${item.thumbnailSrc}" alt=""/></button>`).join("")}</div></div></div>`;
    this.root.querySelector(".lightbox-backdrop").addEventListener("click", () => this.close());
    this.root.querySelector(".lightbox-close").addEventListener("click", () => this.close());
    this.root.querySelector(".lightbox-prev").addEventListener("click", () => this.move(-1));
    this.root.querySelector(".lightbox-next").addEventListener("click", () => this.move(1));
    this.root.querySelectorAll("[data-index]").forEach((button) => button.addEventListener("click", () => { this.index = Number(button.dataset.index); this.render(); }));
  }
}
