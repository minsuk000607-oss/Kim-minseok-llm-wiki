import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">김민석 LLM Wiki</Link>
      <nav>
        <Link href="/search">검색</Link>
        <Link href="/category/한의학">카테고리</Link>
        <Link href="/wiki/start">Wiki</Link>
      </nav>
    </header>
  );
}
