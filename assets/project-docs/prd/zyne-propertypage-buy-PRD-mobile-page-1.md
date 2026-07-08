⚠️Below is a **developer-ready handoff**. It is intentionally strict and removes interpretation.

# PATCH 1 - ZYNE Mobile Listing Page — Required Developer Changes

## Objective

Rebuild the ZYNE mobile listing page for a `360 × 640` CSS-pixel mobile viewport.

The current build is still too dense, has small text, repeats information, and exposes too much below the fold. This spec supersedes the current mobile implementation.

The first mobile viewport must communicate only:

1. Property image
2. Price
3. Address/location
4. One-line investment hook
5. Core seller-financing terms
6. Primary CTA
7. Secondary CTA

Do not add extra sections, chips, thumbnails, agent card, duplicate CTAs, or extra decorative elements inside the first `640px` of vertical height.

---

# 1. Baseline implementation rules

## Viewport target

Design and QA against:

```text
Width: 360px
Height: 640px
```

All dimensions below are **CSS pixels**, not image-export pixels.

## Do not scale down the desktop layout

The mobile layout must be a separate responsive layout.

Required breakpoint:

```css
@media (max-width: 480px) {
  /* mobile layout here */
}
```

Do not use `transform: scale()`, zoom, or proportional desktop scaling to create the mobile version.

## Page width

```css
body {
  margin: 0;
  background: #050505;
}

.mobile-page {
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background: #050505;
  color: #F7F3EA;
  overflow-x: hidden;
}
```

At `360px` viewport width, all primary content uses:

```text
Horizontal page padding: 16px
Content width: 328px
```

No element may overflow horizontally.

---

# 2. Global typography rules

Use the existing ZYNE font or Inter-style sans-serif.

Do not use any visible text smaller than `12px`.

## Font sizes

| Element                     | Font size | Line height | Weight |
| --------------------------- | --------: | ----------: | -----: |
| Header schedule button      |    `12px` |      `14px` |  `700` |
| Hero badge primary text     |    `18px` |      `20px` |  `800` |
| Hero badge secondary text   |    `12px` |      `15px` |  `700` |
| Photo count pill            |    `14px` |      `18px` |  `700` |
| Price                       |    `40px` |      `44px` |  `800` |
| Address                     |    `20px` |      `24px` |  `800` |
| Location                    |    `14px` |      `20px` |  `500` |
| Hook sentence               |    `16px` |      `23px` |  `400` |
| Financing card label        |    `15px` |      `20px` |  `700` |
| Financing card terms        |    `16px` |      `22px` |  `700` |
| Primary CTA                 |    `14px` |      `16px` |  `800` |
| Secondary CTA               |    `14px` |      `16px` |  `800` |
| Section headings below fold |    `18px` |      `24px` |  `800` |
| Agent name                  |    `18px` |      `22px` |  `800` |
| Agent brokerage text        |    `13px` |      `18px` |  `400` |

## Uppercase usage

Uppercase is allowed only for:

* `SCHEDULE BRIEFING`
* `FOR SALE`
* CTA button labels
* small labels inside badges

Do not use uppercase for long body text.

---

# 3. Global color rules

Use these colors exactly for mobile.

```css
:root {
  --zyne-bg: #050505;
  --zyne-panel: #0B0B0A;
  --zyne-panel-soft: #10100E;

  --zyne-text-primary: #F7F3EA;
  --zyne-text-secondary: #BDB7AA;
  --zyne-text-muted: #8F897D;

  --zyne-gold: #E7C34A;
  --zyne-gold-strong: #F2CC4D;
  --zyne-gold-muted: #6E570E;

  --zyne-border: rgba(231, 195, 74, 0.42);
  --zyne-border-soft: rgba(231, 195, 74, 0.22);

  --zyne-button-gold-start: #F3D76A;
  --zyne-button-gold-end: #C99D24;
  --zyne-button-text: #080808;
}
```

## Contrast rules

