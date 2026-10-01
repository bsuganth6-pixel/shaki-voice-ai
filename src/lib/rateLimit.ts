const hits = new Map<string, number[]>();

/** Simple in-memory sliding-window limiter (per instance). Returns true when allowed. */
export function allow(key: string, limit = 30, windowMs = 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
