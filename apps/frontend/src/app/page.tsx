import { BusinessListResponseSchema } from "@yellow/contract";
import { apiFetch } from "../lib/api";

export default async function Page() {
  let res: Response;

  try {
    // INTERNAL_API_BASE_URL=http://backend:3333/api
    // NEXT_PUBLIC_API_BASE_URL=/api
    // => "/business" дуудвал:
    // SSR: http://backend:3333/api/business
    // Client: /api/business
    res = await apiFetch("/business");
  } catch (e: any) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Businesses</h1>
        <pre>Fetch error: {String(e?.message ?? e)}</pre>
      </main>
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return (
      <main style={{ padding: 24 }}>
        <h1>Businesses</h1>
        <pre>
          Backend returned {res.status} {res.statusText}
        </pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{text.slice(0, 2000)}</pre>
      </main>
    );
  }

  const json = await res.json().catch(() => null);

  const parsed = BusinessListResponseSchema.safeParse(json);
  if (!parsed.success) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Businesses</h1>
        <pre>Contract mismatch: {parsed.error.message}</pre>
      </main>
    );
  }

  const { data } = parsed.data;

  return (
    <main style={{ padding: 24 }}>
      <h1>Businesses</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {data.map((b) => (
          <div
            key={b.id}
            style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
          >
            <div style={{ fontWeight: 700 }}>{b.name}</div>
            <div>{b.address}</div>
            <div>{b.phone}</div>
            <div style={{ opacity: 0.7 }}>{b.category?.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
