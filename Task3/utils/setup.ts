import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://goodbudget.com/login');

  const user = process.env.GB_USERNAME;
  const pass = process.env.GB_PASSWORD;
  if (!user || !pass) {
    throw new Error('Please set GB_USERNAME and GB_PASSWORD environment variables');
  }

  await page.fill('//input[@id="username"]', 'rekhasetty13@gmail.com');
  await page.fill('input[name="password"]', 'password2');
  await page.click('.elementor-button-text');
  await page.waitForURL('**/household**', { timeout: 30_000 });


  const storagePath = path.resolve(__dirname, 'Task3/utils/.auth.json');
  await context.storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
