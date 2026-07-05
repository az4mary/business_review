export const DESIGN_WIDTH = 1672;
export const DESIGN_HEIGHT = 941;

export function computeCanvasScale(viewportWidth, viewportHeight) {
  return Math.min(1, viewportWidth / DESIGN_WIDTH, viewportHeight / DESIGN_HEIGHT);
}

export function applyCanvasScale() {
  const scale = computeCanvasScale(window.innerWidth, window.innerHeight);
  document.documentElement.style.setProperty("--canvas-scale", String(scale));
  return scale;
}

export function observeCanvasScale() {
  applyCanvasScale();
  const observer = new ResizeObserver(applyCanvasScale);
  observer.observe(document.documentElement);
  return observer;
}
