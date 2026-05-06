import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type WikiPage = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  content: string;
  sourcePath: string;
};

const WIKI_ROOT = path.resolve(process.cwd(), '..', 'wiki');
const GENERATED_ROOT = path.resolve(process.cwd(), '..', 'generated');

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full.endsWith('.md') ? [full] : [];
  });
}

export function getAllWikiPages(): WikiPage[] {
  return walk(WIKI_ROOT).map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = matter(raw);
    const slug = parsed.data.slug ?? path.basename(file, '.md');
    return {
      slug,
      title: parsed.data.title ?? slug,
      category: parsed.data.category ?? 'uncategorized',
      tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
      content: parsed.content,
      sourcePath: path.relative(path.resolve(process.cwd(), '..'), file)
    };
  });
}

export function getPageBySlug(slug: string): WikiPage | undefined {
  return getAllWikiPages().find((page) => page.slug === slug);
}

export function getBacklinks(slug: string): WikiPage[] {
  const token = `[[${slug}]]`;
  return getAllWikiPages().filter((page) => page.content.includes(token));
}

export function getCategories(): string[] {
  return [...new Set(getAllWikiPages().map((p) => p.category))].sort();
}

export function getGeneratedBlocks(type: 'insights' | 'papers' | 'relations', slug: string): string[] {
  const dir = path.join(GENERATED_ROOT, type);
  if (!fs.existsSync(dir)) return [];
  return walk(dir)
    .filter((file) => path.basename(file).includes(slug))
    .map((file) => fs.readFileSync(file, 'utf8'));
}

export function convertWikiLinks(content: string): string {
  return content.replace(/\[\[([^\]]+)\]\]/g, (_, target: string) => `[${target}](/wiki/${target.trim()})`);
}
