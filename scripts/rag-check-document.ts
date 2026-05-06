import fs from 'fs';
import { execSync } from 'child_process';
import { loadWikiDocuments } from '../lib/rag';
import { filterAcceptableCorrectionEvidence } from '../lib/evidence-quality';

const args = process.argv.slice(2);
const id = args[args.indexOf('--id') + 1];
if (!id) throw new Error('--id required');
try { execSync(`node --loader tsx scripts/rag-search-evidence.ts --id ${id}`, { stdio: 'inherit' }); } catch {}
const docs = loadWikiDocuments(process.cwd());
const doc = docs.find((d) => d.frontmatter.id === id);
if (!doc) throw new Error('doc not found');
const evidence = JSON.parse(fs.readFileSync(`rag/source-cache/${id}.sources.json`, 'utf8'));
const accepted = filterAcceptableCorrectionEvidence(evidence).slice(0, 8);
const claim = doc.body.split('\n').find((l) => /다|is|are|may|can/.test(l) && l.trim().length > 20) ?? doc.body.slice(0, 140);
const report = `# Correction Report\n\n- document id: ${id}\n- title: ${doc.frontmatter.title ?? ''}\n- checked date: ${new Date().toISOString().slice(0,10)}\n- checked sources: ${evidence.length}\n\n## Evidence quality summary\n- acceptable sources: ${accepted.length}\n\n## Claim being checked\n${claim}\n\n## Current wiki statement\n${claim}\n\n## Updated evidence\n${accepted.map((e:any,i:number)=>`${i+1}. [${e.title}](${e.url})`).join('\n')}\n\n## Recommendation\n- recommendation: mark_uncertain\n- confidence: 0.55\n\n## Proposed replacement text\n> 본 문장은 최신 근거 검토가 필요하며, 전통 이론과 현대 생의학 근거를 분리해 해석해야 합니다.\n\n- [ ] Human approval required\n`;
fs.mkdirSync('rag/correction-reports', { recursive: true });
fs.writeFileSync(`rag/correction-reports/${id}.correction.md`, report);
console.log('report generated');
