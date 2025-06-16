***Task2 - GoodBudget Test Automation***

## Overview
This project automates 3 key E2E flows of the GoodBudget Web App using **Playwright with TypeScript**.

### Covered Flows
- User Login and adds account
- Add, delete and fill Envelopes
- Adding transaction and Budget Report Generation

### The Setup

- Clone the project, git clone - https://github.com/Rekha135/Rekha-S.git
- Open the project in VS Code
- To install dependencies - npm install
- install Playwright browsers - npx playwright install

### How to run tests

- Run: npx playwright test web.spec.ts
- Run tests specific execution: npx playwright test -g "LogIn and add account"
- Run on Chromium only: npm run test:chromium
- To generate report: npx playwright show-report
- Docker execution cmd: docker run --rm -it my-playwright-project npx playwright test tests/web.spec.ts

### Tech Stack Approach

Web UI Automation (Playwright + TypeScript)
- Playwright - Cross-browser testing, Native parallel execution and Auto-Waiting
- TypeScript - Strong typing, better scalability




