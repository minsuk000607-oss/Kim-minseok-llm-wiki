import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AIInsightPanel, MetadataBadge, RelatedDocsPanel, TagChip } from '../../../components/ui';
import { convertWikiLinks, getAllWikiPages, getBacklinks, getGeneratedBlocks, getPageBySlug } from '../../../lib/wiki';

export async function generateStaticParams() { return getAllWikiPages().map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> { const page = getPageBySlug(params.slug); return page ? { title: page.title } : { title: 'Wiki' }; }

export default function WikiPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug); if (!page) notFound();
  const backlinks = getBacklinks(params.slug);
  const insights = getGeneratedBlocks('insights', page.id);
  const papers = getGeneratedBlocks('papers', page.id);
  const relations = getGeneratedBlocks('relations', page.id);
  return <article className="grid">
    <section className="surface" style={{padding:20}}>
      <h1 style={{margin:'0 0 8px'}}>{page.title}</h1>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        <MetadataBadge label="id" value={page.id}/><MetadataBadge label="slug" value={page.slug}/><MetadataBadge label="category" value={page.category}/><MetadataBadge label="review" value={page.review_status ?? 'unknown'}/><MetadataBadge label="evidence" value={(page as any).evidence_status ?? 'unknown'}/>
      </div>
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:10}}>{page.tags.map((t)=> <TagChip key={t} tag={t} />)}</div>
    </section>
    <section className="surface" style={{padding:24,lineHeight:1.8}}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{convertWikiLinks(page.content)}</ReactMarkdown>
    </section>
    <RelatedDocsPanel><ul>{backlinks.map((b)=><li key={b.id}><Link href={`/wiki/${b.slug}`}>{b.title}</Link></li>)}</ul></RelatedDocsPanel>
    {insights.length>0 && <AIInsightPanel title="Generated Insight Blocks">{insights.map((x,i)=><pre key={i}>{x}</pre>)}</AIInsightPanel>}
    {papers.length>0 && <AIInsightPanel title="Generated Paper Blocks">{papers.map((x,i)=><pre key={i}>{x}</pre>)}</AIInsightPanel>}
    {relations.length>0 && <AIInsightPanel title="Generated Relation Blocks">{relations.map((x,i)=><pre key={i}>{x}</pre>)}</AIInsightPanel>}
  </article>;
}
