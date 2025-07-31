export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  readTime: number; // estimated reading time in minutes
  createdAt: Date;
  updatedAt: Date;
}
