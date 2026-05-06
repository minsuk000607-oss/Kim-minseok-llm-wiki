import Link from 'next/link';
import { getAllDocuments } from '@/lib/wiki';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const docs = getAllDocuments();
  const query = q.toLowerCase();
  const results = query ? docs.filter((d) => {
    const f = d.frontmatter;
    return [f.title, ...(f.aliases ?? []), ...(f.tags ?? []), d.content].join(' ').toLowerCase().includes(query);
  }) : [];

  return <section className="card"><h1>Search</h1><form><input name="q" defaultValue={q} placeholder="검색어" style={{width:'100%',padding:'0.6rem',marginBottom:'1rem'}} /></form>{results.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}{q && results.length===0 && <p>No results.</p>}</section>;
}
