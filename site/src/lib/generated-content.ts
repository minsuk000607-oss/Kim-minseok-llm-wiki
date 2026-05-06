import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { PaperRecord, StructuredInsight, WikiRelation } from '@/types/generated';

const GENERATED_ROOT = path.resolve(process.cwd(), '../generated');

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getGeneratedInsight(id: string): Promise<StructuredInsight | null> {
  return readJsonFile<StructuredInsight>(
    path.join(GENERATED_ROOT, 'insights', `${id}.insight.json`),
  );
}

export async function getGeneratedPapers(id: string): Promise<PaperRecord[]> {
  const data = await readJsonFile<PaperRecord[] | { papers: PaperRecord[] }>(
    path.join(GENERATED_ROOT, 'papers', `${id}.papers.json`),
  );

  if (!data) return [];
  return Array.isArray(data) ? data : data.papers ?? [];
}

export async function getGeneratedRelations(id: string): Promise<WikiRelation[]> {
  const data = await readJsonFile<WikiRelation[] | { relations: WikiRelation[] }>(
    path.join(GENERATED_ROOT, 'relations', `${id}.relations.json`),
  );

  if (!data) return [];
  return Array.isArray(data) ? data : data.relations ?? [];
}
