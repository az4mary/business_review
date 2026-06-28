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

Below is the **final concrete desktop-production patch** for the property page.
"D:\PROJECTS\GITHUB\az4mary\zyne.store\projects\zyne-homepage\scripts\generate-property-route.mjs"

This patch adds the **Listing Agent / Platinum Agent contact card**, includes the HAR URL, and applies final desktop polish based on the mockup.

---

# Patch Steps

## 1. Add agent data after the `property` object

In `generate-property-route.mjs`, after the existing `const property = {...};` block, add:

```js
const agent = {
  name: "Carissa Weber",
  badge: "PLATINUM",
  brokerage: "Better Homes and Gardens Real Estate",
  market: "Gary Greene - Sugar Land",
  profileUrl: "https://www.har.com/carissa-weber/agent_WEBERC",
  photo: "/assets/agents/carissa-weber.png"
};
```

The generator currently defines the property data near the top of the file, so this should sit directly after that object. 

Save the agent image here:

```text
projects/zyne-homepage/public/assets/agents/carissa-weber.png
```

---

## 2. Reduce desktop page width

Find:

```css
.page {
  width: calc(100% - 3rem);
  max-width: 1500px;
  margin: 0 auto;
}
```

Replace with:

```css
.page {
  width: calc(100% - 3rem);
  max-width: 1360px;
  margin: 0 auto;
}
```

This makes the desktop layout feel closer to the mockup and less zoomed-out.

---

## 3. Fix property title wrapping

Find:

```css
h1 {
  font-size: clamp(3.45rem, 5vw, 5.2rem);
  line-height: .92;
  letter-spacing: -.055em;
  margin: .8rem 0 .35rem;
  font-weight: 500;
}
```

Replace with:

```css
h1 {
  font-size: clamp(3.2rem, 4.4vw, 4.65rem);
  line-height: .95;
  letter-spacing: -.055em;
  margin: .8rem 0 .35rem;
  font-weight: 500;
}
```

This should prevent the awkward:

```text
7101
Wendemere
St
```

and make it closer to:

```text
7101
Wendemere St
```

---

## 4. Add Listing Agent card CSS

Add this CSS after the `.tags span` block and before `.stats`:

```css
.agent-card {
  margin-top: 1.45rem;
  padding-top: 1.35rem;
  border-top: 1px solid rgba(201,154,46,.18);
}

.agent-card h2 {
  margin: 0 0 1rem;
  font-size: .95rem;
  color: var(--gold2);
  text-transform: uppercase;
  letter-spacing: .15em;
}

.agent-profile {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 1rem;
  align-items: center;
}

.agent-profile img {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border: 1px solid var(--line);
}

.agent-profile h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--text);
}

.agent-badge {
  display: inline-block;
  margin-left: .45rem;
  padding: .12rem .42rem;
  border: 1px solid #3f66ff;
  background: #03117a;
  color: #fff;
  font-size: .62rem;
  font-style: italic;
  letter-spacing: .08em;
  vertical-align: middle;
}

.agent-profile p {
  margin: .25rem 0 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--muted);
}

.agent-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
  margin-top: 1rem;
}

.agent-actions a {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gold);
  color: var(--gold2);
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: .68rem;
  font-weight: 900;
}

.agent-actions a:hover {
  background: rgba(201,154,46,.09);
}
```

---

## 5. Add the agent card HTML inside the summary card

Find this part inside `const summary = ...`:

```js
    <div class="tags">
      ${tag("Large lot")}
      ${tag("No HOA")}
      ${tag("Covered porch")}
      ${tag("Near schools")}
      ${tag("Available now")}
    </div>
  </aside>
`;
```

Replace with:

```js
    <div class="tags">
      ${tag("Large lot")}
      ${tag("No HOA")}
      ${tag("Covered porch")}
      ${tag("Near schools")}
      ${tag("Available now")}
    </div>

    <div class="agent-card">
      <h2>Listing Agent</h2>

      <div class="agent-profile">
        <img src="${agent.photo}" alt="${agent.name}, listing agent">

        <div>
          <h3>
            ${agent.name}
            <span class="agent-badge">${agent.badge}</span>
          </h3>
          <p>${agent.brokerage}</p>
          <p>${agent.market}</p>
        </div>
      </div>

      <div class="agent-actions">
        <a href="${agent.profileUrl}" target="_blank" rel="noopener noreferrer">
          View Profile
        </a>

        <a href="${agent.profileUrl}" target="_blank" rel="noopener noreferrer">
          Contact Agent
        </a>
      </div>
    </div>
  </aside>
