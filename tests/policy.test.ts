import { describe, expect, it } from 'vitest';
import { evaluateScheme, getScheme, evaluateEligibility } from '@/lib/policyEngine';

const pmuy = getScheme('pm_ujjwala_yojana')!;
const kmut = getScheme('kalaignar_magalir_urimai')!;

describe('PM Ujjwala rules', () => {
  const ok = { gender: 'female', age: 35, incomeLevel: 'bpl', hasExistingConnection: false } as const;
  it('accepts an eligible BPL woman', () => expect(evaluateScheme(pmuy, ok).eligible).toBe(true));
  it('rejects existing LPG connection', () =>
    expect(evaluateScheme(pmuy, { ...ok, hasExistingConnection: true }).failed).toContain('hasExistingConnection'));
  it('rejects under 18', () => expect(evaluateScheme(pmuy, { ...ok, age: 17 }).failed).toContain('minAge'));
  it('never passes silently on unanswered questions', () => {
    const v = evaluateScheme(pmuy, { gender: 'female' });
    expect(v.eligible).toBe(false);
    expect(v.missing).toEqual(expect.arrayContaining(['minAge', 'incomeLevel', 'hasExistingConnection']));
  });
});

describe('Kalaignar Magalir Urimai rules (income and land were previously ignored)', () => {
  const ok = { gender: 'female', age: 40, state: 'tamil_nadu', annualIncome: 200000, landAcres: 2 } as const;
  it('accepts eligible', () => expect(evaluateScheme(kmut, ok).eligible).toBe(true));
  it('rejects income above 2.5 lakh', () =>
    expect(evaluateScheme(kmut, { ...ok, annualIncome: 250001 }).failed).toContain('maxAnnualIncome'));
  it('accepts income exactly at limit', () => expect(evaluateScheme(kmut, { ...ok, annualIncome: 250000 }).eligible).toBe(true));
  it('rejects land above 5 acres', () =>
    expect(evaluateScheme(kmut, { ...ok, landAcres: 5.5 }).failed).toContain('maxLandOwnershipAcres'));
  it('rejects other states', () => expect(evaluateScheme(kmut, { ...ok, state: 'other' }).failed).toContain('state'));
});

it('evaluates only the requested scheme', () => {
  expect(evaluateEligibility({}, 'pm_ujjwala_yojana')).toHaveLength(1);
});
