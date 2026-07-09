export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export function resolveApiBaseUrl(): string {
  const configured = API_BASE_URL.replace(/\/$/, '');
  if (configured) return configured;
  return '';
}

export function apiHttpUrl(path: string): string {
  const base = resolveApiBaseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
