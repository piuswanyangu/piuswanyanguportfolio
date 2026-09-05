export type Article = {
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  tags: readonly string[];
  slug: string;
};

export const articles: readonly Article[] = [];
