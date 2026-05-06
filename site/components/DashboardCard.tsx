import { ReactNode } from 'react';

export function DashboardCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ border: '1px solid #334155', borderRadius: 12, padding: 16, background: '#0f172a' }}>
      <h3 style={{ marginTop: 0, color: '#e2e8f0' }}>{title}</h3>
      <div style={{ color: '#cbd5e1' }}>{children}</div>
    </section>
  );
}
