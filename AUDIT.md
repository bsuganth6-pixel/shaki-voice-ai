# SakhiVoice Repository Audit

**Date:** 2026-10-01  
**Current Score Estimate:** ~78/100  
**Target Score:** 90-100/100

---

## 1. Current Architecture

### Stack
- **Framework:** Next.js 16.3.8 (App Router, Turbopack)
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS v3.4.19 with custom design tokens
- **Testing:** Vitest v2.1.9 (unit tests only)
- **AI:** Google Gemini API (REST, optional, server-side only)
- **Voice:** Browser Web Speech API (SpeechRecognition + SpeechSynthesis)
- **Database:** InsForge (PostgreSQL-based BaaS) - migrations exist but not used at runtime
- **Deployment:** Vercel (single application)

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── assist/route.ts        # Optional Gemini normalization helper
│   │   └── eligibility/route.ts   # Eligibility evaluation API
│   ├── companion/page.tsx         # Main voice/text interaction page
│   ├── globals.css                # Global styles + design tokens
│   ├── layout.tsx                 # Root layout with fonts, header, footer
│   └── page.tsx                   # Landing page
├── data/
│   └── knowledge_base.json        # Scheme definitions (2 schemes)
├── lib/
│   ├── conversation.ts            # State machine + conversation logic
│   ├── i18n.ts                    # 3-language support (ta, hi, en)
│   ├── normalize.ts               # Input parsing (yes/no, gender, numbers, age)
│   ├── pii.ts                     # PII detection + digit normalization
│   ├── policyEngine.ts            # Deterministic eligibility evaluation
│   ├── rateLimit.ts               # In-memory sliding window rate limiter
│   ├── sanitize.ts                # Input sanitization for API
│   ├── types.ts                   # TypeScript interfaces
│   └── urlAllowlist.ts            # Official government URL allowlist
tests/
├── input-normalization.test.ts    # 5 tests
├── pii.test.ts                    # 9 tests
├── policy.test.ts                 # 10 tests
└── state-machine.test.ts          # 7 tests
migrations/
└── 20261001080436_init-schemes.sql  # InsForge DB schema (unused at runtime)
```

---

## 2. Implemented Features

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page | ✅ | Marketing page with scheme overview |
| Voice companion page | ✅ | `/companion` with full interaction |
| Language selection | ✅ | Tamil, Hindi, English (3 languages) |
| Speech recognition | ✅ | Web Speech API (Chrome/Edge/Android) |
| Speech synthesis | ✅ | Web Speech API with language support |
| Text input fallback | ✅ | Always available |
| One question at a time | ✅ | Enforced by state machine |
| PMUY scheme | ✅ | Rules in knowledge_base.json |
| KMUT scheme | ✅ | Rules in knowledge_base.json |
| Deterministic policy engine | ✅ | Pure functions, no AI for decisions |
| PII detection/blocking | ✅ | Aadhaar, OTP, PIN, phone, account numbers |
| Input normalization | ✅ | Multi-language, multi-script support |
| URL allowlist | ✅ | HTTPS + official gov hosts only |
| Rate limiting | ⚠️ | In-memory only (per-instance) |
| Optional Gemini helper | ✅ | Server-side only, strict output validation |
| Unit tests | ✅ | 31 tests passing |
| TypeScript strict mode | ✅ | No errors |
| ESLint | ✅ | 1 warning (postcss.config.js) |
| Build | ✅ | Successful |

---

## 3. Missing Features (Gap Analysis)

### 3.1 Core User Journey Gaps

| Missing Feature | Priority | Details |
|-----------------|----------|---------|
| **Consent/Privacy screen** | CRITICAL | No consent flow before voice interaction. Required by prompt. |
| **Language registry** | HIGH | Only 3 languages; need 11+ Indian languages with metadata |
| **Demo mode route** | HIGH | `/demo` with test scenarios required |
| **Failure state UX** | HIGH | No explicit UX for mic denied, network error, Gemini failure, etc. |
| **Official source verification** | HIGH | Knowledge base lacks `source`, `verifiedAt`, `lastReviewed` metadata |
| **Gemini Live / Realtime** | MEDIUM | Only REST API used; no streaming/realtime voice |
| **Code-switching support** | MEDIUM | Tamil+English mixing not explicitly handled |

### 3.2 Security Gaps

| Gap | Severity | Details |
|-----|----------|---------|
| **Rate limiting** | MEDIUM | In-memory only; not shared across serverless instances |
| **Structured logging** | MEDIUM | No observability/logging infrastructure |
| **Prompt injection tests** | MEDIUM | Tests exist but could be more comprehensive |
| **CSP/Security headers** | LOW | Not configured in next.config.ts |

### 3.3 Accessibility Gaps

| Gap | Severity | Details |
|-----|----------|---------|
| **WCAG compliance** | HIGH | Not systematically tested |
| **Keyboard navigation** | HIGH | Not verified |
| **Screen reader testing** | HIGH | aria-live present but not fully tested |
| **Reduced motion** | MEDIUM | CSS exists but not tested |
| **Contrast ratios** | MEDIUM | Custom colors not verified against WCAG AA |
| **Touch target sizes** | MEDIUM | 48px minimum not verified everywhere |
| **Dynamic document language** | MEDIUM | `html[lang]` updates but not all content |

### 3.4 Testing Gaps

| Gap | Severity | Details |
|-----|----------|---------|
| **E2E tests (Playwright)** | CRITICAL | None exist |
| **Happy path E2E** | CRITICAL | Required by prompt |
| **Failure path E2E** | HIGH | Required by prompt |
| **Accessibility tests** | HIGH | None |
| **Visual regression tests** | MEDIUM | None |
| **Coverage reporting** | MEDIUM | Not configured |

### 3.5 Code Quality Gaps

| Gap | Severity | Details |
|-----|----------|---------|
| **Dead code** | LOW | Migration file unused; InsForge SDK imported but not used in app code |
| **Inconsistent error handling** | MEDIUM | Some try/catch blocks swallow errors silently |
| **Type safety** | LOW | `any` used in some places (e.g., conversation.ts line 12) |
| **Documentation** | MEDIUM | No API docs, component docs, or architecture docs |

---

## 4. Security Issues

### 4.1 Confirmed Issues

1. **In-memory rate limiting** - Not production-ready for serverless (per-instance only)
2. **No CSP headers** - Missing Content-Security-Policy
3. **No security headers** - Missing X-Frame-Options, X-Content-Type-Options, Referrer-Policy
4. **Gemini API error handling** - Returns `fallback: true` on various errors without distinction

### 4.2 Potential Vulnerabilities

1. **PII regex for account numbers** - `\b\d{9,18}\b` may false-positive on large income/land values
2. **URL allowlist** - Only hostname check; path traversal not validated (though HTTPS enforced)
3. **Gemini output validation** - `SAFE_OUTPUT` regex is strict but could be bypassed with Unicode

### 4.3 PII Protection Assessment

| Data Type | Detected | Blocked from AI | Not Stored | Not Logged |
|-----------|----------|-----------------|------------|------------|
| Aadhaar | ✅ | ✅ | ✅ | ✅ |
| OTP/PIN | ✅ | ✅ | ✅ | ✅ |
| Passwords | ✅ | ✅ | ✅ | ✅ |
| Bank account | ✅ | ✅ | ✅ | ✅ |
| Credit card | ❌ | ❌ | ✅ | ✅ |
| CVV | ✅ | ✅ | ✅ | ✅ |
| Phone numbers | ✅ | ✅ | ✅ | ✅ |

**Issue:** Credit card numbers not explicitly detected (Luhn algorithm not implemented)

---

## 5. Accessibility Issues

### 5.1 Current Implementation
- ✅ Semantic HTML (main, header, footer, nav, section)
- ✅ Skip to content link
- ✅ `html[lang]` updates dynamically
- ✅ `aria-live="polite"` on conversation log
- ✅ `role="log"` on conversation container
- ✅ `role="alert"` for notices
- ✅ Focus-visible styles
- ✅ Reduced motion media query
- ✅ Large touch targets (min-h-[48px], min-h-[64px])
- ✅ Labels on form inputs (sr-only where needed)
- ✅ Alt text on images (material icons are decorative)

### 5.2 Gaps
- ❌ No automated accessibility testing (axe-core, jest-axe)
- ❌ Contrast ratios not verified for custom color palette
- ❌ Keyboard navigation not tested end-to-end
- ❌ Screen reader testing not done
- ❌ RTL support not implemented (needed for Urdu if added)
- ❌ Error announcements could be more descriptive
- ❌ No "repeat last question" button (voice failure fallback)

---

## 6. Testing Gaps

### 6.1 Unit Tests (31 passing)
- Policy engine: 10 tests ✅
- State machine: 7 tests ✅
- PII/URL/Rate limit: 9 tests ✅
- Input normalization: 5 tests ✅

### 6.2 Missing Test Categories

| Category | Required by Prompt | Status |
|----------|-------------------|--------|
| Policy edge cases (age boundaries, invalid gender, missing state, income boundary, land boundary, unknown info) | ✅ | Partially covered |
| State machine (valid progression, invalid transition, repeat, correction, language switch, unknown answer, completion) | ✅ | Partially covered |
| Security (Aadhaar, OTP, PIN, password, bank account, card number, prompt injection, malicious URL, malformed AI response, arbitrary tool call, oversized input) | ✅ | Partially covered |
| Multilingual (Tamil, Hindi, Telugu, Kannada, Malayalam, English, mixed Tamil-English) | ✅ | Only 3 languages tested |
| E2E happy path | ✅ | **MISSING** |
| E2E failure paths | ✅ | **MISSING** |

---

## 7. Incorrect/Unsupported Claims

### 7.1 In README.md
| Claim | Status | Evidence |
|-------|--------|----------|
| "12+ Indian languages" | ❌ FALSE | Only 3 implemented (ta, hi, en) |
| "Voice recognition depends on browser support (Chrome/Edge/Android work best)" | ⚠️ PARTIAL | True but should list supported languages |
| "Database migration in migrations/ is optional and not used at runtime" | ✅ TRUE | Confirmed unused |
| "31 unit tests" | ✅ TRUE | Verified |

### 7.2 In Landing Page (page.tsx)
| Claim | Status | Evidence |
|-------|--------|----------|
| "100% Free Voice Companion" | ⚠️ DEBATABLE | Free to use but Gemini API costs money; "voice companion" implies voice works everywhere |
| "3 languages" in feature card | ✅ TRUE | Matches implementation |
| "More Indian languages are planned" | ✅ TRUE | Honest about future work |

### 7.3 In Layout Footer
| Claim | Status |
|-------|--------|
| "Independent guidance for citizen empowerment • No paperwork stress" | ✅ ACCEPTABLE (marketing) |
| "Privacy: Aadhaar, OTP, PIN and bank numbers are blocked and never stored" | ✅ TRUE |

---

## 8. Dead Code / Unused Files

1. **`migrations/20261001080436_init-schemes.sql`** - InsForge migration, not used at runtime
2. **`@insforge/sdk` in package.json** - Imported but never used in application code
3. **`postcss.config.js`** - Warning about anonymous default export (minor)

---

## 9. Deployment Issues

1. **Turbopack warning** - `package-lock.json` outside git repo root
2. **No Vercel configuration** - No `vercel.json` for headers, rewrites, or cron jobs
3. **No environment validation** - No runtime check for required env vars
4. **Rate limiting not production-ready** - Needs shared store (Redis/Upstash) for serverless
5. **No health check endpoint** - `/api/health` missing (required by prompt)

---

## 10. Recommended Fixes (Priority Order)

### Phase 1: Critical (Must fix for 90+ score)

1. **Add consent/privacy screen** before voice interaction
2. **Implement `/demo` route** with 8 required scenarios
3. **Add Playwright E2E tests** - happy path + failure paths
4. **Expand language registry** to 11+ Indian languages with full metadata
5. **Add source metadata to knowledge base** (`source`, `verifiedAt`, `lastReviewed`)
6. **Implement failure state UX** for all 10 failure modes
7. **Add `/api/health` endpoint**

### Phase 2: High (Security & Accessibility)

8. **Replace in-memory rate limiting** with Upstash Redis (optional, with fallback)
9. **Add security headers** (CSP, HSTS, X-Frame-Options, etc.)
10. **Add structured logging** (request ID, timing, state transitions, error categories)
11. **Run accessibility audit** with axe-core + manual testing
12. **Fix contrast ratios** for custom Tailwind colors
13. **Add credit card detection** to PII guard
14. **Verify keyboard navigation** end-to-end

### Phase 3: Medium (Quality & Polish)

15. **Add Gemini Live / realtime voice** as primary, Web Speech as fallback
16. **Implement code-switching support** (Tamil+English)
17. **Add coverage reporting** (vitest --coverage)
18. **Remove dead code** (migrations, unused InsForge SDK)
19. **Fix ESLint warning** in postcss.config.js
20. **Add API documentation** (OpenAPI/Swagger)
21. **Add vercel.json** for production deployment config

### Phase 4: Nice to Have

22. **Visual regression tests** (Playwright + pixelmatch)
23. **Performance monitoring** (Web Vitals)
24. **Internationalization for RTL languages** (Urdu)
25. **Offline support** (Service Worker)

---

## 11. Test Results Summary (Current)

```
Test Files:  4 passed (4)
Tests:      31 passed (31)
TypeCheck:  PASS
Lint:       PASS (1 warning)
Build:      PASS
```

---

## 12. Architecture Compliance with Prompt Requirements

| Requirement | Status | Notes |
|-------------|--------|-------|
| Single Vercel app | ✅ | |
| All backend under app/api/** | ✅ | |
| No separate FastAPI/Express | ✅ | |
| No NEXT_PUBLIC_GEMINI_API_KEY | ✅ | Uses GEMINI_API_KEY server-side |
| Deterministic policy engine | ✅ | |
| Gemini NOT authoritative for eligibility | ✅ | |
| Zod validation | ❌ | Not used (manual validation) |
| Strict structured AI output | ✅ | SAFE_OUTPUT regex |
| PII guard | ✅ | Good but incomplete (credit cards) |
| URL allowlist | ✅ | |
| State machine | ✅ | Explicit transitions |
| Multilingual architecture | ⚠️ | Only 3 of 11+ languages |
| WCAG accessibility | ⚠️ | Partial implementation |
| Vitest + Playwright | ❌ | Playwright missing |
| Demo route | ❌ | Missing |
| No fake claims | ⚠️ | Some overstated claims exist |

---

## 13. Next Steps

1. Create detailed implementation plan for Phase 1 fixes
2. Begin with consent screen and demo route
3. Add Playwright and E2E tests
4. Expand language registry
5. Fix knowledge base with source metadata
6. Run accessibility audit
7. Update README with accurate claims
8. Run full test suite after each phase