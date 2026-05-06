# RAG Workflow

- Searches evidence from SCI/SCIE, PubMed/MEDLINE, systematic reviews, meta-analyses, RCTs, guidelines.
- Generates update candidates under `rag/update-candidates/` with `approved: false` by default.
- `rag-apply-approved` only applies approved candidates and appends changelog entries.
- RAG must not overwrite wiki pages automatically without human approval.
