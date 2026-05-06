import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GeneratedBlockShell } from '@/components/GeneratedBlockShell';
import { RelatedConceptsBlock } from '@/components/RelatedConceptsBlock';
import { TagBadge } from '@/components/TagBadge';
import { getAllDocuments, getDocumentBySlug, resolveWikilinks } from '@/lib/wiki';

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) return notFound();
  const docs = getAllDocuments();
  const content = resolveWikilinks(doc.content, docs);
  return <article className="card">
    <h1>{doc.frontmatter.title}</h1>
    <p>ID: {doc.frontmatter.id} · Category: {doc.frontmatter.category ?? '미분류'}</p>
    <div>{doc.frontmatter.tags?.map(t=><TagBadge key={t} tag={t} />)}</div>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    <GeneratedBlockShell title="Generated Insights" />
    <GeneratedBlockShell title="Generated Papers" />
    <RelatedConceptsBlock />
  </article>;
}
