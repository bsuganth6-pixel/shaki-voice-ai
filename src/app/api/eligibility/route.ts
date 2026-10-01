import { NextRequest, NextResponse } from 'next/server';
import { evaluateEligibility } from '@/lib/policyEngine';
import { allow } from '@/lib/rateLimit';
import { sanitizeUser } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  if (!allow(`elig:${ip}`)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let body: { user?: unknown; schemeId?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const schemeId = typeof body.schemeId === 'string' ? body.schemeId : undefined;
  const results = evaluateEligibility(sanitizeUser(body.user), schemeId).map(({ scheme, verdict }) => ({
    id: scheme.id, name: scheme.name, ...verdict, documents: scheme.documentsRequired,
  }));
  return NextResponse.json({ results });
}
