import { APIRequestContext, APIResponse } from '@playwright/test';

export interface RawEnvelope {
  uuid:           string;
  name:           string;
  amount:         string;
  currentAmount:  string;
  period:         string;
  periodExtra:    string;
  envelopeType:   'ENV_REG' | 'ENV_IRR' | 'ENV_DT_PMT' | string;
  nextDueDate:    string;
}

export interface Envelope {
  Uuid:           string;
  FullName:       string;
  Amount:         string;
  CurrentAmount:  string;
  Period:         string;
  PeriodExtra:    string;
  EnvelopeType:   string;
  NextDueDate:    string;
}

export class GoodbudgetClient {
  constructor(private request: APIRequestContext) {}

  async getEnvelopes(): Promise<RawEnvelope[]> {
    const resp = await this.request.get('/buckets-api/household');
    if (!resp.ok()) {
      const text = await resp.text();
      console.error('GET /household failed:', resp.status(), text);
      throw new Error(`getEnvelopes failed: ${resp.status()}`);
    }
    const { envelopes } = await resp.json();
    return envelopes as RawEnvelope[];
  }

  private normalize(raw: Partial<RawEnvelope>[]): Envelope[] {
    return raw.map(e => ({
      Uuid:          e.uuid           ?? '',
      FullName:      e.name           ?? '',
      Amount:        e.amount         ?? '',
      CurrentAmount: e.currentAmount  ?? '0.00',
      Period:        e.period         ?? 'MON',
      PeriodExtra:   e.periodExtra    ?? '1',
      EnvelopeType:  e.envelopeType   ?? 'ENV_REG',
      NextDueDate:   e.nextDueDate    ?? '',
    }));
  }

  private async postForm(
    endpoint: string,
    params: URLSearchParams
  ): Promise<APIResponse> {
    const body = params.toString();
    console.log(`POST ${endpoint} body:\n   ${decodeURIComponent(body)}`);

    const resp = await this.request.post(endpoint, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept':   'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: body
    });

    if (!resp.ok()) {
      const text = await resp.text();
      console.error(` ${endpoint} returned ${resp.status()}:\n`, text);
    }
    return resp;
  }

  async saveEnvelopes(
    rawEnvs: Partial<RawEnvelope>[],
    deleted: string[] = []
  ): Promise<APIResponse> {
    const ENV_REG    = this.normalize(rawEnvs);
    const ENV_IRR    = [] as Envelope[];
    const ENV_DT_PMT = [] as Envelope[];

    const params = new URLSearchParams();
    params.append('ENV_REG',    JSON.stringify(ENV_REG));
    params.append('ENV_IRR',    JSON.stringify(ENV_IRR));
    params.append('ENV_DT_PMT', JSON.stringify(ENV_DT_PMT));
    params.append('deleted',    JSON.stringify(deleted));
    params.append('period',     'MON');
    ENV_REG.forEach((e, i) =>
      params.append(`period_extra_${i}`, e.PeriodExtra)
    );

    return this.postForm('/envelope/save', params);
  }

  async deleteEnvelope(uuidToDelete: string): Promise<APIResponse> {
    const all = await this.getEnvelopes();
    const regs = all.filter(e => e.envelopeType === 'ENV_REG');
    const remaining = regs.filter(e => e.uuid !== uuidToDelete);
    return this.saveEnvelopes(remaining, [uuidToDelete]);
  }
}
