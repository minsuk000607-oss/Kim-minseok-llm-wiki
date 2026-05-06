import Link from 'next/link';
import { getDocumentsByCategory, getSortedDocuments } from '@/lib/wiki';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category);
  const docs = getSortedDocuments(getDocumentsByCategory(category));
  return (
    <section>
      <h1>Category: {category}</h1>
      <ul>
        {docs.map((doc) => <li key={doc.id}><Link href={`/wiki/${doc.slug}`}>{doc.title}</Link></li>)}
      </ul>
    </section>
  );
}
