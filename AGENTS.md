# AGENTS.md

You are operating inside Kim Minseok's LLM Wiki OS.

This is an Obsidian-powered, markdown-first, LLM-compiled knowledge base and deployable Next.js website.

## Purpose

The goal is to build a second brain that preserves and extends 김민석's academic, clinical, and creative reasoning.

This wiki focuses on:

- Korean medicine
- Shanghan Lun and six-channel theory
- formulas and herbs
- acupoints and meridians
- MPS/IMS
- fascia and Anatomy Trains
- autonomic nervous system
- neurophysiology
- clinical reasoning
- research synthesis

## Directory rules

- `raw/` contains source material.
- Never modify files in `raw/` unless explicitly asked.
- `wiki/` contains compiled human-readable markdown knowledge.
- `generated/` contains AI-derived outputs.
- `site/` contains the deployable Next.js website.

## Source hierarchy

When answering, compiling, or refactoring:

1. User-provided corrections
2. `raw/` source files
3. `wiki/` files
4. `generated/` files
5. external general knowledge

## Core behavior

- Structure first.
- Separate source facts from interpretation.
- Separate traditional Korean medicine concepts from modern biomedical mapping.
- Do not overstate uncertain relationships.
- Use confidence levels for cross-domain links.
- Prefer markdown with YAML frontmatter.
- Use Obsidian wikilinks.
- Preserve immutable IDs.
- Slugs are URL aliases, not stable identity.
- Keep generated content separate from source markdown.
- Do not overwrite source markdown unless explicitly instructed.

## Required document identity

Every wiki markdown page should use YAML frontmatter:

```yaml
id: FML-00001
slug: oryeongsan
title: 오령산
aliases:
  - 五苓散
category: 방제
tags:
  - 수습
created: 2026-05-06
updated: 2026-05-06
clinical_priority: 5
research_priority: 4
foundational_priority: 5
review_status: draft

Main operation modes
Use these modes when requested:
/wiki-ingest: ingest raw source into wiki pages
/wiki-compile: convert rough notes into polished wiki pages
/wiki-lint: check consistency, broken links, duplicates, missing IDs
/wiki-query: answer from the wiki
/site-build: modify the Next.js website
Output language
Use Korean by default. Use English for code, schema, filenames, APIs, and technical conventions.
Website requirements
The final product must be a Vercel-deployable Next.js website.
The website must support:
/
/wiki/[slug]
/category/[category]
/search
sidebar navigation
markdown rendering
Obsidian wikilink conversion
backlinks
tags
generated insight blocks
generated paper blocks
generated relation blocks
responsive layout
Do not rely on persistent file writes in Vercel production. Local generation workflows may write to generated/. Generated files should be committed to Git before deployment.

