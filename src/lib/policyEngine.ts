import kb from '@/data/knowledge_base.json';
import type { EligibilityRules, Scheme, UserState, Verdict } from './types';

export const SCHEMES: Scheme[] = kb.schemes as Scheme[];

export function getScheme(id: string): Scheme | undefined {
  return SCHEMES.find((s) => s.id === id);
}

/** Which user fields a scheme needs, in the order they should be asked. */
const RULE_TO_FIELD: Record<keyof EligibilityRules, keyof UserState> = {
  gender: 'gender',
  minAge: 'age',
  incomeLevel: 'incomeLevel',
  state: 'state',
  hasExistingConnection: 'hasExistingConnection',
  maxAnnualIncome: 'annualIncome',
  maxLandOwnershipAcres: 'landAcres',
};

export function requiredFields(scheme: Scheme): (keyof UserState)[] {
  return (Object.keys(scheme.eligibility) as (keyof EligibilityRules)[]).map((k) => RULE_TO_FIELD[k]);
}

/** Pure, deterministic evaluation of ONE scheme. Unknown answers are "missing", never silently passed. */
export function evaluateScheme(scheme: Scheme, user: UserState): Verdict {
  const r = scheme.eligibility;
  const failed: Verdict['failed'] = [];
  const missing: Verdict['missing'] = [];

  const check = <T,>(rule: keyof EligibilityRules, value: T | undefined, ok: (v: T) => boolean) => {
    if (r[rule] === undefined) return;
    if (value === undefined) missing.push(rule);
    else if (!ok(value)) failed.push(rule);
  };

  check('gender', user.gender, (v) => v === r.gender);
  check('minAge', user.age, (v) => v >= (r.minAge as number));
  check('incomeLevel', user.incomeLevel, (v) => v === r.incomeLevel);
  check('state', user.state, (v) => v === r.state);
  check('hasExistingConnection', user.hasExistingConnection, (v) => v === r.hasExistingConnection);
  check('maxAnnualIncome', user.annualIncome, (v) => v <= (r.maxAnnualIncome as number));
  check('maxLandOwnershipAcres', user.landAcres, (v) => v <= (r.maxLandOwnershipAcres as number));

  return { eligible: failed.length === 0 && missing.length === 0, failed, missing };
}

/** Evaluate every scheme (used by the API); a scheme id may narrow it to one. */
export function evaluateEligibility(user: UserState, schemeId?: string) {
  const list = schemeId ? SCHEMES.filter((s) => s.id === schemeId) : SCHEMES;
  return list.map((scheme) => ({ scheme, verdict: evaluateScheme(scheme, user) }));
}
