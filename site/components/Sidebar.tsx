import Link from 'next/link';
import { getCategories } from '../lib/wiki';

export function Sidebar() {
  const categories = getCategories().filter((c) => !['system', 'logs', 'prompts'].includes(c.toLowerCase()));

  return (
    <>
      <header className="mobile-header surface">
        <div className="mobile-header-row">
          <Link href="/" className="mobile-brand">LLM Wiki OS</Link>
          <details className="mobile-nav-details">
            <summary>메뉴</summary>
            <nav className="mobile-nav-panel">
              <Link href="/">Home</Link>
              <Link href="/search">Search</Link>
              <p className="mobile-nav-label">Categories</p>
              {categories.map((c) => (
                <Link key={c} href={`/category/${encodeURIComponent(c)}`}>
                  {c}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>

      <aside className="sidebar-shell surface">
        <h3 style={{ marginTop: 0 }}>LLM Wiki OS</h3>
        <nav style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
        </nav>
        <p style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>Categories</p>
        <div style={{ display: 'grid', gap: 6 }}>
          {categories.map((c) => (
            <Link key={c} href={`/category/${encodeURIComponent(c)}`}>
              {c}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
