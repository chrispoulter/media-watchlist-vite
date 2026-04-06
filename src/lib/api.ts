const BASE = import.meta.env.VITE_API_URL as string;

async function request<T>(
  method: string,
  path: string,
  options?: { body?: unknown; params?: Record<string, string> }
): Promise<T> {
  const url = new URL(BASE + path);
  if (options?.params) {
    Object.entries(options.params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...(options?.body !== undefined && { body: JSON.stringify(options.body) }),
  });
  const text = await res.text();
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const json = JSON.parse(text) as { error?: string };
      if (typeof json.error === "string") message = json.error;
    } catch {}
    throw new Error(message);
  }
  return (text ? JSON.parse(text) : undefined) as T;
}

export const api = {
  get: <T>(path: string, opts?: { params?: Record<string, string> }) =>
    request<T>("GET", path, opts),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, { body }),
  delete: <T = void>(path: string) => request<T>("DELETE", path),
};
