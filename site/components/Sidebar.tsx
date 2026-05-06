import Link from 'next/link';
import { getAllDocuments } from '@/lib/documents';

export default function Sidebar() {
  const docs = getAllDocuments();
  const categories = Array.from(new Set(docs.map((doc) => doc.category))).sort();

  return (
    <aside className="sidebar">
      <Link href="/" className="brand">Kim Minseok Wiki</Link>
      <nav>
        <ul>
          <li><Link href="/search">Search</Link></li>
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
