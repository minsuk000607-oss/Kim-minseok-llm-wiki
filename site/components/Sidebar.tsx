import Link from 'next/link';
import { getCategories } from '@/lib/wiki';

export function Sidebar() {
  const categories = getCategories();

  return (
    <aside style={{ minWidth: 240, borderRight: '1px solid #334155', paddingRight: 16, color: '#e2e8f0' }}>
      <h3>Navigation</h3>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/search">Search</Link></li>
      </ul>
      <h4>Categories</h4>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
