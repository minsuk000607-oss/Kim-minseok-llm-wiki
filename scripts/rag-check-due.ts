import fs from 'fs';
import path from 'path';
import { loadWikiDocuments } from '../lib/rag';
import { getDocumentsDueForRagCheck, getNextRagCheckDate, inferRagCheckFrequency, RagCheckFrequency } from '../lib/rag-frequency';

const today = new Date().toISOString().slice(0, 10);
const docs = loadWikiDocuments(process.cwd()).map((d) => {
  const freq = d.frontmatter.rag_check_frequency ?? inferRagCheckFrequency({ ...d.frontmatter, path: path.relative(process.cwd(), d.path) });
  const last = d.frontmatter.last_rag_check ?? d.frontmatter.updated ?? d.frontmatter.created ?? today;
  const next = d.frontmatter.next_rag_check ?? getNextRagCheckDate(last, freq as RagCheckFrequency, new Date(today));
  const reason = d.frontmatter.evidence_status === 'outdated' ? 'evidence_status outdated' : 'scheduled review date reached';
  return { ...d.frontmatter, path: path.relative(process.cwd(), d.path), rag_check_frequency: freq, last_rag_check: last, next_rag_check: next, reason_due: reason };
});
const due = getDocumentsDueForRagCheck(docs, today);
const groups = ['weekly','monthly','quarterly','semiannual','annual'] as const;
let out = `# RAG Due Documents\n\nGenerated: ${today}\n\n`;
for (const g of groups) {
  out += `## ${g[0].toUpperCase() + g.slice(1)}\n\n`;
  for (const d of due.filter((x) => x.rag_check_frequency === g)) {
    out += `- id: ${d.id ?? 'N/A'}\n  - title: ${d.title ?? path.basename(d.path)}\n  - category: ${d.category ?? ''}\n  - last_rag_check: ${d.last_rag_check}\n  - next_rag_check: ${d.next_rag_check}\n  - rag_check_frequency: ${d.rag_check_frequency}\n  - evidence_status: ${d.evidence_status ?? 'draft'}\n  - reason due: ${d.reason_due}\n`;
  }
  out += '\n';
}
fs.mkdirSync('rag/correction-reports', { recursive: true });
fs.writeFileSync('rag/correction-reports/due-documents.md', out);
console.log(`Due docs: ${due.length}`);
