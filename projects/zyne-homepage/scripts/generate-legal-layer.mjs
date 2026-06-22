import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = 'dist';
const siteUrl = 'https://zyne.store';

const legalLinks = [
  ['Privacy Policy', '/privacy/'],
  ['Terms of Service', '/terms/'],
  ['Refund and Scope Policy', '/refund-policy/'],
  ['Cookie Policy', '/cookie-policy/']
];

const policies = [
  {
    route: 'privacy',
    title: 'Privacy Policy',
    description: 'How ZYNE handles information submitted for productized services, intake, fulfillment, support, and AI-related service work.',
    sections: [
      ['Information ZYNE may collect', ['ZYNE may collect buyer name, email, business details, website links, profile links, brand assets, service context, intake responses, and support messages when needed to evaluate, fulfill, or support a purchased service.', 'Client materials should be limited to what is necessary for the purchased service scope.']],
      ['Payment processing', ['Payment information is processed by Stan Store or its payment processors. ZYNE does not host payment checkout on zyne.store.', 'Secure checkout is completed through Stan Store after product details are reviewed on ZYNE.']],
      ['AI and service materials', ['AI-related services may use provided business context, workflows, examples, service information, or client-facing materials to structure AI systems, prompts, or automation plans.', 'Buyers should not provide sensitive regulated information unless explicitly required and approved for the purchased scope.', 'ZYNE does not promise that AI systems will produce perfect or error-free outputs.']]
    ]
  },
  {
    route: 'terms',
    title: 'Terms of Service',
    description: 'Core service terms for fixed-price ZYNE productized services and external Stan Store checkout flow.',
    sections: [
      ['Paid productized services', ['ZYNE offers paid productized services. There are no free consultations implied by the website.', 'Each purchase is governed by its product scope, deliverables, timeline, exclusions, and buyer responsibilities.']],
      ['ZYNE and Stan Store roles', ['ZYNE provides service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.', 'Buyers leave zyne.store when they continue to Stan Store checkout.']],
      ['No-results guarantee', ['ZYNE does not guarantee revenue, rankings, traffic, leads, conversion rates, platform approvals, AI output perfection, or third-party platform performance.', 'Third-party software, ad spend, or platform fees are not included unless explicitly stated in the purchased product scope.']]
    ]
  },
  {
    route: 'refund-policy',
    title: 'Refund and Scope Policy',
    description: 'How ZYNE frames service scope, buyer responsibilities, revisions, and refund expectations for productized services.',
    sections: [
      ['Defined service scope', ['Fixed-price services begin from a defined scope and require timely buyer intake.', 'Scope changes, additional implementation, or work not listed in the purchased product may require a separate product purchase.']],
      ['Refund handling', ['Refund and scope handling depends on the purchased service, the stated scope, and the work already performed.', 'Completed strategy work, audits, digital deliverables, or started fulfillment work may be non-refundable once delivery has begun.']],
      ['Revisions and outcomes', ['Revision handling is limited to the revision terms stated on the product detail page or checkout flow.', 'ZYNE does not guarantee financial, ranking, traffic, lead, platform, or conversion outcomes.']]
    ]
  },
  {
    route: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'How ZYNE may use essential cookies, local browser storage, analytics readiness, and third-party checkout technologies.',
    sections: [
      ['Site functionality', ['ZYNE may use essential cookies or local browser storage for basic site functionality, performance, security, or user experience.', 'Users may control cookies through browser settings.']],
      ['Analytics and tracking readiness', ['Analytics, advertising, or tracking scripts should not be activated unless tracking IDs are provided.', 'Future analytics providers may include GA4, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag, or custom dataLayer events.']],
      ['Stan Store checkout', ['Stan Store checkout may use separate cookies, tracking, or payment technologies that are not controlled by zyne.store.', 'Third-party checkout on Stan Store may be governed by Stan Store policies and payment processor technologies.']]
    ]
  }
];

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&#39;');

const legalFooter = `<footer class='footer'><p>Product education and service details are provided on ZYNE. Secure checkout is completed through Stan Store.</p><p>ZYNE controls service education, product scope, fulfillment expectations, and buyer-facing service information. Stan Store provides the external checkout and payment layer.</p><nav class='footer-links' aria-label='Legal links'>${legalLinks.map(([label, url]) => `<a href='${url}'>${label}</a>`).join('')}</nav></footer>`;

