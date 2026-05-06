import type { StructuredInsight } from '@/types/generated';
import { GeneratedBlockShell } from './GeneratedBlockShell';

export function GeneratedInsightBlock({ insight }: { insight: StructuredInsight | null }) {
  if (!insight) return null;

  return (
    <GeneratedBlockShell
      title={insight.title ?? 'Generated Insight'}
      subtitle={insight.summary}
      badge={`Confidence ${Math.round((insight.confidence ?? 0) * 100)}%`}
    >
      <ul>
        {(insight.bullets ?? []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </GeneratedBlockShell>
  );
}
