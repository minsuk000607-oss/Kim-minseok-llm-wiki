import { getAllWikiPages, getSortedWikiPages } from '../lib/wiki';
import { HeroNetworkGraphic } from '../components/HeroNetworkGraphic';
import { CategoryCard, DocCard, EmptyState, FeaturedDocCard, SectionHeader } from '../components/ui';

export default function HomePage() {
  const pages = getAllWikiPages();
  const sorted = getSortedWikiPages(pages);
  const pinned = sorted.filter((p) => p.pinned).slice(0, 4);
  const recent = sorted.slice(0, 8);
  const categories = Object.entries(pages.reduce<Record<string, number>>((a, p) => ((a[p.category] = (a[p.category] ?? 0) + 1), a), {}));

  return (
    <div className="grid page-stack">
      <section className="surface hero-card">
        <div>
          <p className="hero-kicker">Private Research Laboratory</p>
          <h1 className="hero-title">김민석 LLM Wiki OS</h1>
          <p className="hero-subtitle">임상·신경과학·한의학 지식을 구조화해 사고를 확장하는 physician-scholar second brain platform.</p>
        </div>
        <HeroNetworkGraphic />
      </section>

      <SectionHeader title="Pinned Docs" subtitle="핵심 문서를 우선 추적합니다." />
      {pinned.length > 0 ? (
        <div className="content-grid content-grid-featured">{pinned.map((p) => <FeaturedDocCard key={p.id} href={`/wiki/${p.slug}`} title={p.title} meta={`${p.category} · ${p.review_status}`} snippet={p.content.slice(0, 90)} />)}</div>
      ) : (
        <EmptyState title="Pinned 문서 없음" description="중요 문서에 pinned 메타를 부여하면 여기에 노출됩니다." />
      )}

      <SectionHeader title="Recent Docs" subtitle="최근 업데이트 문서 흐름" />
      <div className="content-grid content-grid-docs">{recent.map((p) => <DocCard key={p.id} href={`/wiki/${p.slug}`} title={p.title} meta={`${p.category}`} snippet={p.content.slice(0, 100)} />)}</div>

      <SectionHeader title="Top Categories" subtitle="지식 클러스터 밀도" />
      {categories.length > 0 ? (
        <div className="content-grid content-grid-docs">{categories.map(([c, n]) => <CategoryCard key={c} category={c} count={n} />)}</div>
      ) : (
        <EmptyState title="카테고리 준비 중" description="문서가 축적되면 카테고리 분포를 표시합니다." />
      )}
    </div>
  );
}
