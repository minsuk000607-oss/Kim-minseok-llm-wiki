import { execSync } from 'child_process';
import fs from 'fs';

const auto = process.argv.includes('--auto-check-due');
execSync('node --loader tsx scripts/rag-index.ts', { stdio: 'inherit' });
execSync('node --loader tsx scripts/rag-check-due.ts', { stdio: 'inherit' });
if (auto) {
  const due = fs.readFileSync('rag/correction-reports/due-documents.md', 'utf8');
  const ids = [...due.matchAll(/id:\s*([A-Za-z0-9\-]+)/g)].map((m) => m[1]).filter((x) => x !== 'N/A');
  for (const id of ids) {
    execSync(`node --loader tsx scripts/rag-check-document.ts --id ${id}`, { stdio: 'inherit' });
    execSync(`node --loader tsx scripts/rag-update-candidates.ts --id ${id}`, { stdio: 'inherit' });
  }
}
