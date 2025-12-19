"use client";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";

export default function Assistant() {
  const [q, setQ] = useState("");
  const [res, setRes] = useState<any>(null);

  async function ask() {
    const r = await fetch("/api/ai/yellow-books/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });
    setRes(await r.json());
  }

  return (
    <main>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button onClick={ask}>Ask</button>

      {res && (
        <>
          <p>{res.answer}</p>
          <ul>
            {res.businesses.map((b: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
