import { getAllWikiPages, getSortedWikiPages } from '../lib/wiki';
import { HeroNetworkGraphic } from '../components/HeroNetworkGraphic';
import { CategoryCard, DocCard, FeaturedDocCard, SectionHeader } from '../components/ui';

export default function HomePage() {
  const pages = getAllWikiPages();
  const sorted = getSortedWikiPages(pages);
  const pinned = sorted.filter((p) => p.pinned).slice(0, 4);
  const recent = sorted.slice(0, 6);
  const categories = Object.entries(pages.reduce<Record<string, number>>((a, p) => ((a[p.category] = (a[p.category] ?? 0) + 1), a), {}));

  return (
    <div className="grid">
      <section className="surface" style={{ padding: 24 }}>
        <p style={{ margin: 0, color: '#9eb2d8', letterSpacing: '.1em', textTransform: 'uppercase', fontSize: 12 }}>Private Research Laboratory</p>
        <h1 style={{ margin: '8px 0 10px', fontSize: '2rem' }}>김민석 LLM Wiki OS</h1>
        <p style={{ color: 'var(--muted)', maxWidth: 740 }}>임상·신경과학·한의학 지식을 구조화해 사고를 확장하는 physician-scholar second brain platform.</p>
        <HeroNetworkGraphic />
      </section>

      <SectionHeader title="Pinned Docs" />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))' }}>{pinned.map((p) => <FeaturedDocCard key={p.id} href={`/wiki/${p.slug}`} title={p.title} meta={`${p.category} · ${p.review_status}`} snippet={p.content.slice(0, 90)} />)}</div>

      <SectionHeader title="Recent Docs" />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>{recent.map((p) => <DocCard key={p.id} href={`/wiki/${p.slug}`} title={p.title} meta={`${p.category}`} />)}</div>

      <SectionHeader title="Top Categories" />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>{categories.map(([c,n]) => <CategoryCard key={c} category={c} count={n} />)}</div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>
        <section className="surface" style={{ padding: 16 }}><h3>Clinical</h3><p style={{color:'var(--muted)'}}>치료 우선순위 기반 문서 추적.</p></section>
        <section className="surface" style={{ padding: 16 }}><h3>Neuro</h3><p style={{color:'var(--muted)'}}>ANS, fascia, pain circuitry 연결 구조.</p></section>
        <section className="surface" style={{ padding: 16 }}><h3>Projects</h3><p style={{color:'var(--muted)'}}>논문 합성 및 진료 지식 그래프 확장.</p></section>
      </div>
    </div>
  );
}
