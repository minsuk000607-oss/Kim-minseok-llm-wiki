import '@/components/generated/generated-blocks.css';
import { BacklinkBlock } from '@/components/generated/BacklinkBlock';
import { GeneratedInsightBlock } from '@/components/generated/GeneratedInsightBlock';
import { PaperReferenceBlock } from '@/components/generated/PaperReferenceBlock';
import { RelatedGraphBlock } from '@/components/generated/RelatedGraphBlock';
import {
  getGeneratedInsight,
  getGeneratedPapers,
  getGeneratedRelations,
} from '@/lib/generated-content';

async function getWikiPageBySlug(slug: string): Promise<{ id: string; title: string; markdown: string }> {
  // TODO(phase-1): replace with real markdown loading pipeline.
  return {
    id: slug,
    title: slug,
    markdown: `# ${slug}\n\nSource markdown content placeholder.`,
  };
}

async function getBacklinksForPage(_id: string): Promise<Array<{ slug: string; title: string }>> {
  // TODO(phase-3): connect with wikilink index.
  return [];
}

export default async function WikiSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getWikiPageBySlug(slug);

  const [insight, papers, relations, backlinks] = await Promise.all([
    getGeneratedInsight(page.id),
    getGeneratedPapers(page.id),
    getGeneratedRelations(page.id),
    getBacklinksForPage(page.id),
  ]);

  return (
    <main>
      <article>
        <h1>{page.title}</h1>
        <pre>{page.markdown}</pre>
      </article>

      <GeneratedInsightBlock insight={insight} />
      <PaperReferenceBlock papers={papers} />
      <RelatedGraphBlock relations={relations} />
      <BacklinkBlock backlinks={backlinks} />
    </main>
  );
}
