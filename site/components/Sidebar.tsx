import Link from 'next/link';
import { getAllDocuments } from '@/lib/wiki';

export function Sidebar() {
  const docs = getAllDocuments();
  const categories = Array.from(new Set(docs.map((d) => d.frontmatter.category).filter(Boolean))) as string[];
  return (
    <aside className="sidebar">
      <h2>LLM Wiki OS</h2>
      <p><Link href="/">Dashboard</Link> · <Link href="/search">Search</Link></p>
      <h4>Categories</h4>
      <ul>{categories.map((c) => <li key={c}><Link href={`/category/${encodeURIComponent(c)}`}>{c}</Link></li>)}</ul>
    </aside>
  );
}
