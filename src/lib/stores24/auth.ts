export interface Stores24Session {
  id: string;
  name: string;
  username: string;
  role: string;
}

const SESSION_KEY = "stores24_session";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getSession(): Stores24Session | null {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Stores24Session;
  } catch {
    return null;
  }
}

export function setSession(session: Stores24Session): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.removeItem(SESSION_KEY);
}


