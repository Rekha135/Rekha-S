import { Page } from '@playwright/test';

export function pageObjects(page: Page) {
  return {

    login: page.getByRole('banner').getByRole('link', { name: 'Log in' }),
    emailIdField: page.locator('//input[@id="username"]'),
    passwordField: page.locator('//input[@id="password"]'),
    logInCTA: page.getByRole('button', { name: 'Log In' }),
    logInWelcomeMsg: page.locator('.trans-hd.welcome'),
    envelopesTab: page.locator('a[data-target="envelopes"]'),
    accountsTab: page.locator('a[data-target="accounts"]'),
    accountsEditButton: page.locator('a[href="https://goodbudget.com/account/edit"]'),
    removeAccount: page.locator(".icon-remove-sign"),
    deleteCTA: page.locator('//button[normalize-space()="Delete"]'),
    addAccountPlus: page.locator('div[class="form-edit-container-add"] button[type="button"]'),
    accountNameField: page.getByRole('textbox').first(),
    accountAmtField: page.locator('#asset-list').getByRole('textbox', { name: '0.00' }),
    logOutCTA: page.locator('a[href="/logout"]'),
    saveChangesCTA: page.locator('#save-accounts-btn'),
    accountDetails: page.locator('div[class="left"] i[class="icon-account"]'),
    accountName: page.locator('div[class="trans-title"] h1'),
    envelopeEdit: page.locator('a[href="https://goodbudget.com/envelope/edit"]'),
    AddEditEnvelopeTitle: page.locator('//h1[normalize-space()="Add / Edit Envelopes"]'),
    removeEnvelope: page.locator('(//i[@class="icon-remove-sign"])[1]'),
    dropDownForEnvelope: page.locator('#period-selector'),
    monthlyFromDropdon: page.locator('//a[normalize-space()="Monthly"]'),
    startOnDropDown: page.locator('#period-extra-MON'),
    firstOfEveryMonth: page.locator('option[value="1"]'),
    addCTAInEnvelopes: page.locator('(//button[@type="button"][normalize-space()="Add"])[1]'),
    envelopeName: page.locator('li[id="-1"] div[class="row-name"] input[type="text"]'),
    envelopeAmt: page.locator('li[id="-1"] input[placeholder="0.00"]'),
    saveEnvelopeCTA: page.locator('#save-envelopes-btn'),
    newEnvelopeCreatedTitle: page.locator('//h1[normalize-space()="New Envelopes Created!"]'),
    noThanksCTA: page.getByRole('button', { name: 'No thanks' }),
    addedEnvelopeName: page.locator('//strong[normalize-space()="Groceries"]'),
    fillEnvelopCTA: page.locator('//a[normalize-space()="Fill Envelopes"]'),
    availableTabInFillEnvelop: page.locator('a[href="#unallocated"]'),
    dropDownInFillEnvelop: page.locator('div[class="btn-group"] button[class="btn btn-fill dropdown-toggle"]'),
    addAllInEnvelope: page.locator('.add.set-changed'),
    saveFilledEnvelope: page.getByRole('button', { name: 'Save' }),
    addTransactionsCTA: page.locator('.btn.addTransaction'),
    payeeField: page.locator('#expense-receiver'),
    transactionAmtField: page.locator('#expense-amount'),
    selectAccountDropDown: page.locator('#expenseCredit select[name="accountUuid"]'),
    scheduleTransaction: page.locator('div[id="expenseCredit"] input[name="scheduleCheckbox"]'),
    scheduleDropdown: page.locator('#expenseCredit select[name="schedulethis"]'),
    saveTransaction: page.locator('#addTransactionSave'),
    scheduledTransactionInTransaction: page.locator('div[id="expenseCredit"] input[name="scheduleCheckbox"]'),
    transactionNameInTransaction: page.locator('(//strong[contains(text(),"Walmart")])[1]'),
    selectEnvelopeFromDropdownn: page.locator('#expenseCredit select[name="envelopeUuid"]'),
    envelopeDeleteCTA: page.getByRole('button', { name: 'Delete' }),
    reports: page.locator('//a[normalize-space()="Reports"]'),
    spendingByEnvelopeDropedown: page.locator('a[href="/reports/spending-by-envelope"]'),
    spendingByMonth: page.getByRole('link', { name: 'Spending by Month' }),
    spendingByEnvelopeTitle: page.locator('//h1[normalize-space()="Spending by Envelope"]'),
    spendingFrom: page.locator('//label[normalize-space()="From"]'),
    spendingTo: page.locator('label[for="timeTo"]'),
    envelopeDropdown: page.locator('#envelope'),
    accountDropdown: page.locator('#account'),
    spendingVsBudgetTitle: page.locator('//h1[normalize-space()="Spending vs Budget"]'),
    refreshCTA: page.locator('#recalculate'),
    spendingByMonthTitle: page.getByRole('heading', { name: 'Spending by Month' }),
  }
}