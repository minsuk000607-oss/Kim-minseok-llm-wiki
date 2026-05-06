const WIKILINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function convertWikilinksToHtml(markdown: string): string {
  return markdown.replace(WIKILINK_REGEX, (_, slug: string, label?: string) => {
    const href = `/wiki/${encodeURIComponent(slug.trim())}`;
    const text = (label ?? slug).trim();
    return `<a href="${href}">${text}</a>`;
  });
}
