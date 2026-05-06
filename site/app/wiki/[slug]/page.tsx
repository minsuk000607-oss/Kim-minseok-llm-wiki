import { SiteHeader } from '@/components/SiteHeader';
import { KnowledgeBlocks } from '@/components/KnowledgeBlocks';

type Props = { params: Promise<{ slug: string }> };

export default async function WikiSlugPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="page-shell">
      <SiteHeader />
      <section className="hero-card compact">
        <p className="eyebrow">Wiki Article</p>
        <h1>{decodeURIComponent(slug)}</h1>
        <p className="lead">문서 개요, 링크 문맥, 참고 근거를 이 영역에서 제공합니다.</p>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>핵심 요약</h2>
          <p>이 페이지는 슬러그 기반 위키 문서 템플릿입니다. 추후 markdown 렌더러 및 백링크를 연결합니다.</p>
        </article>
        <aside className="panel">
          <h3>메타데이터</h3>
          <ul>
            <li>slug: {slug}</li>
            <li>status: draft</li>
            <li>updated: 2026-05-06</li>
          </ul>
        </aside>
      </section>

      <KnowledgeBlocks />
    </main>
  );
}
