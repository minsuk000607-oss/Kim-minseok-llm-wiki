import { GeneratedBlockShell } from './GeneratedBlockShell';

interface BacklinkBlockProps {
  backlinks: Array<{ title: string; slug: string }>;
}

export function BacklinkBlock({ backlinks }: BacklinkBlockProps) {
  if (!backlinks.length) return null;

  return (
    <GeneratedBlockShell title="Backlinks">
      <ul className="list-disc space-y-1 pl-5">
        {backlinks.map((backlink) => (
          <li key={backlink.slug}>
            <a className="text-cyan-300 hover:text-cyan-200" href={`/wiki/${backlink.slug}`}>
              {backlink.title}
            </a>
          </li>
        ))}
      </ul>
    </GeneratedBlockShell>
  );
}
