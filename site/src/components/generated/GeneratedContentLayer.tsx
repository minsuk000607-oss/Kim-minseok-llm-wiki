import { GeneratedContent } from '@/lib/generated-content';
import { BacklinkBlock } from './BacklinkBlock';
import { GeneratedInsightBlock } from './GeneratedInsightBlock';
import { PaperReferenceBlock } from './PaperReferenceBlock';
import { RelatedGraphBlock } from './RelatedGraphBlock';

interface GeneratedContentLayerProps {
  generated: GeneratedContent;
  backlinks?: Array<{ title: string; slug: string }>;
}

export function GeneratedContentLayer({ generated, backlinks = [] }: GeneratedContentLayerProps) {
  return (
    <div className="mt-10" data-generated-layer="read-only">
      <GeneratedInsightBlock insight={generated.insight ?? null} />
      <PaperReferenceBlock papers={generated.papers ?? null} />
      <RelatedGraphBlock relations={generated.relations ?? null} />
      <BacklinkBlock backlinks={backlinks} />
    </div>
  );
}
