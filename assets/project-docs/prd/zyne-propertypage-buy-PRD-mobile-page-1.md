⚠️Below is a **developer-ready handoff**. It is intentionally strict and removes interpretation.

# ZYNE Mobile Listing Page — Required Developer Changes

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
