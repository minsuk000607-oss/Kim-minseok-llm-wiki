import { EvidenceItem } from './evidence-quality';

export async function searchCrossRef(query: string, max = 5): Promise<EvidenceItem[]> {
  const url = `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=${max}`;
  const data = await fetch(url).then((r) => r.json());
  return (data.message?.items ?? []).map((w: any) => ({
    title: Array.isArray(w.title) ? w.title[0] : w.title,
    url: w.URL,
    source_type: 'scie_article',
    journal: Array.isArray(w['container-title']) ? w['container-title'][0] : '',
    year: String(w.issued?.['date-parts']?.[0]?.[0] ?? ''),
    doi: w.DOI ?? '',
    pmid: '',
    indexed_in: ['CrossRef'],
    evidence_level: 'review',
    notes: 'CrossRef discovery record',
  }));
}