const styles = `*{box-sizing:border-box}html{background:#070706;color:#f1eadc}body{margin:0;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}a:focus-visible{outline:2px solid #c9a967;outline-offset:4px}header{min-height:82px;padding:0 6vw;display:flex;gap:1.5rem;align-items:center;border-bottom:1px solid rgba(201,169,103,.22);background:#070706ee}header img{width:110px;height:auto}nav{display:flex;gap:1rem;flex-wrap:wrap;margin-left:auto}nav a{color:#b4aea3;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.container{width:min(1180px,88vw);margin:0 auto}.hero{padding:clamp(4rem,9vw,8rem) 0}.section{padding:clamp(3.5rem,7vw,6rem) 0;border-top:1px solid rgba(201,169,103,.12)}.panel,.card{border:1px solid rgba(201,169,103,.26);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));box-shadow:0 24px 80px rgba(0,0,0,.22);padding:clamp(1.35rem,4vw,3rem)}h1{font-size:clamp(2.7rem,6vw,5.4rem);line-height:.95;margin:.65rem 0 1rem;font-weight:500;letter-spacing:-.055em}h2{font-size:clamp(1.8rem,3vw,2.8rem);line-height:1;margin:0 0 1rem;font-weight:500}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.66rem;font-weight:800}p,li{color:#b4aea3;line-height:1.72}.lede{font-size:1.15rem;max-width:68ch}.fine-print{border-top:1px solid rgba(201,169,103,.18);margin-top:1rem;padding-top:1rem}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.footer{padding:2rem 6vw;color:#8f887c;border-top:1px solid rgba(201,169,103,.18)}.footer-links{display:flex;gap:1rem;flex-wrap:wrap;margin-top:1rem}.footer-links a{color:#c9a967}@media(max-width:900px){.grid{grid-template-columns:1fr}nav{display:none}}`;

const schema = (policy) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${policy.title} | ZYNE`,
  description: policy.description,
  url: `${siteUrl}/${policy.route}/`
});

const legalPage = (policy) => `<!doctype html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='theme-color' content='#070706'><title>${escapeHtml(policy.title)} | ZYNE</title><meta name='description' content='${escapeHtml(policy.description)}'><link rel='canonical' href='${siteUrl}/${policy.route}/'><style>${styles}</style><script type='application/ld+json'>${JSON.stringify(schema(policy))}</script></head><body><header><a href='/' aria-label='ZYNE home'><img src='/assets/zyne-logo.png' alt='ZYNE'></a><nav aria-label='Main navigation'><a href='/services/'>Services</a><a href='/grow-my-visibility/'>Visibility</a><a href='/build-my-brand/'>Brand</a><a href='/improve-my-business/'>Business</a><a href='/use-ai/'>AI</a><a href='/convert-more-clients/'>Conversion</a></nav></header><main><section class='hero'><div class='container'><div class='panel'><p class='eyebrow'>Legal and checkout clarity</p><h1>${escapeHtml(policy.title)}</h1><p class='lede'>${escapeHtml(policy.description)}</p><p class='fine-print'>This page provides operational policy information for ZYNE productized services. It is not legal advice. Secure checkout is completed through Stan Store.</p></div></div></section>${policy.sections.map(([heading, points]) => `<section class='section'><div class='container'><article class='card'><p class='eyebrow'>Policy detail</p><h2>${escapeHtml(heading)}</h2><ul>${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul></article></div></section>`).join('')}<section class='section'><div class='container grid'><article class='card'><p class='eyebrow'>Relationship disclosure</p><h2>ZYNE and Stan Store responsibilities</h2><p>ZYNE controls product education, service scope, fulfillment expectations, and buyer-facing service information. Stan Store controls the external checkout and payment layer.</p></article><article class='card'><p class='eyebrow'>Legal links</p><h2>Review related policies</h2>${legalLinks.map(([label, url]) => `<p><a href='${url}'>${label} &#8599;</a></p>`).join('')}</article></div></section></main>${legalFooter}</body></html>`;

const htmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  }));
  return files.flat();
};

for (const policy of policies) {
  const dir = join(distDir, policy.route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), legalPage(policy));
}

for (const path of await htmlFiles(distDir)) {
  const html = await readFile(path, 'utf8');
  const next = html.replace(/<footer class=['"]footer['"]>[\s\S]*?<\/footer>/, legalFooter);
  await writeFile(path, next);
}

console.log(`Legal layer generated: ${policies.length} policy pages and footer legal links injected.`);
