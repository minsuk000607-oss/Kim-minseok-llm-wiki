export interface FrontmatterData {
  [key: string]: string | string[] | number | boolean | undefined;
}

export function parseFrontmatter(markdown: string): { frontmatter: FrontmatterData; content: string } {
  if (!markdown.startsWith("---\n")) return { frontmatter: {}, content: markdown };
  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) return { frontmatter: {}, content: markdown };

  const raw = markdown.slice(4, end);
  const content = markdown.slice(end + 5);
  const frontmatter: FrontmatterData = {};

  for (const line of raw.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    frontmatter[key.trim()] = rest.join(":").trim();
  }

  return { frontmatter, content };
}
