export type PostStatus = 'draft' | 'final';

export interface PostData {
  id: string;
  title: string;
  date: string;
  status: PostStatus;
  draftStartDate?: string;
  lastUpdated?: string;
  content?: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  status: PostStatus;
  draftStartDate?: string;
  lastUpdated?: string;
  [key: string]: any;
}
