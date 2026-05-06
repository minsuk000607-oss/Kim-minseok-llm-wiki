export interface ScoredDocument {
  clinical_priority?: number;
  research_priority?: number;
  foundational_priority?: number;
}

export function scoreDocument(doc: ScoredDocument): number {
  return Number(doc.clinical_priority ?? 0) + Number(doc.research_priority ?? 0) + Number(doc.foundational_priority ?? 0);
}
