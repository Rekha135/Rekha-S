# Task 3: Goodbudget API Automation


1. ### Setup
  - Clone the project, git clone: https://github.com/Rekha135/Rekha-S.git
  - Open the project in VS Code
  - To install dependencies: npm install
  
2. ### Coherent domain
   - Envelopes - CRUD function

3. ### How to run tests
   - To create session-ID: npx tsx Task3/utils/setup.ts
   - To run test: npx playwright test tests/envelope.spec.ts --project=API --workers=1

4. ### Tech Stack Approach
   - Playwright Test: for HTTP‐level API testing (modern, TypeScript-first, built-in retries & reporting).
   - TypeScript: strong typing for request/response shapes, catches errors at compile time.
   - JSON REST:  Captured and accessed Goodbudget’s private /buckets-api/household and /envelope/save endpoints using Charles Proxy for real-time JSON REST traffic.
   - Session management: headless login script (utils/setup.ts) writes Playwright storageState, so tests run against an authenticated context without manual token handling.

