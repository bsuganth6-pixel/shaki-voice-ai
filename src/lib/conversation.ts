import { getScheme, evaluateScheme, requiredFields, SCHEMES } from './policyEngine';
import { fill, STRINGS } from './i18n';
import { parseAge, parseGender, parseNumber, parseYesNo } from './normalize';
import { containsPII, normalizeDigits } from './pii';
import { isAllowedUrl } from './urlAllowlist';
import type { Lang, UserState } from './types';

export type Step = 'scheme' | keyof UserState | 'done';

export interface Session {
  lang: Lang;
  step: Step;
  schemeId?: string;
  user: UserState;
}

export interface Turn {
  session: Session;
  say: string[];
  handoffUrl?: string;
  eligible?: boolean;
  /** false when the answer could not be parsed (caller may try the AI helper). */
  understood?: boolean;
}

export const newSession = (lang: Lang): Session => ({ lang, step: 'scheme', user: {} });
export const greeting = (lang: Lang): string => STRINGS[lang].welcome;

const question = (lang: Lang, field: keyof UserState) =>
  STRINGS[lang][`q_${field}` as keyof (typeof STRINGS)['en']];

/** Next unanswered field for the chosen scheme (one question at a time). */
function nextField(s: Session): keyof UserState | undefined {
  const scheme = getScheme(s.schemeId!)!;
  return requiredFields(scheme).find((f) => s.user[f] === undefined);
}

function parseScheme(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/\b1\b|ujjwala|ujwala|உஜ்வலா|उज्ज्वला|gas|எரிவாயு|गैस|lpg/.test(t)) return SCHEMES[0].id;
  if (/\b2\b|magalir|urimai|மகளிர்|உரிமை|तमिल/.test(t)) return SCHEMES[1].id;
  return undefined;
}

function parseField(field: keyof UserState, text: string): Partial<UserState> | undefined {
  switch (field) {
    case 'gender': { const g = parseGender(text); return g ? { gender: g } : undefined; }
    case 'age': { const a = parseAge(text); return a !== undefined ? { age: a } : undefined; }
    case 'incomeLevel': { const y = parseYesNo(text); return y === undefined ? undefined : { incomeLevel: y ? 'bpl' : 'apl' }; }
    case 'state': { const y = parseYesNo(text); return y === undefined ? undefined : { state: y ? 'tamil_nadu' : 'other' }; }
    case 'hasExistingConnection': { const y = parseYesNo(text); return y === undefined ? undefined : { hasExistingConnection: y }; }
    case 'annualIncome': { const n = parseNumber(text); return n !== undefined && n >= 0 ? { annualIncome: n } : undefined; }
    case 'landAcres': { const n = parseNumber(text); return n !== undefined && n >= 0 && n < 10000 ? { landAcres: n } : undefined; }
    default: return undefined;
  }
}

/** Pure state machine: (session, utterance) -> (session, things to say). */
export function step(session: Session, input: string): Turn {
  const t = STRINGS[session.lang];
  const ask = (s: Session, ...prefix: string[]): Turn => {
    const f = s.step as keyof UserState;
    return { session: s, say: [...prefix, question(s.lang, f)] };
  };

  if (session.step === 'done') return { session, say: [t.restart] };

  // Privacy guard: never process secrets, never echo them.
  if (containsPII(normalizeDigits(input))) {
    return session.step === 'scheme' ? { session, say: [t.pii, t.welcome] } : ask(session, t.pii);
  }

  if (session.step === 'scheme') {
    const id = parseScheme(input);
    if (!id) return { session, say: [t.retry, t.welcome], understood: false };
    const next: Session = { ...session, schemeId: id, step: 'gender' };
    next.step = nextField(next)!;
    return ask(next);
  }

  const patch = parseField(session.step, input);
  if (!patch) return { ...ask(session, t.retry), understood: false };
  const updated: Session = { ...session, user: { ...session.user, ...patch } };
  const f = nextField(updated);
  if (f) return ask({ ...updated, step: f });

  const scheme = getScheme(updated.schemeId!)!;
  const verdict = evaluateScheme(scheme, updated.user);
  const done: Session = { ...updated, step: 'done' };
  if (!verdict.eligible) {
    return { session: done, say: [fill(t.notEligible, { scheme: scheme.name }), t.restart], eligible: false };
  }
  const url = isAllowedUrl(scheme.officialUrl) ? scheme.officialUrl : undefined;
  return {
    session: done,
    eligible: true,
    handoffUrl: url,
    say: [
      fill(t.eligible, { scheme: scheme.name }),
      fill(t.docs, { docs: scheme.documentsRequired.join(', ') }),
      ...(url ? [fill(t.handoff, { url })] : []),
      t.safety,
    ],
  };
}
