# SakhiVoice

Voice-first (and text-fallback) guide that helps a woman check eligibility for a government scheme in Tamil, Hindi or English, one question at a time, then hands her to the **official** website. It is a guide, not an official government service.

## What works
- `/companion`: language choice, speech input (Web Speech API), spoken replies, typed fallback, one question per turn.
- Schemes: PM Ujjwala Yojana and Kalaignar Magalir Urimai Thittam (rules in `src/data/knowledge_base.json`; all rules, including income and land limits, are enforced by `src/lib/policyEngine.ts`).
- Optional Gemini helper (`/api/assist`): normalizes free-form answers. Needs `GEMINI_API_KEY` (server only, see `.env.example`). Without it, the deterministic parser is used.

## Security
- PII guard blocks Aadhaar, OTP/PIN, phone and account numbers; they are never echoed, stored or sent to the AI.
- AI output must match a strict allowlist, so injected text can never reach the user.
- Official-URL allowlist (https gov hosts only), server-side input validation, per-IP rate limiting.
- Nothing is persisted; the session lives in the browser tab.

## Develop
```
npm install
npm test          # 31 unit tests
npm run typecheck
npm run lint
npm run build
```

## Known limits
Voice recognition depends on browser support (Chrome/Edge/Android work best); typing always works. The government-site links should be verified before launch. Database migration in `migrations/` is optional and not used at runtime.
