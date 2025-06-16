# Task 3: Goodbudget API Automation


1. ### Setup
  - Clone the project, git clone: https://github.com/Rekha135/Rekha-S.git
  - Open the project in VS Code
  - To install dependencies: npm install
  

2. ### How to run tests
- To create session-ID: npx tsx Task3/utils/setup.ts
- To run test: npx playwright test tests/envelope.spec.ts --project=API --workers=1

3. ### Approach & Tech Stack

- Playwright Test: for HTTP‐level API testing (modern, TypeScript-first, built-in retries & reporting).
- TypeScript: strong typing for request/response shapes, catches errors at compile time.
- JSON REST: Goodbudget’s private /buckets-api/household and /envelope/save endpoints via charles.
- Session management: headless login script (utils/setup.ts) writes Playwright storageState, so tests run against an authenticated context without manual token handling.

