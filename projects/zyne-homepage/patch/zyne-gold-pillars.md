The only part to patch is the embedded CTA CSS inside `generate-property-route.mjs`. The file currently creates the CTA decoration using `repeating-linear-gradient(...)` in `.cta::after` . Replace that with the real pillar image asset.

## Concrete patch
"D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\scripts\generate-property-route.mjs"
In `projects/zyne-homepage/scripts/generate-property-route.mjs`, find this block:

```css
.cta {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 2.5rem 2.75rem;
  margin: 1.75rem 0;
  background:
    radial-gradient(circle at right bottom, rgba(201,154,46,.20), transparent 18rem),
    linear-gradient(135deg, rgba(201,154,46,.1), rgba(255,255,255,.01));
}

.cta::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 240px;
  height: 100%;
  background:
    linear-gradient(90deg, transparent, rgba(201,154,46,.10)),
    repeating-linear-gradient(
      90deg,
      transparent 0 27px,
      rgba(201,154,46,.30) 28px 34px
    );
  opacity: .9;
}
```

Replace it with:

```css
.cta {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 2.5rem 2.75rem;
  margin: 1.75rem 0;
  background:
    radial-gradient(circle at right bottom, rgba(201,154,46,.18), transparent 19rem),
    linear-gradient(135deg, rgba(201,154,46,.10), rgba(255,255,255,.01));
}

.cta::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 245px;
  height: 100%;
  background-image:
    linear-gradient(90deg, transparent 0%, rgba(5,5,5,.15) 35%, rgba(5,5,5,.30) 100%),
    url("/assets/decor/zyne-gold-pillars.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  opacity: .88;
  pointer-events: none;
}
```

Then update this existing mobile rule:

```css
.cta::after {
  opacity: .25;
}
```

to:

```css
.cta::after {
  width: 165px;
  opacity: .28;
}
```

That mobile rule is inside the `@media (max-width: 760px)` block near the bottom of the CSS .

## Dry run

From `projects/zyne-homepage`:

```bash
node scripts/generate-property-route.mjs
```

Expected terminal output:

```text
Generated homedetail/7101-wendemere-st-houston-tx-77088/index.html with X copied image(s)
```

Then confirm the generated HTML contains the asset path:

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match inside the embedded CSS.

## Validation

Open:

```text
projects/zyne-homepage/dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Check the CTA section:

* The right side should now show the actual gold pillar artwork.
* The pillar image should sit at the bottom-right of the CTA.
* It should not cover the buttons.
* It should scale down on mobile.
* The old vertical stripe-only effect should be gone.

Also verify the asset loads directly:

```text
/assets/decor/zyne-gold-pillars.png
```

If the page is opened from `file://`, absolute `/assets/...` may not resolve. Test through your local server/build preview instead.

---

Use this format when you send the completed report back to me:

````md
# ZYNE Property Page Implementation Report

## 1. Branch / Commit
- Branch:
- Commit hash:
- Deployment URL:
- Local preview URL:

## 2. Files Changed
- `projects/zyne-homepage/scripts/generate-property-route.mjs`
- `projects/zyne-homepage/scripts/property-icons.mjs`
- `projects/zyne-homepage/assets/decor/zyne-gold-pillars.png`
- Any other files changed:

## 3. What Was Implemented
- CTA pillar image added:
- Inline SVG icons retained:
- Gallery/lightbox still working:
- Static Node generator still used:
- No regex post-processing used:

## 4. Dry Run Output
Paste terminal output:

```bash
node scripts/generate-property-route.mjs
````

Output:

```text
```

## 5. Validation Checks

Paste results:

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

## 6. Screenshots

Attach screenshots for:

* Desktop full page
* Desktop CTA section close-up
* Mobile hero section
* Mobile CTA section
* Lightbox open state

## 7. Notes / Issues

* Anything that looks different from the mockup:
* Any asset-loading issues:
* Any mobile layout concerns:
* Any console errors:

## 8. Questions for Review

*

```

Most important attachments: **desktop full page**, **CTA close-up**, and the updated `generate-property-route.mjs` if anything changed beyond the CSS patch.
```

