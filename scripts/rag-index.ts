import fs from 'fs';
import path from 'path';
import { loadWikiDocuments } from '../lib/rag';

const args = process.argv.slice(2);
const includeRaw = args.includes('--include-raw');
const includeGenerated = args.includes('--include-generated');
const root = process.cwd();
const docs = loadWikiDocuments(root);

function chunkByHeading(body: string) {
  const lines = body.split('\n');
  const chunks: { heading: string; content: string }[] = [];
  let heading = 'ROOT';
  let buffer: string[] = [];
  for (const line of lines) {
    const m = line.match(/^(#+)\s+(.+)/);
    if (m) {
      if (buffer.join('').trim()) chunks.push({ heading, content: buffer.join('\n').trim() });
      heading = m[2].trim();
      buffer = [];
    } else buffer.push(line);
  }
  if (buffer.join('').trim()) chunks.push({ heading, content: buffer.join('\n').trim() });
  return chunks;
}

const index = docs.flatMap((d) => chunkByHeading(d.body).map((c) => ({
  id: d.frontmatter.id ?? '', slug: d.frontmatter.slug ?? '', title: d.frontmatter.title ?? path.basename(d.path),
  category: d.frontmatter.category ?? '', tags: d.frontmatter.tags ?? [], heading: c.heading, source_path: path.relative(root, d.path), content_chunk: c.content,
})));

if (includeRaw || includeGenerated) {
  // reserved for future expansion
}
fs.mkdirSync('rag/indexes', { recursive: true });
fs.writeFileSync('rag/indexes/wiki-index.json', JSON.stringify(index, null, 2));
console.log(`Indexed ${index.length} chunks.`);
