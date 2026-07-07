import { icon } from "./icons.js";

const tool = (name, label) => `<button type="button" class="utility-button" aria-disabled="true">${icon(name, "small-icon")}<span>${label}</span></button>`;

export function renderPropertyPanel(listing) {
  return `<section class="property-panel" aria-labelledby="property-title">
    <div class="summary-grid">
      <div class="property-copy">
        <p class="eyebrow">${listing.status}</p>
        <h1 id="property-title"><span>${listing.addressLine1}</span><span>${listing.addressLine2}</span></h1>
        <p class="location">${listing.location}</p>
        <p class="price">${listing.price}</p>
        <p class="description">${listing.description}</p>
      </div>
      <div class="metric-grid">${listing.metrics.map((metric) => `<div class="metric"><div class="metric-icon">${icon(metric.icon)}</div><div><small>${metric.label}</small><strong>${metric.value}</strong></div></div>`).join("")}</div>
    </div>
    <div class="cta-row"><a href="mailto:lisibeth@zyne.store?subject=Investment%20Packet%20Request%20-%207101%20Wendemere%20St" class="cta primary">REQUEST INVESTMENT PACKET ${icon("arrow", "small-icon")}</a><button type="button" class="cta outline" data-reveal-phone>CONTACT LISTING AGENT</button></div>
    <div class="tag-row">${listing.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    <div class="highlight-row">${listing.highlights.map((item) => `<div class="highlight">${icon(item.icon)}<p><span>${item.lines[0]}</span><span>${item.lines[1]}</span></p></div>`).join("")}</div>
    <p class="agent-label">LISTING AGENT</p>
    <div class="agent-row"><div class="agent-identity"><img src="${listing.agent.photo.src}" alt="${listing.agent.photo.alt}"/><div><h2>${listing.agent.name} <em>${listing.agent.badge}</em></h2><p>${listing.agent.brokerage}<br>${listing.agent.office}</p></div></div><div class="agent-actions"><a href="https://www.har.com/carissa-weber/agent_WEBERC" target="_blank" rel="noopener noreferrer">VIEW PROFILE</a><button type="button" data-reveal-phone>CONTACT AGENT</button></div></div>
  </section>`;
}

export function renderContextBar(listing) {
  return `<div class="context-bar"><div class="breadcrumbs"><span>←</span><span>Back to Listings</span><i>/</i><span>Houston, TX</span><i>/</i><strong>${listing.addressLine1} ${listing.addressLine2}</strong></div><div class="utilities">${tool("heart", "Save")}${tool("share", "Share")}${tool("print", "Print")}</div></div>`;
}
