import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { catalogProducts } from '../src/data/products.js';

const errors = [];
const legalRoutes = [
  ['privacy', ['Payment information is processed by Stan Store or its payment processors', 'ZYNE does not host payment checkout on zyne.store', 'AI-related services may use provided business context']],
  ['terms', ['ZYNE offers paid productized services', 'There are no free consultations implied by the website', 'ZYNE does not guarantee revenue, rankings, traffic, leads']],
  ['refund-policy', ['Refund and scope handling depends on the purchased service', 'Completed strategy work, audits, digital deliverables', 'Revision handling is limited']],
  ['cookie-policy', ['Analytics, advertising, or tracking scripts should not be activated unless tracking IDs are provided', 'GA4, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag', 'Stan Store checkout may use separate cookies']]
];
const legalLinks = ['/privacy/', '/terms/', '/refund-policy/', '/cookie-policy/'];
const forbiddenPhrases = ['Schedule a Free Call', 'Book a Free Consultation', 'Get a Free Strategy Session', 'Talk to Sales', 'Contact Us for Pricing', 'Request a Free Audit'];

const readRoute = async (route) => {
  try {
    return await readFile(join('dist', route, 'index.html'), 'utf8');
  } catch {
    errors.push(`Missing generated legal route: /${route}/`);
    return '';
  }
};

const requireText = (html, route, snippets) => {
  for (const snippet of snippets) {
    if (!html.includes(snippet)) errors.push(`/${route}/ missing PRD 5 content: ${snippet}`);
  }
};

const requireOneH1 = (html, route) => {
  const matches = html.match(/<h1[\s>]/g) || [];
  if (matches.length !== 1) errors.push(`/${route}/ expected exactly one H1, found ${matches.length}`);
};

const checkFooter = (html, route) => {
  requireText(html, route, ['Product education and service details are provided on ZYNE', 'Secure checkout is completed through Stan Store', 'Stan Store provides the external checkout and payment layer']);
  for (const link of legalLinks) {
    if (!html.includes(`href='${link}'`) && !html.includes(`href="${link}"`)) errors.push(`/${route}/ footer missing legal link: ${link}`);
  }
};

const checkForbidden = (html, route) => {
  for (const phrase of forbiddenPhrases) {
    if (html.includes(phrase)) errors.push(`/${route}/ contains prohibited CTA language: ${phrase}`);
  }
};

for (const [route, required] of legalRoutes) {
  const html = await readRoute(route);
  requireOneH1(html, route);
  requireText(html, route, ['Legal and checkout clarity', 'Secure checkout is completed through Stan Store', 'ZYNE and Stan Store responsibilities', 'It is not legal advice', ...required]);
  checkFooter(html, route);
  checkForbidden(html, route);
}

for (const route of ['', 'services', 'grow-my-visibility', 'build-my-brand', 'improve-my-business', 'use-ai', 'convert-more-clients', 'intelligence', 'delivery']) {
  const path = route || '.';
  const html = await readFile(join('dist', path, 'index.html'), 'utf8');
  checkFooter(html, route || 'home');
  checkForbidden(html, route || 'home');
}

for (const product of catalogProducts) {
  const route = join('services', product.slug);
  const html = await readFile(join('dist', route, 'index.html'), 'utf8');
  requireText(html, route, ['/refund-policy/', 'Refund and scope handling depends on the purchased service', 'Payment is processed externally through Stan Store', 'Are results guaranteed?']);
  checkFooter(html, route);
  checkForbidden(html, route);
}

if (errors.length) {
  console.error('Legal layer validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Legal layer validation passed: ${legalRoutes.length} policy pages, footer links, product policy links, and checkout disclosures.`);
