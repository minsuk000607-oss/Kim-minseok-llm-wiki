import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { GeneratedBlockShell } from '@/components/GeneratedBlockShell';
import { RelatedConceptsBlock } from '@/components/RelatedConceptsBlock';
import { TagBadge } from '@/components/TagBadge';
import { getAllDocuments, getDocumentBySlug, resolveWikiLinks } from '@/lib/wiki';

export default function WikiDetailPage({ params }: { params: { slug: string } }) {
  const doc = getDocumentBySlug(params.slug);
  if (!doc) notFound();
  const markdown = resolveWikiLinks(doc.content, getAllDocuments());

  return (
    <article>
      <h1>{doc.title}</h1>
      <p>ID: {doc.id}</p>
      <div>{doc.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}</div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <GeneratedBlockShell title="Generated Insight Block" />
      <GeneratedBlockShell title="Generated Paper Block" />
      <RelatedConceptsBlock />
    </article>
  );
}
