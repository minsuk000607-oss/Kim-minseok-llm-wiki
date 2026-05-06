import { GeneratedBlockShell } from "@/components/GeneratedBlockShell";
import { RelatedConceptsBlock } from "@/components/RelatedConceptsBlock";
import { TagBadge } from "@/components/TagBadge";
import { loadWikiMarkdown } from "@/lib/wiki-loader";
import { convertWikilinksToHtml } from "@/lib/wikilink";

export default function WikiSlugPage({ params }: { params: { slug: string } }) {
  const doc = loadWikiMarkdown(params.slug);
  if (!doc) return <main>문서를 찾을 수 없습니다: {params.slug}</main>;

  const html = convertWikilinksToHtml(doc.content);
  return (
    <main>
      <h1>{doc.title}</h1>
      <TagBadge tag={String(doc.frontmatter.category ?? "wiki")} />
      <article dangerouslySetInnerHTML={{ __html: html }} />
      <GeneratedBlockShell title="Generated Insight" />
      <RelatedConceptsBlock />
    </main>
  );
}
