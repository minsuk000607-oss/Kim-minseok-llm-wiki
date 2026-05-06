import Link from 'next/link';
import type { WikiDocument } from '@/lib/documents';

export default function DocCard({ doc }: { doc: WikiDocument }) {
  return (
    <div className="card">
      <h3><Link href={`/wiki/${doc.slug}`}>{doc.title}</Link></h3>
      <p>{doc.category} · {doc.id}</p>
      <div className="tags">{doc.tags.map((t) => <span key={t}>#{t}</span>)}</div>
    </div>
  );
}
