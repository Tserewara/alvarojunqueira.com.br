export interface PostData {
  id: string;
  title: string;
  date: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  [key: string]: any;
}
