import { normalizeDigits } from './pii';

const YES = ['yes', 'yeah', 'yep', 'y', 'ok', 'okay', 'ஆம்', 'ஆமாம்', 'ஆமா', 'ஆம', 'हाँ', 'हां', 'जी', 'है', 'haan', 'aam'];
const NO = ['no', 'nope', 'n', 'not', 'இல்லை', 'இல்ல', 'இல்லைங்க', 'नहीं', 'नही', 'नहि', 'illai', 'nahi'];
const FEMALE = ['woman', 'female', 'lady', 'girl', 'பெண்', 'பெண்ணு', 'महिला', 'औरत', 'स्त्री', 'penn'];
const MALE = ['man', 'male', 'boy', 'ஆண்', 'पुरुष', 'आदमी', 'aan'];

const tokens = (t: string) =>
  t.toLowerCase().replace(/[.,!?;:।"'()]/g, ' ').split(/\s+/).filter(Boolean);

export function parseYesNo(text: string): boolean | undefined {
  const tk = tokens(text);
  const no = tk.some((w) => NO.includes(w));
  const yes = tk.some((w) => YES.includes(w));
  if (no && !yes) return false;
  if (yes && !no) return true;
  return undefined;
}

export function parseGender(text: string): 'female' | 'male' | undefined {
  const tk = tokens(text);
  const f = tk.some((w) => FEMALE.includes(w));
  const m = tk.some((w) => MALE.includes(w) && !FEMALE.includes(w));
  if (f && !m) return 'female';
  if (m && !f) return 'male';
  return undefined;
}

/** First number in the text; understands "2 lakh", "லட்சம்", "लाख", "thousand", Tamil/Hindi digits. */
export function parseNumber(text: string): number | undefined {
  const t = normalizeDigits(text).toLowerCase().replace(/,/g, '');
  const m = t.match(/\d+(?:\.\d+)?/);
  if (!m) return /\b(none|zero|no land)\b|இல்லை|शून्य|नहीं/.test(t) ? 0 : undefined;
  let n = parseFloat(m[0]);
  if (/lakh|lac|லட்ச|लाख/.test(t)) n *= 100000;
  else if (/thousand|ஆயிரம்|हज़ार|हजार/.test(t)) n *= 1000;
  return Number.isFinite(n) ? n : undefined;
}

export function parseAge(text: string): number | undefined {
  const n = parseNumber(text);
  return n !== undefined && n >= 5 && n <= 110 ? Math.round(n) : undefined;
}
