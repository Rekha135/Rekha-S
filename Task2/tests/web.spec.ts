import { test, expect } from '@playwright/test';
import { data } from '../utils/testdata';
import { webHelper } from '../utils/webHelper';
let func: webHelper;

test.beforeEach(async ({ page }) => {
  func = new webHelper(page);
  await page.goto('https://goodbudget.com/');
});

test('LogIn and add account', async () => {
  await func.loginUser(data.emailID, data.password);
  await func.addAccount();
  await func.verifyAddedAccount();
  await func.logOutOfApp();
});

test.describe('sanity', () => {
test('add, delete and fill Envelopes', async () => {
  await func.loginUser(data.email, data.password);
  await func.addEnvelope(data.envelopeName);
  await func.fillEnvelope();
});
});

test('Add transaction and budget Report Generation', async () => {
  await func.loginUser(data.emailID, data.password);
  await func.addTransaction();
  await func.selectAndVerifySpendingByEnvelopeReport();
  await func.spendingVsBudgetReport();
});

