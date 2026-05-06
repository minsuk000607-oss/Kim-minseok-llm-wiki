'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import data from '../../wiki-index.json';

function normalize(value: string): string {
  return value.toLowerCase();
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return data;

    return data.filter((item) => {
      const title = normalize(item.title ?? '');
      const content = normalize(item.content ?? '');
      const aliases = Array.isArray(item.aliases) ? item.aliases : [];
      const tags = Array.isArray(item.tags) ? item.tags : [];

      return (
        title.includes(q) ||
        content.includes(q) ||
        aliases.some((alias) => normalize(String(alias)).includes(q)) ||
        tags.some((tag) => normalize(String(tag)).includes(q))
      );
    });
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
