import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { convertWikiLinks, getBacklinks, getGeneratedBlocks, getPageBySlug } from '@/lib/wiki';

export default function WikiPage({ params }: { params: { slug: string } }) {
  const page = getPageBySlug(params.slug);
  if (!page) return <div>Not found</div>;

  const backlinks = getBacklinks(params.slug);
  const insights = getGeneratedBlocks('insights', params.slug);
  const papers = getGeneratedBlocks('papers', params.slug);
  const relations = getGeneratedBlocks('relations', params.slug);

  return (
    <article>
      <h1>{page.title}</h1>
      <p><strong>Category:</strong> <Link href={`/category/${encodeURIComponent(page.category)}`}>{page.category}</Link></p>
      <p><strong>Tags:</strong> {page.tags.map((tag) => `#${tag}`).join(' ') || 'none'}</p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{convertWikiLinks(page.content)}</ReactMarkdown>

      <section><h2>Backlinks</h2><ul>{backlinks.map((b) => <li key={b.slug}><Link href={`/wiki/${b.slug}`}>{b.title}</Link></li>)}</ul></section>
      <section><h2>Generated Insight Blocks</h2>{insights.map((x, i) => <pre key={i}>{x}</pre>)}</section>
      <section><h2>Generated Paper Blocks</h2>{papers.map((x, i) => <pre key={i}>{x}</pre>)}</section>
      <section><h2>Generated Relation Blocks</h2>{relations.map((x, i) => <pre key={i}>{x}</pre>)}</section>
    </article>
  );
}
