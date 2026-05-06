import DocCard from '@/components/DocCard';
import { getAllDocuments, getDocumentsByCategory, getSortedDocuments } from '@/lib/documents';

export default function HomePage() {
  const docs = getAllDocuments();
  const sorted = getSortedDocuments(docs);
  const pinned = sorted.filter((d) => d.pinned).slice(0, 6);
  const clinicalTop = [...docs].sort((a, b) => (b.clinical_priority ?? 0) - (a.clinical_priority ?? 0)).slice(0, 6);
  const researchTop = [...docs].sort((a, b) => (b.research_priority ?? 0) - (a.research_priority ?? 0)).slice(0, 6);
  const foundationalTop = [...docs].sort((a, b) => (b.foundational_priority ?? 0) - (a.foundational_priority ?? 0)).slice(0, 6);
  const categories = Array.from(new Set(docs.map((d) => d.category))).slice(0, 5);

  return (
    <section>
      <header className="hero">
        <h1>Second Brain / Knowledge Network</h1>
        <p>Obsidian markdown wiki를 연결형 지식 네트워크로 탐색합니다.</p>
      </header>

      <h2>Pinned Docs</h2>
      <div className="grid">{pinned.map((d) => <DocCard key={d.id} doc={d} />)}</div>

      <h2>Clinical Top Topics</h2>
      <div className="grid">{clinicalTop.map((d) => <DocCard key={d.id} doc={d} />)}</div>

      <h2>Research Top Topics</h2>
      <div className="grid">{researchTop.map((d) => <DocCard key={d.id} doc={d} />)}</div>

      <h2>Foundational Core Docs</h2>
      <div className="grid">{foundationalTop.map((d) => <DocCard key={d.id} doc={d} />)}</div>

      <h2>Category Top Docs</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="grid">
            {getSortedDocuments(getDocumentsByCategory(category)).slice(0, 3).map((d) => (
              <DocCard key={d.id} doc={d} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
