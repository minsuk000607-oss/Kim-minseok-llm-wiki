import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const wikiRoot = path.resolve(process.cwd(), '../wiki');

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

export type WikiDocument = { frontmatter: WikiFrontmatter; content: string; filePath: string };

function getMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return getMarkdownFiles(full);
    return e.isFile() && e.name.endsWith('.md') ? [full] : [];
  });
}

export function getAllDocuments(): WikiDocument[] {
  return getMarkdownFiles(wikiRoot).map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data as WikiFrontmatter;
    if (!data.slug) data.slug = path.basename(filePath, '.md');
    if (!data.title) data.title = path.basename(filePath, '.md');
    if (!data.id) data.id = `TEMP-${data.slug}`;
    return { frontmatter: data, content: parsed.content, filePath };
  });
}

export const getDocumentBySlug = (slug: string) => getAllDocuments().find((d) => d.frontmatter.slug === slug);
export const getDocumentById = (id: string) => getAllDocuments().find((d) => d.frontmatter.id === id);
export const getDocumentsByCategory = (category: string) => getAllDocuments().filter((d) => d.frontmatter.category === category);

export function getDocumentImportanceScore(doc: WikiDocument): number {
  const f = doc.frontmatter;
  const score = (f.clinical_priority ?? 0) * 0.35 + (f.research_priority ?? 0) * 0.25 + (f.foundational_priority ?? 0) * 0.25 + (f.clinical_weight ?? 0) * 0.15;
  return score + (f.pinned ? 2 : 0);
}

export const getSortedDocuments = (docs: WikiDocument[]) => [...docs].sort((a, b) => getDocumentImportanceScore(b) - getDocumentImportanceScore(a));

export function resolveWikilinks(content: string, docs: WikiDocument[]): string {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_m, target, label) => {
    const match = docs.find((d) => d.frontmatter.title === target || d.frontmatter.aliases?.includes(target));
    if (!match?.frontmatter.slug) return label ?? target;
    return `[${label ?? target}](/wiki/${match.frontmatter.slug})`;
  });
}
