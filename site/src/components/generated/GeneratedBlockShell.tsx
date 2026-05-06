import { ReactNode } from 'react';

interface GeneratedBlockShellProps {
  title: string;
  children: ReactNode;
  meta?: ReactNode;
}

export function GeneratedBlockShell({ title, children, meta }: GeneratedBlockShellProps) {
  return (
    <section className="mt-8 rounded-xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(56,189,248,0.1)]">
      <header className="mb-4 border-b border-slate-800 pb-3">
        <p className="text-xs uppercase tracking-wide text-cyan-300">AI-derived / generated</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">{title}</h3>
        {meta ? <div className="mt-2 text-xs text-slate-400">{meta}</div> : null}
      </header>
      <div className="space-y-4 text-sm text-slate-200">{children}</div>
    </section>
  );
}
