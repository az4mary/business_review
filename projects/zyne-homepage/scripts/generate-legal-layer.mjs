import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  footerLinks as legalLinks,
  globalHeaderFooterStyles,
  renderGlobalFavicons,
  renderGlobalFooter,
  renderGlobalHeader,
  renderGlobalHeaderFooterScript
} from './global-header-footer.mjs';

const distDir = 'dist';
const siteUrl = 'https://zyne.store';
const privacyPolicySource = join('..', '..', 'assets', 'legal', 'zyne-stan-store-privacy-policy.md');
const termsPolicySource = join('..', '..', 'assets', 'legal', 'zyne-stan-store-terms-and-conditions.md');
const refundPolicySource = join('..', '..', 'assets', 'legal', 'zyne-stan-store-refund-and-scope-policy.md');
const cookiePolicySource = join('..', '..', 'assets', 'legal', 'zyne-stan-store-cookie-policy.md');

const policies = [
  {
    route: 'privacy',
    title: 'Privacy Policy',
    description: 'How ZYNE handles information submitted for productized services, intake, fulfillment, support, Stan Store checkout, and AI-related service work.',
    source: privacyPolicySource,
    requiredNotice: [
      'Payment information is processed by Stan Store or its payment processors. ZYNE does not host payment checkout on zyne.store.',
      'AI-related services may use provided business context, workflows, examples, service information, or client-facing materials to structure AI systems, prompts, or automation plans.',
      'Product details are provided by ZYNE. Secure checkout is completed through Stan Store.'
    ]
  },
  {
    route: 'terms',
    title: 'Terms of Service',
    description: 'Core service terms for fixed-price ZYNE productized services, Houston Texas venue, and external Stan Store checkout flow.',
    source: termsPolicySource,
    requiredNotice: [
      'ZYNE offers paid productized services. There are no free consultations implied by the website.',
      'ZYNE does not guarantee revenue, rankings, traffic, leads, conversion rates, platform approvals, AI output perfection, business outcomes, or third-party platform performance.',
      'These Terms are governed by the laws of the State of Texas, with venue in Harris County, Texas where permitted by law.'
    ]
  },
  {
    route: 'refund-policy',
    title: 'Refund and Scope Policy',
    description: 'How ZYNE frames service scope, buyer responsibilities, revisions, cancellations, and refund expectations for productized services.',
    source: refundPolicySource,
    requiredNotice: [
      'Refund and scope handling depends on the purchased service, the stated scope, the checkout terms, and the work already performed.',
      'Completed strategy work, audits, digital deliverables, started fulfillment work, completed reports, prepared materials, AI planning, chatbot structuring, brand files, website strategy, or delivered service components may be non-refundable once work has begun or delivery has occurred.',
      'Revision handling is limited to the revision terms stated on the purchased product page, checkout flow, or written service notes.'
    ]
  },
  {
    route: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'How ZYNE may use essential cookies, local browser storage, analytics readiness, advertising technologies, Stan Store checkout cookies, and third-party tracking tools.',
    source: cookiePolicySource,
    requiredNotice: [
      'Analytics, advertising, or tracking scripts should not be activated unless tracking IDs are provided.',
      'Future analytics providers may include GA4, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag, or custom dataLayer events.',
      'Stan Store checkout may use separate cookies, tracking, or payment technologies that are not controlled by zyne.store.'
    ]
  }
];

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&#39;');

const inlineMarkdown = (value = '') => escapeHtml(value)
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => `<a href="${escapeHtml(url)}">${label}</a>`);

const markdownToHtml = (markdown = '') => {
  const publicMarkdown = markdown
    .split('\n## Quick implementation notes')[0]
    .split('\n[1]:')[0]
    .trim();
  const lines = publicMarkdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === '---') {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      html.push(`<h2>${inlineMarkdown(line.replace(/^##\s+/, ''))}</h2>`);
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      html.push(`<h3>${inlineMarkdown(line.replace(/^###\s+/, ''))}</h3>`);
      continue;
    }

    if (line.startsWith('* ')) {
      flushParagraph();
      list.push(line.replace(/^\*\s+/, ''));
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return html.join('');
};

