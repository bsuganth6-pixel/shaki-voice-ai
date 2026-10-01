import { describe, expect, it } from 'vitest';
import { containsPII, redactPII } from '@/lib/pii';
import { newSession, step } from '@/lib/conversation';
import { isAllowedUrl } from '@/lib/urlAllowlist';
import { allow } from '@/lib/rateLimit';

describe('PII guard', () => {
  it('detects Aadhaar-like numbers', () => expect(containsPII('my aadhaar 1234 5678 9012')).toBe(true));
  it('detects OTP and PIN', () => {
    expect(containsPII('otp is 482913')).toBe(true);
    expect(containsPII('my pin 4821')).toBe(true);
  });
  it('detects phone numbers', () => expect(containsPII('call 9876543210')).toBe(true));
  it('does not flag ages or incomes', () => {
    expect(containsPII('35')).toBe(false);
    expect(containsPII('250000')).toBe(false);
  });
  it('redacts', () => expect(redactPII('number 123456789012')).not.toMatch(/\d{12}/));
  it('state machine refuses secrets and does not advance', () => {
    const s = step(newSession('en'), '1').session;
    const t = step(s, 'my aadhaar is 1234 5678 9012');
    expect(t.session.step).toBe('gender');
    expect(JSON.stringify(t)).not.toContain('9012');
  });
});

describe('URL allowlist', () => {
  it('allows official https hosts', () => expect(isAllowedUrl('https://www.pmuy.gov.in/')).toBe(true));
  it('blocks look-alikes, http and junk', () => {
    expect(isAllowedUrl('https://pmuy.gov.in.evil.com/')).toBe(false);
    expect(isAllowedUrl('http://www.pmuy.gov.in/')).toBe(false);
    expect(isAllowedUrl('javascript:alert(1)')).toBe(false);
  });
});

describe('rate limit', () => {
  it('blocks after the limit and recovers after the window', () => {
    const k = 'k' + Math.random();
    expect([1, 2, 3].map(() => allow(k, 2, 1000, 0))).toEqual([true, true, false]);
    expect(allow(k, 2, 1000, 5000)).toBe(true);
  });
});
