import fs from 'fs';
import path from 'path';
import { inferRagCheckFrequency, getNextRagCheckDate } from './rag-frequency';

export interface WikiDoc { path: string; frontmatter: any; body: string; }

export function walkMarkdownFiles(root: string): string[] {
  const out: string[] = [];
  const visit = (p: string) => {
    for (const name of fs.readdirSync(p)) {
      const full = path.join(p, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) visit(full);
      else if (name.endsWith('.md')) out.push(full);
    }
  };
  visit(root);
  return out;
}

export function parseFrontmatter(content: string): { frontmatter: any; body: string } {
  if (!content.startsWith('---\n')) return { frontmatter: {}, body: content };
  const end = content.indexOf('\n---\n', 4);
  if (end === -1) return { frontmatter: {}, body: content };
  const raw = content.slice(4, end);
  const body = content.slice(end + 5);
  const fm: any = {};
  let currentArrayKey: string | null = null;
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_\-]+):\s*(.*)$/);
    if (m) {
      const [, k, v] = m;
      if (v === '') {
        fm[k] = [];
        currentArrayKey = k;
      } else {
        fm[k] = parseValue(v);
        currentArrayKey = null;
      }
    } else if (currentArrayKey && line.trim().startsWith('- ')) {
      fm[currentArrayKey].push(parseValue(line.trim().slice(2)));
    }
  }
  return { frontmatter: fm, body };
}

function parseValue(v: string) { if (/^\d+$/.test(v)) return Number(v); return v.replace(/^['"]|['"]$/g, ''); }

export function loadWikiDocuments(baseDir: string): WikiDoc[] {
  return walkMarkdownFiles(path.join(baseDir, 'wiki')).map((p) => {
    const c = fs.readFileSync(p, 'utf8');
    const { frontmatter, body } = parseFrontmatter(c);
    return { path: p, frontmatter, body };
  });
}

export function buildEvidenceSearchQuery(document: WikiDoc, claim?: string): string {
  const fm = document.frontmatter;
  const aliases = Array.isArray(fm.aliases) ? fm.aliases.join(' ') : '';
  const tags = Array.isArray(fm.tags) ? fm.tags.join(' ') : '';
  return [fm.title, aliases, fm.category, tags, claim].filter(Boolean).join(' ');
}

export function updateRagCheckMetadata(documentId: string, result: { status: string; date: string }) {
  return { documentId, last_rag_check: result.date, evidence_status: result.status, next_rag_check: getNextRagCheckDate(result.date, inferRagCheckFrequency({ evidence_status: result.status as any })) };
}
