import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const wikiRoot = path.resolve(process.cwd(), '..', 'wiki');

export type WikiFrontmatter = {
  id?: string;
  slug?: string;
  title?: string;
  aliases?: string[];
  category?: string;
  tags?: string[];
  created?: string;
  updated?: string;
  pinned?: boolean;
  clinical_priority?: number;
  research_priority?: number;
  foundational_priority?: number;
  clinical_weight?: number;
  review_status?: string;
  last_rag_check?: string;
  next_rag_check?: string;
  rag_check_frequency?: string;
  evidence_status?: string;
};

export type WikiDocument = WikiFrontmatter & {
  filePath: string;
  content: string;
  slug: string;
  title: string;
  id: string;
  aliases: string[];
  tags: string[];
  pinned: boolean;
};

function readMarkdownFilesRecursive(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...readMarkdownFilesRecursive(fullPath));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

function normalizeDocument(filePath: string, raw: ReturnType<typeof matter>): WikiDocument {
  const data = raw.data as WikiFrontmatter;
  const base = path.basename(filePath, '.md');
  const rel = path.relative(wikiRoot, filePath);
  const slug = data.slug ?? base.toLowerCase().replace(/\s+/g, '-');

  return {
    ...data,
    filePath: rel,
    content: raw.content,
    slug,
    title: data.title ?? base,
    id: data.id ?? `AUTO-${slug}`,
    aliases: data.aliases ?? [],
    tags: data.tags ?? [],
    pinned: data.pinned ?? false
  };
}

export function getAllDocuments(): WikiDocument[] {
  if (!fs.existsSync(wikiRoot)) return [];
  const files = readMarkdownFilesRecursive(wikiRoot);
  return files.map((file) => normalizeDocument(file, matter(fs.readFileSync(file, 'utf8'))));
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
  const cp = doc.clinical_priority ?? 0;
  const rp = doc.research_priority ?? 0;
  const fp = doc.foundational_priority ?? 0;
  const cw = doc.clinical_weight ?? 0;
  const pinnedBonus = doc.pinned ? 2 : 0;
  return cp * 0.35 + rp * 0.25 + fp * 0.25 + cw * 0.15 + pinnedBonus;
}

export function getSortedDocuments(docs: WikiDocument[]): WikiDocument[] {
  return [...docs].sort((a, b) => getDocumentImportanceScore(b) - getDocumentImportanceScore(a));
}

export function resolveWikiLinks(text: string, docs: WikiDocument[]): string {
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, rawTarget: string, aliasText: string) => {
    const target = rawTarget.trim();
    const label = (aliasText || target).trim();
    const matched = docs.find((doc) => doc.title === target || doc.aliases.includes(target));
    return matched ? `[${label}](/wiki/${matched.slug})` : label;
  });
}
