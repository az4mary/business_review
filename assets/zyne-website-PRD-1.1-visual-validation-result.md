# Responsive Visual QA Pass

## Overall verdict

| Device/state      | QA status                          | Summary                                                                |
| ----------------- | ---------------------------------- | ---------------------------------------------------------------------- |
| Desktop           | Mostly good                        | Strong premium visual system; minor spacing/readability issues         |
| Tablet            | Acceptable but needs refinement    | Hero feels sparse; some sections become tall/heavy                     |
| Mobile            | Functional but needs polish        | Main content stacks correctly; footer and card length need improvement |
| Mobile menu       | Needs revision                     | Menu opens, but it visually covers the hero headline                   |
| Mobile sticky CTA | Not currently captured in workflow | Needs dedicated screenshot state                                       |

---

# High-priority issues

## 1. Mobile menu overlays and hides the hero headline

**Severity:** High
**Device:** Mobile menu state

In `Mobile-Menu.png`, the menu panel opens over the hero area and hides the main headline. The visible content begins around the hero body copy:

```text id="ny0vky"
ZYNE helps ambitious service businesses...
```

This makes the open-menu state feel accidental rather than designed.

### Recommendation

Choose one behavior:

| Option                   | Recommendation                |
| ------------------------ | ----------------------------- |
| Full-screen menu overlay | Best for premium mobile UX    |
| Push-content menu        | Acceptable, but less polished |
| Current partial overlay  | Not recommended               |

Preferred design:

```text id="tvb1xy"
Header
Full-height dark menu panel
Services
Growth Paths
Intelligence
Delivery
Industries
FAQ
Shop Services CTA
```

Also change the hamburger icon to a visible close state when open.

---

## 2. Mobile sticky CTA needs its own screenshot

**Severity:** High
**Device:** Mobile scrolled state

The current screenshot set includes:

```text id="6kd0x5"
Mobile.png
Mobile-Menu.png
```

but not:

```text id="zqvj5n"
Mobile-Sticky-CTA.png
```

The sticky CTA is a conversion-critical feature, so it should be captured separately.

### Recommendation

Add:

```text id="q78qwm"
Mobile-Sticky-CTA.png
```

at `390 × 844`, viewport-only, after scrolling past the hero threshold.

---

## 3. Footer is cramped on mobile

**Severity:** High
**Device:** Mobile

The footer content becomes narrow and dense. The legal/service responsibility copy is difficult to read, and the columns feel squeezed.

Current mobile footer behavior visually creates tight vertical text columns instead of a clean stacked footer.

### Recommendation

On mobile, force footer to a single-column layout:

```css id="no2ucs"
@media (max-width: 640px) {
  footer {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  footer small {
    grid-column: auto;
  }
}
```

Also consider separating the long disclaimer copy from the legal links.

---

## 4. Tablet hero has too much empty right-side space

**Severity:** Medium
**Device:** Tablet

At `768px`, the hero mark is hidden, but the hero still feels like it was designed for a two-column composition. The left content is readable, but the right side of the section feels underused.

### Recommendation

For tablet, either:

* keep a smaller hero mark visible, or
* reduce hero vertical padding/min-height, or
* center the hero content more confidently.

Suggested direction:

```css id="fl2hic"
@media (min-width: 641px) and (max-width: 1000px) {
  .hero {
    min-height: auto;
    padding-block: 6rem;
  }
}
```

---

# Medium-priority issues

## 5. Mobile product cards make the page very long

**Severity:** Medium
**Device:** Mobile

The mobile page is structurally correct, but it becomes extremely long because every product card renders as a full block with metadata, description, CTA, and pricing.

This is not broken, but it creates scroll fatigue.

### Recommendation

For mobile product cards:

* tighten vertical padding,
* reduce metadata spacing,
* consider showing only one metadata row or collapsing secondary detail,
* keep CTA visible and consistent.

---

## 6. Desktop product-card metadata is too small

**Severity:** Medium
**Device:** Desktop

The `Best for` and `Timeline` metadata is visually compressed. Some values wrap tightly and become hard to scan.

### Recommendation

Increase metadata readability:

```css id="4yx7t4"
.product-meta div {
  font-size: .86rem;
  line-height: 1.55;
}

.product-meta dd {
  max-width: 60%;
}
```

---

## 7. Some muted text is too low contrast

**Severity:** Medium
**Devices:** All

The visual system is premium, but some secondary text is very dim, especially:

* footer copy,
* disclosure text,
* small uppercase labels,
* mobile metadata,
* long descriptions on cards.

### Recommendation

Raise muted text contrast slightly:

```css id="z7yeje"
:root {
  --muted: #b2aca1;
}
```

or selectively use a stronger secondary copy color where readability matters.

---

## 8. Desktop spacing is elegant but sometimes excessive

**Severity:** Low-to-medium
**Device:** Desktop

The desktop layout has a strong luxury feel, but some section transitions are very tall, especially between major blocks.

Examples:

* after Growth Path cards before Services,
* before Intelligence,
* before FAQ/final CTA.

### Recommendation

Keep the premium breathing room, but reduce some section padding by 10–15%.

---

# Low-priority polish

## 9. Mobile header is functional but visually tight

**Device:** Mobile

The header has logo, menu, and Shop Services CTA all in one row. It works, but the row feels dense at 390px.

### Recommendation

Either:

* reduce logo size slightly on mobile, or
* make `Shop Services` a shorter label such as `Services`, or
* move primary shopping CTA into the menu and sticky CTA.

---

## 10. Mobile menu should include primary CTA

**Device:** Mobile menu

The open menu lists navigation links but does not feel like a complete conversion panel.

### Recommendation

Add a strong CTA inside the open menu:

```text id="phfp7q"
Find My Growth Path
Shop Services
```

This is especially useful if the header `Shop Services` button is removed or shortened on mobile.

---

# What looks good

## Desktop

* Header and hero are now aligned correctly.
* Hero composition feels premium and balanced.
* Trust strip works well.
* Growth Path cards are clear and visually consistent.
* Product imagery in Featured Strategic Services is strong.
* FAQ and final CTA are visually clean.

## Tablet

* Layout remains stable.
* Two-column card grids work.
* Product sections remain readable.
* No obvious overflow or broken layout.

## Mobile

* Hero typography is readable.
* CTAs are large and tappable.
* Growth Path cards stack cleanly.
* FAQ is usable.
* Sticky CTA behavior is working in the real scrolled state.

---

# Recommended next changes

I would prioritize these in order:

1. Add `Mobile-Sticky-CTA.png` to the capture workflow.
2. Redesign mobile menu open state so it does not obscure the hero headline.
3. Fix mobile footer layout.
4. Reduce tablet hero vertical emptiness.
5. Improve small-text contrast and product-card metadata readability.

The site is visually coherent and usable across devices, but the **mobile menu state and mobile footer** should be fixed before considering the responsive QA complete.
