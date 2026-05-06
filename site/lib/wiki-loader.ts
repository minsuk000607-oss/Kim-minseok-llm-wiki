import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseFrontmatter } from "@/lib/frontmatter";

export interface WikiDoc {
  slug: string;
  title: string;
  content: string;
  frontmatter: Record<string, unknown>;
}

export function loadWikiMarkdown(slug: string): WikiDoc | null {
  const filePath = join(process.cwd(), "..", "wiki", `${slug}.md`);
  if (!existsSync(filePath)) return null;

  const raw = readFileSync(filePath, "utf8");
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    slug,
    title: String(frontmatter.title ?? slug),
    content,
    frontmatter,
  };
}
