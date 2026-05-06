import type { ReactNode } from "react";

export function GeneratedBlockShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside>
      <h3>{title}</h3>
      <div>{children ?? "Placeholder generated block"}</div>
    </aside>
  );
}
