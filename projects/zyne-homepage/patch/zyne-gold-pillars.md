---

# ⚠️ MANDATORY RULES:

1. DO NOT MODIFY THE RULES AND DO NOT DELETE/MODIFY ANY CONTENT IN THIS FILE.
2. ⚠️ Always adhere to ALL instructions/steps/format or ask for approvals before you deviate from the plan.
3. READ complete file without skipping/search chunk from top to bottom before you start the task so you can understand the correct sequence to execute the task.
4. Find/Replace/edit ONLY (NOTHING ELSE) requested blocks exactly as in the Patch Instructions.
5. Follow the steps of the task and just report as-is even if it was not the expected outcome.
6. Commit changes regularly - Push to github origin via the existing MAIN branch. 
7. Then **ONLY** reply `DONE` and nothing else in the chat conversation so I know the required file has been updated with your comment/report.
8. Be 🎯 because any deviation from this rule will lead to your termination without warning at anytime.
9. Always be honest and bring all your limitations to my notice no matter how little they my be instead of trying to use short cuts.

---

# PATCH 1

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

Use this format to complete report file D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\patch\zyne-gold-pillars-report.md:

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

## 6. Notes / Issues
* Any console errors:

## 7. Questions for Review

---

# PATCH 2

Use this patch in `projects/zyne-homepage/scripts/generate-property-route.mjs`.

Replace the existing `.cta`, `.cta::after`, `.cta > *`, `.cta h2`, and `.cta p` CSS blocks with this:

```css
.cta {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 360px 210px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 1.65rem 2rem;
  margin: 1.5rem 0;
  min-height: 150px;
  background:
    radial-gradient(circle at right center, rgba(201,154,46,.16), transparent 20rem),
    linear-gradient(90deg, rgba(32,24,9,.72), rgba(12,12,10,.96) 55%, rgba(6,6,6,.98));
}

.cta::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 230px;
  height: 100%;
  background-image: url("/assets/decor/zyne-gold-pillars.png");
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  opacity: .86;
  pointer-events: none;
}

.cta > * {
  position: relative;
  z-index: 2;
}

.cta h2 {
  font-family: Georgia, "Times New Roman", serif;
  color: var(--gold2);
  font-size: 1.85rem;
  line-height: 1.08;
  text-transform: uppercase;
  letter-spacing: .035em;
  margin: 0 0 .55rem;
}

.cta p {
  max-width: 640px;
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
}
```

Then add/replace this CTA button-specific CSS:

```css
.cta .button {
  min-height: 50px;
  font-size: .68rem;
  letter-spacing: .15em;
}

.cta .button.secondary {
  margin-top: .75rem;
}
```

Update the mobile rule inside `@media (max-width: 900px)` from:

```css
.cta {
  grid-template-columns: 1fr;
}
```

to:

```css
.cta {
  grid-template-columns: 1fr;
  padding: 1.5rem;
}

.cta::after {
  width: 155px;
  opacity: .28;
}
```

Also remove or override this old mobile rule if it exists:

```css
.cta::after {
  opacity: .25;
}
```

Use this instead inside `@media (max-width: 760px)`:

```css
.cta {
  min-height: 180px;
}

.cta::after {
  width: 135px;
  opacity: .22;
}

.cta h2 {
  font-size: 1.45rem;
}

.cta .button {
  min-height: 48px;
}
```

Run:

```bash
node scripts/generate-property-route.mjs
```

Validate:

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected result: the CTA should become shorter, the buttons should sit center-right like the mockup, and the pillar artwork should sit as a decorative far-right motif rather than overpowering the button area.
