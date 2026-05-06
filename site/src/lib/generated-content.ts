import { promises as fs } from 'fs';
import path from 'path';

export interface StructuredInsight {
  document_id: string;
  generated_at: string;
  model?: string;
  mechanism: string[];
  clinical_pattern: string[];
  ans_pattern: string[];
  fascial_relation: string[];
  differential_points: string[];
  contraindications: string[];
  research_gaps: string[];
}

export interface PaperRecord {
  pmid?: string;
  doi?: string;
  title: string;
  authors?: string[];
  journal?: string;
  year?: number;
  abstract?: string;
  publication_types?: string[];
  evidence_level?: string;
  cited_by_count?: number;
  is_oa?: boolean;
  is_journal_article?: boolean;
  quality_score?: number;
  summary?: string;
  tcm_linkage?: string;
  neuro_linkage?: string;
  caution?: string;
  synced_at?: string;
}

export interface WikiRelation {
  type: string;
  target_id?: string;
  target_label: string;
  confidence?: number;
  note?: string;
}

export interface GeneratedContent {
  insight?: StructuredInsight | null;
  papers?: PaperRecord[] | null;
  relations?: WikiRelation[] | null;
}

const GENERATED_ROOT = path.resolve(process.cwd(), '../generated');

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getGeneratedInsight(documentId: string): Promise<StructuredInsight | null> {
  const filePath = path.join(GENERATED_ROOT, 'insights', `${documentId}.insight.json`);
  return readJsonFile<StructuredInsight>(filePath);
}

export async function getGeneratedPapers(documentId: string): Promise<PaperRecord[] | null> {
  const filePath = path.join(GENERATED_ROOT, 'papers', `${documentId}.papers.json`);
  return readJsonFile<PaperRecord[]>(filePath);
}

export async function getGeneratedRelations(documentId: string): Promise<WikiRelation[] | null> {
  const filePath = path.join(GENERATED_ROOT, 'relations', `${documentId}.relations.json`);
  return readJsonFile<WikiRelation[]>(filePath);
}

export async function getGeneratedContent(documentId: string): Promise<GeneratedContent> {
  const [insight, papers, relations] = await Promise.all([
    getGeneratedInsight(documentId),
    getGeneratedPapers(documentId),
    getGeneratedRelations(documentId),
  ]);

  return {
    insight,
    papers,
    relations,
  };
}
