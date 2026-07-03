export function buildInvestmentPage(prop, photos, visible, primaryImage, navItems) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Investment Prospectus | ${prop.address} | ZYNE</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* ==========================================================================
       GLOBAL RESET & THEME INHERITANCE
       ========================================================================== */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: #070706;
      --panel: #0d0d0b;
      --gold: #c9a967;
      --gold2: #f1d37a;
      --text: #f1eadc;
      --muted: #b4aea3;
      --muted-dark: #746f67;
      --line: rgba(201, 169, 103, 0.22);
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      overflow-y: hidden;
    }

    a { text-decoration: none; color: inherit; }
    button { background: none; border: none; cursor: pointer; font: inherit; }
    img { display: block; max-width: 100%; height: auto; }

    /* ==========================================================================
       INJECTED GLOBAL HEADER
       ========================================================================== */
    header {
      min-height: 82px;
      padding: 0 6vw;
      display: flex;
      gap: 1.5rem;
      align-items: center;
      border-bottom: 1px solid var(--line);
      background: #070706ee;
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(18px);
    }
    header img { width: 110px; height: auto; }
    nav { display: flex; gap: 1rem; flex-wrap: wrap; margin-left: auto; }
    nav a {
      color: var(--muted);
      font-size: .76rem;
      text-transform: uppercase;
      letter-spacing: .12em;
    }
    @media (max-width: 1000px) { nav { display: none; } }

    /* ==========================================================================
       PROPORTIONAL ASPECT-RATIO SCALING ENGINE (1672 x 941)
       ========================================================================== */
    .dashboard-wrapper {
      width: 100%;
      height: calc(100vh - 82px);
      max-height: 859px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg);
    }

    .investment-dashboard {
      aspect-ratio: 1672 / 859;
      width: 100%;
      max-width: 1672px;
      max-height: 100%;
      padding: clamp(1rem, 2vw, 2.5rem);
      container-type: size;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: clamp(1.5rem, 3cqw, 3rem);
      height: 100%;
      width: 100%;
    }

    /* ==========================================================================
       LEFT PANEL: 5-PHOTO MASONRY
       ========================================================================== */
    .photo-masonry {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: clamp(0.25rem, 0.5cqw, 0.75rem);
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
    }

    .masonry-col {
      display: flex;
      flex-direction: column;
      gap: clamp(0.25rem, 0.5cqw, 0.75rem);
      height: 100%;
    }

    .img-wrap {
      position: relative;
      background: var(--panel);
      overflow: hidden;
    }

    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .col-left .img-wrap:first-child { flex: 2; }
    .col-left .img-wrap:last-child { flex: 1; }
    .col-right .img-wrap { flex: 1; }

    .status-badge {
      position: absolute;
      top: 1.5cqh;
      left: 1.5cqw;
      background: linear-gradient(180deg, var(--gold2), var(--gold));
      color: #000;
      padding: 0.6cqw 1cqw;
      font-size: clamp(0.5rem, 1.2cqw, 0.7rem);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      z-index: 2;
    }

    /* ==========================================================================
       RIGHT PANEL: DATA SIDEBAR & FINANCIALS
       ========================================================================== */
    .data-sidebar {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--muted);
      font-size: clamp(0.6rem, 1.5cqw, 0.8rem);
      margin-bottom: clamp(1rem, 2cqh, 2rem);
    }
    
    .breadcrumbs { display: flex; align-items: center; gap: 0.75rem; }
    .breadcrumbs .slash { color: var(--muted-dark); opacity: 0.5; }
    .actions { display: flex; gap: 1rem; }
    .actions button { color: var(--text); display: flex; align-items: center; gap: 0.4rem; }

    .hero-data-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: clamp(1rem, 2cqw, 2.5rem);
    }

    .core-info .eyebrow {
      color: var(--gold);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: clamp(0.6rem, 1.2cqw, 0.75rem);
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    .core-info h1 {
      font-size: clamp(2rem, 5cqw, 3.2rem);
      line-height: 1.05;
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    .core-info .location {
      color: var(--muted);
      font-size: clamp(0.8rem, 1.8cqw, 1.1rem);
      margin-bottom: 1rem;
    }
    .core-info .price {
      display: block;
      color: var(--gold2);
      font-size: clamp(2.5rem, 6cqw, 3.8rem);
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .core-info p {
      font-size: clamp(0.7rem, 1.5cqw, 0.9rem);
      color: var(--muted);
      line-height: 1.6;
    }

    .financial-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 1px;
      background: var(--line);
      border: 1px solid var(--line);
    }
    .metric-cell {
      background: var(--bg);
      padding: clamp(1rem, 2cqw, 1.5rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
    }
    .metric-cell .icon-wrap {
      position: absolute;
      top: 1rem;
      left: 1rem;
      opacity: 0.7;
    }
    .metric-info {
      margin-top: 1.5rem;
      text-align: right;
    }
    .metric-info small {
      display: block;
      color: var(--muted-dark);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: clamp(0.5rem, 1cqw, 0.65rem);
      margin-bottom: 0.25rem;
    }
    .metric-info b {
      display: block;
      color: var(--text);
      font-size: clamp(1.2rem, 2.5cqw, 1.8rem);
    }

    .action-row {
      display: flex;
      gap: clamp(0.5rem, 1cqw, 1rem);
      margin-top: clamp(1rem, 2cqh, 2rem);
    }
    .btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: clamp(0.8rem, 1.5cqh, 1.2rem) 1rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: clamp(0.6rem, 1.2cqw, 0.75rem);
      font-weight: 800;
      text-align: center;
    }
    .btn.primary {
      background: linear-gradient(180deg, var(--gold2), var(--gold));
      color: #000;
    }
    .btn.outline {
      border: 1px solid var(--gold);
      color: var(--gold2);
    }

    .attribute-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: clamp(1rem, 2cqh, 1.5rem);
    }
    .tag {
      border: 1px solid rgba(201, 169, 103, 0.4);
      padding: 0.5rem 1rem;
      color: var(--gold2);
      font-size: clamp(0.55rem, 1.1cqw, 0.7rem);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .highlight-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border: 1px solid var(--line);
      margin-top: clamp(1rem, 2cqh, 1.5rem);
    }
    .highlight-item {
      padding: clamp(1rem, 2cqh, 1.5rem) 0.5rem;
      text-align: center;
      border-right: 1px solid var(--line);
    }
    .highlight-item:last-child { border-right: none; }
    .highlight-item .icon-wrap { margin: 0 auto 0.75rem; }
    .highlight-item b {
      display: block;
      color: var(--text);
      font-size: clamp(0.7rem, 1.4cqw, 0.85rem);
      margin-bottom: 0.25rem;
    }
    .highlight-item span {
      display: block;
      color: var(--muted);
      font-size: clamp(0.65rem, 1.2cqw, 0.8rem);
    }

    .agent-card-horizontal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: clamp(1rem, 2cqh, 1.5rem);
      padding-top: clamp(1rem, 2cqh, 1.5rem);
      border-top: 1px solid var(--line);
    }
    .agent-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .agent-profile img {
      width: clamp(50px, 6cqw, 64px);
      height: clamp(50px, 6cqw, 64px);
      border: 1px solid rgba(201,169,103,.45);
      object-fit: cover;
    }
    .agent-meta h4 {
      font-size: clamp(0.8rem, 1.6cqw, 1rem);
      margin: 0 0 0.2rem;
    }
    .badge {
      display: inline-block;
      background: #03117a;
      border: 1px solid #3f66ff;
      color: #fff;
      font-size: 0.55rem;
      font-style: italic;
      padding: 0.1rem 0.3rem;
      margin-left: 0.4rem;
      vertical-align: middle;
    }
    .agent-meta p {
      font-size: clamp(0.6rem, 1.1cqw, 0.75rem);
      color: var(--muted);
      margin: 0;
      line-height: 1.4;
    }
    .agent-actions {
      display: flex;
      gap: 0.75rem;
    }
    .agent-actions .btn {
      padding: 0.6rem 1rem;
      font-size: clamp(0.5rem, 1cqw, 0.65rem);
    }

    .zyne-icon {
      width: clamp(24px, 3cqw, 32px);
      height: clamp(24px, 3cqw, 32px);
      color: var(--gold);
      stroke-width: 1.25px;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 8px rgba(201, 154, 46, .15));
    }
    .icon-small { width: 16px; height: 16px; margin-right: 6px; }
  </style>
