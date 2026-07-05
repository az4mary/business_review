# ZYNE Property Buy Page

Production-oriented, clean-room property listing experience for:

```text
/homedetail/7101-wendemere-st-houston-tx-77088/buy/
```

The project is an isolated Vite and vanilla JavaScript application maintained under `projects/zyne-buy` in the `zyne.store` repository. Its runtime and build remain independent from the existing homepage application.

## Current implementation

- Three vertically scrollable, viewport-sized desktop pages
- Gentle native scroll snapping
- A centered 1672 × 941 design canvas
- Uniform proportional downscaling for smaller desktop resolutions
- A global sticky ZYNE header
- Pixel-refined property overview on Page 1
- Placeholder content on Pages 2 and 3
- Complete legal footer on Page 3
- Six explicitly assigned Page 1 gallery positions
- Nine-image full-screen lightbox
- Keyboard navigation, focus trapping, and scroll restoration
- Locally bundled Roboto and Inter fonts
- Optimized WebP display images and thumbnails
- Build-time listing, copy, encoding, and asset validation

## Requirements

- Node.js 22 or newer
- npm

## Setup

```sh
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/homedetail/7101-wendemere-st-houston-tx-77088/buy/
```

## Commands

```sh
npm run dev
```

Starts the Vite development server.

```sh
npm run validate
```

Validates listing data, required visible copy, encoding, gallery references, agent media, brand assets, and property-image derivatives.

```sh
npm test
```

Runs data-contract, scaling, typography, icon-policy, copy, and pixel-critical layout tests.

```sh
npm run build
```

Runs validation and tests before generating the production site in `dist/`.

```sh
npm run preview
```

Serves the generated production build locally.

## Project structure

```text
homedetail/.../buy/index.html   Nested route entry point
public/assets/                 Brand, agent, and property media
scripts/                       Media preparation and build validation
src/components/                Header, gallery, lightbox, icons, and page modules
src/data/                      Listing content and schema validation
src/styles/                    Tokens, layout, lightbox, and global styles
src/utils/                     Proportional canvas scaling
tests/                         Data and layout contract tests
```

## Listing data

Property content is maintained in:

```text
src/data/listing.js
```

The listing object contains:

- Address, price, description, and financing metrics
- Agent identity and portrait
- Complete property-photo inventory
- Full-gallery ordering
- Six named Page 1 preview assignments
- Per-slot image focal positions

Rendering components do not contain property-specific values, allowing future listings to use the same structure.

## Gallery placement

Page 1 supports six stable slots:

```text
hero
upperRight
middleRight
lowerRight
bottomLeft
bottomCenter
```

Assign images through `previewSlots` in `src/data/listing.js`. Each slot references a stable photo ID and an `object-position` value. This is independent of `galleryOrder`, which controls the full-screen lightbox sequence.

The same image may intentionally appear in multiple preview slots without being duplicated in the full gallery.

## Preparing property images

Run:

```sh
npm run prepare:property-images -- "C:\path\to\approved-images"
```

The preparation script:

1. Preserves original files for full-screen viewing.
2. Generates optimized display WebPs.
3. Generates lightweight gallery thumbnails.
4. Writes assets under the property-specific public directory.

After processing, update the stable photo IDs and filenames in `src/data/listing.js`.

## Typography

- Roboto is bundled locally for the property interface.
- Inter is bundled locally for the site header and footer.
- The application does not rely on Google Fonts or platform-installed fonts at runtime.

## Desktop scaling

Every page uses a 1672 × 941 design canvas. The scale is calculated as:

```text
min(1, viewportWidth / 1672, viewportHeight / 941)
```

This preserves the aspect ratio, prevents stretching and clipping, and avoids upscaling beyond the native design dimensions.

Mobile and tablet layouts are intentionally outside the current scope.

## Icons

Interface icons are maintainable inline SVG paths. No raster images are used for metric, highlight, utility, or CTA icons. Metric, highlight, and utility families use role-specific dimensions and stroke weights.

## Validation and quality controls

Production builds fail when:

- A required preview slot is missing.
- A slot or gallery entry references an unknown photo.
- Required property, agent, logo, favicon, display, thumbnail, or original media is missing.
- Approved visible copy changes unexpectedly.
- Mojibake or replacement characters enter listing content.
- Pixel-critical layout contracts regress.

Browser verification has covered:

- Native 1920 × 1080 presentation
- 1366 × 768 proportional scaling
- Three-page scroll snapping
- Sticky-header behavior
- Footer scaling
- Lightbox opening, navigation, closing, and background scroll restoration

## Deployment

The parent `zyne.store` repository provides GitHub version control. This project does not yet have a production deployment workflow. `npm run build` produces a provider-neutral static artifact in `dist/`.

Configure the intended GitHub repository and hosting workflow only after approval of the remaining page designs and deployment target.

## Version control

This folder is committed through the parent `zyne.store` repository and its existing `origin/main` branch. It does not configure a separate nested Git remote.