* Body copy must use `--zyne-text-primary`.
* Secondary copy must use `--zyne-text-secondary`.
* Do not use muted gold for small text.
* Do not place small text directly over a photo.
* Do not place body text over textured/noisy backgrounds.
* Text contrast must meet WCAG AA:

  * Normal text: `4.5:1`
  * Large text/icons: `3:1`

---

# 4. Required first viewport layout

At `360 × 640`, the page must follow this exact vertical structure.

| Section                |    X |     Y |     W |     H |
| ---------------------- | ---: | ----: | ----: | ----: |
| Header                 |  `0` |   `0` | `360` |  `64` |
| Hero image             | `16` |  `72` | `328` | `200` |
| Price                  | `16` | `288` | `328` |  `44` |
| Address                | `16` | `338` | `328` |  `24` |
| Location               | `16` | `364` | `328` |  `20` |
| Hook sentence          | `16` | `394` | `328` |  `46` |
| Financing summary card | `16` | `452` | `328` |  `76` |
| Primary CTA            | `16` | `544` | `328` |  `50` |
| Secondary CTA          | `16` | `606` | `328` |  `44` |

At the first `640px` viewport height, the user must not see:

* thumbnail strip
* chips/tags
* agent card
* duplicate investment metric cards
* footer
* sticky CTA
* long paragraph
* secondary property details

The first viewport ends at the secondary CTA.

---

# 5. Header requirements

## Header dimensions

```text
Header height: 64px
Header padding-left: 16px
Header padding-right: 16px
```

## Header content

| Element         |     X |    Y |     W |    H |
| --------------- | ----: | ---: | ----: | ---: |
| Logo group      |  `16` | `13` | `112` | `38` |
| Schedule button | `150` | `15` | `138` | `34` |
| Hamburger       | `314` | `21` |  `30` | `22` |

## Header styling

```css
.mobile-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid rgba(231, 195, 74, 0.25);
}
```

## Schedule button

```css
.schedule-button {
  width: 138px;
  height: 34px;
  border: 1px solid var(--zyne-gold);
  color: var(--zyne-gold);
  background: transparent;
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
```

## Hamburger

The hamburger must be plain white lines.

Do not put the hamburger inside a gold box.

---

# 6. Hero image requirements

## Required hero container

```text
X: 16px
Y: 72px
W: 328px
H: 200px
Border radius: 10px
Border: 1px solid rgba(231, 195, 74, 0.42)
```

```css
.hero {
  position: relative;
  width: 328px;
  height: 200px;
  margin: 8px 16px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--zyne-border);
}
```

## Hero image

