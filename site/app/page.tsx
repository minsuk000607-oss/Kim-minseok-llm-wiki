import Link from 'next/link';
import { getAllWikiPages } from '@/lib/wiki';
import { HeroNetworkGraphic } from '@/components/HeroNetworkGraphic';
import { DashboardCard } from '@/components/DashboardCard';

export default function HomePage() {
  const pages = getAllWikiPages();
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <DashboardCard title="김민석 LLM Wiki">
        <p>구조화된 임상/학술 추론을 위한 second-brain knowledge network.</p>
        <HeroNetworkGraphic />
      </DashboardCard>
      <DashboardCard title="문서 현황">
        <p>Total pages: {pages.length}</p>
        <ul>
          {pages.slice(0, 20).map((page) => (
            <li key={page.id}>
              <Link href={`/wiki/${page.slug}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </DashboardCard>
    </div>
  );
}
