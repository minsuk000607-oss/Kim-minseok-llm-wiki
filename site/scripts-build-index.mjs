import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = path.resolve(process.cwd(), '..', 'wiki');
const out = path.resolve(process.cwd(), 'wiki-index.json');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full.endsWith('.md') ? [full] : [];
  });
}

const docs = walk(root).map((file) => {
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const slug = parsed.data.slug ?? path.basename(file, '.md');
  return { slug, title: parsed.data.title ?? slug, content: parsed.content.slice(0, 5000) };
});

fs.writeFileSync(out, JSON.stringify(docs, null, 2));
