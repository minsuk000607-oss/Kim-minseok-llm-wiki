export type RagCheckFrequency = 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'manual';

export type EvidenceStatus = 'draft' | 'needs_review' | 'reviewed' | 'verified' | 'outdated';

export interface RagFrontmatterLike {
  category?: string;
  clinical_priority?: number;
  research_priority?: number;
  evidence_status?: EvidenceStatus;
  rag_check_frequency?: RagCheckFrequency;
  path?: string;
  tags?: string[];
}

export function getNextRagCheckDate(lastRagCheck: string | undefined, frequency: RagCheckFrequency, today = new Date()): string | null {
  if (frequency === 'manual') return null;
  const base = lastRagCheck ? new Date(lastRagCheck) : today;
  if (Number.isNaN(base.getTime())) return null;
  const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate()));
  const addDays = (n: number) => d.setUTCDate(d.getUTCDate() + n);
  if (frequency === 'weekly') addDays(7);
  if (frequency === 'monthly') d.setUTCMonth(d.getUTCMonth() + 1);
  if (frequency === 'quarterly') d.setUTCMonth(d.getUTCMonth() + 3);
  if (frequency === 'semiannual') d.setUTCMonth(d.getUTCMonth() + 6);
  if (frequency === 'annual') d.setUTCFullYear(d.getUTCFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function inferRagCheckFrequency(frontmatter: RagFrontmatterLike): RagCheckFrequency {
  const p = frontmatter.path ?? '';
  const category = frontmatter.category ?? '';
  const cp = Number(frontmatter.clinical_priority ?? 0);
  const rp = Number(frontmatter.research_priority ?? 0);
  const status = frontmatter.evidence_status;
  const tags = frontmatter.tags ?? [];

  if (p.includes('wiki/00_CORE') || p.includes('wiki/50_PROMPTS') || p.includes('wiki/90_LOGS')) return 'manual';
  if (p.includes('wiki/40_PROJECTS')) return 'manual';
  if (status === 'outdated') return 'weekly';
  if (status === 'needs_review') return 'monthly';
  if (cp >= 5 && rp >= 4) return 'monthly';
  if (category === '신경과학' || category === '자율신경계') return cp >= 4 || rp >= 4 ? 'monthly' : 'quarterly';
  if (category === 'MPS' || category === '경혈') return 'quarterly';
  if (category === '방제') return cp >= 4 ? 'monthly' : 'quarterly';
  if (category === '본초') return tags.some((t) => /safety|독성|금기/i.test(t)) ? 'monthly' : 'quarterly';
  if (category === '상한론-육경') return cp >= 4 || rp >= 4 ? 'semiannual' : 'annual';
  if (cp >= 4 || rp >= 4) return 'monthly';
  return 'quarterly';
}

export function getDocumentsDueForRagCheck<T extends { next_rag_check?: string | null; rag_check_frequency?: RagCheckFrequency }>(docs: T[], today: string): T[] {
  const now = new Date(today);
  return docs.filter((d) => d.rag_check_frequency !== 'manual' && d.next_rag_check && new Date(d.next_rag_check) <= now);
}
