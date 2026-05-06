import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { convertObsidianWikilinks, getAllDocuments, getDocumentBySlug } from '@/lib/documents';

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return notFound();
  const docs = getAllDocuments();
  const converted = convertObsidianWikilinks(doc.content, docs);

  const backlinks = docs.filter((d) => d.id !== doc.id && d.content.includes(`[[${doc.title}`));

  return (
    <section>
      <h1>{doc.title}</h1>
      <p>{doc.category} · {doc.id} · {doc.review_status ?? 'unknown'}</p>
      <div className="tags">{doc.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
      <MarkdownRenderer content={converted} />

      <h2>Backlinks</h2>
      <ul>
        {backlinks.map((b) => (
          <li key={b.id}><a href={`/wiki/${b.slug}`}>{b.title}</a></li>
        ))}
      </ul>
    </section>
  );
}
