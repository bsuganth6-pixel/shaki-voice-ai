import { describe, expect, it } from 'vitest';
import { newSession, step } from '@/lib/conversation';

const run = (lang: 'en' | 'ta' | 'hi', inputs: string[]) => {
  let s = newSession(lang);
  let last = step(s, inputs[0]);
  s = last.session;
  for (const i of inputs.slice(1)) { last = step(s, i); s = last.session; }
  return last;
};

describe('conversation', () => {
  it('asks exactly one question at a time', () => {
    const t = step(newSession('en'), '1');
    expect(t.say).toHaveLength(1);
    expect(t.session.step).toBe('gender');
  });
  it('completes PMUY in English and hands off to the official site only', () => {
    const t = run('en', ['1', 'woman', '35', 'yes', 'no']);
    expect(t.eligible).toBe(true);
    expect(t.handoffUrl).toBe('https://www.pmuy.gov.in/');
    expect(t.say.join(' ')).toContain('Aadhaar Card');
  });
  it('works in Tamil with Tamil digits', () => {
    const t = run('ta', ['1', 'பெண்', '௩௫', 'ஆம்', 'இல்லை']);
    expect(t.eligible).toBe(true);
  });
  it('works in Hindi', () => {
    const t = run('hi', ['1', 'महिला', '३५', 'हाँ', 'नहीं']);
    expect(t.eligible).toBe(true);
  });
  it('Magalir flow enforces income and land', () => {
    const bad = run('en', ['2', 'woman', '40', 'yes', '3 lakh', '1']);
    expect(bad.eligible).toBe(false);
    const good = run('en', ['2', 'woman', '40', 'yes', '2 lakh', '0']);
    expect(good.eligible).toBe(true);
  });
  it('re-asks the same question when it cannot understand', () => {
    const t = run('en', ['1', 'banana']);
    expect(t.understood).toBe(false);
    expect(t.session.step).toBe('gender');
  });
  it('is terminal after completion', () => {
    const t = run('en', ['1', 'woman', '35', 'yes', 'no', 'hello']);
    expect(t.session.step).toBe('done');
  });
});
