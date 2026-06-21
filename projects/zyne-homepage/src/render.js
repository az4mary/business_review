import { faqs, growthPaths, industries, intelligenceProducts, premiumProducts, products } from "./data/products.js";

const slugify = (value) => value.toLowerCase().replaceAll("?", "").replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const renderHomePage = () => `
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <a class="brand" href="/" aria-label="ZYNE home"><img src="/assets/zyne-logo.png" alt="ZYNE" /></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation"><span></span><span></span><span></span><b>Menu</b></button>
    <nav id="main-navigation" aria-label="Main navigation">
      <a href="#services">Services</a><a href="#growth-paths">Growth Paths</a>
      <a href="#intelligence">Intelligence</a><a href="#delivery">Delivery</a><a href="#industries">Industries</a><a href="#faq">FAQ</a>
    </nav>
    <a class="button button-small" href="/services/" data-event="header_shop_services_click">Shop Services</a>
  </header>
  <main id="main-content">
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="hero-copy">
        <p class="eyebrow">Growth intelligence · Strategic execution</p>
        <h1>Premium Growth Services for <em>Visibility, Authority, Automation,</em> and Client Conversion.</h1>
        <p class="lede">ZYNE helps ambitious service businesses strengthen visibility, build authority, deploy practical AI systems, and convert more clients through fixed-price strategic services.</p>
        <div class="actions">
          <a class="button" href="/services/" data-event="hero_shop_services_click">Shop Paid Services <span>↗</span></a>
          <a class="button button-ghost" href="#growth-paths" data-event="hero_find_growth_path_click">Find My Growth Path</a>
        </div>
        <p class="disclosure">Review full service details on ZYNE. Secure checkout is completed through Stan Store.</p>
      </div>
      <div class="hero-mark" aria-hidden="true">
        <span class="orbit orbit-one"></span><span class="orbit orbit-two"></span>
        <div class="monogram">Z</div><small>Intelligence<br/>in motion</small>
      </div>
    </section>
    <section class="trust-strip" aria-label="Service assurances">
      ${["Fixed-price services", "Clear deliverables", "Defined timelines", "Secure Stan Store checkout"].map((item, i) => `<div><span>0${i + 1}</span>${item}</div>`).join("")}
    </section>
    <section class="section" id="growth-paths">
      <div class="section-heading">
        <div><p class="eyebrow">Start with the constraint</p><h2>Choose Your <em>Growth Path</em></h2></div>
        <p>Select the area where your business needs stronger visibility, authority, systems, or conversion.</p>
      </div>
      <div class="path-grid">
        ${growthPaths.map(path => `
          <article class="path-card">
            <div class="card-top"><span>${path.number}</span><b>${path.icon}</b></div>
            <h3>${path.title}</h3><p>${path.description}</p>
            <h4>Popular starting points</h4>
            <ul>${path.products.map(product => `<li>${product}</li>`).join("")}</ul>
            <a href="${path.url}" data-event="growth_path_card_click" data-category="${path.id}">View Products <span>↗</span></a>
          </article>`).join("")}
      </div>
    </section>
    <section class="section products" id="services">
      <div class="section-heading">
        <div><p class="eyebrow">Focused offers · Clear scope</p><h2>Start With a <em>Fixed-Price</em> Growth Service</h2></div>
        <p>Choose a focused starting point with defined deliverables and a transparent price.</p>
      </div>
      <div class="product-grid">
        ${products.map(product => `
          <article class="product-card">
            <p class="product-category">${product.category.replaceAll("-", " ")}</p>
            <h3>${product.name}</h3><strong>${product.price}</strong>
            <p>${product.description}</p>
            <dl><div><dt>Best for</dt><dd>${product.bestFor}</dd></div><div><dt>Timeline</dt><dd>${product.timeline}</dd></div></dl>
            <a href="${product.internalUrl}" data-event="product_card_view_product_click" data-product="${product.id}">View Product <span>↗</span></a>
          </article>`).join("")}
      </div>
    </section>
    <section class="split-section section" id="intelligence">
      <div class="split-intro">
        <p class="eyebrow">Before execution comes intelligence</p>
        <h2>ZYNE <em>Intelligence</em></h2>
        <p>Strategic reports, audits, and briefings that identify constraints, clarify priorities, and reveal what to build next.</p>
        <a class="button button-ghost" href="/intelligence/">View Intelligence Products</a>
      </div>
      <div class="service-list">
        ${intelligenceProducts.map(([name, price, description], index) => `
          <a href="/services/${slugify(name)}/">
            <span>0${index + 1}</span><div><h3>${name}</h3><p>${description}</p></div><strong>${price}</strong><b>↗</b>
          </a>`).join("")}
      </div>
    </section>
    <section class="section delivery" id="delivery">
      <div class="section-heading">
        <div><p class="eyebrow">From strategy to execution</p><h2>ZYNE <em>Delivery</em></h2></div>
        <p>Done-for-you kits and systems for brand presence, websites, AI automation, and client acquisition infrastructure.</p>
      </div>
      <div class="family-grid">
        ${[
          ["Brand Identity Kits", "Identity systems designed to make authority visible.", "◇"],
          ["Website Kits", "Focused website improvements and conversion-ready builds.", "▱"],
          ["Social Media Kits", "A clearer, more credible social presence.", "◎"],
          ["Google Business Profile", "Local profile optimization and visibility services.", "⌖"],
          ["Realtor GPT Kits", "Purpose-built AI assistants for real estate workflows.", "✦"],
          ["AI Chatbot Kits", "Practical conversational systems for client interaction.", "⌁"],
          ["Referral & Conversion", "Proof, referral, origination, and conversion systems.", "↗"]
        ].map(([name, text, icon]) => `<a class="family-card" href="/delivery/"><b>${icon}</b><h3>${name}</h3><p>${text}</p><span>Explore ↗</span></a>`).join("")}
      </div>
    </section>
    <section class="section process">
      <div class="section-heading">
        <div><p class="eyebrow">A disciplined operating model</p><h2>How ZYNE <em>Works</em></h2></div>
        <p>Five connected stages move the business from diagnosis to stronger conversion.</p>
      </div>
      <div class="process-grid">
        ${[
          ["Diagnose", "Identify visibility, positioning, operational, or conversion constraints through paid diagnostic products."],
          ["Position", "Clarify message, authority, market angle, and service pathways."],
          ["Build", "Create brand assets, websites, proof systems, and client-facing infrastructure."],
          ["Automate", "Deploy AI systems, chatbot frameworks, and workflow automation where appropriate."],
          ["Convert", "Strengthen the path from attention to trust, referral, inquiry, and purchase."]
        ].map(([name, text], index) => `<article><span>0${index + 1}</span><h3>${name}</h3><p>${text}</p></article>`).join("")}
      </div>
    </section>
    <section class="section premium">
      <div class="section-heading">
        <div><p class="eyebrow">For consequential growth decisions</p><h2>Featured <em>Strategic Services</em></h2></div>
        <p>Higher-value services for businesses ready to resolve structural constraints and build stronger systems.</p>
      </div>
      <div class="premium-grid">
        ${premiumProducts.map(([name, price, text, slug, image]) => `<article class="${image ? "has-product-image" : "product-image-pending"}">${image ? `<img src="/assets/${image}" alt="${name} boxed service package" loading="eager" decoding="async" width="1200" height="1200" />` : `<div class="image-placeholder" aria-hidden="true"><span>ZYNE</span><b>${name}</b><small>Product image coming soon</small></div>`}<div><p>Strategic service</p><h3>${name}</h3><strong>${price}</strong><span>${text}</span><a href="/services/${slug}/">View Product ↗</a></div></article>`).join("")}
      </div>
    </section>
    <section class="section industries" id="industries">
      <div class="section-heading">
        <div><p class="eyebrow">Built for expertise-led growth</p><h2>Service-Based and <em>Growth-Focused</em> Businesses</h2></div>
        <p>Designed for businesses where trust, authority, and a clear buyer journey shape commercial performance.</p>
      </div>
      <div class="industry-grid">
        ${industries.map(([name, text], index) => `<article class="${name === "Real Estate" ? "featured-industry" : ""}"><span>0${index + 1}</span><h3>${name}</h3><p>${text}</p>${name === "Real Estate" ? '<a href="/use-ai/realtor-gpt/">View Realtor GPT Products ↗</a>' : ""}</article>`).join("")}
      </div>
    </section>
    <section class="section faq" id="faq">
      <div class="section-heading">
        <div><p class="eyebrow">Clarity before checkout</p><h2>Frequently Asked <em>Questions</em></h2></div>
      </div>
      <div class="faq-list">
        ${faqs.map(([question, answer], index) => `<details><summary><span>0${index + 1}</span>${question}<b>+</b></summary><p>${answer}</p></details>`).join("")}
      </div>
    </section>
    <section class="final-cta">
      <p class="eyebrow">Your next move can be clear</p>
      <h2>Lead with clarity.<br/><em>Execute with confidence.</em></h2>
      <p>Browse fixed-price services for visibility, brand authority, AI systems, websites, and client conversion. Review details on ZYNE, then check out securely through Stan Store.</p>
      <div class="actions"><a class="button" href="/services/" data-event="final_cta_shop_services_click">Shop Paid Services ↗</a><a class="button button-ghost" href="#growth-paths">Find My Growth Path</a></div>
    </section>
  </main>
  <footer>
    <div class="footer-brand"><img src="/assets/zyne-logo.png" alt="ZYNE" /><p>Growth intelligence and strategic execution for ambitious businesses.</p></div>
    <div><h3>Growth Paths</h3><a href="/grow-my-visibility/">Visibility</a><a href="/build-my-brand/">Brand</a><a href="/improve-my-business/">Business</a><a href="/use-ai/">AI Systems</a><a href="/convert-more-clients/">Conversion</a></div>
    <div><h3>Explore</h3><a href="/services/">Services</a><a href="/intelligence/">Intelligence</a><a href="/delivery/">Delivery</a><a href="#industries">Industries</a><a href="#faq">Support</a></div>
    <div><h3>Legal</h3><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/refund-policy/">Refund policy</a></div>
    <small>Product education and service details are provided on ZYNE. Checkout is completed securely through Stan Store.</small>
  </footer>
`;

export const buildSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "/#organization",
      name: "ZYNE",
      url: "/",
      logo: "/assets/zyne-logo.png"
    },
    {
      "@type": "WebSite",
      "@id": "/#website",
      url: "/",
      name: "ZYNE",
      publisher: { "@id": "/#organization" }
    },
    {
      "@type": "ItemList",
      name: "Featured ZYNE services",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: product.name,
          description: product.description,
          url: product.internalUrl,
          offers: {
            "@type": "Offer",
            price: product.price.replace("$", "").replace(",", ""),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
          }
        }
      }))
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer }
      }))
    }
  ]
});
