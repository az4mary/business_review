export const diagnosticRoutes = [
  {
    id: "local-visibility",
    symptom: "People cannot find my business locally",
    pathTitle: "Grow My Visibility",
    pathUrl: "/grow-my-visibility/",
    resultTitle: "Start with local discovery and public trust signals.",
    why: "This route focuses on Google Business Profile clarity, website visibility, social credibility, and the public signals that help buyers find and trust the business faster.",
    starterProductId: "google-bp-mini-audit",
    diagnosticProductId: "visibility-audit",
    relatedProductIds: ["google-bp-mini-audit", "visibility-audit", "website-quick-win-audit"],
    nextAction: "Start with the mini audit if the profile is new or under-optimized; choose the visibility audit if the business needs a fuller visibility diagnosis."
  },
  {
    id: "brand-credibility",
    symptom: "My brand does not look credible enough",
    pathTitle: "Build My Brand",
    pathUrl: "/build-my-brand/",
    resultTitle: "Start with brand trust, visual consistency, and authority signals.",
    why: "This route is for businesses that need stronger identity, clearer positioning, or a more credible market presence before asking buyers to trust the offer.",
    starterProductId: "starter-brand-kit",
    diagnosticProductId: "market-positioning",
    relatedProductIds: ["starter-brand-kit", "market-positioning", "sector-authority"],
    nextAction: "Start with the brand kit for visual foundation; choose positioning if the problem is market clarity or authority."
  },
  {
    id: "website-conversion",
    symptom: "My website gets traffic but does not convert",
    pathTitle: "Convert More Clients",
    pathUrl: "/convert-more-clients/",
    resultTitle: "Start with the client-conversion path, not more traffic.",
    why: "This route focuses on homepage clarity, proof, website architecture, and the steps between attention, trust, inquiry, and purchase.",
    starterProductId: "website-quick-win-audit",
    diagnosticProductId: "web-architecture",
    relatedProductIds: ["website-quick-win-audit", "homepage-fix-pack", "web-architecture"],
    nextAction: "Start with a quick audit if the issue is unclear; move to homepage fixes or web architecture when the conversion path needs rebuilding."
  },
  {
    id: "proof-assets",
    symptom: "I need better proof, case studies, or sales assets",
    pathTitle: "Convert More Clients",
    pathUrl: "/convert-more-clients/",
    resultTitle: "Start with proof assets that make expertise easier to buy.",
    why: "This route is for firms that already have experience but need stronger proof, anonymized wins, referral assets, or a more repeatable authority-to-opportunity system.",
    starterProductId: "experience-bank",
    diagnosticProductId: "executive-briefing",
    relatedProductIds: ["experience-bank", "referral-kit", "origination-system"],
    nextAction: "Start with Experience Bank for reusable proof; consider Origination System when expertise needs to become a repeatable sales pathway."
  },
  {
    id: "ai-intake",
    symptom: "I need AI to handle intake, routing, or follow-up",
    pathTitle: "Use AI",
    pathUrl: "/use-ai/",
    resultTitle: "Start with practical AI workflow fit, not generic automation.",
    why: "This route is for businesses that need useful intake, routing, assistant, or follow-up systems tied to real workflows and approved business knowledge.",
    starterProductId: "realtor-gpt-starter-kit",
    diagnosticProductId: "ai-integration",
    relatedProductIds: ["realtor-gpt-starter-kit", "ai-integration", "starter-ai-chatbot-kit"],
    nextAction: "Start with a focused AI starter if the use case is narrow; choose AI Integration when the business needs a clearer automation plan first."
  },
  {
    id: "unclear-problem",
    symptom: "I need to understand what is actually broken",
    pathTitle: "Improve My Business",
    pathUrl: "/improve-my-business/",
    resultTitle: "Start with a paid diagnostic before choosing a build.",
    why: "This route reduces misdiagnosis risk. If the real constraint could be visibility, brand, operations, AI, or conversion, start with intelligence before buying delivery.",
    starterProductId: "executive-briefing",
    diagnosticProductId: "operational-audit",
    relatedProductIds: ["executive-briefing", "operational-audit", "growth-roadmap"],
    nextAction: "Start with Executive Briefing for strategic clarity; choose Operational Audit when readiness, internal friction, or scale constraints may be the real issue."
  },
  {
    id: "enterprise-system",
    symptom: "I want a full enterprise system or complex build",
    pathTitle: "Improve My Business",
    pathUrl: "/improve-my-business/",
    resultTitle: "Start with alignment or blueprinting before implementation.",
    why: "This route is for higher-complexity work where access, readiness, data, internal constraints, and implementation risk should be clarified before a major build.",
    starterProductId: "executive-briefing",
    diagnosticProductId: "operational-audit",
    relatedProductIds: ["executive-briefing", "operational-audit", "competitor-readiness"],
    nextAction: "Start with a paid strategic diagnostic or alignment-style briefing before moving into premium implementation."
  }
];
