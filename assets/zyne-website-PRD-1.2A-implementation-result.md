# ZYNE Website PRD 1.2A — Implementation Result

## Status

Implemented for owner review. Do not begin PRD 1.2B until this PRD 1.2A result is approved.

## Implementation commits

- `2541141a8a5287d28f5195461a90f59c52139100` — Add PRD 1.2A diagnostic routing data
- `79cf1b5d882c6af9b4ae8d312145b91863a53de8` — Add PRD 1.2A diagnostic homepage markup
- `0cce407730b6163a027cbe5db9b500fa7ceb61a4` — Add PRD 1.2A homepage polish styles
- `ae29e41a206b588e32277786873887a8a91ad914` — Add PRD 1.2A diagnostic and return-context behavior
- `0605f36f7720ba0fb2dc07515ea06fc8679ca8df` — Add PRD 1.2A validator
- `62b0dbef3a9c4b2093e698dcfe3e95ad9ac51210` — Add PRD 1.2A validation to build
- `10e88eea9cbdcdecea1bed719cdb70899f2e0d47` — Capture PRD 1.2A diagnostic homepage states

## Implemented scope

### 1. Diagnostic search / curated homepage mode

Added a homepage diagnostic section immediately after the hero and trust strip.

The diagnostic search includes seven buyer-symptom options:

1. People cannot find my business locally
2. My brand does not look credible enough
3. My website gets traffic but does not convert
4. I need better proof, case studies, or sales assets
5. I need AI to handle intake, routing, or follow-up
6. I need to understand what is actually broken
7. I want a full enterprise system or complex build

Each option reveals a curated result panel using approved catalog metadata.

Each result panel includes:

- recommended path,
- starting product,
- paid diagnostic fallback,
- relevant products,
- rationale,
- next action.

No runtime AI-generated copy is used.

### 2. Cognitive-load reduction behavior

The visitor no longer has to read the full homepage before finding a likely product path.

Primary interaction:

```txt
What do you need help with?
[ Select your biggest bottleneck ] [ Find My Solution ]
```

The full homepage remains available through the reset control.

### 3. Navigation-stress reduction

Added homepage return-context support.

When a visitor leaves the homepage from a major section, the homepage stores the source section in session storage. On return, the visitor can resume near the section they left.

Major homepage anchors added or stabilized:

```txt
#hero
#diagnostic-search
#growth-paths
#services
#intelligence
#delivery
#process
#strategic-services
#industries
#faq
#final-cta
```

### 4. Mobile menu conversion panel

Updated mobile menu behavior to support a more deliberate full-height panel and added mobile menu CTAs:

```txt
Find My Growth Path
Shop Services
```

Menu state now updates from `Menu` to `Close` when opened.

### 5. Mobile sticky CTA preservation

Mobile sticky CTA now routes the primary action to the diagnostic search instead of forcing the user into the full Growth Paths section.

Sticky CTA remains compact and has permanent screenshot coverage.

### 6. Spacing and readability polish

Added PRD 1.2A styles to reduce section spacing, improve product metadata readability, improve muted copy contrast, tighten mobile cards, and force the mobile footer into one column.

### 7. Visual QA capture updates

Responsive screenshot workflow now captures:

```txt
Desktop.png
Tablet.png
Mobile.png
Mobile-Menu.png
Mobile-Sticky-CTA.png
Mobile-Diagnostic-Result.png
```

Workflow triggers now include `src/render.js` and `src/data/**` changes.

## Validation added

Added:

```bash
npm run validate:prd1.2a
```

Build now runs:

```bash
npm run validate:catalog
npm run validate:prd1.1
npm run validate:prd1.2a
vite build
node scripts/prerender.mjs
node scripts/generate-routes.mjs
node scripts/generate-legal-layer.mjs
node scripts/generate-seo-layer.mjs
npm run validate:routes
```

The PRD 1.2A validator checks:

- diagnostic section exists,
- at least seven buyer symptoms exist,
- large `Find My Solution` button exists,
- curated result panels exist,
- unclear-problem route points to paid diagnostic fallback,
- prohibited free-call CTA language is absent,
- return-context support exists,
- stable homepage anchors exist,
- mobile menu and sticky CTA markers exist,
- footer legal links and checkout disclosure remain present.

## Files changed

```txt
projects/zyne-homepage/src/data/diagnostics.js
projects/zyne-homepage/src/render.js
projects/zyne-homepage/src/main.js
projects/zyne-homepage/src/styles/prd-1-2a.css
projects/zyne-homepage/scripts/validate-prd-1-2a.mjs
projects/zyne-homepage/package.json
.github/workflows/capture-zyne-homepage.yml
assets/zyne-website-PRD-1.2A-implementation-result.md
```

## Owner review checklist

- [ ] Diagnostic search appears early enough on the homepage.
- [ ] Dropdown options match buyer language.
- [ ] Result panels feel useful and not too verbose.
- [ ] `Find My Solution` interaction reduces homepage scanning burden.
- [ ] Mobile view feels shorter and easier to navigate.
- [ ] Return-context behavior solves the homepage resume problem.
- [ ] Mobile menu feels deliberate enough for approval.
- [ ] Footer is acceptable on mobile.
- [ ] Screenshot workflow captures `Mobile-Diagnostic-Result.png` successfully.

## Decision needed

Approve PRD 1.2A result before PRD 1.2B implementation begins.
