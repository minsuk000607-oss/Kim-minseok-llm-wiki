import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function resolveWikiRoot() {
  const candidates = [
    path.resolve(process.cwd(), 'wiki'),
    path.resolve(process.cwd(), '..', 'wiki')
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) ?? null;
}

const root = resolveWikiRoot();
const out = path.resolve(process.cwd(), 'wiki-index.json');

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full.endsWith('.md') ? [full] : [];
  });
}

if (!root) {
  console.warn('[build-index] Could not find wiki directory. Checked: ./wiki and ../wiki. Writing empty index.');
  fs.writeFileSync(out, JSON.stringify([], null, 2));
  process.exit(0);
}

const docs = walk(root).map((file) => {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const slug = parsed.data.slug ?? path.basename(file, '.md');
  return { slug, title: parsed.data.title ?? slug, content: parsed.content.slice(0, 5000) };
});

fs.writeFileSync(out, JSON.stringify(docs, null, 2));
