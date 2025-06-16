// setup.ts
import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {
  // 1. Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Go to login page
  await page.goto('https://goodbudget.com/login');

  // 3. Fill in credentials (from env)
  const user = process.env.GB_USERNAME;
  const pass = process.env.GB_PASSWORD;
  if (!user || !pass) {
    throw new Error('Please set GB_USERNAME and GB_PASSWORD environment variables');
  }

  // — adjust the selectors as needed:
  await page.fill('input[name="email"]', user);
  await page.fill('input[name="password"]', pass);
  await page.click('button[type="submit"]');

  // 4. Wait for navigation to the authenticated area
  await page.waitForURL('**/household**', { timeout: 30_000 });

  // 5. Save storage state to Task3/utils/.auth.json
  const storagePath = path.resolve(__dirname, 'Task3/utils/.auth.json');
  await context.storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
