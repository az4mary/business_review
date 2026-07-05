export const REQUIRED_SLOTS = ["hero", "upperRight", "middleRight", "lowerRight", "bottomLeft", "bottomCenter"];

export function validateListing(listing) {
  const errors = [];
  const photos = new Map((listing.photos || []).map((photo) => [photo.id, photo]));
  if (!listing.id) errors.push("Listing id is required.");
  if (!listing.route?.endsWith("/buy/")) errors.push("Listing route must end with /buy/.");
  if (!listing.agent?.photo?.src) errors.push("Agent photo is required.");
  for (const slot of REQUIRED_SLOTS) {
    const assignment = listing.previewSlots?.[slot];
    if (!assignment) errors.push(`Preview slot '${slot}' is required.`);
    else if (!photos.has(assignment.photoId)) errors.push(`Preview slot '${slot}' references unknown photo '${assignment.photoId}'.`);
  }
  for (const id of listing.galleryOrder || []) {
    if (!photos.has(id)) errors.push(`Gallery order references unknown photo '${id}'.`);
  }
  if (!listing.galleryOrder?.length) errors.push("Gallery order cannot be empty.");
  return errors;
}
