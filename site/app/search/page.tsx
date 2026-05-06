'use client';
import { useMemo, useState } from 'react';
import data from '../../wiki-index.json';
import { EmptyState, SearchBar, SearchResultCard, SectionHeader } from '../../components/ui';

const normalize = (v: string) => v.toLowerCase();

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return data.filter((item) => [item.title, item.content, ...(item.aliases ?? []), ...(item.tags ?? [])].some((x) => normalize(String(x ?? '')).includes(q)));
  }, [query]);

  return <div className="grid">
    <SectionHeader title="Search" subtitle="문서 제목, 본문, 태그, alias를 탐색합니다." />
    <section className="surface" style={{padding:16}}><SearchBar value={query} onChange={setQuery} /></section>
    {!query && <EmptyState title="검색어를 입력하세요" description="연구 노트의 연결점을 빠르게 찾을 수 있습니다." />}
    {query && results.length===0 && <EmptyState title="결과 없음" description="다른 키워드 또는 태그를 시도해보세요." />}
    <div className="grid">{results.map((item)=><SearchResultCard key={item.slug} href={`/wiki/${item.slug}`} title={item.title} meta={`${item.category} · ${item.slug}`} snippet={(item.content||'').slice(0,130)} />)}</div>
  </div>;
}
