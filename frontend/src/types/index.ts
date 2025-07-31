// User types
export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  role: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  role?: string;
}

// Cat types
export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  isVaccinated: boolean;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCatDto {
  name: string;
  age: number;
  breed: string;
  color: string;
  weight: number;
  isVaccinated: boolean;
  owner?: string;
}

export interface UpdateCatDto {
  name?: string;
  age?: number;
  breed?: string;
  color?: string;
  weight?: number;
  isVaccinated?: boolean;
  owner?: string;
}

export interface CatStatistics {
  totalCats: number;
  vaccinatedCats: number;
  unvaccinatedCats: number;
  breeds: string[];
  averageAge: number;
  averageWeight: number;
}

// Blog types
export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  isPublished?: boolean;
  readTime?: number;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
  readTime?: number;
}

export interface BlogStatistics {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  categories: string[];
  totalAuthors: number;
  totalUniqueTags: number;
  averageReadTime: number;
}
