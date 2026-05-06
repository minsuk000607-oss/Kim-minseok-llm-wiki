import DocCard from '@/components/DocCard';
import { getAllDocuments } from '@/lib/documents';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const query = q.toLowerCase().trim();
  const docs = getAllDocuments();

  const results = !query
    ? []
    : docs.filter((doc) => {
        const haystack = [doc.title, ...doc.aliases, ...doc.tags, doc.content].join(' ').toLowerCase();
        return haystack.includes(query);
      });

  return (
    <section>
      <h1>Search</h1>
      <form>
        <input type="text" name="q" defaultValue={q} placeholder="검색어 입력" />
        <button type="submit">검색</button>
      </form>
      <p>{results.length} results</p>
      <div className="grid">{results.map((doc) => <DocCard key={doc.id} doc={doc} />)}</div>
    </section>
  );
}
