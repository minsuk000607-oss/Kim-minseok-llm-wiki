import { SiteHeader } from '@/components/SiteHeader';

type Props = { params: Promise<{ category: string }> };

const sampleItems = ['오령산', '계지탕', '태양병 강의 노트'];

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="hero-card compact">
        <p className="eyebrow">Category</p>
        <h1>{decodeURIComponent(category)}</h1>
        <p className="lead">해당 카테고리의 문서를 카드/리스트 뷰로 탐색합니다.</p>
      </section>

      <section className="list-panel">
        {sampleItems.map((item) => (
          <article key={item} className="list-row">
            <h2>{item}</h2>
            <p>카테고리 문서 프리뷰 영역입니다.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
