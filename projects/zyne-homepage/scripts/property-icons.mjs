const iconSvg = (path, className = "") => `
  <svg
    class="zyne-icon ${className}"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.55"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    ${path}
  </svg>
`;

export const Icons = {
  arrowLeft: iconSvg(`
    <path d="M19 12H5"/>
    <path d="m12 19-7-7 7-7"/>
  `),

  arrowRight: iconSvg(`
    <path d="M5 12h14"/>
    <path d="m13 5 7 7-7 7"/>
  `),

  images: iconSvg(`
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="m21 15-5-5L5 21"/>
  `),

  heart: iconSvg(`
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/>
  `),

  share: iconSvg(`
    <path d="M4 12v7h16v-7"/>
    <path d="M16 6l-4-4-4 4"/>
    <path d="M12 2v14"/>
  `),

  printer: iconSvg(`
    <path d="M6 9V3h12v6"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5h20v5a2 2 0 0 1-2 2h-2"/>
    <path d="M6 14h12v7H6z"/>
  `),

  bed: iconSvg(`
    <path d="M2 4v16"/>
    <path d="M2 10h20"/>
    <path d="M22 10v10"/>
    <path d="M6 10V7a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3"/>
  `),

  bath: iconSvg(`
    <path d="M9 6 6.5 3.5A2.1 2.1 0 0 0 3 5v7"/>
    <path d="M3 12h18"/>
    <path d="M5 12v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4"/>
    <path d="M7 20v2"/>
    <path d="M17 20v2"/>
  `),

  ruler: iconSvg(`
    <path d="M4 19.5 19.5 4"/>
    <path d="M7 16.5 5.5 15"/>
    <path d="M10 13.5 8.5 12"/>
    <path d="M13 10.5 11.5 9"/>
    <path d="M16 7.5 14.5 6"/>
  `),

  grid: iconSvg(`
    <rect x="4" y="4" width="6" height="6"/>
    <rect x="14" y="4" width="6" height="6"/>
    <rect x="4" y="14" width="6" height="6"/>
    <rect x="14" y="14" width="6" height="6"/>
  `),

  home: iconSvg(`
    <path d="M3 11 12 3l9 8"/>
    <path d="M5 10v10h14V10"/>
    <path d="M9 20v-6h6v6"/>
  `),

  calendarCheck: iconSvg(`
    <path d="M7 3v4"/>
    <path d="M17 3v4"/>
    <path d="M4 7h16"/>
    <path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"/>
    <path d="m9 14 2 2 4-4"/>
  `),

  fan: iconSvg(`
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 10V3c3 0 5 2 5 4 0 2-2 3-5 3Z"/>
    <path d="M14 13l6 3.5c-1.5 2.6-4.2 3.4-5.9 2.4-1.7-1-1.7-3.3-.1-5.9Z"/>
    <path d="M10 13l-6 3.5C2.5 14 3.2 11.3 5 10.3c1.7-1 3.7.2 5 2.7Z"/>
  `),

  flame: iconSvg(`
    <path d="M8.5 14.5A4.5 4.5 0 0 0 13 21a6 6 0 0 0 6-6c0-4-3-7-6-11-.5 3-2 4.5-4 6.5-1.5 1.5-2.5 2.5-.5 4Z"/>
  `),

  shieldCheck: iconSvg(`
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
    <path d="m9 12 2 2 4-4"/>
  `),

  graduationCap: iconSvg(`
    <path d="M22 10 12 5 2 10l10 5 10-5Z"/>
    <path d="M6 12v5c3 2 9 2 12 0v-5"/>
  `),

  key: iconSvg(`
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="M12 12 22 2"/>
    <path d="m17 7 3 3"/>
    <path d="m14 10 3 3"/>
  `),

  mapPin: iconSvg(`
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  `),

  route: iconSvg(`
    <circle cx="6" cy="6" r="3"/>
    <circle cx="18" cy="18" r="3"/>
    <path d="M9 6h3a4 4 0 0 1 0 8h-1a4 4 0 0 0 0 8h4"/>
  `),

  compass: iconSvg(`
    <circle cx="12" cy="12" r="8"/>
    <path d="m15 9-2 6-4 2 2-6 4-2Z"/>
    <circle cx="12" cy="12" r="1"/>
  `),

  community: iconSvg(`
    <path d="M4 20V9l8-6 8 6v11"/>
    <path d="M8 20v-7h8v7"/>
    <path d="M10 13h4"/>
    <path d="M12 13v7"/>
    <path d="M7 9h.01"/>
    <path d="M17 9h.01"/>
  `),

  doorOpen: iconSvg(`
    <path d="M13 4h5v16h-5"/>
    <path d="M13 20H6V4h7"/>
    <path d="M10 12h.01"/>
  `),

  layers: iconSvg(`
    <path d="m12 2 9 5-9 5-9-5 9-5Z"/>
    <path d="m3 12 9 5 9-5"/>
    <path d="m3 17 9 5 9-5"/>
  `),

  shoppingBag: iconSvg(`
    <path d="M6 8h12l-1 13H7L6 8Z"/>
    <path d="M9 8a3 3 0 0 1 6 0"/>
  `),

  washingMachine: iconSvg(`
    <rect x="4" y="2" width="16" height="20" rx="2"/>
    <circle cx="12" cy="14" r="5"/>
    <path d="M8 6h.01"/>
    <path d="M12 6h4"/>
  `)
};
