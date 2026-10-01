/** Sensitive data must never be stored, logged or sent to an AI model. */
const PATTERNS: [RegExp, string][] = [
  [/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[AADHAAR]'],
  [/\b(?:otp|pin|cvv|password)\b\D{0,12}\d{3,8}\b/gi, '[SECRET]'],
  [/\b\d{3,8}\s*(?:is\s+)?(?:my\s+)?(?:otp|pin)\b/gi, '[SECRET]'],
  [/(?:\+?91[\s-]?)?\b[6-9]\d{9}\b/g, '[PHONE]'],
  [/\b\d{9,18}\b/g, '[ACCOUNT]'],
];

export function redactPII(text: string): string {
  return PATTERNS.reduce((t, [re, label]) => t.replace(re, label), text);
}

export function containsPII(text: string): boolean {
  return redactPII(text) !== text;
}

/** Digits from Tamil/Hindi numerals -> ASCII, so "௩௫" and "३५" parse as 35. */
export function normalizeDigits(text: string): string {
  return text.replace(/[\u0BE6-\u0BEF]/g, (c) => String(c.charCodeAt(0) - 0x0be6))
    .replace(/[\u0966-\u096F]/g, (c) => String(c.charCodeAt(0) - 0x0966));
}
