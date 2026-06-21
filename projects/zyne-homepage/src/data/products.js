const productUrl = (slug) => `/services/${slug}/`;
const parsePriceValue = (price) => Number(String(price).replace(/[^0-9.]/g, ""));

export const categoryIds = {
  visibility: "grow-my-visibility",
  brand: "build-my-brand",
  business: "improve-my-business",
  ai: "use-ai",
  conversion: "convert-more-clients"
};

const product = ({
  id,
  slug,
  name,
  shortName = name,
  category,
  productType,
  price,
  priceValue = parsePriceValue(price),
  currency = "USD",
  description,
  shortDescription = description,
  bestFor,
  timeline,
  revisions = null,
  image = null,
  imageAlt = `${name} product package`,
  stanCheckoutUrl,
  checkoutStatus = stanCheckoutUrl ? "live" : "pending",
  featured = false,
  homepageVisible = false,
  categoryVisible = true,
  starterOffer = false,
  premiumOffer = false,
  intelligenceOffer = false,
  deliveryOffer = false,
  directCheckoutEnabled = false,
  relatedProductIds = [],
  intelligenceDescription = null,
  premiumDescription = null,
  seoTitle = null,
  seoDescription = null,
  schemaType = "Service"
}) => ({
  id,
  slug,
  name,
  shortName,
  category,
  productType,
  price,
  priceValue,
  currency,
  originalPrice: null,
  description,
  shortDescription,
  bestFor,
  timeline,
  revisions,
  image,
  imageAlt,
  thumbnail: image,
  internalUrl: productUrl(slug),
  stanCheckoutUrl,
  checkoutStatus,
  directCheckoutEnabled,
  featured,
  homepageVisible,
  categoryVisible,
  starterOffer,
  premiumOffer,
  intelligenceOffer,
  deliveryOffer,
  relatedProductIds,
  intelligenceDescription,
  premiumDescription,
  seoTitle: seoTitle || `${name} | ZYNE`,
  seoDescription: seoDescription || shortDescription || description,
  schemaType
});

