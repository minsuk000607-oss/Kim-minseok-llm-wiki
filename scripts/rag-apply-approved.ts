import fs from 'fs';
import path from 'path';
import { loadWikiDocuments, parseFrontmatter } from '../lib/rag';
import { getNextRagCheckDate, inferRagCheckFrequency } from '../lib/rag-frequency';

const file = process.argv.slice(2)[process.argv.slice(2).indexOf('--file') + 1];
if (!file) throw new Error('--file required');
const candidates = JSON.parse(fs.readFileSync(file, 'utf8')).filter((c: any) => c.approved === true);
if (!candidates.length) { console.log('No approved candidates to apply'); process.exit(0); }
const docs = loadWikiDocuments(process.cwd());
for (const c of candidates) {
  const doc = docs.find((d) => d.frontmatter.id === c.document_id);
  if (!doc) continue;
  const raw = fs.readFileSync(doc.path, 'utf8');
  const parsed = parseFrontmatter(raw);
  const next = getNextRagCheckDate(new Date().toISOString().slice(0,10), inferRagCheckFrequency({ ...parsed.frontmatter, path: path.relative(process.cwd(), doc.path) }));
  let body = parsed.body.replace(c.current_text, c.proposed_text);
  const fm = { ...parsed.frontmatter, last_rag_check: new Date().toISOString().slice(0,10), next_rag_check: next, evidence_status: 'reviewed' };
  const fmText = Object.entries(fm).map(([k,v]) => Array.isArray(v) ? `${k}:\n${v.map((x)=>`  - ${x}`).join('\n')}` : `${k}: ${v}`).join('\n');
  fs.writeFileSync(doc.path, `---\n${fmText}\n---\n${body}`);
  fs.appendFileSync('wiki/90_LOGS/changelog.md', `\n- ${new Date().toISOString().slice(0,10)}: Applied approved RAG update ${c.candidate_id} to ${c.document_id}`);
}
console.log(`Applied ${candidates.length} approved candidates.`);
