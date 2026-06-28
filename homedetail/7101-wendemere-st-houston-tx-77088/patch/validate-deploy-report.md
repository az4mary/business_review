# Validate Deploy Report

## Patch

Added property-route validation to `projects/zyne-homepage/scripts/validate-generated-routes.mjs` after the Realtor GPT validation block and before the product loop.

## Build

The environment did not provide an `npm` executable, so the approved pnpm equivalent was used with a temporary compatibility shim for the repository's nested `npm run` lifecycle commands.

Result: passed.

```text
Generated route validation passed: 22 products, 5 growth paths, collection pages, subroutes, and policy routes.
```

## Generated HTML validation

```text
150:  max-width: 1440px;
189:  grid-template-columns: minmax(0, 1.48fr) minmax(460px, .98fr);
426:  width: 88px;
1396:        <a href="https://www.har.com/carissa-weber/agent_WEBERC" target="_blank" rel="noopener noreferrer">
1400:        <a href="https://www.har.com/carissa-weber/agent_WEBERC" target="_blank" rel="noopener noreferrer">
679:  background-image: url("/assets/decor/zyne-gold-pillars.png");
```
