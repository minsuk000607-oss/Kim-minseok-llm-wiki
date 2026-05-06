import Link from 'next/link';
import { getAllWikiPages } from '@/lib/wiki';

export default function HomePage() {
  const pages = getAllWikiPages();
  return (
    <div>
      <h1>김민석 LLM Wiki</h1>
      <p>Total pages: {pages.length}</p>
      <ul>
        {pages.map((page) => (
          <li key={page.slug}>
            <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
