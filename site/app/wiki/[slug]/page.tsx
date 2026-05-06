import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TagBadge } from '../../../components/TagBadge';
import { GeneratedBlockShell } from '../../../components/GeneratedBlockShell';
import { convertWikiLinks, getAllWikiPages, getBacklinks, getGeneratedBlocks, getPageBySlug } from '../../../lib/wiki';

export async function generateStaticParams() {
  return getAllWikiPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = getPageBySlug(params.slug);
  if (!page) {
    return { title: 'Wiki' };
  }

  const excerpt = page.content.replace(/\s+/g, ' ').trim().slice(0, 140);
  const tags = page.tags?.length ? ` | tags: ${page.tags.join(', ')}` : '';

  return {
    title: page.title,
    description: `${page.category}${tags}${excerpt ? ` | ${excerpt}` : ''}`
  };
}

export default function WikiPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);
  if (!page) notFound();

  const backlinks = getBacklinks(params.slug);
  const insights = getGeneratedBlocks('insights', page.id);
  const papers = getGeneratedBlocks('papers', page.id);
  const relations = getGeneratedBlocks('relations', page.id);

  return (
    <article>
      <h1>{page.title}</h1>
      <p><strong>Category:</strong> <Link href={`/category/${encodeURIComponent(page.category)}`}>{page.category}</Link></p>
      <p><strong>Tags:</strong> {page.tags.length ? page.tags.map((tag) => <TagBadge key={tag} tag={tag} />) : 'none'}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{convertWikiLinks(page.content)}</ReactMarkdown>

      <section><h2>Backlinks</h2><ul>{backlinks.map((b) => <li key={b.id}><Link href={`/wiki/${b.slug}`}>{b.title}</Link></li>)}</ul></section>
      {insights.length > 0 ? <GeneratedBlockShell title="Generated Insight Blocks">{insights.map((x, i) => <pre key={i}>{x}</pre>)}</GeneratedBlockShell> : null}
      {papers.length > 0 ? <GeneratedBlockShell title="Generated Paper Blocks">{papers.map((x, i) => <pre key={i}>{x}</pre>)}</GeneratedBlockShell> : null}
      {relations.length > 0 ? <GeneratedBlockShell title="Generated Relation Blocks">{relations.map((x, i) => <pre key={i}>{x}</pre>)}</GeneratedBlockShell> : null}
    </article>
  );
}
