import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const WIKI_ROOT = path.join(process.cwd(), '..', 'wiki');

export type DocumentFrontmatter = {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  category: string;
  tags: string[];
  created?: string;
  updated?: string;
  pinned?: boolean;
  clinical_priority?: number;
  research_priority?: number;
  foundational_priority?: number;
  review_status?: string;
  clinical_weight?: number;
};

export type WikiDocument = DocumentFrontmatter & {
  path: string;
  content: string;
};

function readMarkdownFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return readMarkdownFilesRecursively(fullPath);
    if (entry.isFile() && fullPath.endsWith('.md')) return [fullPath];
    return [];
  });
}

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) return [value];
  return [];
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

function parseDocument(filePath: string): WikiDocument {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    id: String(data.id ?? ''),
    slug: String(data.slug ?? ''),
    title: String(data.title ?? path.basename(filePath, '.md')),
    aliases: normalizeArray(data.aliases),
    category: String(data.category ?? 'uncategorized'),
    tags: normalizeArray(data.tags),
    created: data.created ? String(data.created) : undefined,
    updated: data.updated ? String(data.updated) : undefined,
    pinned: Boolean(data.pinned ?? false),
    clinical_priority: toNumber(data.clinical_priority),
    research_priority: toNumber(data.research_priority),
    foundational_priority: toNumber(data.foundational_priority),
    review_status: data.review_status ? String(data.review_status) : undefined,
    clinical_weight: toNumber(data.clinical_weight),
    path: filePath,
    content
  };
}

export function getAllDocuments(): WikiDocument[] {
  const files = readMarkdownFilesRecursively(WIKI_ROOT);
  return files.map(parseDocument).filter((doc) => doc.slug && doc.id);
}

export function getDocumentBySlug(slug: string): WikiDocument | undefined {
  return getAllDocuments().find((doc) => doc.slug === slug);
}

export function getDocumentById(id: string): WikiDocument | undefined {
  return getAllDocuments().find((doc) => doc.id === id);
}

export function getDocumentsByCategory(category: string): WikiDocument[] {
  return getAllDocuments().filter((doc) => doc.category === category);
}

export function getDocumentImportanceScore(doc: WikiDocument): number {
  const clinicalPriority = doc.clinical_priority ?? 0;
  const researchPriority = doc.research_priority ?? 0;
  const foundationalPriority = doc.foundational_priority ?? 0;
  const clinicalWeight = doc.clinical_weight ?? 1;
  const pinnedBonus = doc.pinned ? 2 : 0;

  return (
    clinicalPriority * 0.35 +
    researchPriority * 0.25 +
    foundationalPriority * 0.25 +
    clinicalWeight * 0.15 +
    pinnedBonus
  );
}

export function getSortedDocuments(docs: WikiDocument[]): WikiDocument[] {
  return [...docs].sort((a, b) => getDocumentImportanceScore(b) - getDocumentImportanceScore(a));
}

export function convertObsidianWikilinks(content: string, docs: WikiDocument[]): string {
  const docLookup = new Map<string, WikiDocument>();
  docs.forEach((doc) => {
    docLookup.set(doc.title, doc);
    doc.aliases.forEach((alias) => docLookup.set(alias, doc));
  });

  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, rawTarget: string, rawLabel: string) => {
    const target = rawTarget.trim();
    const label = (rawLabel ?? rawTarget).trim();
    const matched = docLookup.get(target);
    if (!matched) return label;
    return `[${label}](/wiki/${matched.slug})`;
  });
}
