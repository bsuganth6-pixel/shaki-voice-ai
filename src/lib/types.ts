export type Lang = 'en' | 'ta' | 'hi';

export interface UserState {
  gender?: 'female' | 'male' | 'other';
  age?: number;
  incomeLevel?: 'bpl' | 'apl';
  annualIncome?: number;
  state?: string;
  landAcres?: number;
  hasExistingConnection?: boolean;
}

export interface EligibilityRules {
  gender?: 'female' | 'male' | 'other';
  minAge?: number;
  incomeLevel?: 'bpl' | 'apl';
  state?: string;
  hasExistingConnection?: boolean;
  maxAnnualIncome?: number;
  maxLandOwnershipAcres?: number;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: EligibilityRules;
  documentsRequired: string[];
  officialUrl: string;
}

export interface Verdict {
  eligible: boolean;
  /** Rule keys that failed (empty when eligible). */
  failed: (keyof EligibilityRules)[];
  /** Rule keys we could not decide because the answer is missing. */
  missing: (keyof EligibilityRules)[];
}
