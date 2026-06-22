import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogProducts, categories } from '../src/data/products.js';
import { seoKeywordMap } from '../src/data/seo-keywords.js';

const siteUrl = 'https://zyne.store';
const errors = [];
const requiredRoutes = [
  '/',
  '/services/',
  '/intelligence/',
  '/delivery/',
  '/use-ai/realtor-gpt/',
  '/privacy/',
  '/terms/',
  '/refund-policy/',
  '/cookie-policy/',
  ...categories.map((category) => category.url),
  ...catalogProducts.map((product) => product.internalUrl)
];
const collectionRoutes = ['/', '/services/', '/intelligence/', '/delivery/', '/use-ai/realtor-gpt/', ...categories.map((category) => category.url)];
const forbiddenPhrases = ['Schedule a Free Call', 'Book a Free Consultation', 'Get a Free Strategy Session', 'Talk to Sales', 'Contact Us for Pricing', 'Request a Free Audit'];

const routePath = (route) => route === '/' ? join('dist', 'index.html') : join('dist', route, 'index.html');
const readRoute = async (route) => {
  try {
    return await readFile(routePath(route), 'utf8');
  } catch {
    errors.push(`Missing generated route for SEO validation: ${route}`);
    return '';
  }
};
const requiredText = (html, route, snippets) => {
  for (const snippet of snippets) if (!html.includes(snippet)) errors.push(`${route} missing SEO content: ${snippet}`);
};
const checkForbidden = (html, route) => {
  for (const phrase of forbiddenPhrases) if (html.includes(phrase)) errors.push(`${route} contains prohibited CTA language: ${phrase}`);
};
const checkAltText = (html, route) => {
  const images = html.match(/<img\b[^>]*>/g) || [];
  for (const image of images) {
    const alt = image.match(/\salt=["']([^"']*)["']/)?.[1];
    if (alt === undefined || !alt.trim()) errors.push(`${route} has an image without meaningful alt text: ${image.slice(0, 120)}`);
  }
};

const sitemap = await readFile(join('dist', 'sitemap.xml'), 'utf8').catch(() => {
  errors.push('Missing sitemap.xml');
  return '';
});
const robots = await readFile(join('dist', 'robots.txt'), 'utf8').catch(() => {
  errors.push('Missing robots.txt');
  return '';
});

requiredText(robots, 'robots.txt', ['User-agent: *', 'Allow: /', `Sitemap: ${siteUrl}/sitemap.xml`]);
if (sitemap.includes('stan.store')) errors.push('sitemap.xml must not include external Stan Store URLs');
for (const route of requiredRoutes) {
  requiredText(sitemap, 'sitemap.xml', [`<loc>${siteUrl}${route}</loc>`]);
}

for (const route of requiredRoutes) {
  const html = await readRoute(route);
  requiredText(html, route, [
    '<title>',
    'name="description"',
    'rel="canonical"',
    `${siteUrl}${route}`,
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:type"',
    'name="twitter:card"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="keywords"',
    'BreadcrumbList',
    'application/ld+json'
  ]);
  if (!seoKeywordMap[route]) errors.push(`${route} missing SEO keyword mapping`);
  checkAltText(html, route);
  checkForbidden(html, route);
}

const home = await readRoute('/');
requiredText(home, '/', ['Organization', 'WebSite', 'FAQPage']);

for (const route of collectionRoutes) {
  const html = await readRoute(route);
  requiredText(html, route, ['CollectionPage', 'ItemList']);
}

for (const product of catalogProducts) {
  const html = await readRoute(product.internalUrl);
  requiredText(html, product.internalUrl, ['Offer', String(product.priceValue), product.currency || 'USD', product.name]);
}

if (errors.length) {
  console.error('SEO layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO layer validation passed: ${requiredRoutes.length} routes, sitemap.xml, robots.txt, metadata, breadcrumbs, keyword map, schema, and image alt checks.`);
