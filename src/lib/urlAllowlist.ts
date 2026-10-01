const ALLOWED_HOSTS = ['www.pmuy.gov.in', 'pmuy.gov.in', 'www.tn.gov.in', 'www.india.gov.in'];

/** Only https links to official government hosts may be opened from the assistant. */
export function isAllowedUrl(raw: string): boolean {
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' && ALLOWED_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}
