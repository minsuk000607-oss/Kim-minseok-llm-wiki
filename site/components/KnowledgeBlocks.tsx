type Item = { title: string; description: string; confidence?: 'high' | 'medium' | 'low' };

const relatedDocs: Item[] = [
  { title: '오령산', description: '수습 조절과 기화 메커니즘 정리', confidence: 'high' },
  { title: '태양병 개론', description: '초기 표증 해석 프레임', confidence: 'medium' },
  { title: 'ANS 반응성', description: '자율신경계 반응과 체액 조절 연결', confidence: 'low' }
];

const backlinks: Item[] = [
  { title: '수습 병리 지도', description: '해당 문서를 참조한 병리 노트' },
  { title: '방제 비교 매트릭스', description: '처방 비교표에서 링크됨' }
];

const insights: Item[] = [
  { title: 'Generated Insight #01', description: '증상군-처방군 연결 가능성 제안', confidence: 'medium' },
  { title: 'Generated Insight #02', description: '체액대사 지표 기반 추적 가설', confidence: 'low' }
];

const papers: Item[] = [
  { title: 'Paper Node A', description: '신경면역·자율신경 조절 연계 리뷰' },
  { title: 'Paper Node B', description: '통증 민감도와 교감신경 흥분 관련 임상 연구' }
];

const relations: Item[] = [
  { title: '오령산 → 수습 조절', description: '전통 이론 축', confidence: 'high' },
  { title: '수습 조절 → ANS 변조', description: '현대 매핑 축', confidence: 'low' }
];

function NodeCard({ item }: { item: Item }) {
  return (
    <article className="node-card">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      {item.confidence && <span className={`confidence ${item.confidence}`}>confidence: {item.confidence}</span>}
    </article>
  );
}

export function KnowledgeBlocks() {
  return (
    <section className="graph-sections">
      <div className="graph-panel">
        <div className="panel-head"><h3>Related Documents</h3><span className="chip">docs</span></div>
        <div className="node-grid">{relatedDocs.map((i) => <NodeCard key={i.title} item={i} />)}</div>
      </div>

      <div className="graph-panel">
        <div className="panel-head"><h3>Backlinks</h3><span className="chip">reverse links</span></div>
        <div className="node-grid">{backlinks.map((i) => <NodeCard key={i.title} item={i} />)}</div>
      </div>

      <div className="graph-panel generated insight">
        <div className="panel-head"><h3>Generated Insight Blocks</h3><span className="chip">generated</span></div>
        <div className="node-grid">{insights.map((i) => <NodeCard key={i.title} item={i} />)}</div>
      </div>

      <div className="graph-panel generated paper">
        <div className="panel-head"><h3>Generated Paper Blocks</h3><span className="chip">papers</span></div>
        <div className="node-grid">{papers.map((i) => <NodeCard key={i.title} item={i} />)}</div>
      </div>

      <div className="graph-panel generated relation">
        <div className="panel-head"><h3>Generated Relation Blocks</h3><span className="chip">relations</span></div>
        <div className="node-grid">{relations.map((i) => <NodeCard key={i.title} item={i} />)}</div>
      </div>
    </section>
  );
}
