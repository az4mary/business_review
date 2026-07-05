export function renderHeader() {
  const links = [
    ["Services", "/services/"],
    ["Visibility", "/grow-my-visibility/"],
    ["Brand", "/build-my-brand/"],
    ["Business", "/improve-my-business/"],
    ["AI", "/use-ai/"],
    ["Conversion", "/convert-more-clients/"],
    ["Intelligence", "/intelligence/"],
    ["Delivery", "/delivery/"]
  ];
  return `<header class="site-header"><a class="site-logo" href="/" aria-label="ZYNE home"><img src="/assets/brand/zyne-logo.webp" alt="ZYNE"></a><nav aria-label="Main navigation">${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</nav></header>`;
}
