import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export type WikiPage = {
  id: string;
  slug: string;
  title: string;
  aliases: string[];
  category: string;
  tags: string[];
  content: string;
  sourcePath: string;
};

function resolveContentRoot(target: 'wiki' | 'generated'): string | null {
  const candidates = [
    path.resolve(process.cwd(), target),
    path.resolve(process.cwd(), '..', target)
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) ?? null;
}

const WIKI_ROOT = resolveContentRoot('wiki');
const GENERATED_ROOT = resolveContentRoot('generated');

if (!WIKI_ROOT) {
  console.warn('[wiki] Could not find wiki directory. Checked: ./wiki and ../wiki. Returning empty wiki documents.');
}

if (!GENERATED_ROOT) {
  console.warn('[wiki] Could not find generated directory. Checked: ./generated and ../generated. Generated blocks will be empty.');
}

const EXCLUDED_TOP_LEVEL_DIRS = new Set(['50_PROMPTS', '90_LOGS']);
const WIKILINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function shouldSkipWikiFile(fullPath: string, rootDir: string): boolean {
  const relative = path.relative(rootDir, fullPath);
  const segments = relative.split(path.sep);
  if (segments[0] && EXCLUDED_TOP_LEVEL_DIRS.has(segments[0])) return true;
  if (relative.startsWith(path.join('00_CORE', 'wiki'))) return true;
  if (!fullPath.endsWith('.md')) return true;
  return path.basename(fullPath) === '.gitkeep';
}

function walk(dir: string, rootDir = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, rootDir);
    return shouldSkipWikiFile(full, rootDir) ? [] : [full];
  });
}

function hasValidFrontmatter(file: string): boolean {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  return typeof parsed.data?.slug === 'string' && parsed.data.slug.trim().length > 0;
}

export const getAllWikiPages = cache(function getAllWikiPages(): WikiPage[] {
  if (!WIKI_ROOT) return [];

  return walk(WIKI_ROOT)
    .filter((file) => {
      const relative = path.relative(WIKI_ROOT, file);
      if (relative.startsWith('00_CORE')) return hasValidFrontmatter(file);
      return true;
    })
    .map((file) => {
      const raw = fs.readFileSync(file, 'utf8');
      const parsed = matter(raw);
      const slug = parsed.data.slug ?? path.basename(file, '.md');
      const parsedId = typeof parsed.data.id === 'string' ? parsed.data.id.trim() : '';
      const id = parsedId.length > 0 ? parsedId : slug;
      return {
        id,
        slug,
        title: parsed.data.title ?? slug,
        aliases: Array.isArray(parsed.data.aliases) ? parsed.data.aliases.filter((alias): alias is string => typeof alias === 'string') : [],
        category: parsed.data.category ?? 'uncategorized',
        tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
        content: parsed.content,
        sourcePath: path.relative(path.dirname(WIKI_ROOT), file)
      };
    });
});

export function getPageBySlug(slug: string): WikiPage | undefined {
  return getAllWikiPages().find((page) => page.slug === slug);
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getBacklinks(slug: string): WikiPage[] {
  const currentPage = getPageBySlug(slug);
  if (!currentPage) return [];

  const targets = new Set([
    normalize(currentPage.slug),
    normalize(currentPage.title),
    ...currentPage.aliases.map((alias) => normalize(alias))
  ]);

  return getAllWikiPages().filter((page) => {
    if (page.slug === currentPage.slug) return false;

    return Array.from(page.content.matchAll(WIKILINK_REGEX)).some((match) => {
      const target = normalize(match[1] ?? '');
      return target.length > 0 && targets.has(target);
    });
  });
}

export function getCategories(): string[] {
  return [...new Set(getAllWikiPages().map((p) => p.category))].sort();
}

export function getGeneratedBlocks(type: 'insights' | 'papers' | 'relations', documentId: string): string[] {
  if (!GENERATED_ROOT) return [];

  const dir = path.join(GENERATED_ROOT, type);
  if (!fs.existsSync(dir) || !documentId) return [];

  const suffixMap = {
    insights: '.insight.json',
    papers: '.papers.json',
    relations: '.relations.json'
  } as const;

  const exactFile = path.join(dir, `${documentId}${suffixMap[type]}`);
  if (!fs.existsSync(exactFile)) return [];
  return [fs.readFileSync(exactFile, 'utf8')];
}

function resolveWikiTarget(target: string): WikiPage | undefined {
  const normalizedTarget = target.trim().toLowerCase();
  if (!normalizedTarget) return undefined;

  return getAllWikiPages().find((page) => {
    if (page.slug.toLowerCase() === normalizedTarget) return true;
    if (page.title.toLowerCase() === normalizedTarget) return true;
    return page.aliases.some((alias) => alias.toLowerCase() === normalizedTarget);
  });
}

export function convertWikiLinks(content: string): string {
  return content.replace(WIKILINK_REGEX, (_, target: string, label?: string) => {
    const cleanTarget = target.trim();
    const cleanLabel = (label ?? target).trim();
    const resolvedPage = resolveWikiTarget(cleanTarget);
    if (resolvedPage) {
      return `[${cleanLabel}](/wiki/${resolvedPage.slug})`;
    }
    return `${cleanLabel} (unresolved: ${cleanTarget})`;
  });
}
