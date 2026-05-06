import { GeneratedBlockShell } from './GeneratedBlockShell';

export function BacklinkBlock({ backlinks }: { backlinks: Array<{ slug: string; title: string }> }) {
  if (!backlinks.length) return null;

  return (
    <GeneratedBlockShell title="Backlinks" subtitle="Knowledge network inbound links">
      <ul>
        {backlinks.map((backlink) => (
          <li key={backlink.slug}>{backlink.title}</li>
        ))}
      </ul>
    </GeneratedBlockShell>
  );
}
