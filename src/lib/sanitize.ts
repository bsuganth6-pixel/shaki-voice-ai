import type { UserState } from './types';

const num = (v: unknown, max: number) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= max ? v : undefined);
const pick = <T extends string>(v: unknown, allowed: readonly T[]) => (allowed.includes(v as T) ? (v as T) : undefined);

/** Validate untrusted input into a UserState; unknown keys (e.g. Aadhaar) are dropped. */
export function sanitizeUser(raw: unknown): UserState {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  return {
    gender: pick(o.gender, ['female', 'male', 'other'] as const),
    age: num(o.age, 120),
    incomeLevel: pick(o.incomeLevel, ['bpl', 'apl'] as const),
    annualIncome: num(o.annualIncome, 1e9),
    state: typeof o.state === 'string' && /^[a-z_]{2,30}$/.test(o.state) ? o.state : undefined,
    landAcres: num(o.landAcres, 10000),
    hasExistingConnection: typeof o.hasExistingConnection === 'boolean' ? o.hasExistingConnection : undefined,
  };
}

