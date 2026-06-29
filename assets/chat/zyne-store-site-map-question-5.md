# Task 3 — Technical Environment & Repository Architecture

## Question 5: Local Testing & Runtime Parameters

- **Local Developer OS:** `Microsoft Windows 11 Pro, version 10.0.22631, build 22631, 64-bit`
- **Local Node.js Version:** `Node v24.14.0` from the Codex bundled runtime. The repository CI intentionally uses Node `22`.
- **Automation/Testing Engine:** `Playwright v1.61.1`; the site build uses installed `Vite v7.3.5`.
- **Local Preview Method:** `Vite development/preview server` from `projects/zyne-homepage`: standard commands are `npm run dev` and `npm run preview`; on this machine, native `npm` is not on `PATH`, so the working equivalents are bundled `pnpm run dev`, `pnpm run build`, and `pnpm run preview`. The completed local generation tests used bundled pnpm `11.7.0` with a temporary npm-to-pnpm compatibility shim because the build scripts contain nested `npm run` calls.
