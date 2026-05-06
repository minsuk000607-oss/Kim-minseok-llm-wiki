import Link from 'next/link';
import { DashboardCard } from '@/components/DashboardCard';
import { HeroNetworkGraphic } from '@/components/HeroNetworkGraphic';
import { getAllDocuments, getSortedDocuments } from '@/lib/wiki';

export default function HomePage() {
  const docs = getAllDocuments();
  const sorted = getSortedDocuments(docs);
  const pinned = sorted.filter((d) => d.pinned).slice(0, 6);
  const clinical = sorted.filter((d) => (d.clinical_priority ?? 0) > 0).slice(0, 6);
  const research = sorted.filter((d) => (d.research_priority ?? 0) > 0).slice(0, 6);
  const foundational = sorted.filter((d) => (d.foundational_priority ?? 0) > 0).slice(0, 6);
  const categoryTop = new Map<string, typeof docs>();
  for (const doc of sorted) {
    if (!doc.category) continue;
    if (!categoryTop.has(doc.category)) categoryTop.set(doc.category, [doc]);
  }

  return (
    <section>
      <HeroNetworkGraphic />
      <DashboardCard title="Pinned Docs" docs={pinned} />
      <DashboardCard title="Clinical Top Topics" docs={clinical} />
      <DashboardCard title="Research Top Topics" docs={research} />
      <DashboardCard title="Foundational Core Docs" docs={foundational} />
      <h3>Category Top Docs</h3>
      {[...categoryTop.entries()].map(([category, list]) => (
        <p key={category}><Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>: <Link href={`/wiki/${list[0].slug}`}>{list[0].title}</Link></p>
      ))}
    </section>
  );
}
