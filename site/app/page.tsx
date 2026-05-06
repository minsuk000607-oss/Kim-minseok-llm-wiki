import Link from 'next/link';
import { getAllWikiPages, getDocumentImportanceScore, getSortedWikiPages } from '../lib/wiki';
import { HeroNetworkGraphic } from '../components/HeroNetworkGraphic';
import { DashboardCard } from '../components/DashboardCard';
import { TagBadge } from '../components/TagBadge';

function TopList({ pages }: { pages: ReturnType<typeof getAllWikiPages> }) {
  if (pages.length === 0) return <p>문서가 아직 없습니다.</p>;

  return (
    <ul style={{ margin: 0, paddingLeft: 20 }}>
      {pages.map((page) => (
        <li key={page.id} style={{ marginBottom: 8 }}>
          <Link href={`/wiki/${page.slug}`}>{page.title}</Link>{' '}
          <small style={{ color: '#94a3b8' }}>({page.category} · score {getDocumentImportanceScore(page).toFixed(2)})</small>
          <div style={{ marginTop: 4 }}>
            {page.tags.slice(0, 3).map((tag) => <TagBadge key={`${page.id}-${tag}`} tag={tag} />)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  const pages = getAllWikiPages();
  const sorted = getSortedWikiPages(pages);
  const pinned = sorted.filter((p) => p.pinned).slice(0, 8);
  const clinicalTop = [...pages].sort((a, b) => b.clinical_priority - a.clinical_priority).slice(0, 8);
  const researchTop = [...pages].sort((a, b) => b.research_priority - a.research_priority).slice(0, 8);
  const foundationalTop = [...pages].sort((a, b) => b.foundational_priority - a.foundational_priority).slice(0, 8);

  const categoryTop = Object.entries(
    pages.reduce<Record<string, typeof pages>>((acc, page) => {
      acc[page.category] = acc[page.category] ?? [];
      acc[page.category].push(page);
      return acc;
    }, {})
  )
    .map(([category, categoryPages]) => ({
      category,
      top: getSortedWikiPages(categoryPages)[0]
    }))
    .filter((entry): entry is { category: string; top: (typeof pages)[number] } => Boolean(entry.top))
    .sort((a, b) => getDocumentImportanceScore(b.top) - getDocumentImportanceScore(a.top));

  if (pages.length === 0) {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <DashboardCard title="김민석 LLM Wiki">
          <p>구조화된 임상/학술 추론을 위한 second-brain knowledge network.</p>
          <HeroNetworkGraphic />
        </DashboardCard>
        <DashboardCard title="시작 가이드">
          <p>Add markdown files under wiki/ or raw sources under raw/ and ingest them.</p>
        </DashboardCard>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <DashboardCard title="김민석 LLM Wiki Dashboard">
        <p>구조화된 임상/학술 추론을 위한 second-brain knowledge network.</p>
        <HeroNetworkGraphic />
      </DashboardCard>
      <DashboardCard title="Pinned Docs">
        <TopList pages={pinned} />
      </DashboardCard>
      <DashboardCard title="Clinical Top Topics">
        <TopList pages={clinicalTop} />
      </DashboardCard>
      <DashboardCard title="Research Top Topics">
        <TopList pages={researchTop} />
      </DashboardCard>
      <DashboardCard title="Foundational Core Docs">
        <TopList pages={foundationalTop} />
      </DashboardCard>
      <DashboardCard title="Category Top Docs">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {categoryTop.map(({ category, top }) => (
            <li key={category} style={{ marginBottom: 8 }}>
              <Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>: <Link href={`/wiki/${top.slug}`}>{top.title}</Link>
            </li>
          ))}
        </ul>
      </DashboardCard>
    </div>
  );
}
