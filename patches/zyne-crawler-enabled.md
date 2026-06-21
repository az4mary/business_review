# **Crawler/AI extraction fix**.

```txt
Move homepage markup into reusable render.js
Pre-render it into dist/index.html during build
Keep generate-routes.mjs for route/product pages
Deploy the built dist output
```

This should solve the extraction problem without hurting page speed.
# Concrete patch steps to follow

## Step 1 — Keep existing `generate-routes.mjs`

Do **not** delete it.

That script generates the supporting route pages and product pages under `dist`. It should remain part of the build. 

---

## Step 2 — Add this new file

Create:

```txt
projects/zyne-homepage/src/render.js
```

This file should contain the homepage HTML renderer. Use the `src/render.js` from the patch files I provided earlier.

---

## Step 3 — Modify `src/main.js`

Replace the current full-page `app.innerHTML = ...` implementation with this behavior:

```js
import "./styles/main.css";
import { products } from "./data/products.js";
import { buildSchema, renderHomePage } from "./render.js";

const track = (event, properties = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...properties });
};

const app = document.querySelector("#app");

if (app && !app.innerHTML.trim()) {
  app.innerHTML = renderHomePage();
}
```

Then keep the existing interaction logic below it:

```txt
menu toggle
FAQ tracking
click tracking
image error handling
schema injection fallback
```

Purpose:

* During normal browser rendering, JS can still hydrate/attach behavior.
* During static build, the homepage content will already exist in `index.html`.
* Crawlers will no longer see an empty `#app`.

---

## Step 4 — Add this new file

Create:

```txt
projects/zyne-homepage/scripts/prerender.mjs
```

It should:

1. Read `dist/index.html`
2. Replace:

```html
<div id="app"></div>
```

with:

```html
<div id="app">FULL HOMEPAGE HTML HERE</div>
```

3. Add schema to the initial HTML
4. Add canonical URL if missing

Use the `scripts/prerender.mjs` from the patch files I provided earlier.

---

## Step 5 — Update `package.json`

Change the build script from this:

```json
"build": "vite build && node scripts/generate-routes.mjs"
```

to this:

```json
"build": "vite build && node scripts/prerender.mjs && node scripts/generate-routes.mjs"
```

Important: include **both** scripts.

Do **not** replace `generate-routes.mjs`. The final build command must run both:

```txt
prerender.mjs
generate-routes.mjs
```

---

## Step 6 — Build locally

From:

```txt
projects/zyne-homepage/
```

run:

```bash
pnpm install
pnpm build
```

---

# Validation commands

After build, run:

```bash
grep -i "Choose Your Growth Path" dist/index.html
grep -i "Google Business Profile Mini Audit" dist/index.html
grep -i "Secure checkout is completed through Stan Store" dist/index.html
grep -i "<div id=\"app\">" dist/index.html
```

## Expected result

The first three commands should return matching homepage text.

The fourth command should show:

```html
<div id="app">
```

followed by real homepage content, not an empty div.

---

# After deployment validation

After GitHub Pages deploys, run:

```bash
curl -L https://zyne.store/ | grep -i "Choose Your Growth Path"
curl -L https://zyne.store/ | grep -i "Google Business Profile Mini Audit"
curl -L https://zyne.store/ | grep -i "Secure checkout is completed through Stan Store"
```

All three should return matches.

---

# Exact reply format to send me for validation

Send me this:

```txt
PATCH VALIDATION

Build command used:
[paste command]

Build result:
[paste success or error]

dist/index.html checks:
Choose Your Growth Path: PASS/FAIL
Google Business Profile Mini Audit: PASS/FAIL
Secure checkout is completed through Stan Store: PASS/FAIL
div app contains full HTML: PASS/FAIL

Live checks after deploy:
Choose Your Growth Path: PASS/FAIL
Google Business Profile Mini Audit: PASS/FAIL
Secure checkout is completed through Stan Store: PASS/FAIL

Errors or screenshots:
[paste any error output or attach screenshot]
```
