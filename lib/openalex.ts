import { EvidenceItem } from './evidence-quality';

export async function searchOpenAlex(query: string, max = 5): Promise<EvidenceItem[]> {
  const url = `https://api.openalex.org/works?search=${encodeURIComponent(query)}&per-page=${max}`;
  const data = await fetch(url).then((r) => r.json());
  return (data.results ?? []).map((w: any) => ({
    title: w.title,
    url: w.primary_location?.landing_page_url ?? w.id,
    source_type: 'sci_article',
    journal: w.primary_location?.source?.display_name ?? '',
    year: String(w.publication_year ?? ''),
    doi: (w.doi ?? '').replace('https://doi.org/', ''),
    pmid: '',
    indexed_in: ['OpenAlex'],
    evidence_level: w.type === 'article' ? 'observational' : 'unknown',
    notes: `OpenAlex cited_by_count=${w.cited_by_count ?? 0}`,
    citation_count: w.cited_by_count ?? 0,
  }));
}
