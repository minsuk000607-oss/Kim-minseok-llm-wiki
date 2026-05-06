import Link from 'next/link';
import { getAllWikiPages } from '@/lib/wiki';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const pages = getAllWikiPages().filter((page) => page.category === category);
  return (
    <div>
      <h1>Category: {category}</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.slug}><Link href={`/wiki/${page.slug}`}>{page.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}
