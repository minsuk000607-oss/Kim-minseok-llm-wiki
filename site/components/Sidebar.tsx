import Link from 'next/link';
import { getCategories } from '../lib/wiki';

export function Sidebar() {
  const categories = getCategories().filter((c) => !['system', 'logs', 'prompts'].includes(c.toLowerCase()));
  return (
    <aside style={{position:'fixed',left:0,top:0,bottom:0,width:280,padding:'20px 16px',background:'rgba(8,12,21,.88)',backdropFilter:'blur(8px)',borderRight:'1px solid #243149',overflowY:'auto'}} className="sidebar-shell">
      <h3 style={{marginTop:0}}>LLM Wiki OS</h3>
      <nav style={{display:'grid',gap:8,marginBottom:14}}><Link href="/">Home</Link><Link href="/search">Search</Link></nav>
      <p style={{color:'var(--muted)',fontSize:12,letterSpacing:'.08em',textTransform:'uppercase'}}>Categories</p>
      <div style={{display:'grid',gap:6}}>{categories.map((c)=><Link key={c} href={`/category/${encodeURIComponent(c)}`}>{c}</Link>)}</div>
    </aside>
  );
}
