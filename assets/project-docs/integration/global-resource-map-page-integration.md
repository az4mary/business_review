### 🗺️ Global Resource Map for Page Integration

**Developer Mandate:**

The `zyne-buy` page must utilize the existing global architecture. All isolated dependencies, duplicated assets, and hardcoded components must be wired to the following global sources of truth.

1. **Global Build & Dependency Management**
    - **Target:** `projects/zyne-homepage/package.json`
    - **Requirement:** Hook into the master dependency tree. Eliminate the isolated Vite configuration and local `package.json`.
2. **Centralized Assets & Fonts**
    - **Target:** `projects/zyne-homepage/public/assets/`
    - **Requirement:** Route all font faces (Inter, Roboto) and brand imagery to this global directory. Remove the local `@fontsource` node modules and local bundles.
3. **Shared Vector Iconography**
    - **Target:** `projects/zyne-homepage/scripts/property-icons.mjs`
    - **Requirement:** Add and Import all standard property metrics, utility icons, and UI vectors directly to and from this centralized module.
4. **Global Components & CSS Variables**
    - **Target:** https://zyne.store/services/executive-briefing
    - **Requirement:** Utilize the established master template structures for the sticky `site-header`, global `topbar`, and global `footer`. Inherit the global `:root` CSS variables and base reset defined within the primary architecture rather than redefining them locally.
5. **Global Test & Validation Suite**
    - **Target:** `projects/zyne-homepage/tests/`
    - **Requirement:** Migrate all data, listing, and layout contract tests into the master repository’s validation pipeline.
