import * as path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

async function main() {

  const GB_USERNAME = 'rekhasetty13@gmail.com';
  const GB_PASSWORD = 'password2';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://goodbudget.com/login');

  await page.fill('//input[@id="username"]', GB_USERNAME);
  await page.fill('//input[@id="password"]', GB_PASSWORD);
  await page.click('button[type="submit"]');
  await page.locator('//div[@class="trans-title"]').waitFor({ timeout: 8000 });


  const storagePath = path.resolve(__dirname, '.auth.json');
  await context.storageState({ path: storagePath });
  console.log(`Saved auth state to ${storagePath}`);

  await browser.close();
}

main().catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});
