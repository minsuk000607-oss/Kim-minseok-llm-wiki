import type { PropsWithChildren, ReactNode } from 'react';

type GeneratedBlockShellProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  badge?: ReactNode;
}>;

export function GeneratedBlockShell({ title, subtitle, badge, children }: GeneratedBlockShellProps) {
  return (
    <section className="generated-block-shell" data-generated="ai-derived">
      <header className="generated-block-shell__header">
        <div>
          <p className="generated-block-shell__eyebrow">AI-Derived Knowledge Node</p>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <span className="generated-block-shell__badge">{badge ?? 'Generated'}</span>
      </header>
      <div className="generated-block-shell__body">{children}</div>
    </section>
  );
}
