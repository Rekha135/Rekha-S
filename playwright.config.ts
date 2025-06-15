import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  fullyParallel: true,
  

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 6 : 6,
  reporter: [['html', { open: 'never' }]],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Web - Chromium',
      testDir: './Task2/tests',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Web - Firefox',
      testDir: './Task2/tests',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Web - WebKit',
      testDir: './Task2/tests',
      use: { ...devices['Desktop Safari'] },
    },

    // API Automation
    {
      name: 'API',
      testDir: './Task3/tests',
      use: {
        baseURL: 'https://goodbudget.com/', // replace if needed
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
