// tests/envelopes.spec.ts
import { test, expect } from '@playwright/test';
import { GoodbudgetClient } from '../utils/client';

// mirror the JSON shape from Goodbudget
interface RawEnvelope {
  uuid: string;
  name: string;
  amount: string;
  periodExtra: string;
  period: string;
  envelopeType: 'ENV_REG' | 'ENV_IRR' | 'ENV_DT_PMT' | string;
  // there are other fields (currentAmount, nextDueDate) but we only need these to CREATE
}

test.describe('Envelopes CRUD via Goodbudget API', () => {
  let client: GoodbudgetClient;
  let initialReg: RawEnvelope[];
  let createdUuid: string;

  test.beforeAll(async ({ playwright }) => {
    client = new GoodbudgetClient(
      await playwright.request.newContext({
        baseURL: 'https://goodbudget.com',
        storageState: 'Task3/utils/.auth.json',
        extraHTTPHeaders: {
          // we set Content-Type inside saveEnvelopes()
          Accept: 'application/json',
        },
      })
    );
  });

  test('List current REG envelopes', async () => {
    const all = (await client.getEnvelopes()) as unknown as RawEnvelope[];
    initialReg = all.filter(e => e.envelopeType === 'ENV_REG');
    console.log(
      `→ Initially ${initialReg.length} REG envelopes:`,
      initialReg.map(e => e.name).join(', ')
    );
    expect(Array.isArray(initialReg)).toBe(true);
  });

  test('Create ➔ should create a new envelope (no timestamp)', async () => {
    // 1) New envelope with fixed name
    const newEnv: RawEnvelope = {
      uuid:        '',
      name:        'Test Automation',
      amount:      '42.00',
      periodExtra: '1',
      period:      'MON',
      envelopeType:'ENV_REG',
    };

    // 2) Build the full REG‐only list and POST
    const toSave = [ ...initialReg, newEnv ];
    console.log('› POST ENV_REG =', JSON.stringify(toSave));
    const resp = await client.saveEnvelopes(toSave);
    expect(resp.ok(), `Save failed ${resp.status()}`).toBeTruthy();

    // 3) Fetch REG again and diff by UUID
    const allAfter = ((await client.getEnvelopes()) as unknown as RawEnvelope[])
                       .filter(e => e.envelopeType === 'ENV_REG');
    console.log(
      `→ After save ${allAfter.length} REG envelopes:`,
      allAfter.map(e => e.name).join(', ')
    );

    const beforeSet = new Set(initialReg.map(e => e.uuid));
    const added = allAfter.filter(e => !beforeSet.has(e.uuid));
    expect(
      added.length,
      `Expected at least one new REG envelope, got none`
    ).toBeGreaterThan(0);

    // 4) Pick the one named "Test Automation" (or the first if multiple)
    const created = added.find(e => e.name === 'Test Automation') || added[0];
    createdUuid = created.uuid;
    expect(createdUuid).toBeTruthy();
    console.log(await resp.text());
console.log(resp.status(), resp.headers()['content-type']);
  });

  test('Read ➔ should list envelopes and include the new one', async () => {
    const regs = ((await client.getEnvelopes()) as unknown as RawEnvelope[])
                  .filter(e => e.envelopeType === 'ENV_REG');
    const found = regs.find(e => e.uuid === createdUuid);
    
    expect(found).toBeDefined();
    expect(found!.name).toBe('Test Automation');
  });

  test('Update ➔ should rename the created envelope', async () => {
    const updatedEnv: RawEnvelope = {
      uuid:        createdUuid,
      name:        'Renamed Envelope',
      amount:      '42.00',
      periodExtra: '1',
      period:      'MON',
      envelopeType:'ENV_REG',
    };

    // merge into current REG list
    const current = ((await client.getEnvelopes()) as unknown as RawEnvelope[])
                      .filter(e => e.envelopeType === 'ENV_REG');
    const patched = current.map(e =>
      e.uuid === createdUuid ? updatedEnv : e
    );

    const resp = await client.saveEnvelopes(patched);
    expect(resp.ok()).toBeTruthy();

    const after = ((await client.getEnvelopes()) as unknown as RawEnvelope[])
                    .filter(e => e.envelopeType === 'ENV_REG');
    const found = after.find(e => e.uuid === createdUuid);
    expect(found).toBeDefined();
    expect(found!.name).toBe('Renamed Envelope');
  });

  test('Delete ➔ should delete the envelope', async () => {
  const resp = await client.deleteEnvelope(createdUuid);
  expect(resp.ok()).toBeTruthy();

  const finalRegs = ((await client.getEnvelopes()) as any[])
                       .filter(e => e.envelopeType === 'ENV_REG');
  const found = finalRegs.find(e => e.uuid === createdUuid);
  expect(found).toBeUndefined();
});
});
