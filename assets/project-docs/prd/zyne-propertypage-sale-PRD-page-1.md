### Product Requirements Document (PRD)

**Project:** ZYNE Homepage - B2B Investment Property Template (Page 1 / Dashboard)
**Reference:** `property-salepage-desktop-mockup-1.png`
**Objective:** Engineer a purpose-built, single-screen financial dashboard for real estate investments. The layout must utilize proportional scaling to maintain a perfect aspect ratio without vertical scrolling, stretching, or squeezing across varying desktop resolutions.

---

### 1. Technical Architecture & Constraints

* **Viewport Lock:** The primary container (`<main>`) must adhere to a reference aspect ratio of **1672 / 941**.
* **Containment:** The layout will utilize `max-height: calc(100vh - [HEADER_HEIGHT])` and `max-width: 100%`. The UI must scale proportionately to fit entirely "above the fold" on page load.
* **Fluid Units:** Static pixel values (`px`) are strictly prohibited for typography, padding, and margins. All spacing and text scaling must utilize CSS Container Queries (`cqw`, `cqh`), Viewport units (`vw`, `vh`), or dynamic `clamp()` functions to ensure 1:1 proportional reduction on smaller laptop screens.
* **Grid Framework:** The master layout is a 2-column flex or CSS Grid setup utilizing fractional units (e.g., `1.15fr 1fr`) to divide the Photo Gallery (left) and the Data Sidebar (right).
* **Footer Status:** Excluded from Page 1 to maximize vertical data real estate.

### 2. Data Schema Modifications

The JavaScript data object must be expanded beyond standard residential metrics (beds/baths) to include explicit financial properties:

* `purchasePrice` (e.g., $150,000)
* `downPaymentAmount` (e.g., $30,000)
* `downPaymentPercentage` (e.g., 20%)
* `noteRate` (e.g., 6.51%)
* `targetCashFlow` (e.g., ~$400/mo)
* `targetRent` (e.g., $1,700/mo)
* `targetDSCR` (e.g., 1.30)
* `financingType` (e.g., Seller Financing)

### 3. UI Component Specifications

#### A. Left Panel: High-Density Photo Grid

* **Layout:** A complex, borderless 6-photo masonry grid that completely fills the left fraction of the master container.
* **Structure:**
* Left Column: One dominant hero image (taking up approx. 70% of the vertical space), stacked above one wide bottom image (30% vertical space).
* Right Column: Three small vertically stacked images, sitting above one bottom image aligned with the left column's bottom image.


* **Overlay:** Absolute positioned "FOR SALE • SELLER FINANCING" status badge over the primary hero image.

#### B. Right Panel (Upper): Core Info & Financial Grid

* **Property Header:** Eyebrow text, large Address Title, Location sub-title, and large primary Purchase Price.
* **Description:** Short, targeted financial thesis paragraph.
* **2x2 Metric Grid:**
* Layout logic reversed from rental template: **Label on Top** (muted uppercase), **Value on Bottom** (bold white).
* Grid items: Purchase Price, Down Payment, Note Rate, Target Cash Flow.



#### C. Right Panel (Middle): Actions & Tags

* **Primary CTAs:** Two side-by-side flex buttons.
* Primary (Gold): "REQUEST INVESTMENT PACKET" (requires new single right-arrow SVG).
* Secondary (Outlined): "CONTACT LISTING AGENT".


* **Attribute Tags:** Horizontal flex row of gold-outlined rectangular tags (no fill). Must include wrap logic for narrower viewport compressions.

#### D. Right Panel (Lower): 4-Column Highlight Bar

* **Layout:** Full-width grid featuring 4 center-aligned data points.
* **Structure:** Custom Icon (Top) -> Bold Label (Middle) -> Financial Value (Bottom).
* **Items:** Seller-Financed Note Financing, 20% Down / $30,000, Target Rent / $1,700/mo, Target DSCR / 1.30.

#### E. Right Panel (Footer): Horizontal Agent Card

* **Layout:** Shifted from vertical stack to horizontal flex.
* **Left Side:** Agent photo, Name, Badge, Brokerage details.
* **Right Side:** Side-by-side action buttons ("VIEW PROFILE", "CONTACT AGENT") pushed to the far right edge of the container.

### 4. Required Bespoke SVG Assets

The developer will require a new suite of 1.25px stroke-weight, thin-line SVGs mapped to the financial metrics:

1. **Price Tag:** For Purchase Price.
2. **Piggy Bank:** For Down Payment.
3. **Percentage Circle:** For Note Rate.
4. **Coin Stack:** For Target Cash Flow.
5. **Document with Pen:** For Note Financing highlight.
6. **Dollar Sign Coin/Circle:** For Down Payment highlight.
7. **Upward Trend Line/Chart:** For Target Rent.
8. **Shield with Checkmark:** For Target DSCR.
9. **Single Right Arrow (`->`):** For the "Request Investment Packet" button.
