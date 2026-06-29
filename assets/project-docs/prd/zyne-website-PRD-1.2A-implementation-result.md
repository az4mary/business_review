# ZYNE Website PRD 1.2A — Implementation Result

## Status

Implemented for owner review. Do not begin PRD 1.2B until this PRD 1.2A result is approved.

## Workflow rule

No PRD 1.2A screenshot workflow has been set up. The existing PRD 1.1 screenshot workflow should not be used for PRD 1.2A review images and should not overwrite PRD 1.1 images.

## Implemented scope

### 1. Diagnostic search / curated homepage mode

Added a homepage diagnostic section after the hero/trust area.

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

Primary interaction:

```txt
What do you need help with?
[ Select your biggest bottleneck ] [ Find My Solution ]
```

The full homepage remains available through the reset control.

### 3. Navigation-stress reduction

Added homepage return-context support.

When a visitor leaves the homepage from a major section, the homepage stores the source section in session storage. On return, the visitor can resume near the section they left.

Major homepage anchors:

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

### 4. Mobile menu and sticky CTA

Mobile menu supports a full-height conversion panel pattern with:

```txt
Find My Growth Path
Shop Services
```

Mobile sticky CTA primary action routes to the diagnostic search.

### 5. Spacing and readability polish

Added PRD 1.2A styles to reduce section spacing, improve product metadata readability, improve muted copy contrast, tighten mobile cards, and force the mobile footer into one column.

### 6. Build integration

The app entry now uses the PRD 1.2A render wrapper, and the prerender script uses the same wrapper so the static homepage artifact includes PRD 1.2A.

## Validation

Validator file added:

```txt
projects/zyne-homepage/scripts/validate-prd-1-2a.mjs
```

Package scripts expose:

```txt
npm run validate:prd1.2a
```

`prebuild` runs PRD 1.2A validation before the existing build command.

The validator checks:

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
projects/zyne-homepage/src/render-prd-1-2a.js
projects/zyne-homepage/src/main.js
projects/zyne-homepage/src/styles/prd-1-2a.css
projects/zyne-homepage/scripts/prerender.mjs
projects/zyne-homepage/scripts/validate-prd-1-2a.mjs
projects/zyne-homepage/package.json
assets/project-docs/prd/zyne-website-PRD-1.2A-implementation-result.md
```

No screenshot workflow file is part of PRD 1.2A implementation.

## Images needed from owner

Provide these PRD 1.2A review images manually. Do not place them in `assets/PRD-1.1-images/`.

```txt
PRD-1.2A-Desktop.png
PRD-1.2A-Tablet.png
PRD-1.2A-Mobile.png
PRD-1.2A-Mobile-Menu.png
PRD-1.2A-Mobile-Sticky-CTA.png
PRD-1.2A-Mobile-Diagnostic-Result.png
```

Recommended review dimensions:

```txt
Desktop: 1440 × full page
Tablet: 768 × full page
Mobile: 390 × full page
Mobile Menu: 390 × 844 viewport
Mobile Sticky CTA: 390 × 844 viewport after scrolling past hero
Mobile Diagnostic Result: 390 × 844 viewport after selecting one diagnostic option
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

## Decision needed

Approve PRD 1.2A result before PRD 1.2B implementation begins.
