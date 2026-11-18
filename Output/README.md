# Demo Web Shop - Playwright + Cucumber BDD

UI test framework for [Demo Web Shop](https://demowebshop.tricentis.com) written in TypeScript.
Scenarios are written once in Gherkin (`features/`) with one set of step definitions
(`step-definitions/`), and run with either of two runners:

| Runner     | Command                             | Uses                                                     |
| ---------- | ----------------------------------- | -------------------------------------------------------- |
| Cucumber   | `npx cucumber-js`                   | `@cucumber/cucumber`, `hooks/world.ts`, `hooks/hooks.ts` |
| Playwright | `npx bddgen && npx playwright test` | `playwright-bdd`, `hooks/pw-fixtures.ts`                 |

Step files import `Given/When/Then` from `hooks/bdd.ts`, a small adapter that returns the
Cucumber functions by default, or the `playwright-bdd` functions when `playwright.config.ts`
sets `BDD_RUNNER=playwright`. In both runners, `this` inside a step is a `TestWorld`
(`page`, `context`).

## Prerequisites

- Node.js 20 or later
- A registered Demo Web Shop account

## Setup

All commands run inside the `Output` folder.

```
cd Output
npm install
npx playwright install chromium
Copy-Item .env.example .env   # Windows PowerShell
cp .env.example .env          # macOS/Linux
```

Then fill in `USER_USERNAME` (account e-mail) and `USER_PASSWORD` in `.env`. `.env` is gitignored.

| Variable        | Purpose                              | Default    |
| --------------- | ------------------------------------ | ---------- |
| `BASE_URL`      | Application URL (required)           | -          |
| `BROWSER`       | Cucumber runner browser              | `chromium` |
| `HEADLESS`      | `false` shows the browser            | `true`     |
| `TIMEOUT`       | Step/test timeout (ms)               | `30000`    |
| `USER_USERNAME` | Account e-mail for the `user` role   | -          |
| `USER_PASSWORD` | Account password for the `user` role | -          |

## Running

```
npx cucumber-js            # Cucumber runner (same as: npm test)
npm run test:headed        # Cucumber, visible browser
npm run test:smoke         # Cucumber, @smoke only
npm run test:dry           # Cucumber dry run (checks step wiring)

npm run pw:test            # Playwright runner (bddgen + playwright test)
npm run pw:headed          # Playwright, visible browser
npm run pw:ui              # Playwright UI mode
npm run pw:debug           # Playwright inspector
npm run pw:smoke           # Playwright, @smoke only
npm run pw:report          # Open the Playwright HTML report
```

`npx bddgen` generates Playwright tests from the feature files into `.features-gen/`. It must
re-run after any feature file or step change; the `pw:*` scripts do this for you.

**VS Code:** install the Playwright Test extension, run `npx bddgen` once, and the
scenarios appear in the Testing panel (re-run `bddgen` after editing features).

## Tags

`@ui`, `@e2e`, `@regression`, `@smoke`. Filter with `--tags "@smoke"` (Cucumber) or
`--grep @smoke` (Playwright). `npm run test:ui` / `npm run pw:tag:ui` run `@ui` scenarios.

## Reports

- Cucumber: `reports/cucumber-report.html` and `reports/cucumber-report.json`. Failed
  scenarios attach a screenshot and save a trace to `reports/traces/`.
- Playwright: `playwright-report/` (open with `npx playwright show-report`); screenshots and
  video on failure, trace on first retry.

## Structure

```
features/shop/shopping-cart.feature   Gherkin scenarios
step-definitions/                     auth.steps.ts, shop.steps.ts (shared by both runners)
hooks/bdd.ts                          Runner adapter (Given/When/Then)
hooks/world.ts                        TestWorld interface + Cucumber CustomWorld
hooks/hooks.ts                        Cucumber browser lifecycle, screenshots, traces
hooks/pw-fixtures.ts                  Playwright world fixture + createBdd
src/config/env.ts                     Loads/validates .env, getUser(role)
src/pages/                            BasePage, LoginPage, CatalogPage, CartPage
cucumber.js / playwright.config.ts    Runner configuration
```

## Extending

- **Feature:** add `features/<domain>/<name>.feature` using business language only.
- **Page:** add `src/pages/<Name>Page.ts` extending `BasePage`; define locators in the
  constructor with `getByRole` / `getByLabel` / `getByTestId`.
- **Step:** add to `step-definitions/<domain>.steps.ts`, importing `Given/When/Then` from
  `../hooks/bdd`. Use `async function (this: TestWorld, ...)` (never arrow functions) and
  only `this.page` / `this.context`.
- Verify wiring with `npm run test:dry` and `npx bddgen`, then run both runners.

Note: all scenarios share one account, so the server-side cart is shared. Avoid scenarios
that depend on an empty cart when running in parallel.
