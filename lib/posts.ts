import path from "path";
import matter from "gray-matter";
import fs from "fs";
import type { PostData, PostFrontmatter } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export function getCurrentMode(hostname?: string): 'draft' | 'final' {
  if (!hostname) return 'final';
  return hostname.startsWith('draft.') ? 'draft' : 'final';
}

export function getSortedPostData(mode: 'draft' | 'final' = 'final'): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as PostFrontmatter),
      } as PostData;
    })
    .filter(post => {
      // draft mode: mostra todos
      // final mode: só mostra posts com status='final'
      return mode === 'draft' || post.status === 'final';
    });

  // Sort posts by date
  return allPostData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(mode: 'draft' | 'final' = 'final'): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const frontmatter = matterResult.data as PostFrontmatter;

      return (mode === 'draft' || frontmatter.status === 'final') ? id : null;
    })
    .filter((id): id is string => id !== null);
}

export function getPostData(id: string, mode: 'draft' | 'final' = 'final'): PostData | null {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const frontmatter = matterResult.data as PostFrontmatter;

  // Não permitir acessar drafts no site final
  if (mode === 'final' && frontmatter.status !== 'final') {
    return null;
  }

  return {
    id,
    content: matterResult.content,
    ...frontmatter,
  } as PostData;
}
