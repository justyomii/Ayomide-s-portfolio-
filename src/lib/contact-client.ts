const CLIENT_COOLDOWN_MS = 60_000;
const STORAGE_KEY = "contact_last_submit";

export function canSubmitFromClient(): { allowed: true } | { allowed: false; waitSeconds: number } {
  if (typeof window === "undefined") return { allowed: true };

  const last = window.localStorage.getItem(STORAGE_KEY);
  if (!last) return { allowed: true };

  const elapsed = Date.now() - Number(last);
  if (elapsed >= CLIENT_COOLDOWN_MS) return { allowed: true };

  return {
    allowed: false,
    waitSeconds: Math.ceil((CLIENT_COOLDOWN_MS - elapsed) / 1000),
  };
}

export function markClientSubmit(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
}
