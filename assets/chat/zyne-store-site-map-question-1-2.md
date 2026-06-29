# Task 3 — Technical Environment & Repository Architecture

## Question 1: Repository Directory Layout

```text
zyne.store
├── .github
│   └── workflows                         # CI, deployment, and screenshot automation
├── archive
│   ├── city-suites
│   ├── legacy-site-prototypes
│   └── test-artifacts
├── assets                                # Repository-level content and reference assets
│   ├── catalog                           # Shared catalog images
│   ├── chat
│   ├── decor
│   ├── mockups
│   ├── product_images
│   ├── products
│   ├── project-docs/prd                  # PRD archive
│   ├── property-listing-screenshots
│   ├── top-ecommerce-website-screenshots
│   └── zyne-stan-store-*.md              # Legal source Markdown used by the build
├── docs
│   ├── automation
│   ├── brand
│   └── property
├── homedetail
│   └── 7101-wendemere-st-houston-tx-77088 # Property source copy and images
├── projects
│   └── zyne-homepage                     # Operational website source of truth
│       ├── src                           # Source renderers, data, styles, browser behavior
│       ├── scripts                       # Build generators and validators
│       ├── public                        # Static source assets copied during build
│       ├── dist                          # Generated deployment output (Git-ignored)
│       ├── docs
│       ├── index.html
│       ├── package.json
│       ├── pnpm-lock.yaml
│       └── README.md
├── scripts                               # Root Playwright/property capture tools
├── services                              # Root generated route artifacts
│   ├── ai-integration
│   ├── competitor-readiness
│   ├── ...
│   └── index.html
├── build-my-brand                        # Root generated collection route
├── convert-more-clients                  # Root generated collection route
├── delivery                              # Root generated collection route
├── grow-my-visibility                    # Root generated collection route
├── improve-my-business                   # Root generated collection route
├── intelligence                          # Root generated collection route
├── privacy                               # Root generated legal route
├── refund-policy                         # Root generated legal route
├── terms                                 # Root generated legal route
├── use-ai                                # Root generated collection/subroutes
├── 404.html
├── CNAME
├── package.json                          # Root Playwright capture manifest
├── pnpm-lock.yaml
├── robots.txt
└── sitemap.xml
```

## Question 2: Static Asset Management Paths

- **Source Asset Path:** `projects/zyne-homepage/public/assets/` for deployable static assets; selected repository inputs also come from `assets/catalog/`, `assets/zyne-stan-store-*.md`, and `homedetail/7101-wendemere-st-houston-tx-77088/images/`.
- **Compiled Output Path:** `projects/zyne-homepage/dist/assets/`; the property generator also copies listing images to `projects/zyne-homepage/dist/homedetail/7101-wendemere-st-houston-tx-77088/images/`.
- **Font Asset Delivery Method:** `None currently loaded` — no local font files, `@font-face`, Google Fonts stylesheet, or other font CDN is present. CSS uses system font stacks.
