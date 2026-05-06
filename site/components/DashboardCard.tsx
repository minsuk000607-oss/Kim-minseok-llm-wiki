import Link from 'next/link';
import { WikiDocument } from '@/lib/wiki';

export function DashboardCard({ title, docs }: { title: string; docs: WikiDocument[] }) {
  return (
    <section className="card">
      <h3>{title}</h3>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}><Link href={`/wiki/${doc.slug}`}>{doc.title}</Link></li>
        ))}
      </ul>
    </section>
  );
}
