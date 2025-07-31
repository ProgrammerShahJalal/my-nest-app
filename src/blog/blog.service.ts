import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from '../interfaces/blog.interface';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';

@Injectable()
export class BlogService {
  private blogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with NestJS',
      content: 'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications. It uses TypeScript by default and combines elements of OOP, FP, and FRP.',
      author: 'John Developer',
      category: 'Technology',
      tags: ['nestjs', 'nodejs', 'typescript'],
      isPublished: true,
      publishedAt: new Date('2024-01-15'),
      readTime: 5,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: 2,
      title: 'Healthy Lifestyle Tips',
      content: 'Maintaining a healthy lifestyle is crucial for overall well-being. This includes regular exercise, balanced nutrition, adequate sleep, and stress management.',
      author: 'Jane Health',
      category: 'Health',
      tags: ['health', 'lifestyle', 'wellness'],
      isPublished: true,
      publishedAt: new Date('2024-01-20'),
      readTime: 3,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: 3,
      title: 'The Future of AI',
      content: 'Artificial Intelligence continues to evolve rapidly, transforming industries and changing how we work and live. This draft explores upcoming trends and implications.',
      author: 'Tech Writer',
      category: 'Technology',
      tags: ['ai', 'technology', 'future'],
      isPublished: false,
      readTime: 7,
      createdAt: new Date('2024-01-25'),
      updatedAt: new Date('2024-01-25'),
    },
  ];
  
  private nextId = 4;

  // Helper function to calculate reading time
  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  // CREATE - Add a new blog
  create(createBlogDto: CreateBlogDto): Blog {
    const readTime = createBlogDto.readTime || this.calculateReadTime(createBlogDto.content);
    const isPublished = createBlogDto.isPublished !== undefined ? createBlogDto.isPublished : false;
    
    const newBlog: Blog = {
      id: this.nextId++,
      ...createBlogDto,
      tags: createBlogDto.tags || [],
      isPublished,
      publishedAt: isPublished ? new Date() : undefined,
      readTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.blogs.push(newBlog);
    return newBlog;
  }

  // READ - Get all blogs
  findAll(): Blog[] {
    return this.blogs;
  }

  // READ - Get published blogs only
  findPublished(): Blog[] {
    return this.blogs.filter(blog => blog.isPublished);
  }

  // READ - Get blog by ID
  findOne(id: number): Blog {
    const blog = this.blogs.find(blog => blog.id === id);
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // UPDATE - Update blog by ID
  update(id: number, updateBlogDto: UpdateBlogDto): Blog {
    const blogIndex = this.blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const currentBlog = this.blogs[blogIndex];
    const wasPublished = currentBlog.isPublished;
    const willBePublished = updateBlogDto.isPublished !== undefined ? updateBlogDto.isPublished : wasPublished;
    
    // Recalculate read time if content is updated
    const readTime = updateBlogDto.content 
      ? (updateBlogDto.readTime || this.calculateReadTime(updateBlogDto.content))
      : (updateBlogDto.readTime || currentBlog.readTime);

    const updatedBlog = {
      ...currentBlog,
      ...updateBlogDto,
      readTime,
      publishedAt: !wasPublished && willBePublished ? new Date() : currentBlog.publishedAt,
      updatedAt: new Date(),
    };

    this.blogs[blogIndex] = updatedBlog;
    return updatedBlog;
  }

  // DELETE - Remove blog by ID
  remove(id: number): { message: string } {
    const blogIndex = this.blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    const deletedBlog = this.blogs[blogIndex];
    this.blogs.splice(blogIndex, 1);
    return { message: `Blog "${deletedBlog.title}" with ID ${id} has been deleted successfully` };
  }

  // Additional helper methods
  findByCategory(category: string): Blog[] {
    return this.blogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
  }

  findByAuthor(author: string): Blog[] {
    return this.blogs.filter(blog => blog.author.toLowerCase().includes(author.toLowerCase()));
  }

  findByTag(tag: string): Blog[] {
    return this.blogs.filter(blog => 
      blog.tags.some(blogTag => blogTag.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  searchBlogs(query: string): Blog[] {
    const searchTerm = query.toLowerCase();
    return this.blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Get statistics
  getStatistics(): any {
    const totalBlogs = this.blogs.length;
    const publishedBlogs = this.findPublished().length;
    const categories = [...new Set(this.blogs.map(blog => blog.category))];
    const authors = [...new Set(this.blogs.map(blog => blog.author))];
    const allTags = this.blogs.flatMap(blog => blog.tags);
    const uniqueTags = [...new Set(allTags)];
    const averageReadTime = this.blogs.reduce((sum, blog) => sum + blog.readTime, 0) / totalBlogs;

    return {
      totalBlogs,
      publishedBlogs,
      draftBlogs: totalBlogs - publishedBlogs,
      categories,
      totalAuthors: authors.length,
      totalUniqueTags: uniqueTags.length,
      averageReadTime: Math.round(averageReadTime * 10) / 10,
    };
  }
}