const styles = `*{box-sizing:border-box}html{background:#070706;color:#f1eadc}body{margin:0;background:#070706;color:#f1eadc;font-family:Inter,Segoe UI,Arial,sans-serif}a{color:inherit;text-decoration:none}a:focus-visible{outline:2px solid #c9a967;outline-offset:4px}${globalHeaderFooterStyles}.container{width:min(1180px,88vw);margin:0 auto}.hero{padding:clamp(4rem,9vw,8rem) 0}.section{padding:clamp(3.5rem,7vw,6rem) 0;border-top:1px solid rgba(201,169,103,.12)}.panel,.card{border:1px solid rgba(201,169,103,.26);background:linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.01));box-shadow:0 24px 80px rgba(0,0,0,.22);padding:clamp(1.35rem,4vw,3rem)}.policy-body{display:grid;gap:1.25rem}.policy-body h2{margin-top:2rem}.policy-body h3{margin:.75rem 0 .15rem;color:#f1eadc;font-size:1.08rem}.policy-body ul{margin:.25rem 0 .75rem;padding-left:1.2rem}.policy-body a,.card a{color:#c9a967;text-decoration:underline;text-underline-offset:.18em}h1{font-size:clamp(2.7rem,6vw,5.4rem);line-height:.95;margin:.65rem 0 1rem;font-weight:500;letter-spacing:-.055em}h2{font-size:clamp(1.8rem,3vw,2.8rem);line-height:1;margin:0 0 1rem;font-weight:500}.eyebrow{color:#c9a967;text-transform:uppercase;letter-spacing:.2em;font-size:.66rem;font-weight:800}p,li{color:#b4aea3;line-height:1.72}.lede{font-size:1.15rem;max-width:68ch}.fine-print{border-top:1px solid rgba(201,169,103,.18);margin-top:1rem;padding-top:1rem}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}@media(max-width:900px){.grid{grid-template-columns:1fr}}`;

const schema = (policy) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${policy.title} | ZYNE`,
  description: policy.description,
  url: `${siteUrl}/${policy.route}/`
});

const policyBody = async (policy) => {
  const requiredNotice = policy.requiredNotice?.length
    ? `<section class="section"><div class="container"><article class="card"><p class="eyebrow">Policy and checkout notice</p><h2>ZYNE, Stan Store, and service terms</h2><ul>${policy.requiredNotice.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul></article></div></section>`
    : '';

  if (policy.source) {
    const markdown = await readFile(policy.source, 'utf8');
    return `${requiredNotice}<section class="section"><div class="container"><article class="card policy-body">${markdownToHtml(markdown)}</article></div></section>`;
  }

  return `${requiredNotice}${policy.sections.map(([heading, points]) => `<section class="section"><div class="container"><article class="card"><p class="eyebrow">Policy detail</p><h2>${escapeHtml(heading)}</h2><ul>${points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul></article></div></section>`).join('')}`;
};

const legalPage = async (policy) => `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#070706"><title>${escapeHtml(policy.title)} | ZYNE</title><meta name="description" content="${escapeHtml(policy.description)}"><link rel="canonical" href="${siteUrl}/${policy.route}/">${renderGlobalFavicons()}<style>${styles}</style><script type="application/ld+json">${JSON.stringify(schema(policy))}</script></head><body>${renderGlobalHeader()}<main><section class="hero"><div class="container"><div class="panel"><p class="eyebrow">Legal and checkout clarity</p><h1>${escapeHtml(policy.title)}</h1><p class="lede">${escapeHtml(policy.description)}</p><p class="fine-print">This page provides operational policy information for ZYNE productized services. It is not legal advice. Secure checkout is completed through Stan Store.</p></div></div></section>${await policyBody(policy)}<section class="section"><div class="container grid"><article class="card"><p class="eyebrow">Relationship disclosure</p><h2>ZYNE and Stan Store responsibilities</h2><p>ZYNE controls product education, service scope, fulfillment expectations, and buyer-facing service information. Stan Store controls the external checkout and payment layer.</p></article><article class="card"><p class="eyebrow">Legal links</p><h2>Review related policies</h2>${legalLinks.map(([label, url]) => `<p><a href="${url}">${label} &#8599;</a></p>`).join('')}</article></div></section></main>${renderGlobalFooter()}${renderGlobalHeaderFooterScript()}</body></html>`;

const htmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  }));
  return files.flat();
};

const footerPattern = /<footer\b[^>]*>[\s\S]*?<\/footer>/;

for (const policy of policies) {
  const dir = join(distDir, policy.route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), await legalPage(policy));
}

for (const path of await htmlFiles(distDir)) {
  const html = await readFile(path, 'utf8');
  const next = footerPattern.test(html) ? html.replace(footerPattern, renderGlobalFooter()) : `${html}${renderGlobalFooter()}`;
  await writeFile(path, next);
}

console.log(`Legal layer generated: ${policies.length} policy pages and footer legal links injected.`);
