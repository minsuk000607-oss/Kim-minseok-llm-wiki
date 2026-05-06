import { PaperRecord } from '@/lib/generated-content';
import { GeneratedBlockShell } from './GeneratedBlockShell';

interface PaperReferenceBlockProps {
  papers: PaperRecord[] | null;
}

export function PaperReferenceBlock({ papers }: PaperReferenceBlockProps) {
  if (!papers || papers.length === 0) return null;

  return (
    <GeneratedBlockShell title="Generated Paper References">
      <ul className="space-y-3">
        {papers.map((paper, idx) => (
          <li key={`${paper.title}-${idx}`} className="rounded-lg border border-slate-800 p-3">
            <p className="font-medium text-slate-100">{paper.title}</p>
            <p className="text-xs text-slate-400">
              {[paper.journal, paper.year].filter(Boolean).join(' · ')}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {paper.pmid ? `PMID: ${paper.pmid}` : ''}
              {paper.pmid && paper.doi ? ' · ' : ''}
              {paper.doi ? `DOI: ${paper.doi}` : ''}
            </p>
            {paper.evidence_level ? (
              <p className="mt-2 text-xs text-cyan-200">Evidence: {paper.evidence_level}</p>
            ) : null}
            {paper.summary ? <p className="mt-2 text-sm text-slate-300">{paper.summary}</p> : null}
            {paper.caution ? <p className="mt-2 text-xs text-amber-300">주의: {paper.caution}</p> : null}
          </li>
        ))}
      </ul>
    </GeneratedBlockShell>
  );
}
