export interface EvidenceItem {
  title: string;
  url: string;
  source_type: string;
  journal?: string;
  year?: string;
  doi?: string;
  pmid?: string;
  indexed_in?: string[];
  evidence_level: string;
  quality_score?: number;
  notes?: string;
  citation_count?: number;
}

const levelScore: Record<string, number> = {
  meta_analysis: 35,
  systematic_review: 32,
  guideline: 30,
  rct: 26,
  clinical_trial: 22,
  observational: 16,
  review: 14,
  animal_study: 10,
  in_vitro: 7,
  textbook: 15,
  classical_source: 12,
  unknown: 4,
};

export function calculateEvidenceQualityScore(source: EvidenceItem): number {
  let score = levelScore[source.evidence_level] ?? 4;
  const indexed = source.indexed_in ?? [];
  if (indexed.includes('SCI')) score += 18;
  if (indexed.includes('SCIE')) score += 16;
  if (indexed.includes('MEDLINE')) score += 14;
  if (indexed.includes('PubMed')) score += 12;
  if (source.doi) score += 4;
  if (source.pmid) score += 4;
  if (/guideline/i.test(source.source_type)) score += 8;
  const y = Number(source.year);
  const now = new Date().getUTCFullYear();
  if (y && y >= now - 5) score += 8;
  if (y && y < now - 10) score -= 4;
  if (source.citation_count) score += Math.min(10, Math.log10(Math.max(1, source.citation_count)) * 4);
  return Math.max(0, Math.min(100, Number(score.toFixed(2))));
}

export function rankEvidenceSources(sources: EvidenceItem[]): EvidenceItem[] {
  return [...sources]
    .map((s) => ({ ...s, quality_score: s.quality_score ?? calculateEvidenceQualityScore(s) }))
    .sort((a, b) => (b.quality_score ?? 0) - (a.quality_score ?? 0));
}

export function filterAcceptableCorrectionEvidence(sources: EvidenceItem[]): EvidenceItem[] {
  return rankEvidenceSources(sources).filter((s) => {
    const type = s.source_type.toLowerCase();
    if (['other', 'wiki', 'raw'].includes(type)) return false;
    if (/blog|social|commercial|ai/i.test(type)) return false;
    return (s.quality_score ?? 0) >= 40 || ['guideline', 'meta_analysis', 'systematic_review', 'rct'].includes(s.evidence_level);
  });
}
