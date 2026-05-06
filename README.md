# Kim Minseok LLM Wiki OS

Obsidian-powered markdown wiki + Next.js site MVP for a second-brain knowledge system.

## Structure

- `raw/`: immutable source inputs
- `wiki/`: curated markdown knowledge
- `generated/`: generated insight/paper/relation artifacts (committed to git)
- `site/`: Next.js app (App Router target)
- `rag/`: RAG evidence search and human-approval workflow
- `scripts/`: maintenance and RAG scripts

## RAG evidence policy

Final correction evidence should prioritize:
- SCI/SCIE-indexed peer-reviewed literature
- PubMed/MEDLINE-indexed literature
- systematic reviews, meta-analyses, RCTs
- clinical guidelines and official institutional publications

Avoid as final evidence:
- blogs
- social media
- unsourced pages
- AI-generated summaries
- low-quality non-peer-reviewed sources

## Human approval workflow

1. Search and generate reports/candidates automatically.
2. Keep candidate updates with `approved: false` by default.
3. Apply only approved candidates.
4. Append changelog entries when approved changes are applied.

## Deployment (Vercel)

- Deploy `site/` as the Vercel project root.
- Do not rely on persistent file writes in production runtime.
- Generated and RAG workflow outputs are created locally and committed before deployment.
- Document required environment variables in `site/.env.example` when introduced.