`;
```

The summary card is currently where the property status, address, price, metrics, CTAs, and tags are rendered, so this is the correct place for the agent card. 

---

## 6. Improve “What’s Special” desktop visual weight

Find:

```css
.feature-grid article {
  text-align: center;
  padding: 1.25rem 1rem;
  border-right: 1px solid rgba(201,154,46,.2);
}
```

Replace with:

```css
.feature-grid article {
  text-align: center;
  padding: 1.6rem 1.15rem;
  border-right: 1px solid rgba(201,154,46,.2);
}
```

Find:

```css
.feature-grid h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .85rem;
  line-height: 1.35;
}
```

Replace with:

```css
.feature-grid h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .92rem;
  line-height: 1.35;
}
```

Find:

```css
.feature-grid p {
  font-size: 14px;
  line-height: 1.6;
}
```

Replace with:

```css
.feature-grid p {
  font-size: 14.5px;
  line-height: 1.65;
}
```

---

## 7. Improve Property Overview desktop balance

Add this after the `.overview` block:

```css
.overview p {
  max-width: 560px;
  font-size: 15.5px;
}
```

Then replace the overview paragraph content with:

```js
<p>
  This three-bedroom bungalow offers comfort, space, and convenience with
  a covered front porch, large lot, and open kitchen/dining connection.
  With no HOA and easy access to major roads, schools, and shopping, this
  home is ready for immediate move-in consideration. The layout is practical,
  bright, and well-suited for everyday living.
</p>
```

---

## 8. Final CTA polish

The current generator already uses the pillar asset in `.cta::after`, which is correct. The CTA asset path is already present as `/assets/decor/zyne-gold-pillars.png`. 

Only adjust these values:

Find:

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
```

Replace only the padding/min-height lines:

```css
  padding: 1.85rem 2.25rem;
  margin: 1.5rem 0;
  min-height: 165px;
```

Find:

```css
.cta::after {
  width: 230px;
```

Replace with:

```css
.cta::after {
  width: 255px;
```

Find:

```css
.cta h2 {
  font-size: 1.85rem;
```

Replace with:

```css
.cta h2 {
  font-size: 2rem;
```

Find:

```css
.cta p {
  max-width: 640px;
  font-size: 14px;
```

Replace with:

```css
.cta p {
  max-width: 640px;
  font-size: 14.5px;
```

---

# Dry Run

From:

```bash
projects/zyne-homepage
```

Run:

```bash
node scripts/generate-property-route.mjs
```

Expected output:

```text
Generated homedetail/7101-wendemere-st-houston-tx-77088/index.html with 7 copied image(s)
```

---

# Validation

Run:

```bash
grep -n "carissa-weber" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: matches for:

```text
/assets/agents/carissa-weber.png
https://www.har.com/carissa-weber/agent_WEBERC
```

Run:

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match inside CTA CSS.

Run:

```bash
grep -n "Listing Agent" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match inside the summary card.

---

# Final Report Format

Update file D:\PROJECTS\GITHUB\az4mary\zyne.store\homedetail\7101-wendemere-st-houston-tx-77088\patch\final-desktop-listing-agent-report.md:

````md
# Desktop Production Readiness Report

## 1. Branch / Commit
- Branch:
- Commit hash:
- Local preview URL:
- Deployment URL:

## 2. Files Changed
- `scripts/generate-property-route.mjs`
- `public/assets/agents/carissa-weber.png`
- `public/assets/decor/zyne-gold-pillars.png`

## 3. Implementation Summary
- Desktop max-width reduced:
- Agent card added:
- HAR profile URL added:
- CTA pillar asset retained:
- Hero title wrapping fixed:
- Feature sections polished:
- Property overview expanded:

## 4. Dry Run Output

```bash
node scripts/generate-property-route.mjs
````

Output:

```text
```

## 5. Validation Output

```bash
grep -n "carissa-weber" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

```bash
grep -n "Listing Agent" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

## 6. Issues / Notes

* Console errors:
* Other:

```

After this patch, the desktop version should be ready for final design review before moving to tablet/mobile.
```
---

# PATCH 2

Below is the **desktop-only production-readiness patch**. Do **not** change header/footer.

# Patch Steps

## 1. Desktop page width: restore premium balance

In `projects/zyne-homepage/scripts/generate-property-route.mjs`, find:

```css
.page {
  width: calc(100% - 3rem);
  max-width: 1360px;
  margin: 0 auto;
}
```

Replace with:

```css
.page {
  width: calc(100% - 3rem);
  max-width: 1440px;
  margin: 0 auto;
}
```

This gives the page more breathing room without returning to the overly stretched `1500px`.

---

## 2. Improve hero card width and prevent bad title wrapping

Find:

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(420px, .95fr);
  gap: 1.5rem;
  align-items: stretch;
}
```

Replace with:

```css
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr);
  gap: 1.5rem;
  align-items: stretch;
}
```

Find:

```css
h1 {
  font-size: clamp(3.2rem, 4.4vw, 4.65rem);
  line-height: .95;
  letter-spacing: -.055em;
  margin: .8rem 0 .35rem;
  font-weight: 500;
}
```

Replace with:

```css
h1 {
  font-size: clamp(3rem, 4vw, 4.25rem);
  line-height: .96;
  letter-spacing: -.052em;
  margin: .8rem 0 .35rem;
  font-weight: 500;
}
```

Goal:

```text
7101
Wendemere St
```

not:

```text
7101
Wendemere
St
```

---

## 3. Make summary card feel less crowded

Find:

```css
.summary {
  height: 100%;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.012));
  padding: 2.8rem 2.5rem;
}
```

Replace with:

```css
.summary {
  height: 100%;
  border: 1px solid var(--line);
  background:
    linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.012));
  padding: 2.6rem 2.35rem;
}
```

Find:

```css
.metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--line);
  margin: 1.55rem 0;
}
```

Replace with:

```css
.metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--line);
  margin: 1.35rem 0;
}
```

Find:

```css
.tags {
  display: flex;
  gap: .55rem;
  flex-wrap: wrap;
  margin-top: 1.45rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(201,154,46,.18);
}
```

Replace with:

```css
.tags {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(201,154,46,.18);
}
```

---

## 4. Upgrade the agent card so it feels integrated

Find your existing `.agent-card`, `.agent-profile`, `.agent-profile img`, `.agent-actions`, and related agent CSS. Replace the whole agent CSS block with this:

```css
.agent-card {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(201,154,46,.28);
}

