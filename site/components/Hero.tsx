export function Hero() {
  return (
    <section className="hero-card">
      <p className="eyebrow">LLM Wiki OS</p>
      <h1>임상 추론과 지식 합성을 위한 두 번째 뇌</h1>
      <p className="lead">
        한의학 고전 이론, 신경생리학, MPS/IMS 임상 노하우를 하나의 구조로 연결합니다.
      </p>
      <div className="hero-actions">
        <a href="/wiki/start" className="btn btn-primary">Wiki 시작하기</a>
        <a href="/search" className="btn btn-ghost">검색 열기</a>
      </div>
    </section>
  );
}
