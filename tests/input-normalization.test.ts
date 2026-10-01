import { describe, expect, it } from 'vitest';
import { parseAge, parseGender, parseNumber, parseYesNo } from '@/lib/normalize';
import { sanitizeUser } from '@/lib/sanitize';

describe('normalization', () => {
  it('yes/no in three languages', () => {
    expect(parseYesNo('Yes please')).toBe(true);
    expect(parseYesNo('ஆம்')).toBe(true);
    expect(parseYesNo('இல்லை')).toBe(false);
    expect(parseYesNo('नहीं')).toBe(false);
    expect(parseYesNo('maybe')).toBeUndefined();
  });
  it('gender', () => {
    expect(parseGender('I am a woman')).toBe('female');
    expect(parseGender('ஆண்')).toBe('male');
    expect(parseGender('महिला')).toBe('female');
  });
  it('numbers and amounts', () => {
    expect(parseNumber('2 lakh')).toBe(200000);
    expect(parseNumber('2.5 லட்சம்')).toBe(250000);
    expect(parseNumber('५० हज़ार')).toBe(50000);
    expect(parseNumber('none')).toBe(0);
  });
  it('age bounds', () => {
    expect(parseAge('I am 35 years')).toBe(35);
    expect(parseAge('2')).toBeUndefined();
    expect(parseAge('300')).toBeUndefined();
  });
  it('sanitizeUser drops unknown/hostile fields', () => {
    const u = sanitizeUser({ gender: 'female', age: -4, aadhaar: '123412341234', state: 'Tamil Nadu; DROP' });
    expect(u).toEqual({ gender: 'female' });
    expect(JSON.stringify(u)).not.toContain('1234');
  });
});
