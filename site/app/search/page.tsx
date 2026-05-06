'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const data = require('../../../wiki-index.json') as Array<{ slug: string; title: string; content: string }>;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return data;
    return data.filter((item) => item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <h1>Search</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색어" />
      <ul>
        {results.map((item) => <li key={item.slug}><Link href={`/wiki/${item.slug}`}>{item.title}</Link></li>)}
      </ul>
    </div>
  );
}
