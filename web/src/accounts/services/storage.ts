const SESSION_KEY = 'spencer_ting_account_session';

type StoredSession = {
  accessToken: string;
  account: { id: string; email: string };
};

export function readSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}
