## Core issue
The ZYNE page has the **right information**, but it is trying to show too much of it too early, at too small a size, with too little visual separation. The other pages feel easier because they are more ruthless about hierarchy.

The ZYNE page is designed like an **investment flyer compressed into a mobile screen**.

The other pages are designed like **mobile decision flows**.

That difference matters.

On mobile, users do not read everything. They scan for:

```text
Image → Price → Location → Key facts → Action
```

The Redfin, Zillow, Realtor, and Amazon screens all protect that flow. ZYNE interrupts it with too many competing modules, badges, chips, icons, micro-labels, borders, and secondary details.

---

## What the other pages do better

### 1. Fewer text elements above the fold

The other pages show only the information needed for the next decision.

Example:

```text
$278,000
3 bd • 2 ba • 1,968 sq ft
8818 Oakleaf Forest Dr
Request showing
```

That is simple and readable.

ZYNE shows:

```text
Address
Location
Price
Description paragraph
4 investment metric cards
CTA
Secondary CTA
5 chips
Agent card
```

That is too much for a 360 × 640 mobile screen.

---

### 2. Larger, more intentional typography

The other pages use fewer font sizes and make each line feel deliberate.

ZYNE has many small labels:

* “PURCHASE PRICE”
* “DOWN PAYMENT”
* “NOTE RATE”
* “TARGET CASH FLOW”
* “SELLER FINANCING AVAILABLE”
* “REQUEST INVESTMENT PACKET”
* chips
* agent details
* brokerage text

Individually, each label makes sense. Together, they create visual noise.

The problem is not just small text. It is **too many small text decisions at once**.

---

### 3. Better contrast hierarchy

The dark/gold ZYNE theme can work, but currently the gold-on-black system is doing too many jobs:

* decorative border
* CTA color
* icon color
* label color
* price color
* chip border
* badge color
* section divider

Because gold appears everywhere, it stops functioning as emphasis.

The other pages use accent colors more selectively. For example, Zillow’s blue buttons dominate because they are not competing with twenty other blue elements.

---

### 4. Less decorative framing

ZYNE has many bordered containers:

* hero border
* thumbnail borders
* metric card borders
* CTA border
* chips
* agent card
* agent buttons

This makes the page feel boxed-in and dense. On mobile, too many borders reduce readability because every section visually demands attention.

The other sites use more whitespace and fewer visible outlines.

---

## My main recommendation

For mobile, ZYNE should stop trying to show the full investment thesis immediately.

It should instead show the **investment hook** first, then progressively disclose the details.

A better above-the-fold structure would be:

```text
Header
Hero image
$150,000
7101 Wendemere St
Seller-financed investment property
6.51% note • $30,000 down • est. -$400/mo cash flow
Request Investment Packet
```

That is enough.

Then below the fold:

```text
Deal Highlights
Financing Terms
Property Details
Agent / Contact
Photos
```

---

## What I would remove or simplify first

### Above the fold

I would remove or defer:

| Current element            | Recommendation                                       |
| -------------------------- | ---------------------------------------------------- |
| Long description paragraph | Replace with one short sentence                      |
| Four metric cards          | Compress into one clean stats row or two rows        |
| Five chips                 | Move below CTA or remove from first screen           |
| Thumbnail row              | Consider replacing with one “View all photos” button |
| Secondary CTA              | Keep only if clearly lower emphasis                  |
| Heavy borders              | Reduce substantially                                 |

---

## Specific ZYNE improvements

### 1. Increase text size

Minimum comfortable mobile text sizes:

| Text type        | Recommended mobile size |
| ---------------- | ----------------------: |
| Body text        |        15–16 px minimum |
| Secondary labels |        12–13 px minimum |
| Important values |                20–28 px |
| Price            |                32–40 px |
| CTA text         |                14–16 px |

Some ZYNE text appears closer to “desktop scaled down,” especially labels and chip text.

---

### 2. Reduce uppercase usage

Uppercase works for labels, but too much uppercase becomes harder to read.

Use uppercase only for:

* CTA buttons
* small labels
* badges

Do not overuse it in every module.

---

### 3. Make gold more selective

Gold should mainly mean:

* primary CTA
* key investment number
* selected/high-value icon

It should not be the default styling for nearly every border and label.

A better hierarchy:

```text
White = main readable text
Muted gray = secondary information
Gold = action or financial emphasis
```

---

### 4. Replace the metric grid with simpler facts

Current:

```text
PURCHASE PRICE    DOWN PAYMENT
$150,000          $30,000

NOTE RATE         TARGET CASH FLOW
6.51%             -$400/mo
```

Better mobile version:

```text
$150,000
Seller financing available

$30K down · 6.51% note · Est. -$400/mo
```

Or:

```text
Investment terms
$30K down
6.51% note
-$400/mo cash flow
```

This removes a lot of box pressure.

---

### 5. Let the CTA breathe

The CTA should not be surrounded by too much competing gold. Right now it is near gold cards, gold chips, gold outlines, and gold icons.

The primary action needs isolation:

```text
[ Request Investment Packet ]
```

with enough vertical spacing before and after it.

---

## The bigger product-design issue

ZYNE’s page feels like it is trying to prove credibility by showing a lot of data.

But on mobile, credibility often comes from **clarity**, not quantity.

The user should feel:

> “I understand the deal in 5 seconds.”

Not:

> “There is a lot here, I need to study this.”

Especially for investor leads, the page should create enough confidence to request the packet, not try to replace the packet.

---

## Suggested mobile priority order

I would prioritize content like this:

### First screen

1. Hero image
2. Price
3. Address
4. One-line investment hook
5. Three core terms
6. Primary CTA

### Second screen

1. Deal highlights
2. Financing breakdown
3. Property facts
4. Risk/assumption note, if needed

### Third screen

1. Agent
2. Contact options
3. Full gallery
4. Supporting details

---

## Bottom line

Your instinct is right: the ZYNE page is visually premium, but it is **over-compressed**.

The fix is not just “make text bigger.” The fix is:

```text
fewer elements
larger type
less gold everywhere
more whitespace
stronger hierarchy
progressive disclosure
```

The other pages feel more professional because every visible text element has a clear job. ZYNE currently has too many elements trying to do a job at the same time.
