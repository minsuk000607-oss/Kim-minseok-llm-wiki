import Link from 'next/link';
import { getAllDocuments } from '@/lib/wiki';

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? '').toLowerCase();
  const docs = getAllDocuments();
  const results = q ? docs.filter((d) =>
    d.title.toLowerCase().includes(q) ||
    d.aliases.join(' ').toLowerCase().includes(q) ||
    d.tags.join(' ').toLowerCase().includes(q) ||
    d.content.toLowerCase().includes(q)
  ) : [];

  return (
    <section>
      <h1>Search</h1>
      <form>
        <input name="q" defaultValue={searchParams.q ?? ''} placeholder="Search title, aliases, tags, content" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map((doc) => <li key={doc.id}><Link href={`/wiki/${doc.slug}`}>{doc.title}</Link></li>)}
      </ul>
    </section>
  );
}
