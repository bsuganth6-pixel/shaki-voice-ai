export type Lang =
  | 'en'
  | 'ta'
  | 'hi'
  | 'te'
  | 'kn'
  | 'ml'
  | 'mr'
  | 'bn'
  | 'gu'
  | 'or'
  | 'pa';

export interface LanguageMeta {
  code: Lang;
  label: string;
  nativeName: string;
  englishName: string;
  locale: string;
  speech: string;
  direction: 'ltr' | 'rtl';
  uiSupport: boolean;
  speechRecognitionSupport: boolean;
  speechOutputSupport: boolean;
  aiSupport: boolean;
  availability: 'available' | 'planned' | 'limited';
}

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

export interface SourceInfo {
  organization: string;
  url: string;
  verifiedAt: string; // ISO date string
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: EligibilityRules;
  documentsRequired: string[];
  officialUrl: string;
  source: SourceInfo;
  lastReviewed: string; // ISO date string
}

export interface Verdict {
  eligible: boolean;
  /** Rule keys that failed (empty when eligible). */
  failed: (keyof EligibilityRules)[];
  /** Rule keys we could not decide because the answer is missing. */
  missing: (keyof EligibilityRules)[];
}
