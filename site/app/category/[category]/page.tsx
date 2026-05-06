import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DocCard, SectionHeader } from '../../../components/ui';
import { getAllWikiPages } from '../../../lib/wiki';

export async function generateStaticParams() { return Array.from(new Set(getAllWikiPages().map((p)=>p.category))).map((category)=>({category})); }
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> { return { title: `Category: ${params.category}` }; }

export default function CategoryPage({ params }: { params: { category: string } }) {
  const pages = getAllWikiPages().filter((page) => page.category === params.category);
  if (pages.length === 0) notFound();
  return <div className="grid">
    <section className="surface" style={{padding:20}}><SectionHeader title={params.category} subtitle="Category Knowledge Cluster" /><p style={{margin:0,color:'var(--muted)'}}>{pages.length} documents</p></section>
    <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>{pages.map((p)=><DocCard key={p.id} href={`/wiki/${p.slug}`} title={p.title} meta={`${p.review_status}`} snippet={p.content.slice(0,100)} />)}</div>
  </div>;
}
