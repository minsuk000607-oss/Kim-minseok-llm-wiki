import type { WikiRelation } from '@/types/generated';
import { GeneratedBlockShell } from './GeneratedBlockShell';

export function RelatedGraphBlock({ relations }: { relations: WikiRelation[] }) {
  if (!relations.length) return null;

  return (
    <GeneratedBlockShell title="Knowledge Relations" subtitle="Node-link relation graph (text mode)">
      <div>
        {relations.map((relation, idx) => (
          <p key={`${relation.sourceId}-${relation.targetId}-${idx}`}>
            <code>{relation.sourceId}</code> → <code>{relation.targetId}</code> · {relation.relationType}
          </p>
        ))}
      </div>
    </GeneratedBlockShell>
  );
}
