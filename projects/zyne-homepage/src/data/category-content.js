import { categoryIds } from "./products.js";

const sharedFaq = (starterLabel) => [
  ["Are these free consultations?", "No. ZYNE category pages route to paid productized services. Each product has a defined price, scope, timeline, and internal detail page before checkout."],
  ["Where does checkout happen?", "Product education and comparison happen on ZYNE. Secure checkout is completed through Stan Store after the buyer reviews the internal product detail page."],
  ["Can I compare services before buying?", "Yes. Use the product comparison grid, product ladder, best-for labels, pricing, and timelines before choosing a product page."],
  ["What happens after purchase?", "After checkout, the buyer completes the intake and fulfillment process for the selected product."],
  ["Which product should I start with?", `Start with ${starterLabel} when you need the fastest focused diagnostic or foundational service before moving into deeper strategy or implementation.`]
];

export const categoryPageContent = {
  [categoryIds.visibility]: {
    positioning: "Visibility work starts with discoverability, trust signals, profile completeness, website clarity, and public credibility. This path helps businesses identify what prevents them from being found, trusted, or chosen online.",
    diagnosticContext: [
      "If prospects cannot quickly find credible proof of your business, every later conversion step becomes harder.",
      "Use this path when Google Business Profile quality, website trust, social consistency, or public-facing credibility needs a focused diagnostic before deeper execution."
    ],
    ladderLabels: ["Start", "Check website", "Check social proof", "Deep visibility audit"],
    decisionGuide: [
      "Start with Google BP Mini Audit if local profile completeness or trust is the clearest constraint.",
      "Choose Website Quick-Win Audit if the site creates doubt or fails to clarify value quickly.",
      "Choose Social Media Quick Audit if public presence feels inconsistent or underdeveloped.",
      "Choose Visibility Audit when you need a fuller diagnosis across discovery, trust, and public presence."
    ],
    relatedCategoryIds: [categoryIds.brand, categoryIds.conversion, categoryIds.business],
    faqs: [
      ["When should I choose the Google BP Mini Audit?", "Choose it when local discovery, profile trust, completeness, or Google Business Profile clarity is the most immediate visibility issue."],
      ["When is the full Visibility Audit better?", "Choose Visibility Audit when the problem spans several channels and you need a broader public-presence diagnosis."],
      ["Does visibility work include website trust?", "Yes. Visibility includes whether people can find the business and whether the visible assets create enough trust to continue."]
    ]
  },
  [categoryIds.brand]: {
    positioning: "Brand work makes authority visible. This path helps businesses improve identity, message clarity, market position, and professional credibility.",
    diagnosticContext: [
      "A weak or inconsistent brand can make a capable business look less credible than it is.",
      "Use this path when visual identity, authority, market angle, or category positioning needs to support stronger buyer trust."
    ],
    ladderLabels: ["Start identity", "Expand system", "Premium identity", "Position market", "Build authority"],
    decisionGuide: [
      "Start with Starter Brand Kit if you need a clean visual foundation quickly.",
      "Move to Growth or Premium Brand Kit when identity consistency and presentation depth matter more.",
      "Choose Market Positioning when the issue is message, market angle, or strategic differentiation.",
      "Choose Sector Authority when credibility must be specific to a professional niche or market segment."
    ],
    relatedCategoryIds: [categoryIds.visibility, categoryIds.conversion, categoryIds.business],
    faqs: [
      ["Which brand kit level should I choose?", "Choose Starter for foundation, Growth for broader consistency, and Premium when authority-grade presentation is required."],
      ["Is Market Positioning the same as a brand kit?", "No. Brand kits focus on identity assets, while Market Positioning focuses on strategic angle, message, and differentiation."],
      ["When should I choose Sector Authority?", "Choose Sector Authority when trust depends on proving credibility inside a specific professional category or market." ]
    ]
  },
  [categoryIds.business]: {
    positioning: "Business improvement starts with intelligence before execution. This path helps leaders clarify constraints, sequence priorities, and decide what to build next.",
    diagnosticContext: [
      "Execution without diagnosis can create more activity without clearer commercial leverage.",
      "Use this path when the business needs sharper priorities, competitor insight, operational readiness, or a sequenced roadmap before implementation."
    ],
    ladderLabels: ["Executive clarity", "Growth sequence", "Operational readiness", "Competitive response"],
    decisionGuide: [
      "Start with Executive Briefing if leadership needs a concentrated strategic diagnosis.",
      "Choose Growth Roadmap when you need a sequenced plan across priorities and next builds.",
      "Choose Operational Audit when internal friction, readiness, or delivery constraints are the issue.",
      "Choose Competitor Readiness when market pressure or competitive response is the primary concern."
    ],
    relatedCategoryIds: [categoryIds.brand, categoryIds.ai, categoryIds.conversion],
    faqs: [
      ["Executive Briefing or Growth Roadmap?", "Choose Executive Briefing for concentrated diagnosis and Growth Roadmap when you need a sequenced execution path."],
      ["Operational Audit or Competitor Readiness?", "Choose Operational Audit for internal friction and readiness. Choose Competitor Readiness for market defense, expansion, or competitive positioning."],
      ["Why diagnose before building?", "Diagnosis reduces wasted execution by clarifying the central constraint before choosing assets, systems, or campaigns."]
    ]
  },
  [categoryIds.ai]: {
    positioning: "AI should function as a useful business system, not a novelty tool. This path separates practical AI planning, real estate assistant kits, and chatbot infrastructure.",
    diagnosticContext: [
      "AI creates leverage only when it is tied to real workflows, client interaction, and repeatable business operations.",
      "Use this path when you need to identify AI opportunities, deploy real estate assistant workflows, or build client-facing chatbot infrastructure."
    ],
    ladderLabels: ["Real estate starter", "Real estate growth", "AI plan", "Chatbot infrastructure"],
    decisionGuide: [
      "Start with Realtor GPT Starter Kit if you are a real estate professional who needs practical AI support quickly.",
      "Choose Realtor GPT Growth Kit when repeatable client workflows need more structure.",
      "Choose AI Integration when the business needs an AI opportunity map and implementation path.",
      "Choose Starter AI Chatbot Kit when client-facing conversational infrastructure is the priority."
    ],
    relatedCategoryIds: [categoryIds.business, categoryIds.conversion, categoryIds.visibility],
    subpageCta: { label: "View Realtor GPT Products", url: "/use-ai/realtor-gpt/" },
    faqs: [
      ["Realtor GPT or AI Integration?", "Choose Realtor GPT for real estate assistant workflows. Choose AI Integration when the broader business needs an AI opportunity and implementation plan."],
      ["When should I choose a chatbot kit?", "Choose a chatbot kit when the business is ready to deploy structured client-facing conversational infrastructure."],
      ["What materials are needed for AI work?", "Buyers should be ready to provide business context, service information, workflow details, and examples of repeated client or operational tasks."]
    ]
  },
  [categoryIds.conversion]: {
    positioning: "Conversion is more than lead capture. This path focuses on proof, referral infrastructure, website logic, origination systems, and the journey from attention to purchase.",
    diagnosticContext: [
      "A business can have attention and still lose buyers when trust, proof, referral clarity, or website architecture is weak.",
      "Use this path when the problem is not visibility alone, but the conversion path from interest to inquiry, referral, opportunity, and purchase."
    ],
    ladderLabels: ["Fix homepage", "Build proof", "Enable referrals", "Originate demand", "Architect website"],
    decisionGuide: [
      "Start with Homepage Fix Pack if the homepage creates friction and needs focused improvement.",
      "Choose Experience Bank when trust and proof assets need to be structured.",
      "Choose Referral Kit when introductions need clearer assets and scripts.",
      "Choose Origination System when the business needs a repeatable path from attention to opportunity.",
      "Choose Web Architecture when the site structure itself needs to be planned or rebuilt for conversion."
    ],
    relatedCategoryIds: [categoryIds.visibility, categoryIds.brand, categoryIds.business],
    faqs: [
      ["Homepage Fix Pack or Web Architecture?", "Choose Homepage Fix Pack for focused improvements to an existing page. Choose Web Architecture when the whole website structure needs strategic planning."],
      ["Referral Kit or Origination System?", "Choose Referral Kit for cleaner client introductions. Choose Origination System for a broader repeatable opportunity path."],
      ["How do proof assets support conversion?", "Proof assets reduce buyer doubt by making credibility, client experience, and evidence easier to understand before a purchase decision."]
    ]
  }
};

export const collectionPageContent = {
  intelligence: {
    sequenceTitle: "Recommended Intelligence Sequence",
    sequence: ["Executive diagnosis", "Visibility or market audit", "Roadmap or integration plan", "Operational or competitive readiness"],
    faq: [
      ["Should I buy Intelligence before Delivery?", "Choose Intelligence first when the central constraint, market angle, or build sequence is unclear."],
      ["Are these strategy calls?", "No. These are paid productized reports, audits, briefings, and planning products with defined scope and deliverables."],
      ["Where do I buy?", "Review the ZYNE product detail page first. Secure checkout is completed through Stan Store."]
    ]
  },
  delivery: {
    sequenceTitle: "Delivery Service Families",
    sequence: ["Brand identity kits", "Website and visibility kits", "Realtor GPT and AI systems", "Referral and conversion systems"],
    faq: [
      ["When should I choose Delivery?", "Choose Delivery when the business already knows what needs to be built or has selected a clear implementation path."],
      ["Can I start with a smaller product?", "Yes. Starter products and focused audits can reduce decision friction before deeper implementation."],
      ["Where does checkout happen?", "Review ZYNE service details first. Secure checkout is completed through Stan Store."]
    ]
  }
};
