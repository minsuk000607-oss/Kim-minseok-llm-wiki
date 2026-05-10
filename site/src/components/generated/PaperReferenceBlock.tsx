import type { PaperRecord } from '@/types/generated';
import { GeneratedBlockShell } from './GeneratedBlockShell';

export function PaperReferenceBlock({ papers }: { papers: PaperRecord[] }) {
  if (!papers.length) return null;

  return (
    <GeneratedBlockShell title="Paper References" subtitle="AI-compiled supporting literature map">
      <ol>
        {papers.map((paper, idx) => (
          <li key={`${paper.title}-${idx}`}>
            <strong>{paper.title}</strong>
            {paper.authors?.length ? <span> — {paper.authors.join(', ')}</span> : null}
            {paper.year ? <span> ({paper.year})</span> : null}
          </li>
        ))}
      </ol>
    </GeneratedBlockShell>
  );
}