.agent-card h2 {
  margin: 0 0 1rem;
  font-size: .78rem;
  color: var(--gold2);
  text-transform: uppercase;
  letter-spacing: .18em;
  font-weight: 950;
}

.agent-profile {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 1rem;
  align-items: center;
}

.agent-profile img {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border: 1px solid rgba(201,154,46,.45);
  background: #090909;
}

.agent-profile h3 {
  margin: 0;
  font-size: 1rem;
  line-height: 1.25;
  color: var(--text);
}

.agent-badge {
  display: inline-block;
  margin-left: .45rem;
  padding: .12rem .42rem;
  border: 1px solid #3f66ff;
  background: #03117a;
  color: #fff;
  font-size: .58rem;
  font-style: italic;
  letter-spacing: .08em;
  vertical-align: middle;
}

.agent-profile p {
  margin: .22rem 0 0;
  font-size: 12.5px;
  line-height: 1.35;
  color: var(--muted);
}

.agent-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .75rem;
  margin-top: 1rem;
}

.agent-actions a {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gold);
  color: var(--gold2);
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: .62rem;
  font-weight: 950;
}

.agent-actions a:hover {
  background: rgba(201,154,46,.09);
}
```

This keeps the agent card compact but more premium.

---

## 5. Strengthen “What’s Special”

Find:

```css
.feature-grid article {
  text-align: center;
  padding: 1.6rem 1.15rem;
  border-right: 1px solid rgba(201,154,46,.2);
}
```

Replace with:

```css
.feature-grid article {
  text-align: center;
  padding: 1.75rem 1.2rem;
  border-right: 1px solid rgba(201,154,46,.2);
}
```

Find:

```css
.feature-grid .zyne-icon {
  width: 44px;
  height: 44px;
  margin: 0 auto 1rem;
  padding: 7px;
  border: 1px solid rgba(201,154,46,.26);
  background: rgba(201,154,46,.045);
}
```

Replace with:

```css
.feature-grid .zyne-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  padding: 8px;
  border: 1px solid rgba(201,154,46,.30);
  background: rgba(201,154,46,.055);
}
```

Find:

```css
.feature-grid h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .92rem;
  line-height: 1.35;
}
```

Replace with:

```css
.feature-grid h3 {
  color: var(--gold2);
  text-transform: uppercase;
  font-size: .92rem;
  line-height: 1.35;
  margin: .75rem 0 .45rem;
}
```

---

## 6. Improve Property Overview balance

Find:

```css
.overview {
  display: grid;
  grid-template-columns: 1fr 1.12fr;
  gap: 2rem;
}
```

Replace with:

```css
.overview {
  display: grid;
  grid-template-columns: .95fr 1.15fr;
  gap: 2.25rem;
  align-items: start;
}
```

Add directly after that:

```css
.overview p {
  max-width: 580px;
  font-size: 15.5px;
  line-height: 1.75;
}
```

Update the overview paragraph to:

```html
<p>
  This three-bedroom bungalow offers comfort, space, and convenience with
  a covered front porch, large lot, and open kitchen/dining connection.
  With no HOA and easy access to major roads, schools, and shopping, this
  home is ready for immediate move-in consideration. The layout is practical,
  bright, and well-suited for everyday living.