export const catalogProducts = [
  product({ id: "google-bp-mini-audit", slug: "google-business-profile-mini-audit", name: "Google Business Profile Mini Audit", shortName: "Google BP Mini Audit", category: categoryIds.visibility, productType: "audit", price: "$49.99", description: "A focused profile check and expert fix roadmap for stronger local visibility.", bestFor: "New or under-optimized Google Business Profiles", timeline: "2 business days", revisions: "1 revision", image: "catalog/Google_BP_Mini_Audit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/google-business-profile-mini-audit", featured: true, homepageVisible: true, starterOffer: true }),
  product({ id: "website-quick-win-audit", slug: "website-quick-win-audit", name: "Website Quick-Win Audit", category: categoryIds.visibility, productType: "audit", price: "$49.99", description: "Find the clearest improvements to trust, messaging, and conversion.", bestFor: "Websites that feel stuck or unclear", timeline: "2 business days", image: "catalog/Website_Quick_Win_Audit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/website-quickwin-audit", featured: true, homepageVisible: true, starterOffer: true }),
  product({ id: "social-media-quick-audit", slug: "social-media-quick-audit", name: "Social Media Quick Audit", category: categoryIds.visibility, productType: "audit", price: "$49.99", description: "A concise review of presence, consistency, and authority signals.", bestFor: "Businesses refining social credibility", timeline: "2 business days", image: "catalog/Social_Media_Quick_Audit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/social-media-quick-audit", featured: true, homepageVisible: true, starterOffer: true }),
  product({ id: "homepage-fix-pack", slug: "homepage-fix-pack", name: "Homepage Fix Pack", category: categoryIds.conversion, productType: "website-service", price: "$149.99", description: "Priority homepage changes that sharpen clarity and conversion.", bestFor: "Service businesses with traffic but weak response", timeline: "3 business days", image: "catalog/Homepage_Fix_Pack_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/homepage-fix-pack", featured: true, homepageVisible: true, starterOffer: true, deliveryOffer: true }),
  product({ id: "starter-brand-kit", slug: "starter-brand-kit", name: "Starter Brand Kit", category: categoryIds.brand, productType: "brand-kit", price: "$400", description: "A cohesive visual foundation for a more credible market presence.", bestFor: "New and evolving brands", timeline: "7–10 business days", image: "catalog/Starter_Brand_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/starter-brand-kit-14zdq78a", featured: true, homepageVisible: true, starterOffer: true, deliveryOffer: true }),
  product({ id: "growth-brand-kit", slug: "growth-brand-kit", name: "Growth Brand Kit", category: categoryIds.brand, productType: "brand-kit", price: "$900", description: "A more complete brand identity system for growing businesses.", bestFor: "Brands ready for stronger identity consistency", timeline: "7–10 business days", image: "catalog/Growth_Brand_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/growth-brand-kit", deliveryOffer: true }),
  product({ id: "premium-brand-kit", slug: "premium-brand-kit", name: "Premium Brand Kit", category: categoryIds.brand, productType: "brand-kit", price: "$1,500", description: "A premium visual identity package for authority and market trust.", bestFor: "Brands needing a stronger executive-grade presence", timeline: "10–15 business days", image: "catalog/Premium_Brand_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/premium-brand-kit", deliveryOffer: true }),
  product({ id: "realtor-gpt-starter-kit", slug: "realtor-gpt-starter-kit", name: "Realtor GPT Starter Kit", shortName: "Realtor GPT Starter", category: categoryIds.ai, productType: "ai-kit", price: "$500", description: "A practical AI assistant foundation designed for real estate workflows.", bestFor: "Agents ready to work faster with AI", timeline: "3 business days", revisions: "1 optimization pass", image: "catalog/Realtor_GPT_Starter_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/realtor-gpt-starter-kit", featured: true, homepageVisible: true, starterOffer: true, deliveryOffer: true }),
  product({ id: "realtor-gpt-growth-kit", slug: "realtor-gpt-growth-kit", name: "Realtor GPT Growth Kit", shortName: "Realtor GPT Growth", category: categoryIds.ai, productType: "ai-kit", price: "$900", description: "An expanded real estate AI assistant system for repeatable client workflows.", bestFor: "Agents or teams building repeatable AI-supported workflows", timeline: "5 business days", image: "catalog/Realtor_GPT_Growth_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/realtor-gpt-growth-kit", deliveryOffer: true }),
  product({ id: "executive-briefing", slug: "executive-briefing", name: "Executive Briefing", category: categoryIds.business, productType: "briefing", price: "$750", description: "A concentrated strategic briefing to clarify constraints and next moves.", bestFor: "Leaders making a consequential decision", timeline: "3–5 business days", revisions: "1 revision round", image: "catalog/Executive_Briefing_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/executive-briefing", featured: true, homepageVisible: true, starterOffer: true, premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Clarify the central constraint and the highest-leverage next move." }),
  product({ id: "visibility-audit", slug: "visibility-audit", name: "Visibility Audit", category: categoryIds.visibility, productType: "audit", price: "$950", description: "A full diagnostic of discovery, trust signals, and public presence.", bestFor: "Businesses that need a visibility plan", timeline: "5–7 business days", revisions: "1 revision round", image: "catalog/Visibility_Audit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/visibility-audit", featured: true, homepageVisible: true, starterOffer: true, premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Diagnose discovery, credibility, and public-presence gaps." }),
  product({ id: "growth-roadmap", slug: "growth-roadmap", name: "Growth Roadmap", category: categoryIds.business, productType: "roadmap", price: "$1,500", description: "Turn competing priorities into a sequenced growth plan.", bestFor: "Businesses that need a clear next-build sequence", timeline: "5–7 business days", image: "catalog/Growth_Roadmap_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/growth-roadmap", intelligenceOffer: true, intelligenceDescription: "Turn competing priorities into a sequenced growth plan." }),
  product({ id: "market-positioning", slug: "market-positioning", name: "Market Positioning", category: categoryIds.brand, productType: "strategy", price: "$1,750", description: "Define a sharper market angle, message, and authority position.", bestFor: "Businesses that need a sharper market angle and stronger authority", timeline: "7–10 business days", image: "catalog/Market_Positioning_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/market-positioning", premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Define a sharper market angle, message, and authority position." }),
  product({ id: "ai-integration", slug: "ai-integration", name: "AI Integration", category: categoryIds.ai, productType: "ai-strategy", price: "$1,750", description: "Identify practical AI opportunities and an implementation path.", bestFor: "Teams that need a practical, commercially useful AI plan", timeline: "7–10 business days", image: "catalog/AI_Integration_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/ai-integration", premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Identify practical AI opportunities and an implementation path." }),
  product({ id: "starter-ai-chatbot-kit", slug: "starter-ai-chatbot-kit", name: "Starter AI Chatbot Kit", shortName: "AI Chatbot Kit", category: categoryIds.ai, productType: "ai-chatbot", price: "$4,200", description: "A starter chatbot system for structured client-facing automation.", bestFor: "Businesses ready to deploy conversational AI infrastructure", timeline: "10–15 business days", image: "catalog/Starter_AI_Chatbot_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/starter-ai-chatbot-kit", deliveryOffer: true }),
  product({ id: "experience-bank", slug: "experience-bank", name: "Experience Bank", category: categoryIds.conversion, productType: "proof-system", price: "$1,250", description: "Build a structured proof asset from client experience, credibility, and results.", bestFor: "Businesses that need stronger trust and proof assets", timeline: "5–7 business days", image: "catalog/Experience_Bank_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/experience-bank", deliveryOffer: true }),
  product({ id: "referral-kit", slug: "referral-kit", name: "Referral Kit", category: categoryIds.conversion, productType: "conversion-kit", price: "$1,250", description: "Create referral assets and scripts that make client introductions easier.", bestFor: "Businesses that want a cleaner referral pathway", timeline: "5–7 business days", image: "catalog/Referral_Kit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/referral-kit", deliveryOffer: true }),
  product({ id: "origination-system", slug: "origination-system", name: "Origination System", category: categoryIds.conversion, productType: "conversion-system", price: "$1,950", description: "A repeatable path from attention to opportunity.", bestFor: "Experts who need a repeatable path from attention to opportunity", timeline: "7–10 business days", image: "catalog/Origination_System_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/origination-system", premiumOffer: true, deliveryOffer: true }),
  product({ id: "sector-authority", slug: "sector-authority", name: "Sector Authority", category: categoryIds.brand, productType: "authority-strategy", price: "$1,950", description: "A focused authority package for sector credibility and positioning.", bestFor: "Businesses that need stronger sector-specific credibility", timeline: "7–10 business days", image: "catalog/Sector_Authority_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/sector-authority", intelligenceOffer: true }),
  product({ id: "web-architecture", slug: "web-architecture", name: "Web Architecture", category: categoryIds.conversion, productType: "website-strategy", price: "$2,500", description: "Plan the structure, page logic, and conversion architecture for a stronger website.", bestFor: "Businesses rebuilding their digital conversion infrastructure", timeline: "7–10 business days", image: "catalog/Web_Architecture_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/web-architecture", premiumOffer: true, deliveryOffer: true }),
  product({ id: "operational-audit", slug: "operational-audit", name: "Operational Audit", category: categoryIds.business, productType: "audit", price: "$2,500", description: "Examine readiness, friction, and operational improvement priorities.", bestFor: "Leadership teams addressing friction, readiness, and scale", timeline: "10–15 business days", image: "catalog/Operational_Audit_thumbnail.webp", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/operational-audit", premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Examine readiness, friction, and operational improvement priorities." }),
  product({ id: "competitor-readiness", slug: "competitor-readiness", name: "Competitor Readiness", category: categoryIds.business, productType: "competitive-intelligence", price: "$2,950", description: "Build a strategic response to the competitive landscape.", bestFor: "Businesses preparing to defend or expand their market position", timeline: "7–10 business days", image: "catalog/Competitor_Readiness_thumbnail.png", stanCheckoutUrl: "https://stan.store/ZYNE_store/p/competitor-readiness", premiumOffer: true, intelligenceOffer: true, intelligenceDescription: "Build a strategic response to the competitive landscape." })
];

export const productById = Object.fromEntries(catalogProducts.map((item) => [item.id, item]));
export const getProduct = (id) => productById[id];
export const productLabel = (id) => { const item = getProduct(id); return item ? `${item.shortName || item.name} — ${item.price}` : id; };

export const homepageProductIds = ["google-bp-mini-audit", "website-quick-win-audit", "social-media-quick-audit", "homepage-fix-pack", "starter-brand-kit", "realtor-gpt-starter-kit", "executive-briefing", "visibility-audit"];
export const products = homepageProductIds.map(getProduct);

export const categories = [
  { id: categoryIds.visibility, slug: categoryIds.visibility, number: "01", icon: "◎", title: "Grow My Visibility", shortTitle: "Visibility", description: "For businesses that need stronger local discovery, better profiles, clearer social presence, or more credible website visibility.", problemStatement: "Your business is not being discovered, trusted, or chosen quickly enough online.", url: "/grow-my-visibility/", ctaLabel: "View Visibility Products", productIds: ["google-bp-mini-audit", "website-quick-win-audit", "social-media-quick-audit", "visibility-audit"], recommendedStarterProductId: "google-bp-mini-audit", seoTitle: "Grow My Visibility | ZYNE", seoDescription: "Explore fixed-price ZYNE services for Google Business Profile optimization, local visibility, website visibility, and public trust signals." },
  { id: categoryIds.brand, slug: categoryIds.brand, number: "02", icon: "◇", title: "Build My Brand", shortTitle: "Brand", description: "For businesses that need stronger visual identity, positioning, market authority, or sector-specific credibility.", problemStatement: "Your business needs a stronger identity, clearer market position, or more credible authority signals.", url: "/build-my-brand/", ctaLabel: "View Brand Products", productIds: ["starter-brand-kit", "growth-brand-kit", "premium-brand-kit", "market-positioning", "sector-authority"], recommendedStarterProductId: "starter-brand-kit", seoTitle: "Build My Brand | ZYNE", seoDescription: "Explore fixed-price ZYNE brand identity, market positioning, and authority services." },
  { id: categoryIds.business, slug: categoryIds.business, number: "03", icon: "⌁", title: "Improve My Business", shortTitle: "Business", description: "For founders, operators, and leadership teams that need strategic clarity, competitor insight, operational readiness, or an execution roadmap.", problemStatement: "Your business needs sharper priorities, better strategic clarity, or stronger operational readiness.", url: "/improve-my-business/", ctaLabel: "View Intelligence Products", productIds: ["executive-briefing", "growth-roadmap", "operational-audit", "competitor-readiness"], recommendedStarterProductId: "executive-briefing", seoTitle: "Improve My Business | ZYNE", seoDescription: "Explore fixed-price ZYNE strategic briefings, audits, roadmaps, and competitor readiness services." },
  { id: categoryIds.ai, slug: categoryIds.ai, number: "04", icon: "✦", title: "Use AI", shortTitle: "AI", description: "For businesses ready to identify, plan, or deploy AI systems, chatbot infrastructure, workflow automation, or real estate AI assistants.", problemStatement: "Your business wants useful AI systems without unclear tools, scattered workflows, or generic automation.", url: "/use-ai/", ctaLabel: "View AI Products", productIds: ["realtor-gpt-starter-kit", "realtor-gpt-growth-kit", "ai-integration", "starter-ai-chatbot-kit"], recommendedStarterProductId: "realtor-gpt-starter-kit", seoTitle: "Use AI | ZYNE", seoDescription: "Explore fixed-price ZYNE AI integration, chatbot, and Realtor GPT services." },
  { id: categoryIds.conversion, slug: categoryIds.conversion, number: "05", icon: "↗", title: "Convert More Clients", shortTitle: "Conversion", description: "For businesses that need stronger proof, referral assets, website architecture, origination systems, or lead-to-client pathways.", problemStatement: "Your business needs a clearer path from attention to trust, inquiry, referral, and purchase.", url: "/convert-more-clients/", ctaLabel: "View Conversion Products", productIds: ["experience-bank", "referral-kit", "origination-system", "web-architecture"], recommendedStarterProductId: "homepage-fix-pack", seoTitle: "Convert More Clients | ZYNE", seoDescription: "Explore fixed-price ZYNE services for proof systems, referral assets, website architecture, and client conversion." }
];

export const growthPaths = categories.map((category) => ({ ...category, products: category.productIds.slice(0, 4).map(productLabel) }));
export const intelligenceProductIds = ["executive-briefing", "visibility-audit", "growth-roadmap", "market-positioning", "ai-integration", "competitor-readiness", "operational-audit"];
export const intelligenceProducts = intelligenceProductIds.map((id) => { const item = getProduct(id); return [item.name, item.price, item.intelligenceDescription || item.description, item.internalUrl]; });
export const premiumProductIds = ["market-positioning", "ai-integration", "origination-system", "web-architecture", "operational-audit", "competitor-readiness"];
export const premiumProducts = premiumProductIds.map((id) => { const item = getProduct(id); return [item.name, item.price, item.premiumDescription || item.bestFor || item.description, item.slug, item.thumbnail, item.imageAlt]; });

export const deliveryFamilies = [
  { id: "brand-identity-kits", name: "Brand Identity Kits", description: "Identity systems designed to make authority visible.", icon: "◇", url: "/build-my-brand/", productIds: ["starter-brand-kit", "growth-brand-kit", "premium-brand-kit"] },
  { id: "website-kits", name: "Website Kits", description: "Focused website improvements and conversion-ready builds.", icon: "▱", url: "/grow-my-visibility/", productIds: ["website-quick-win-audit", "homepage-fix-pack", "web-architecture"] },
  { id: "social-media-kits", name: "Social Media Kits", description: "A clearer, more credible social presence.", icon: "◎", url: "/grow-my-visibility/", productIds: ["social-media-quick-audit"] },
  { id: "google-business-profile-services", name: "Google Business Profile Services", description: "Local profile optimization and visibility services.", icon: "⌖", url: "/grow-my-visibility/", productIds: ["google-bp-mini-audit", "visibility-audit"] },
  { id: "realtor-gpt-kits", name: "Realtor GPT Kits", description: "Purpose-built AI assistants for real estate workflows.", icon: "✦", url: "/use-ai/realtor-gpt/", productIds: ["realtor-gpt-starter-kit", "realtor-gpt-growth-kit"] },
  { id: "ai-chatbot-kits", name: "AI Chatbot Kits", description: "Practical conversational systems for client interaction.", icon: "⌁", url: "/use-ai/", productIds: ["starter-ai-chatbot-kit", "ai-integration"] },
  { id: "referral-and-conversion-systems", name: "Referral and Conversion Systems", description: "Proof, referral, origination, and conversion systems.", icon: "↗", url: "/convert-more-clients/", productIds: ["experience-bank", "referral-kit", "origination-system", "web-architecture"] }
];

export const industrySegments = [
  { id: "professional-services", name: "Professional Services", description: "Authority-led growth for firms where expertise is the product.", url: "/#industries", recommendedProductIds: ["visibility-audit", "market-positioning", "origination-system"] },
  { id: "real-estate", name: "Real Estate", description: "AI assistants, visibility systems, and conversion assets for agents and teams.", url: "/use-ai/realtor-gpt/", ctaLabel: "View Realtor GPT Products", recommendedProductIds: ["realtor-gpt-starter-kit", "realtor-gpt-growth-kit", "website-quick-win-audit"] },
  { id: "hospitality", name: "Hospitality", description: "Stronger discovery, reputation, and guest conversion pathways.", url: "/#industries", recommendedProductIds: ["google-bp-mini-audit", "visibility-audit", "homepage-fix-pack"] },
  { id: "legal-advisory", name: "Legal & Advisory", description: "Credibility, positioning, and origination systems for trusted advisors.", url: "/#industries", recommendedProductIds: ["market-positioning", "competitor-readiness", "origination-system"] },
  { id: "healthcare-wellness", name: "Healthcare & Wellness", description: "Clearer visibility and trust-building client journeys.", url: "/#industries", recommendedProductIds: ["google-bp-mini-audit", "website-quick-win-audit", "starter-brand-kit"] },
  { id: "local-businesses", name: "Local Businesses", description: "Local discovery, profiles, websites, and conversion improvements.", url: "/#industries", recommendedProductIds: ["google-bp-mini-audit", "visibility-audit", "homepage-fix-pack"] },
  { id: "consultants-experts", name: "Consultants & Experts", description: "Positioning, proof, and scalable authority infrastructure.", url: "/#industries", recommendedProductIds: ["market-positioning", "experience-bank", "origination-system"] },
  { id: "multi-location-brands", name: "Multi-Location Brands", description: "Consistent visibility and conversion systems across locations.", url: "/#industries", recommendedProductIds: ["visibility-audit", "operational-audit", "web-architecture"] }
];

export const industries = industrySegments.map((industry) => [industry.name, industry.description]);
export const faqs = [
  ["Are ZYNE services free consultations?", "No. ZYNE services are paid productized offers. Each product includes its own scope, price, deliverables, timeline, and checkout link."],
  ["Where does checkout happen?", "Product details are available on the ZYNE website. Secure checkout is completed through Stan Store."],
  ["Can I compare products before buying?", "Yes. Each category page includes product options, pricing, timelines, and recommended starting points."],
  ["What if I do not know which product to choose?", "Start with the growth path that best matches your current constraint: visibility, brand, business improvement, AI, or client conversion."],
  ["Are higher-ticket services available?", "Yes. ZYNE offers strategic reports, audits, AI systems, website architecture, and premium implementation packages."],
  ["What happens after purchase?", "After checkout, the buyer follows the intake and fulfillment process for the selected product."]
];
export const legalLinks = [{ label: "Privacy", url: "/privacy/" }, { label: "Terms", url: "/terms/" }, { label: "Refund Policy", url: "/refund-policy/" }];
