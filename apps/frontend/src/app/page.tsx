import { API_BASE_URL } from "@yellow/config";
import { BusinessListResponseSchema } from "@yellow/contract";

export default async function Page() {
  const base = API_BASE_URL || "";
  const res = await fetch(`${base}/api/business`, { cache: "no-store" });

  const json = await res.json();

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
          <div key={b.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
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
