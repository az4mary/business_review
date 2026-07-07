export const globalHeaderFooterStyles = ``;

export const headerLinks = [
  ["Services", "/services/"],
  ["Visibility", "/grow-my-visibility/"],
  ["Brand", "/build-my-brand/"],
  ["Business", "/improve-my-business/"],
  ["AI", "/use-ai/"],
  ["Conversion", "/convert-more-clients/"],
  ["Intelligence", "/intelligence/"],
  ["Delivery", "/delivery/"],
];

export const footerLinks = [
  ["Privacy Policy", "/privacy/"],
  ["Terms of Service", "/terms/"],
  ["Refund and Scope Policy", "/refund-policy/"],
  ["Cookie Policy", "/cookie-policy/"],
];

const renderLinks = (links) => links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

export const renderGlobalHeader = () => ``;

export const renderGlobalFooter = () => ``;
