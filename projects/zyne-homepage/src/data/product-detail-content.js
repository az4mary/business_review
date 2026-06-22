const categoryProblems = {
  "grow-my-visibility": "The buyer needs stronger discovery, clearer public trust signals, and a more credible visible presence before prospects make a decision.",
  "build-my-brand": "The buyer needs a stronger identity, clearer market position, or more credible authority signals before the business can be judged correctly.",
  "improve-my-business": "The buyer needs sharper priorities, better strategic clarity, or stronger operational readiness before committing to execution.",
  "use-ai": "The buyer needs practical AI systems tied to business workflows, client interaction, or operational efficiency rather than generic tools.",
  "convert-more-clients": "The buyer needs a stronger path from attention to trust, inquiry, referral, opportunity, and purchase."
};

const typeIncluded = {
  audit: ["Focused diagnostic review", "Priority issue identification", "Expert recommendations", "Action roadmap"],
  briefing: ["Strategic constraint review", "Priority diagnosis", "Executive-level recommendations", "Decision guidance"],
  roadmap: ["Growth-priority mapping", "Sequenced next steps", "Strategic build recommendations", "Implementation path"],
  strategy: ["Market angle review", "Positioning recommendations", "Message direction", "Authority-building guidance"],
  "brand-kit": ["Visual identity direction", "Core brand assets", "Presentation consistency guidance", "Implementation notes"],
  "ai-kit": ["AI assistant structure", "Workflow use-case setup", "Prompt or system guidance", "Optimization notes"],
  "ai-strategy": ["AI opportunity review", "Workflow automation mapping", "Implementation recommendations", "Risk and readiness notes"],
  "ai-chatbot": ["Chatbot structure", "Conversation flow planning", "Client-facing automation framework", "Deployment guidance"],
  "website-service": ["Homepage review", "Priority conversion fixes", "Message and structure improvements", "Implementation notes"],
  "proof-system": ["Proof asset structure", "Experience capture framework", "Credibility organization", "Conversion-use guidance"],
  "conversion-kit": ["Referral asset structure", "Introduction messaging", "Client pathway recommendations", "Usage guidance"],
  "conversion-system": ["Opportunity-path design", "Origination structure", "Message and routing logic", "Execution recommendations"],
  "authority-strategy": ["Sector credibility review", "Authority positioning", "Trust-signal recommendations", "Market-specific guidance"],
  "website-strategy": ["Site architecture review", "Page hierarchy recommendations", "Conversion path planning", "Build-ready structure notes"],
  "competitive-intelligence": ["Competitive landscape review", "Threat and opportunity summary", "Positioning response", "Strategic action recommendations"]
};

const typeDeliverables = {
  audit: ["Audit summary", "Prioritized fix roadmap", "Recommended next actions"],
  briefing: ["Executive briefing document", "Constraint diagnosis", "Priority next-move recommendations"],
  roadmap: ["Growth roadmap", "Sequenced action plan", "Priority build recommendations"],
  strategy: ["Positioning brief", "Market-angle recommendations", "Messaging and authority notes"],
  "brand-kit": ["Brand kit assets", "Identity usage notes", "Visual consistency recommendations"],
  "ai-kit": ["Configured AI assistant framework", "Workflow prompt guidance", "Usage and optimization notes"],
  "ai-strategy": ["AI integration brief", "Workflow opportunity map", "Implementation path"],
  "ai-chatbot": ["Starter chatbot framework", "Conversation architecture", "Deployment guidance"],
  "website-service": ["Homepage fix recommendations", "Priority change list", "Conversion improvement notes"],
  "proof-system": ["Experience Bank structure", "Proof asset framework", "Usage recommendations"],
  "conversion-kit": ["Referral kit assets", "Introduction scripts", "Referral pathway notes"],
  "conversion-system": ["Origination system outline", "Opportunity routing plan", "Execution recommendations"],
  "authority-strategy": ["Sector Authority brief", "Credibility positioning notes", "Authority signal roadmap"],
  "website-strategy": ["Web architecture plan", "Page and content hierarchy", "Conversion path recommendations"],
  "competitive-intelligence": ["Competitor readiness brief", "Competitive response recommendations", "Market-position action list"]
};

const typeOutcomes = {
  audit: ["A clearer understanding of the highest-priority issues", "A practical fix sequence", "A better next-step decision"],
  briefing: ["Sharper executive clarity", "A defined central constraint", "A more confident next move"],
  roadmap: ["A sequenced growth plan", "Reduced priority confusion", "A clearer execution order"],
  strategy: ["Sharper market positioning", "Clearer message direction", "Stronger authority framing"],
  "brand-kit": ["A more credible brand presence", "More consistent visual presentation", "A stronger foundation for buyer trust"],
  "ai-kit": ["A practical AI assistant starting point", "Clearer workflow support", "Reusable AI guidance for daily work"],
  "ai-strategy": ["A practical AI implementation path", "Clearer workflow opportunities", "Reduced AI tool confusion"],
  "ai-chatbot": ["A structured client-facing automation foundation", "Clearer conversation logic", "A more scalable support or inquiry path"],
  "website-service": ["Clearer homepage priorities", "Reduced conversion friction", "A more credible first impression"],
  "proof-system": ["Better organized proof", "Stronger credibility assets", "More useful evidence for sales and conversion"],
  "conversion-kit": ["A cleaner referral pathway", "Better introduction assets", "More repeatable referral language"],
  "conversion-system": ["A repeatable path to opportunity", "Clearer origination logic", "Better conversion infrastructure"],
  "authority-strategy": ["Stronger sector-specific credibility", "Clearer authority signals", "A more defensible market position"],
  "website-strategy": ["A clearer website structure", "Better page logic", "A stronger lead-to-client pathway"],
  "competitive-intelligence": ["A clearer competitive picture", "Stronger response options", "A more deliberate market stance"]
};

