import Link from 'next/link';
import { getDocumentsByCategory, getSortedDocuments } from '@/lib/wiki';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const docs = getSortedDocuments(getDocumentsByCategory(decodeURIComponent(category)));
  return <section className="card"><h1>Category: {decodeURIComponent(category)}</h1>{docs.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}</section>;
}
