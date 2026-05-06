import { EvidenceItem } from './evidence-quality';

export async function searchPubMed(query: string, max = 5): Promise<EvidenceItem[]> {
  const q = encodeURIComponent(query);
  const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${max}&term=${q}`;
  const s = await fetch(searchUrl).then((r) => r.json());
  const ids = (s.esearchresult?.idlist ?? []).join(',');
  if (!ids) return [];
  const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids}`;
  const sum = await fetch(summaryUrl).then((r) => r.json());
  return (s.esearchresult.idlist as string[]).map((id) => {
    const it = sum.result[id] ?? {};
    return {
      title: it.title ?? `PMID ${id}`,
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
      source_type: 'pubmed_article',
      journal: it.fulljournalname,
      year: String(it.pubdate ?? '').slice(0, 4),
      doi: (it.articleids ?? []).find((a: any) => a.idtype === 'doi')?.value ?? '',
      pmid: id,
      indexed_in: ['PubMed', 'MEDLINE'],
      evidence_level: 'unknown',
      notes: 'Retrieved via PubMed E-utilities',
    } as EvidenceItem;
  });
}
