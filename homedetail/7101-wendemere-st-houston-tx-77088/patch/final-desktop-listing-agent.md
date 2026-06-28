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

Below is the **final concrete desktop-production patch** for the property page.

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

# Desktop Visual QA

Check only desktop for now.

Viewport recommendations:

```text
1440 × 900
1536 × 864
1920 × 1080
```

Confirm:

* Hero title reads cleanly and does not break `St` onto its own line.
* Right summary card includes the listing agent card below the tags.
* Agent image loads.
* “View Profile” and “Contact Agent” both open:
  `https://www.har.com/carissa-weber/agent_WEBERC`
* Gallery still opens lightbox.
* CTA pillar artwork remains bottom-right and does not cover the CTA buttons.
* Page feels less stretched after reducing max-width to `1360px`.
* Footer remains visually aligned.

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

## 6. Desktop Screenshots

Attach:

* Full desktop page
* Hero section close-up
* Summary card with agent card
* CTA section close-up
* Lightbox open state

## 7. Issues / Notes

* Console errors:
* Image loading issues:
* CTA issues:
* Agent card issues:
* Other:

## 8. Ready for Mobile/Tablet Phase?

* Yes / No

```

After this patch, the desktop version should be ready for final design review before moving to tablet/mobile.
```
