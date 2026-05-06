import { ReactNode } from 'react';

export function GeneratedBlockShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: 20, border: '1px solid #2b3750', borderRadius: 12, background: '#111827', padding: 16 }}>
      <h2 style={{ marginTop: 0, color: '#dbeafe' }}>{title}</h2>
      <p style={{ color: '#93c5fd', marginTop: 0 }}>AI 생성 콘텐츠 — 검증 전</p>
      {children}
    </section>
  );
}
