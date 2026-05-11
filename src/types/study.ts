export interface StudyFrontmatter {
  title: string;
  slug: string;
  description: string;
  scripture: string;
  groupSlug: string;
  date: string;
  tags: string[];
  author: string;
}

export interface Study extends StudyFrontmatter {
  content: string;
}
