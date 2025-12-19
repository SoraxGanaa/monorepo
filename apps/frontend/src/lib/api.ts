// apps/frontend/src/app/lib/api.ts
type FetchOptions = RequestInit & { timeoutMs?: number };

function withTimeout(
  signal: AbortSignal | null | undefined,
  timeoutMs: number
) {
  if (!timeoutMs) {
    return { signal, cleanup: () => { /* empty */ } };
  }

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(t),
  };
}

export function getApiBaseUrl() {
  const internal =
    process.env.INTERNAL_API_BASE_URL ??
    process.env.API_BASE_URL ??
    "";

  const publicBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "/api";

  const isServer = typeof window === "undefined";
  const base = isServer ? internal : publicBase;

  if (!base) {
    throw new Error(
      "Missing API base URL. Set INTERNAL_API_BASE_URL (SSR) and NEXT_PUBLIC_API_BASE_URL (client)."
    );
  }

  return base.replace(/\/$/, "");
}

export async function apiFetch(path: string, opts: FetchOptions = {}) {
  const base = getApiBaseUrl();
  const url = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? "" : "/"}${path}`;

  const timeoutMs = opts.timeoutMs ?? 10_000;
  const { signal, cleanup } = withTimeout(opts.signal, timeoutMs);

  try {
    return await fetch(url, {
      ...opts,
      signal,
      cache: opts.cache ?? "no-store",
    });
  } finally {
    cleanup();
  }
}
