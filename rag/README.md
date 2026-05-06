# RAG Evidence Review Workflow (Local-only)

## Evidence policy
- Prioritize SCI/SCIE, PubMed/MEDLINE, systematic reviews, meta-analyses, RCTs, guidelines, official institutions, and major textbooks.
- Exclude blogs/social/commercial/AI summaries/non-peer-reviewed claims as correction evidence.
- Low-quality sources are discovery-only.
- Separate classical Korean medicine claims from modern biomedical evidence; cross-domain mapping should be marked hypothesis unless directly supported.

## Update frequency policy
- Supported: weekly, monthly, quarterly, semiannual, annual, manual.
- Frequency is inferred from category, priorities, evidence_status, and wiki path rules.

## Safety
- This workflow does **not** auto-overwrite wiki pages.
- Reports and update candidates are generated first.
- Human approval is mandatory (`approved: true`) before apply.

## Recommended workflow
1. `npm run rag:index`
2. `npm run rag:due`
3. `npm run rag:check -- --id FML-00001`
4. `npm run rag:candidates -- --id FML-00001`
5. Manually review update candidates.
6. Set `approved: true` only for accepted edits.
7. `npm run rag:apply -- --file rag/update-candidates/FML-00001.updates.json`
8. Commit changes to Git.
