# /wiki-ingest

Use this mode when ingesting a raw source into the wiki.

## Purpose

Convert raw material into structured wiki knowledge without overwriting the original source.

## Input sources

- raw lecture notes
- paper summaries
- YouTube transcripts
- conversation logs
- OCR text
- rough notes

## Steps

1. Read the raw source.
2. Extract key concepts.
3. Identify formulas, herbs, acupoints, muscles, nerves, autonomic patterns, clinical patterns, and research claims.
4. Search for overlapping wiki pages.
5. Decide whether to:
   - update an existing page
   - create a new page
   - add only a relation
   - leave as research gap
6. Use YAML frontmatter for new pages.
7. Use Obsidian wikilinks.
8. Separate:
   - source-backed facts
   - user interpretation
   - new hypotheses
   - research gaps
9. Do not modify files in `raw/`.
10. Do not treat generated output as source of truth.

## Required frontmatter for new wiki pages

```yaml
id:
slug:
title:
aliases:
  -
category:
tags:
  -
created:
updated:
clinical_priority:
research_priority:
foundational_priority:
review_status: draft

Output structure
When compiling a wiki page, prefer this structure:

# Title

## 핵심 정의

## 원문/근거

## 병기 구조

## 임상 패턴

## 현대 생리학적 해석

## Neuro-Fascial ANS Framework

## 감별점

## 주의사항

## Research Gaps

## Related

