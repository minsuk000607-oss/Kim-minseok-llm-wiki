import DocCard from '@/components/DocCard';
import { getDocumentsByCategory, getSortedDocuments } from '@/lib/documents';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const docs = getSortedDocuments(getDocumentsByCategory(decoded));

  return (
    <section>
      <h1>Category: {decoded}</h1>
      <div className="grid">{docs.map((doc) => <DocCard key={doc.id} doc={doc} />)}</div>
    </section>
  );
}
