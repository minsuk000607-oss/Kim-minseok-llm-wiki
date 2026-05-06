import { WikiRelation } from '@/lib/generated-content';
import { GeneratedBlockShell } from './GeneratedBlockShell';

interface RelatedGraphBlockProps {
  relations: WikiRelation[] | null;
}

export function RelatedGraphBlock({ relations }: RelatedGraphBlockProps) {
  if (!relations || relations.length === 0) return null;

  return (
    <GeneratedBlockShell title="Generated Relations">
      <ul className="space-y-2">
        {relations.map((relation, idx) => (
          <li key={`${relation.target_label}-${idx}`} className="rounded-md border border-slate-800 p-2 text-sm">
            <p className="text-slate-100">{relation.target_label}</p>
            <p className="text-xs text-slate-400">
              {relation.type}
              {typeof relation.confidence === 'number'
                ? ` · confidence ${Math.round(relation.confidence * 100)}%`
                : ''}
              {relation.target_id ? ` · ${relation.target_id}` : ''}
            </p>
            {relation.note ? <p className="mt-1 text-xs text-slate-300">{relation.note}</p> : null}
          </li>
        ))}
      </ul>
    </GeneratedBlockShell>
  );
}
