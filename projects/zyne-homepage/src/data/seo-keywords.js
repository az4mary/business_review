import { catalogProducts, categories } from './products.js';

const categoryKeywordMap = Object.fromEntries(categories.map((category) => [category.url, [
  category.title,
  category.shortTitle,
  category.description,
  category.problemStatement
].join(' ')]));

const productKeywordMap = Object.fromEntries(catalogProducts.map((product) => [product.internalUrl, [
  product.name,
  product.productType,
  product.category,
  product.bestFor,
  product.shortDescription || product.description
].join(' ')]));

export const seoKeywordMap = {
  '/': 'premium growth services productized business services visibility authority automation client conversion',
  '/services/': 'fixed price ZYNE paid services visibility branding AI automation business strategy conversion',
  '/intelligence/': 'business intelligence strategic audits executive briefing visibility audit growth roadmap competitor readiness',
  '/delivery/': 'done for you brand identity website AI chatbot referral conversion systems',
  '/use-ai/realtor-gpt/': 'Realtor GPT real estate AI assistant real estate workflow automation',
  '/privacy/': 'ZYNE privacy policy service intake data payment processing Stan Store AI service materials',
  '/terms/': 'ZYNE terms of service paid productized services Stan Store checkout no results guarantee',
  '/refund-policy/': 'ZYNE refund policy scope policy productized services revisions buyer responsibilities',
  '/cookie-policy/': 'ZYNE cookie policy analytics tracking Stan Store checkout cookies',
  ...categoryKeywordMap,
  ...productKeywordMap
};

export const getSeoKeywords = (route) => seoKeywordMap[route] || 'ZYNE paid productized services checkout through Stan Store';
