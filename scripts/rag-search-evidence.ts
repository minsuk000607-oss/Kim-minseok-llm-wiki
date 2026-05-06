import fs from 'fs';
import path from 'path';
import { buildEvidenceSearchQuery, loadWikiDocuments } from '../lib/rag';
import { calculateEvidenceQualityScore, rankEvidenceSources } from '../lib/evidence-quality';
import { searchPubMed } from '../lib/pubmed';
import { searchOpenAlex } from '../lib/openalex';
import { searchCrossRef } from '../lib/crossref';

const args = process.argv.slice(2);
const id = args[args.indexOf('--id') + 1];
const claim = args.includes('--claim') ? args[args.indexOf('--claim') + 1] : undefined;
if (!id) throw new Error('--id required');

const doc = loadWikiDocuments(process.cwd()).find((d) => d.frontmatter.id === id);
if (!doc) throw new Error(`Document not found: ${id}`);
const query = buildEvidenceSearchQuery(doc, claim);

const [p, o, c] = await Promise.all([searchPubMed(query, 8), searchOpenAlex(query, 8), searchCrossRef(query, 5)]);
const merged = rankEvidenceSources([...p, ...o, ...c]).map((e) => ({ ...e, quality_score: e.quality_score ?? calculateEvidenceQualityScore(e) }));
fs.mkdirSync('rag/source-cache', { recursive: true });
fs.writeFileSync(`rag/source-cache/${id}.sources.json`, JSON.stringify(merged, null, 2));
console.log(`Saved ${merged.length} evidence items to rag/source-cache/${id}.sources.json`);
