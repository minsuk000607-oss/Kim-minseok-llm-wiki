export interface StructuredInsight {
  id: string;
  title?: string;
  summary?: string;
  bullets?: string[];
  confidence?: number;
  generatedAt?: string;
  model?: string;
}

export interface PaperRecord {
  id?: string;
  title: string;
  authors?: string[];
  year?: number;
  journal?: string;
  doi?: string;
  url?: string;
  relevance?: number;
  evidenceLevel?: string;
}

export interface WikiRelation {
  sourceId: string;
  targetId: string;
  relationType: string;
  weight?: number;
  rationale?: string;
}