</p>
```

---

## 7. Keep CTA design, only polish size

Find:

```css
.cta {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 360px 210px;
  gap: 2rem;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 1.85rem 2.25rem;
  margin: 1.5rem 0;
  min-height: 165px;
```

Replace only these lines:

```css
  grid-template-columns: 1fr 350px 220px;
  gap: 2rem;
  padding: 1.75rem 2.25rem;
  margin: 1.5rem 0;
  min-height: 160px;
```

Find:

```css
.cta::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 255px;
```

Replace width only:

```css
  width: 245px;
```

This keeps the pillar motif visible but prevents it from overpowering the CTA.

---

# Dry Run

From:

```bash
projects/zyne-homepage
```

Run:

```bash
node scripts/generate-property-route.mjs
```

Expected output:

```text
Generated homedetail/7101-wendemere-st-houston-tx-77088/index.html with 7 copied image(s)
```

---

# Validation

Run:

```bash
grep -n "max-width: 1440px" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match.

Run:

```bash
grep -n "grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr)" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match.

Run:

```bash
grep -n "agent-profile" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: CSS and HTML matches.

Run:

```bash
grep -n "https://www.har.com/carissa-weber/agent_WEBERC" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: two matches, one for `View Profile`, one for `Contact Agent`.

Run:

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Expected: one match inside CTA CSS.

---

# Desktop Visual QA

Check these desktop widths only:

```text
1440 × 900
1536 × 864
1920 × 1080
```

Confirm:

* Header/footer unchanged.
* Hero title displays as `7101 / Wendemere St`, not `7101 / Wendemere / St`.
* Summary card does not feel cramped after agent card.
* Agent image is visible and premium-looking.
* Agent buttons open the HAR profile URL.
* What’s Special section has stronger icons and better spacing.
* Property Overview no longer feels empty on the left.
* CTA pillar remains bottom-right and does not interfere with buttons.
* Gallery and lightbox still work.

---

# Final Report Format

Send back:

````md
# Desktop Production Readiness Report

## 1. Branch / Commit
- Branch:
- Commit hash:
- Local preview URL:
- Deployment URL:

## 2. Files Changed
- `scripts/generate-property-route.mjs`
- `public/assets/agents/carissa-weber.png`
- `public/assets/decor/zyne-gold-pillars.png`

## 3. Implementation Summary
- Header/footer left unchanged:
- Desktop max-width updated to 1440px:
- Hero summary width adjusted:
- Hero title wrapping fixed:
- Agent card refined:
- HAR profile URL retained:
- What’s Special section strengthened:
- Property Overview balanced:
- CTA pillar retained and polished:

## 4. Dry Run Output

```bash
node scripts/generate-property-route.mjs
````

Output:

```text
```

## 5. Validation Output

```bash
grep -n "max-width: 1440px" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

```bash
grep -n "agent-profile" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

```bash
grep -n "https://www.har.com/carissa-weber/agent_WEBERC" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

```bash
grep -n "zyne-gold-pillars.png" dist/homedetail/7101-wendemere-st-houston-tx-77088/index.html
```

Output:

```text
```

## 6. Desktop Screenshots

Attach:

* Full desktop page
* Hero section close-up
* Summary card with agent card
* What’s Special section
* CTA close-up
* Lightbox open state

## 7. Issues / Notes

* Console errors:
* Image loading issues:
* Agent card issues:
* CTA issues:
* Other:

## 8. Desktop Status

* Ready for production review: Yes / No

```

This patch keeps your header/footer untouched and focuses only on getting the desktop body layout closer to the mockup.
```
