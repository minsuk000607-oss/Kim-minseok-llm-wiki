import Link from 'next/link';
import { ReactNode } from 'react';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div style={{ marginBottom: 12 }}><h2 className="section-title">{title}</h2>{subtitle ? <p style={{ margin: 0, color: 'var(--muted)' }}>{subtitle}</p> : null}</div>;
}
export function TagChip({ tag }: { tag: string }) { return <span style={{fontSize:12,padding:'4px 10px',border:'1px solid #31405f',borderRadius:999,background:'#101a2c',color:'#bdd3ff'}}>#{tag}</span>; }
export function MetadataBadge({ label, value }: { label: string; value: string }) { return <span style={{display:'inline-flex',gap:6,padding:'6px 10px',border:'1px solid #2c3b57',borderRadius:10,fontSize:12,color:'#c8d9ff',background:'#0f1829'}}><strong style={{color:'#90a4cc'}}>{label}</strong>{value}</span>; }
export function SourceBadge(){ return <span style={{fontSize:11,color:'#ffcf92',border:'1px solid #634221',padding:'4px 8px',borderRadius:999,background:'#2a1b0e'}}>AI Generated — Not Verified</span>; }
export function EmptyState({title,description}:{title:string;description:string}){return <div className="surface" style={{padding:24,textAlign:'center'}}><h3>{title}</h3><p style={{color:'var(--muted)'}}>{description}</p></div>;}
export function DocCard({href,title,meta,snippet}:{href:string;title:string;meta:string;snippet?:string}){return <Link href={href} className="surface" style={{display:'block',padding:16,borderRadius:14}}><h3 style={{margin:'0 0 8px'}}>{title}</h3><p style={{margin:'0 0 8px',color:'#9eb0d1',fontSize:13}}>{meta}</p>{snippet?<p style={{margin:0,color:'var(--muted)',fontSize:14}}>{snippet}</p>:null}</Link>;}
export function FeaturedDocCard(props:{href:string;title:string;meta:string;snippet?:string}){return <DocCard {...props} />;}
export function CategoryCard({category,count}:{category:string;count:number}){return <Link href={`/category/${encodeURIComponent(category)}`} className="surface" style={{display:'block',padding:16}}><h3 style={{margin:0}}>{category}</h3><p style={{margin:'6px 0 0',color:'var(--muted)'}}>{count} docs</p></Link>;}
export function SearchBar({value,onChange}:{value:string;onChange:(v:string)=>void}){return <input value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Search title, tags, aliases, content" style={{width:'100%',padding:'12px 14px',background:'#0d1525',border:'1px solid #30405d',borderRadius:12,color:'var(--text)'}}/>;}
export function SearchResultCard(props:{href:string;title:string;snippet:string;meta:string}){return <DocCard href={props.href} title={props.title} snippet={props.snippet} meta={props.meta} />;}
export function AIInsightPanel({title,children}:{title:string;children:ReactNode}){return <section className="surface" style={{padding:16}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h3 style={{margin:0}}>{title}</h3><SourceBadge/></div><div style={{marginTop:10}}>{children}</div></section>;}
export function RelatedDocsPanel({children}:{children:ReactNode}){return <section className="surface" style={{padding:16}}><h3 style={{marginTop:0}}>Related Docs / Backlinks</h3>{children}</section>;}
