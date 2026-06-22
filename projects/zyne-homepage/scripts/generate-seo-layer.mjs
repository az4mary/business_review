import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { getSeoKeywords, seoKeywordMap } from '../src/data/seo-keywords.js';

const distDir = 'dist';
const siteUrl = 'https://zyne.store';
const defaultImage = `${siteUrl}/assets/zyne-logo-optimized.webp`;

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&#39;');

const htmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name === 'index.html' ? [path] : [];
  }));
  return files.flat();
};

const routeFromFile = (file) => {
  const rel = relative(distDir, file).replaceAll('\\', '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
};

const titleOf = (html) => html.match(/<title>([^<]+)<\/title>/)?.[1]?.trim() || 'ZYNE';
const descriptionOf = (html) => html.match(/<meta name=["']description["'] content=["']([^"']+)["']/)?.[1]?.trim() || 'ZYNE paid productized services.';
const canonicalOf = (html, route) => html.match(/<link rel=["']canonical["'] href=["']([^"']+)["']/)?.[1] || `${siteUrl}${route}`;

const breadcrumbSchema = (route, title) => {
  const parts = route.split('/').filter(Boolean);
  const crumbs = [{ name: 'Home', item: `${siteUrl}/` }];
  let current = '';
  for (const part of parts) {
    current += `/${part}`;
    const name = part.split('-').map((token) => token.charAt(0).toUpperCase() + token.slice(1)).join(' ');
    crumbs.push({ name, item: `${siteUrl}${current}/` });
  }
  if (crumbs.length === 1) crumbs[0].name = title.replace(' | ZYNE', '') || 'Home';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item
    }))
  };
};

const seoTags = ({ route, title, description, canonical }) => `
<meta name="keywords" content="${escapeHtml(getSeoKeywords(route))}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:site_name" content="ZYNE">
<meta property="og:image" content="${defaultImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${defaultImage}">
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema(route, title))}</script>`;

const importantRoutes = Object.keys(seoKeywordMap).sort();
const files = await htmlFiles(distDir);
const routes = [];

for (const file of files) {
  const route = routeFromFile(file);
  routes.push(route);
  let html = await readFile(file, 'utf8');
  const title = titleOf(html);
  const description = descriptionOf(html);
  const canonical = canonicalOf(html, route);

  if (!html.includes('property="og:title"')) {
    html = html.replace('</head>', `${seoTags({ route, title, description, canonical })}\n</head>`);
  }
  await writeFile(file, html);
}

const sitemapRoutes = Array.from(new Set(routes.filter((route) => route !== '/404/'))).sort((a, b) => a.localeCompare(b));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap);
await writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

const missingImportantRoutes = importantRoutes.filter((route) => !sitemapRoutes.includes(route));
if (missingImportantRoutes.length) {
  console.warn(`SEO keyword routes not currently generated: ${missingImportantRoutes.join(', ')}`);
}

console.log(`SEO layer generated: ${sitemapRoutes.length} sitemap URLs, robots.txt, social metadata, breadcrumbs, and keyword metadata.`);