```css
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Remove thumbnail strip

Delete the thumbnail row entirely from mobile.

Do not show the four small thumbnails under the hero image.

Use only the hero image plus a photo-count button.

## Photo count overlay

Place a photo-count pill inside the hero image.

```text
X: 190px
Y: 150px
W: 138px
H: 38px
```

Text:

```text
See all 18 photos
```

Style:

```css
.photo-pill {
  position: absolute;
  right: 12px;
  bottom: 12px;
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(5, 5, 5, 0.82);
  color: #F7F3EA;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

## Hero badge

Keep the badge, but reduce its dominance.

```text
X: 12px relative to hero
Y: 12px relative to hero
W: 104px
H: 68px
```

Text:

```text
FOR SALE
Seller financing
```

Rules:

* `FOR SALE`: `18px`, gold, uppercase
* `Seller financing`: `12px`, white, title case
* Do not use text smaller than `12px`
* Do not use more than two lines of text inside the badge

---

# 7. Listing summary content

## Required order

The content order must be:

```text
$150,000
7101 Wendemere St
Houston, TX 77088
Seller-financed investment property with a clear path to target rent.
```

Do not place the address above the price.

Do not include a long paragraph in the first viewport.

## Price

```css
.price {
  margin: 16px 16px 0;
  font-size: 40px;
  line-height: 44px;
  font-weight: 800;
  color: var(--zyne-gold);
  letter-spacing: -0.03em;
}
```

## Address

```css
.address {
  margin: 6px 16px 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 800;
  color: var(--zyne-text-primary);
  letter-spacing: -0.02em;
}
```

## Location

```css
.location {
  margin: 2px 16px 0;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--zyne-text-secondary);
}
```

The location pin may remain gold, but the location text must not be gold. Use `--zyne-text-secondary`.

## Hook sentence

Use this exact text:

```text
Seller-financed investment property with a clear path to target rent.
```

Style:

```css
.hook {
  margin: 10px 16px 0;
  width: 328px;
  font-size: 16px;
  line-height: 23px;
  font-weight: 400;
  color: var(--zyne-text-primary);
}
```

Maximum height: `46px`.

This line may wrap to two lines. It must not exceed two lines.

---

# 8. Financing summary card

Replace the current three small metric boxes with one clean summary card.

## Remove these current boxes

Delete the separate mini-cards for:

* `$30K down payment`
* `6.51% note rate`
* `~$400/mo target cash flow`

They are too small and create unnecessary density.

## Required financing card

```text
X: 16px
Y: 452px
W: 328px
H: 76px
```

Content:

```text
Seller financing available
$30K down • 6.51% note • ~$400/mo cash flow
```

Style:

```css
.financing-card {
  margin: 12px 16px 0;
  width: 328px;
  height: 76px;
  padding: 13px 16px;
  background: var(--zyne-panel);
  border: 1px solid var(--zyne-border-soft);
  border-radius: 10px;
}

.financing-card-title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
  color: var(--zyne-text-primary);
}

.financing-card-terms {
  margin-top: 4px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 700;
  color: var(--zyne-text-primary);
}

.financing-card-terms .separator {
  color: var(--zyne-gold);
  padding: 0 5px;
}
```

Do not use labels under each value in the first viewport.

---

# 9. CTA requirements

## Primary CTA

```text
X: 16px
Y: 544px
W: 328px
H: 50px
```

Text:

```text
REQUEST INVESTMENT PACKET
```

Style:

```css
.primary-cta {
  margin: 16px 16px 0;
  width: 328px;
  height: 50px;
  border: none;
  border-radius: 6px;
  background: linear-gradient(
    180deg,
    var(--zyne-button-gold-start) 0%,
    var(--zyne-button-gold-end) 100%
  );
  color: var(--zyne-button-text);
  font-size: 14px;
  line-height: 16px;
  font-weight: 800;
  letter-spacing: 0.08em;
}
```

## Secondary CTA

```text
X: 16px
Y: 606px
W: 328px
H: 44px
```

Text:

```text
CONTACT LISTING AGENT
```

Style:

```css
.secondary-cta {
  margin: 12px 16px 0;
  width: 328px;
  height: 44px;
  border: 1px solid var(--zyne-gold);
  border-radius: 6px;
  background: transparent;
  color: var(--zyne-gold);
  font-size: 14px;
  line-height: 16px;
  font-weight: 800;
  letter-spacing: 0.08em;
}
```

## CTA duplication rule

Do not show a sticky bottom CTA in the first viewport.

A sticky CTA may appear only after the user scrolls past the secondary CTA.

Implementation rule:

```text
Sticky CTA appears only after scrollY >= 660px.
```

Before `scrollY = 660px`, the sticky CTA must be hidden.

---

# 10. Below-the-fold content

All content below this point starts after the first viewport.

```text
Minimum start Y for next section: 680px
```

## Deal Highlights section

Start this section at or after `Y = 680px`.

Heading:

```text
Deal highlights
```

Use `18px` font size.

## Chips

Do not show chips in the first viewport.

Do not duplicate facts already shown in the financing card unless required for filtering/search metadata.

Allowed chips below fold:

```text
Zero HOA
Target DSCR 1.30
7,250 sqft lot
Seller financing
```

Chip style:

```css
.chip {
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--zyne-border-soft);
  color: var(--zyne-text-primary);
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
}
```

Maximum chips per row at `360px`: `2`.

Do not use six chips in one compact cluster.

---

# 11. Agent card

The agent card must not appear in the first viewport.

```text
Minimum Y position: 820px
```

## Agent card layout

```text
X: 16px
W: 328px
Min H: 150px
Border radius: 12px
```

## Agent photo

```text
W: 72px
H: 72px
Border radius: 8px
```

## Agent text

```text
Name: 18px / 22px / 800
Brokerage: 13px / 18px / 400
```

## Agent buttons

Use two buttons only:

```text
View Profile
Contact Agent
```

Each button:

```text
Height: 40px
Font size: 13px
```

Do not use button text smaller than `13px`.

---

# 12. Remove or change these items from the current build

The current uploaded build still contains elements that must be changed.

## Must remove from first viewport

* Thumbnail row under the hero image
* Three tiny financing metric cards
* Chips/tags near the CTA
* Agent card visible near the bottom of the first screen
* Repeated seller-financing facts
* Any text smaller than `12px`

## Must change

| Current issue                       | Required change                                                |
| ----------------------------------- | -------------------------------------------------------------- |
| Hero is followed by thumbnail strip | Delete thumbnail strip; use photo-count pill inside hero       |
| Text is still compressed            | Use the exact font sizes in this spec                          |
| Financing terms are too small       | Replace mini-cards with one financing summary card             |
| Gold is used everywhere             | Use gold only for price, CTA, key icons, and selective borders |
| Chips appear too early              | Move chips below `Y = 680px`                                   |
| Agent card appears too early        | Move agent card below `Y = 820px`                              |
| Page still feels like a flyer       | First viewport must read like a mobile decision flow           |

---

# 13. Required first-screen visual result

At `360 × 640`, the screenshot must show only:

```text
Header
Hero image
Price
Address
Location
One-line hook
Seller financing summary card
Request Investment Packet button
Contact Listing Agent button
```

At `360 × 640`, the screenshot must not show:

```text
Thumbnail strip
Tag chips
Agent card
Four-card investment grid
Duplicate CTA bar
Long paragraph
Tiny metric labels
```

---

# 14. QA acceptance checklist

The build is not approved unless all items below pass.

## Layout QA

* Page has no horizontal scroll at `360px`.
* Header height is exactly `64px`.
* Hero image is exactly `328 × 200px`.
* Thumbnail row is removed.
* Price appears before address.
* Financing summary is one card, not three or four mini-cards.
* Primary CTA begins at approximately `Y = 544px`.
* Secondary CTA begins at approximately `Y = 606px`.
* No chips are visible before `Y = 680px`.
* Agent card starts no earlier than `Y = 820px`.

## Typography QA

* No visible text is smaller than `12px`.
* Body hook text is `16px`.
* Price is `40px`.
* Address is `20px`.
* CTA text is `14px`.
* Agent brokerage text is at least `13px`.

## Contrast QA

* Body text uses `#F7F3EA`.
* Secondary text uses `#BDB7AA`.
* Small text does not use muted gold.
* Text does not sit on textured/noisy background.
* Buttons and text pass WCAG AA contrast.

## Content QA

* First viewport contains no long paragraph.
* Hook sentence is exactly:
  `Seller-financed investment property with a clear path to target rent.`
* Financing card contains exactly:
  `Seller financing available`
  `$30K down • 6.51% note • ~$400/mo cash flow`
* No duplicated seller-financing terms appear in chips above the fold.

---

# 15. Final design principle

The mobile page must not try to explain the full investment thesis in the first screen.

The first screen has one job:

```text
Show the property, state the price, summarize the financing, and get the user to request the packet.
```

Everything else belongs below the fold.

The main unresolved issue in the latest build is that it still treats mobile as a compressed brochure. The spec above forces a true mobile decision flow: fewer elements, larger type, no thumbnails, no early chips, no early agent card, and no duplicated terms.

---
---

# PATCH 2 - ZYNE Mobile Listing Page — Updated Developer Fix Spec
The latest build has moved in the right direction. The major structural recommendations are now mostly implemented, but several execution issues remain: **badge readability, financing-card wrapping, CTA placement, header proportions, and first-viewport spacing**.

## Resolved

| Recommendation                         | Status                 | Notes                                                                       |
| -------------------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| Remove thumbnail strip                 | **Resolved**           | Mobile now uses a single hero image with a photo-count pill.                |
| Put price before address               | **Resolved**           | Price now appears immediately after the hero.                               |
| Replace long paragraph with short hook | **Resolved**           | The hook is now short and legible.                                          |
| Remove chips from first viewport       | **Resolved**           | Chips are no longer visible above the fold.                                 |
| Remove agent card from first viewport  | **Resolved**           | Agent card is no longer competing with primary content.                     |
| Use one financing summary card         | **Partially resolved** | The card exists, but the text wrapping is poor.                             |
| CTA clarity                            | **Mostly resolved**    | Primary CTA is clear; secondary CTA is partly clipped at the bottom.        |
| Improve contrast                       | **Partially resolved** | Main text is better, but badge text and small overlay text still need work. |

## Still pending

The main pending items are:

1. **Hero badge is not acceptable yet** — “FOR SALE” wraps into two lines, and “Seller financing” is too small/low-contrast.
2. **Schedule button wraps to two lines** — it should read as one clean control.
3. **Financing terms wrap awkwardly** — “note” is orphaned onto the second line.
4. **Secondary CTA is too low** — it is not fully visible within the 640px viewport.
5. **Header logo is too small** — the brand mark is visually weak compared with the CTA and hamburger.
6. **Hero crop makes the house feel small** — too much yard/sky is visible relative to the property.
7. **Vertical rhythm still needs tightening** — the screen is better, but elements should align to a stricter y-position system.

Use this as the updated developer handoff:

## Scope

This spec applies to the latest mobile build shown at `360 × 640`.

The structure is now mostly correct. Do not redesign the page. Fix the remaining implementation issues exactly as described below.

Target viewport:

```text
360px width × 640px height
```

Primary goal:

```text
The full first-screen flow must be readable, balanced, and fully visible:
Header → Hero → Price → Address → Location → Hook → Financing Card → Primary CTA → Secondary CTA
```

---

# 1. Current build status

## Keep these changes

Do not revert the following:

* Keep single hero image.
* Keep photo-count pill inside hero.
* Keep price before address.
* Keep short hook sentence.
* Keep one financing summary card.
* Keep primary CTA.
* Keep secondary CTA.
* Keep chips below the first viewport.
* Keep agent card below the first viewport.
* Keep thumbnails removed from mobile.

---

# 2. Required first viewport layout

At `360 × 640`, the page must show the complete secondary CTA without clipping.

Use this exact vertical layout:

| Element        |    X |     Y |     W |     H |
| -------------- | ---: | ----: | ----: | ----: |
| Header         |  `0` |   `0` | `360` |  `64` |
| Hero image     | `16` |  `74` | `328` | `198` |
| Price          | `16` | `288` | `328` |  `44` |
| Address        | `16` | `340` | `328` |  `24` |
| Location       | `16` | `366` | `328` |  `20` |
| Hook           | `16` | `398` | `328` |  `46` |
| Financing card | `16` | `456` | `328` |  `78` |
| Primary CTA    | `16` | `548` | `328` |  `48` |
| Secondary CTA  | `16` | `608` | `328` |  `40` |

Important:

```text
The secondary CTA must be fully visible at 640px viewport height.
No bottom clipping is allowed.
```

Because the secondary CTA bottom is `648px` using the table above, apply one of these two approved fixes:

## Approved option A — preferred

Move the secondary CTA upward:

```text
Secondary CTA Y: 600px
Secondary CTA H: 40px
Bottom: 640px
```

## Approved option B

Reduce vertical gap between primary and secondary CTA:

```text
Primary CTA bottom: 596px
Secondary CTA Y: 600px
Secondary CTA H: 40px
```

Do not let the secondary CTA start lower than `600px`.

---

# 3. Header fixes

## Current issue

The header has two problems:

1. The logo is too small.
2. The `SCHEDULE BRIEFING` button wraps into two lines.

## Required header layout

```text
Header height: 64px
Horizontal padding: 16px
```

| Element         |     X |    Y |     W |    H |
| --------------- | ----: | ---: | ----: | ---: |
| Logo            |  `16` | `14` | `104` | `36` |
| Schedule button | `144` | `16` | `150` | `32` |
| Hamburger       | `316` | `22` |  `28` | `20` |

## Logo

Increase the logo group size.

Current logo is too small and visually underpowered.

Required:

```css
.logo {
  width: 104px;
  height: 36px;
  object-fit: contain;
}
```

Do not make the logo smaller than `100px` wide.

## Schedule button

The text must stay on one line.

Text:

```text
SCHEDULE BRIEFING
```

Required CSS:

```css
.schedule-button {
  width: 150px;
  height: 32px;
  padding: 0;
  border: 1px solid #E7C34A;
  background: transparent;
  color: #E7C34A;

  font-size: 11px;
  line-height: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;

  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Do not allow the text to wrap.

Remove any CSS that causes:

```css
white-space: normal;
```

or allows a line break inside the schedule button.

## Hamburger

Keep the hamburger as plain white lines.

Required:

```css
.hamburger {
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  height: 2px;
  background: #F7F3EA;
  border-radius: 2px;
}
```

Do not add a gold border or button container around the hamburger.

---

# 4. Hero image fixes

## Current issue

The hero is structurally correct, but the crop makes the house feel slightly small.

## Required hero container

```css
.hero {
  position: relative;
  width: 328px;
  height: 198px;
  margin: 10px 16px 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(231, 195, 74, 0.42);
}
```

## Hero image crop

The house must be visually dominant.

Required image behavior:

```css
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
}
```

If the house still appears too small, use:

```css
.hero img {
  transform: scale(1.06);
}
```

Do not scale above `1.08`.

---

# 5. Hero badge fixes

## Current issue

The badge currently fails readability:

* `FOR SALE` wraps into two lines.
* `Seller financing` is too small.
* The text appears cramped.
* The badge is too tall relative to its content.

## Required badge size

```text
Badge X: 12px inside hero
Badge Y: 12px inside hero
Badge W: 116px
Badge H: 64px
```

## Required badge text

Use exactly:

```text
FOR SALE
Seller financing
```

Do not use:

```text
SELLER FINANCING AVAILABLE
```

Do not use all-caps for the second line.

## Required badge CSS

```css
.hero-badge {
  position: absolute;
  left: 12px;
  top: 12px;
  width: 116px;
  height: 64px;

  background: rgba(5, 5, 5, 0.82);
  border: 1px solid rgba(231, 195, 74, 0.55);
  border-radius: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-badge-primary {
  color: #F2CC4D;
  font-size: 17px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.hero-badge-secondary {
  margin-top: 4px;
  color: #F7F3EA;
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  white-space: nowrap;
}
```

Acceptance criteria:

```text
“FOR SALE” must appear on one line.
“Seller financing” must appear on one line.
No text inside the badge may be smaller than 12px.
```

---

# 6. Photo-count pill fixes

## Current issue

The photo-count pill is mostly correct. Keep it, but lock its size and contrast.

## Required text

Use the actual photo count from the listing.

Examples:

```text
See all 9 photos
```

or

```text
See all 18 photos
```

Do not hardcode `9` or `18` unless that is the actual listing photo count.

## Required CSS

```css
.photo-pill {
  position: absolute;
  right: 12px;
  bottom: 12px;

  height: 38px;
  padding: 0 14px;
  border-radius: 999px;

  background: rgba(5, 5, 5, 0.82);
  color: #F7F3EA;

  font-size: 14px;
  line-height: 18px;
  font-weight: 800;

  display: flex;
  align-items: center;
  gap: 8px;
}
```

Do not use text smaller than `14px` in this pill.

---

# 7. Listing text fixes

## Price

Current price is acceptable. Keep it large.

Required CSS:

```css
.price {
  margin: 16px 16px 0;
  font-size: 40px;
  line-height: 44px;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #E7C34A;
}
```

## Address

Current address is acceptable. Use this exact sizing:

```css
.address {
  margin: 4px 16px 0;
  font-size: 20px;
  line-height: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #F7F3EA;
}
```

## Location

Current location is acceptable, but ensure it is not too small.

```css
.location {
  margin: 2px 16px 0;
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #F7F3EA;
}
```

Pin icon:

```css
.location-icon {
  color: #E7C34A;
  width: 13px;
  height: 13px;
}
```

## Hook sentence

Current hook is good. Keep exact wording:

```text
Seller-financed investment property with a clear path to target rent.
```

Required CSS:

```css
.hook {
  margin: 10px 16px 0;
  width: 328px;

  font-size: 16px;
  line-height: 23px;
  font-weight: 500;
  color: #F7F3EA;
}
```

Do not allow this to exceed two lines.

---

# 8. Financing card fixes

## Current issue

The financing card exists, but the text wraps incorrectly:

Current visual problem:

```text
$30K down • 6.51%
note • ~$400/mo cash flow
```

This is not acceptable because `note` is orphaned onto the second line.

## Required content

Use exactly three lines:

```text
Seller financing available
$30K down • 6.51% note
~$400/mo target cash flow
```

Do not attempt to force all terms onto one line.

## Required card size

```text
X: 16px
Y: approximately 456px
W: 328px
H: 78px
```

## Required CSS

```css
.financing-card {
  margin: 14px 16px 0;
  width: 328px;
  min-height: 78px;
  padding: 12px 16px;

  background: #0B0B0A;
  border: 1px solid rgba(231, 195, 74, 0.30);
  border-radius: 9px;
}

.financing-card-title {
  margin: 0;
  font-size: 15px;
  line-height: 19px;
  font-weight: 800;
  color: #F7F3EA;
}

.financing-card-line {
  margin: 3px 0 0;
  font-size: 16px;
  line-height: 19px;
  font-weight: 800;
  color: #F7F3EA;
}

.financing-card-separator {
  color: #E7C34A;
  padding: 0 5px;
}
```

## Required markup

Use separate text lines. Do not rely on browser wrapping.

```html
<div class="financing-card">
  <p class="financing-card-title">Seller financing available</p>
  <p class="financing-card-line">$30K down <span class="financing-card-separator">•</span> 6.51% note</p>
  <p class="financing-card-line">~$400/mo target cash flow</p>
</div>
```

Acceptance criteria:

```text
“6.51% note” must stay together on the same line.
“~$400/mo target cash flow” must stay together on the same line.
No orphaned single word is allowed.
```

---

# 9. Primary CTA fixes

## Current status

The primary CTA is mostly correct.

## Required CSS

```css
.primary-cta {
  margin: 14px 16px 0;
  width: 328px;
  height: 48px;

  border: none;
  border-radius: 6px;

  background: linear-gradient(180deg, #F3D76A 0%, #C99D24 100%);
  color: #080808;

  font-size: 14px;
  line-height: 16px;
  font-weight: 900;
  letter-spacing: 0.08em;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
```

Text:

```text
REQUEST INVESTMENT PACKET
```

Do not change the text.

The icon may remain, but it must not reduce text readability.

---

# 10. Secondary CTA fixes

## Current issue

The secondary CTA is visible but too low. It appears clipped at the bottom of the screenshot.

## Required positioning

The secondary CTA must be fully visible inside the `360 × 640` viewport.

Required:

```css
.secondary-cta {
  margin: 8px 16px 0;
  width: 328px;
  height: 40px;

  border: 1px solid #E7C34A;
  border-radius: 6px;
  background: transparent;
  color: #E7C34A;

  font-size: 14px;
  line-height: 16px;
  font-weight: 900;
  letter-spacing: 0.08em;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
```

Text:

```text
CONTACT LISTING AGENT
```

Acceptance criteria:

```text
At 360 × 640, the entire secondary CTA border must be visible.
The bottom border may not be clipped.
```

---

# 11. Do not reintroduce removed density

The current build is close. Do not add any of these back into the first viewport:

```text
Thumbnail row
Metric mini-cards
Chips
Agent card
Duplicate sticky CTA
Long paragraph
Four-card investment grid
Extra badges
Extra icons
```

The first viewport must remain focused.

---

# 12. Below-fold rules

Content below the first viewport may begin only after:

```text
Y = 672px
```

Allowed below-fold sections:

1. Deal highlights
2. Property details
3. Financing details
4. Agent card
5. Full gallery
6. Disclosures

## Chips

Chips may appear below the first viewport only.

Allowed chips:

```text
Zero HOA
Target DSCR 1.30
7,250 sqft lot
Seller financing
20% down
```

Chip requirements:

```css
.chip {
  height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(231, 195, 74, 0.22);
  color: #F7F3EA;
  font-size: 13px;
  line-height: 16px;
  font-weight: 600;
}
```

Maximum chips per row:

```text
2 chips per row at 360px width
```

---

# 13. Contrast requirements

The following text must be checked manually in the screenshot:

| Element              | Required status                  |
| -------------------- | -------------------------------- |
| Badge primary text   | Must be readable at a glance     |
| Badge secondary text | Must be readable without zooming |
| Schedule button      | Must not wrap                    |
| Financing card terms | Must not orphan words            |
| Secondary CTA        | Must be fully visible            |
| Photo pill           | Must be readable over image      |

Use these text colors:

```css
Main text: #F7F3EA
Secondary text: #BDB7AA
Gold emphasis: #E7C34A
Button text: #080808
```

Do not use muted gold for small text.

---

# 14. QA checklist before handoff

The build is not approved unless all items pass.

## Header

* Logo is at least `100px` wide.
* `SCHEDULE BRIEFING` appears on one line.
* Hamburger is plain white lines.
* Header height is `64px`.

## Hero

* Hero is `328px × 198px`.
* House is visually dominant in crop.
* Badge is `116px × 64px`.
* `FOR SALE` appears on one line.
* `Seller financing` appears on one line.
* Photo pill is inside hero and legible.

## Main content

* Price is `40px`.
* Address is `20px`.
* Hook is exactly two lines or fewer.
* No long paragraph appears.

## Financing card

* Card is one component, not three mini-cards.
* Text is three controlled lines.
* `6.51% note` stays together.
* `~$400/mo target cash flow` stays together.
* No browser-created awkward wrap is allowed.

## CTAs

* Primary CTA is fully visible.
* Secondary CTA is fully visible.
* Secondary CTA bottom border is not clipped.
* No sticky CTA appears before scroll.

## Density

* No thumbnails above the fold.
* No chips above the fold.
* No agent card above the fold.
* No duplicated financing facts above the fold.

---

# 15. Final acceptance screenshot

Submit a `360 × 640` screenshot.

The screenshot must show, in this order:

```text
Header
Hero image
Price
Address
Location
Hook
Financing card
Request Investment Packet
Contact Listing Agent
```

The screenshot must not show:

```text
Thumbnails
Chips
Agent card
Sticky bottom CTA
Long paragraph
Metric mini-cards
```

The final screenshot will be rejected if:

```text
SCHEDULE BRIEFING wraps.
FOR SALE wraps.
Seller financing is unreadable.
The financing card has awkward line breaks.
The secondary CTA is clipped.
```

The latest build is now structurally close. The remaining work is no longer about adding features; it is about **tight execution**: clean wrapping, visible CTAs, better badge readability, and stricter first-screen spacing.
