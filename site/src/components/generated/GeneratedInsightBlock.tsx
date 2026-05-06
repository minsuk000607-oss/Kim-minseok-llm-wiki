import { StructuredInsight } from '@/lib/generated-content';
import { GeneratedBlockShell } from './GeneratedBlockShell';

interface GeneratedInsightBlockProps {
  insight: StructuredInsight | null;
}

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1 font-medium text-cyan-200">{title}</h4>
      <ul className="list-disc space-y-1 pl-5 text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function GeneratedInsightBlock({ insight }: GeneratedInsightBlockProps) {
  if (!insight) return null;

  return (
    <GeneratedBlockShell
      title="Generated Insight"
      meta={<>{insight.generated_at}{insight.model ? ` · ${insight.model}` : ''}</>}
    >
      <Section title="핵심 기전" items={insight.mechanism} />
      <Section title="임상 패턴" items={insight.clinical_pattern} />
      <Section title="자율신경 패턴" items={insight.ans_pattern} />
      <Section title="근막/MPS 연계" items={insight.fascial_relation} />
      <Section title="감별점" items={insight.differential_points} />
      <Section title="주의사항" items={insight.contraindications} />
      <Section title="Research Gaps" items={insight.research_gaps} />
    </GeneratedBlockShell>
  );
}
