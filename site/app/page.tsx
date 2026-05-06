import Link from 'next/link';
import { DashboardCard } from '@/components/DashboardCard';
import { HeroNetworkGraphic } from '@/components/HeroNetworkGraphic';
import { getAllDocuments, getSortedDocuments } from '@/lib/wiki';

export default function HomePage() {
  const docs = getAllDocuments();
  const sorted = getSortedDocuments(docs);
  const pinned = docs.filter((d) => d.frontmatter.pinned);
  const byClinical = [...docs].sort((a,b)=>(b.frontmatter.clinical_priority??0)-(a.frontmatter.clinical_priority??0)).slice(0,5);
  const byResearch = [...docs].sort((a,b)=>(b.frontmatter.research_priority??0)-(a.frontmatter.research_priority??0)).slice(0,5);
  const byFoundational = [...docs].sort((a,b)=>(b.frontmatter.foundational_priority??0)-(a.frontmatter.foundational_priority??0)).slice(0,5);
  const categories = Array.from(new Set(docs.map((d)=>d.frontmatter.category).filter(Boolean))) as string[];

  return <>
    <section className="hero"><h1>Second Brain Dashboard</h1><HeroNetworkGraphic /></section>
    <div className="grid">
      <DashboardCard title="Pinned Docs">{pinned.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}</DashboardCard>
      <DashboardCard title="Clinical Top">{byClinical.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}</DashboardCard>
      <DashboardCard title="Research Top">{byResearch.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}</DashboardCard>
      <DashboardCard title="Foundational Core">{byFoundational.map(d=><div key={d.frontmatter.id}><Link href={`/wiki/${d.frontmatter.slug}`}>{d.frontmatter.title}</Link></div>)}</DashboardCard>
      <DashboardCard title="Category Top Docs">{categories.map(c=>{const top=getSortedDocuments(docs.filter(d=>d.frontmatter.category===c))[0]; return <div key={c}><Link href={`/category/${encodeURIComponent(c)}`}>{c}</Link>{top && <>: <Link href={`/wiki/${top.frontmatter.slug}`}>{top.frontmatter.title}</Link></>}</div>;})}</DashboardCard>
      <DashboardCard title="Knowledge Network Score">{sorted.slice(0,5).map(d=><div key={d.frontmatter.id}>{d.frontmatter.title}</div>)}</DashboardCard>
    </div>
  </>;
}