</head>
<body>

  <header>
    <a href="/" aria-label="ZYNE home">
      <img src="/assets/zyne-logo.png" alt="ZYNE">
    </a>
    <nav aria-label="Main navigation">
      ${navItems}
    </nav>
  </header>

  <div class="dashboard-wrapper">
    <main class="investment-dashboard">
      <div class="dashboard-grid">

        <!-- LEFT PANEL: Dynamic Masonry -->
        <div class="photo-masonry">
          <div class="masonry-col col-left">
            <div class="img-wrap">
              <span class="status-badge">${prop.status}</span>
              ${visible[0] ? `<img src="${visible[0]}" alt="${prop.address}">` : '<div style="width:100%; height:100%; background:#1c2520;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[1] ? `<img src="${visible[1]}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#153d5a;"></div>'}
            </div>
          </div>
          <div class="masonry-col col-right">
            <div class="img-wrap">
              ${visible[2] ? `<img src="${visible[2]}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#d4cfc7;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[3] ? `<img src="${visible[3]}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#bda316;"></div>'}
            </div>
            <div class="img-wrap">
              ${visible[4] ? `<img src="${visible[4]}" alt="Interior View">` : '<div style="width:100%; height:100%; background:#8c1d1d;"></div>'}
            </div>
          </div>
        </div>

        <!-- RIGHT PANEL: Dynamic Data Sidebar -->
        <div class="data-sidebar">
          
          <div class="topbar">
            <div class="breadcrumbs">
              <a href="/" style="display:flex;align-items:center;">
                <svg class="zyne-icon icon-small" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Listings
              </a>
              <span class="slash">/</span>
              <span>${prop.city}, ${prop.state}</span>
              <span class="slash">/</span>
              <b style="color:var(--text);">${prop.address}</b>
            </div>
            <div class="actions">
              <button>
                <svg class="zyne-icon icon-small" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Save
              </button>
              <button>
                <svg class="zyne-icon icon-small" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share
              </button>
            </div>
          </div>

          <div class="hero-data-split">
            <div class="core-info">
              <p class="eyebrow">${prop.status} • Investment</p>
              <h1>${prop.address}</h1>
              <p class="location">${prop.city}, ${prop.state} ${prop.zip || ''}</p>
              <b class="price">${prop.price}</b>
              <p>${prop.description}</p>
            </div>

            <div class="financial-grid">
              <div class="metric-cell">
                <div class="icon-wrap">
                  <svg class="zyne-icon" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                </div>
                <div class="metric-info">
                  <small>Purchase Price</small>
                  <b>${prop.price}</b>
                </div>
              </div>
              
              <div class="metric-cell">
                <div class="icon-wrap">
                  <svg class="zyne-icon" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 7v4"/></svg>
                </div>
                <div class="metric-info">
                  <small>Down Payment</small>
                  <b>20%</b>
                </div>
              </div>

              <div class="metric-cell">
                <div class="icon-wrap">
                  <svg class="zyne-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="9" y1="15" x2="15" y2="9"/><circle cx="10" cy="10" r="0.5"/><circle cx="14" cy="14" r="0.5"/></svg>
                </div>
                <div class="metric-info">
                  <small>Note Rate</small>
                  <b>6.51%</b>
                </div>
              </div>

              <div class="metric-cell">
                <div class="icon-wrap">
                  <svg class="zyne-icon" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
                </div>
                <div class="metric-info">
                  <small>Target Cash Flow</small>
                  <b>~$400/mo</b>
                </div>
              </div>
            </div>
          </div>

          <div class="action-row">
            <button class="btn primary">
              Request Investment Packet 
              <svg class="zyne-icon icon-small" style="margin:0 0 0 4px;" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="btn outline">Contact Listing Agent</button>
          </div>

          <div class="attribute-tags">
            <span class="tag">Seller Financing</span>
            <span class="tag">20% Down</span>
            <span class="tag">6.51% Note</span>
            <span class="tag">Zero HOA</span>
            <span class="tag">Target DSCR 1.30</span>
          </div>

          <div class="highlight-bar">
            <div class="highlight-item">
              <div class="icon-wrap">
                <svg class="zyne-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <b>Seller-Financed Note</b>
              <span>Financing</span>
            </div>
            
            <div class="highlight-item">
              <div class="icon-wrap">
                <svg class="zyne-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M10 10h4"/><path d="M10 14h4"/></svg>
              </div>
              <b>20% Down</b>
              <span>Required</span>
            </div>

            <div class="highlight-item">
              <div class="icon-wrap">
                <svg class="zyne-icon" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M18 9l-5 5-4-4-5 5"/><path d="M18 9h-4"/><path d="M18 9v4"/></svg>
              </div>
              <b>Target Rent</b>
              <span>$1,700/mo</span>
            </div>

            <div class="highlight-item">
              <div class="icon-wrap">
                <svg class="zyne-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <b>Target DSCR</b>
              <span>1.30</span>
            </div>
          </div>

          <div class="agent-card-horizontal">
            <div class="agent-profile">
              <img src="${prop.agentImage || '/assets/agents/carissa-weber.png'}" alt="${prop.agentName || 'Carissa Weber'}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48L3N2Zz4='">
              <div class="agent-meta">
                <h4>${prop.agentName || 'Carissa Weber'} <span class="badge">PLATINUM</span></h4>
                <p>${prop.brokerage || 'Better Homes and Gardens Real Estate<br>Gary Greene - Sugar Land'}</p>
              </div>
            </div>
            <div class="agent-actions">
              <button class="btn outline">View Profile</button>
              <button class="btn outline">Contact Agent</button>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</body>
</html>`;
}
