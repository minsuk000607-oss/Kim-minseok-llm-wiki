import { SiteHeader } from '@/components/SiteHeader';

const searchResults = [
  { title: '오령산', context: '수습 조절과 방광기화 관련 메모' },
  { title: '자율신경계', context: 'ANS-통증 민감도 매핑 노트' },
  { title: 'MPS 트리거포인트', context: 'IMS 적응증 및 금기 정리' }
];

export default function SearchPage() {
  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="hero-card compact">
        <p className="eyebrow">Search</p>
        <h1>지식 검색</h1>
        <p className="lead">키워드, 태그, 링크 연결을 기반으로 위키를 탐색합니다.</p>
        <input className="search-input" placeholder="예: 오령산, 태양병, ANS" aria-label="search" />
      </section>

      <section className="list-panel">
        {searchResults.map((result) => (
          <article key={result.title} className="list-row">
            <h2>{result.title}</h2>
            <p>{result.context}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
