import {
  globalHeaderFooterStyles,
  renderGlobalFavicons,
  renderGlobalFooter,
  renderGlobalHeader,
  renderGlobalHeaderFooterScript
} from "../global-header-footer.mjs";

const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

export function renderBuyPage({ route, listing, styles, buyShell, mobileShell, clientScript, schema }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#020303">
  <link rel="stylesheet" href="/assets/fonts/fonts.css">
  ${renderGlobalFavicons()}
  <link rel="canonical" href="https://zyne.store/${route}/">
  <meta name="description" content="Seller-financed investment opportunity at 7101 Wendemere St, Houston, Texas.">
  <title>7101 Wendemere St | Seller Financing Investment Property</title>
  <style>${globalHeaderFooterStyles}${styles}</style>
  <script type="application/ld+json">${escapeJson(schema)}</script>
</head>
<body class="buy-route">
  ${renderGlobalHeader()}
  ${buyShell}
  ${mobileShell}
  ${renderGlobalFooter()}
  <div id="overlay-root"></div>
  <script>${clientScript}</script>
  ${renderGlobalHeaderFooterScript()}
</body>
</html>`;
}
