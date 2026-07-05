export function renderGallery(listing) {
  const byId = new Map(listing.photos.map((photo) => [photo.id, photo]));
  const slots = ["hero", "upperRight", "middleRight", "lowerRight", "bottomLeft", "bottomCenter"];
  return `<section class="preview-gallery" aria-label="Property photo preview">${slots.map((slot) => {
    const assignment = listing.previewSlots[slot];
    const photo = byId.get(assignment.photoId);
    return `<button class="gallery-slot slot-${slot}" type="button" data-photo-id="${photo.id}" aria-label="Open gallery at ${photo.label}"><img src="${photo.src}" alt="${photo.alt}" style="object-position:${assignment.position}" draggable="false" />${slot === "hero" ? `<span class="status-ribbon">${listing.status}</span>` : ""}</button>`;
  }).join("")}</section>`;
}
