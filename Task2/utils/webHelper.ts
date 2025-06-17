import { Page, expect } from '@playwright/test';
import { pageObjects } from './pageObject';
import { data } from './testdata';

export class webHelper {
  static loginUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }
  static addEnvelope(envelopeName: string) {
    throw new Error('Method not implemented.');
  }
  constructor(public page: Page, public locators = pageObjects(page)) {}

  async loginUser(username: string, password: string) {
    await this.locators.login.click();
    await this.locators.emailIdField.fill(username);
    await this.locators.passwordField.fill(password);
    await this.locators.logInCTA.click();
    await this.locators.logInWelcomeMsg.waitFor({ timeout: 15000 });
    await this.locators.logInWelcomeMsg.isVisible();
  }

  async addAccount() {
    await this.locators.accountsTab.waitFor({ timeout: 8000 });
    await this.locators.accountsTab.click();
    await this.locators.accountsEditButton.waitFor({ timeout: 10000 });
    await this.locators.accountsEditButton.click();
  
    try {
      await this.locators.removeAccount.waitFor({ timeout: 15000 });
      const isVisible = await this.locators.removeAccount.isVisible();
      if (isVisible) {
        await this.locators.removeAccount.waitFor({ timeout: 8000 });
        await this.locators.removeAccount.click();
        await this.locators.deleteCTA.click();
      }
    } catch (error) {
    }
    await this.locators.addAccountPlus.waitFor({ timeout: 15000 });
    await this.locators.addAccountPlus.click();
    await this.locators.accountNameField.fill(data.accountName);
    await this.locators.accountAmtField.fill(data.accountAmt);
    await this.locators.saveChangesCTA.click();
  }

  async verifyAddedAccount(){
    await this.locators.accountsTab.waitFor({ timeout: 5000 });
    await this.locators.accountsTab.click();
    await this.locators.accountDetails.click();
    const accountNameText = await this.locators.accountName.textContent();
    await expect(accountNameText).toContain('Savings');
  }

  async logOutOfApp(){
    await this.locators.logOutCTA.click();
    await this.locators.login.waitFor({ timeout: 5000 });
    await this.locators.login.isVisible();
  }

  async addEnvelope(envelopeName: string){
    await this.locators.envelopeEdit.waitFor({ timeout: 10000 });
    await this.locators.envelopeEdit.click();
    await this.locators.AddEditEnvelopeTitle.isVisible();
   try {
  let deleteCount = 0;

  while (deleteCount < 5) {
    await this.locators.removeEnvelope.waitFor({ timeout: 20000 });
    const isEnvelopeVisible = await this.locators.removeEnvelope.isVisible();
    if (isEnvelopeVisible) {
      await this.locators.removeEnvelope.first().click();
      await this.locators.envelopeDeleteCTA.waitFor({ timeout: 10000 });
      await this.locators.envelopeDeleteCTA.click();
      await this.page.waitForTimeout(1000);
      deleteCount++;
    } else {
      break; 
    }
  }
} catch (e) {
}
  await this.locators.dropDownForEnvelope.waitFor({ timeout: 10000 });
  await this.locators.dropDownForEnvelope.click();
  await this.locators.monthlyFromDropdon.click();
  await this.locators.startOnDropDown.selectOption('2');

  await this.locators.addCTAInEnvelopes.click();
   await this.locators.envelopeName.waitFor({ timeout: 20000 });
  await this.locators.envelopeName.fill(envelopeName); 
  await this.locators.envelopeAmt.click();
  await this.locators.envelopeAmt.fill(data.envelopeAmt);
  await this.locators.saveEnvelopeCTA.click();

   await this.locators.newEnvelopeCreatedTitle.waitFor({ timeout: 15000 });
  await expect(this.locators.newEnvelopeCreatedTitle).toBeVisible();

  await this.locators.noThanksCTA.click();
  await this.locators.accountsTab.waitFor({ timeout: 8000 });

  // const actualEnvelopeName = await this.locators.addedEnvelopeName.first().textContent();
  // await expect(actualEnvelopeName).toContain(name);
} 

  async fillEnvelope(){
    await this.locators.fillEnvelopCTA.waitFor({ timeout: 10000 });
    await this.locators.fillEnvelopCTA.click();
    await this.locators.availableTabInFillEnvelop.click();
    await this.locators.dropDownInFillEnvelop.click();
    await this.locators.addAllInEnvelope.click();
    await this.locators.saveFilledEnvelope.waitFor({ timeout: 3000 });
    await this.locators.saveFilledEnvelope.click();
  }

  async addTransaction(){
    await this.locators.addTransactionsCTA.waitFor({ timeout: 10000 });
    await this.locators.addTransactionsCTA.click();
    await this.locators.payeeField.waitFor({ timeout: 5000 });
    await this.locators.payeeField.fill(data.transactionName);
    await this.locators.transactionAmtField.waitFor({ timeout: 5000 });
    await this.locators.transactionAmtField.click();
    await this.locators.transactionAmtField.fill(data.transactionAmt);
    await this.locators.selectEnvelopeFromDropdownn.selectOption({ index: 2 }),
    await this.locators.selectAccountDropDown.selectOption({ index: 1 }),
    await this.locators.scheduledTransactionInTransaction.click();
    await this.locators.scheduleDropdown.selectOption('monthly');
    await this.locators.saveTransaction.click();
    await this.locators.transactionNameInTransaction.waitFor({ timeout: 10000 });
    const actualTransactionName = await this.locators.transactionNameInTransaction.textContent();
    await expect(actualTransactionName).toContain(data.transactionName);
  }

  async selectAndVerifySpendingByEnvelopeReport(){
    await this.locators.reports.waitFor({ timeout: 8000 });
    await this.locators.reports.click();
    await this.locators.spendingByEnvelopeDropedown.click();
    await this.locators.spendingByEnvelopeTitle.isVisible();
    await this.locators.spendingFrom.isVisible();
    await this.locators.spendingTo.isVisible();

    await this.locators.envelopeDropdown.selectOption({ index: 1 }),
    await this.locators.accountDropdown.selectOption({ index: 1 }),
    await this.locators.refreshCTA.click();
  }

  async spendingVsBudgetReport(){
    await this.locators.reports.click();
    await this.locators.spendingByMonth.click();
    await this.locators.spendingByMonthTitle.isVisible();
    await this.locators.spendingVsBudgetTitle.isVisible();
  }
}