const typeResponsibilities = {
  audit: ["Complete the intake form", "Provide the relevant profile, website, social, or business links", "Share current concerns or known issues"],
  "brand-kit": ["Provide current logo or brand assets if available", "Share examples of desired visual direction", "Complete the intake questions on audience and market context"],
  "ai-kit": ["Provide workflow context", "Share repeated tasks, client scenarios, or examples", "Review the delivered AI guidance before use"],
  "ai-chatbot": ["Provide service information and client-facing FAQs", "Share desired chatbot goals", "Review conversation logic before deployment"],
  default: ["Complete the required intake form after checkout", "Provide accurate business context, files, links, or examples needed for delivery", "Review delivered materials inside the stated revision window"]
};

const typeExclusions = {
  "brand-kit": ["Trademark research or legal clearance", "Ongoing design support outside purchased scope", "Printing, paid tools, or third-party production costs"],
  "ai-chatbot": ["Third-party software fees", "Ongoing chatbot management outside purchased scope", "Guaranteed automation, sales, or support outcomes"],
  "website-strategy": ["Full website development unless separately purchased", "Hosting, plugin, theme, or third-party platform fees", "Guaranteed traffic, leads, rankings, or revenue"],
  default: ["Ongoing consulting, management, or implementation outside the purchased scope", "Paid advertising spend, third-party software fees, or platform charges", "Guaranteed revenue, rankings, traffic, leads, or platform outcomes"]
};

const productOverrides = {
  "google-bp-mini-audit": {
    buyerProblem: "The Google Business Profile may be incomplete, unclear, or under-optimized, reducing trust and local discovery.",
    included: ["Profile completeness review", "Local trust-signal check", "Priority fix roadmap", "One revision round"]
  },
  "homepage-fix-pack": {
    buyerProblem: "The homepage is creating avoidable friction in the path from first impression to inquiry or purchase.",
    deliverables: ["Homepage improvement list", "Priority copy and structure recommendations", "Conversion-focused fix notes"]
  },
  "executive-briefing": {
    buyerProblem: "Leadership needs a concentrated read on the central business constraint before committing to a bigger build or strategy path.",
    included: ["Constraint diagnosis", "Strategic briefing", "Recommended next moves", "Decision-focused summary"]
  },
  "competitor-readiness": {
    buyerProblem: "The business needs to understand competitive pressure and choose a clearer response before defending or expanding its market position.",
    deliverables: ["Competitive readiness brief", "Competitor response recommendations", "Priority action list"]
  },
  "starter-ai-chatbot-kit": {
    buyerProblem: "The business needs structured client-facing automation but does not yet have a clear chatbot architecture or conversation path.",
    included: ["Starter chatbot architecture", "Conversation flow planning", "Client-facing FAQ structure", "Deployment guidance"]
  }
};

const unique = (items) => Array.from(new Set(items.filter(Boolean)));

export const getProductDetailContent = (product, category = null) => {
  const override = productOverrides[product.id] || {};
  const fallbackIncluded = typeIncluded[product.productType] || ["Defined service scope", "Expert review or build guidance", "Delivery notes", "Recommended next actions"];
  const fallbackDeliverables = typeDeliverables[product.productType] || [`${product.shortName || product.name} deliverable`, "Priority recommendations", "Next-step guidance"];
  const fallbackOutcomes = typeOutcomes[product.productType] || ["Clearer business priority", "A more informed buying or build decision", "Defined next steps"];
  const responsibilities = typeResponsibilities[product.productType] || typeResponsibilities.default;
  const exclusions = typeExclusions[product.productType] || typeExclusions.default;

  return {
    positioning: override.positioning || `${product.name} is a fixed-price ZYNE ${String(product.productType).replaceAll("-", " ")} for ${product.bestFor.toLowerCase()}.`,
    buyerProblem: override.buyerProblem || categoryProblems[product.category] || category?.problemStatement || product.description,
    outcomes: unique(override.outcomes || fallbackOutcomes),
    included: unique(override.included || fallbackIncluded),
    deliverables: unique(override.deliverables || fallbackDeliverables),
    buyerResponsibilities: unique(override.buyerResponsibilities || responsibilities),
    exclusions: unique(override.exclusions || exclusions),
    faqs: [
      ["What is included?", `${product.name} includes the defined scope, core deliverables, and guidance shown on this page.`],
      ["What does the buyer need to provide?", "The buyer must complete intake and provide the business context, links, files, access, or examples needed for the purchased scope."],
      ["How do revisions work?", product.revisions ? `${product.name} includes ${product.revisions}.` : "Revision handling is defined by the purchased scope and checkout terms."],
      ...(override.faqs || [])
    ]
  };
};
