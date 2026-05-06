import fs from 'fs';
import { loadWikiDocuments } from '../lib/rag';

const id = process.argv.slice(2)[process.argv.slice(2).indexOf('--id') + 1];
if (!id) throw new Error('--id required');
const doc = loadWikiDocuments(process.cwd()).find((d) => d.frontmatter.id === id);
if (!doc) throw new Error('doc not found');
const reportPath = `rag/correction-reports/${id}.correction.md`;
if (!fs.existsSync(reportPath)) throw new Error('run rag-check first');
const sources = fs.existsSync(`rag/source-cache/${id}.sources.json`) ? JSON.parse(fs.readFileSync(`rag/source-cache/${id}.sources.json`, 'utf8')).slice(0,3) : [];
const candidate = [{
  candidate_id: `${id}-1`, document_id: id, target_heading: 'ROOT', claim: '근거 검토 필요 문장', current_text: doc.body.slice(0,200),
  proposed_text: '최신 근거 재검토 전까지 본 항목은 가설 수준으로 유지합니다.', reason: '자동 근거 검색 후 불확실성 라벨 필요', evidence: sources,
  recommendation: 'mark_uncertain', confidence: 0.55, approved: false,
}];
fs.mkdirSync('rag/update-candidates', { recursive: true });
fs.writeFileSync(`rag/update-candidates/${id}.updates.json`, JSON.stringify(candidate, null, 2));
console.log('candidates generated');
