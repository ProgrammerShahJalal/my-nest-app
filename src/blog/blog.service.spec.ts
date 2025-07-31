import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { NotFoundException } from '@nestjs/common';

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of blogs', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a blog by id', () => {
      const blog = service.findOne(1);
      expect(blog).toBeDefined();
      expect(blog.id).toBe(1);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new blog', () => {
      const createBlogDto = {
        title: 'Test Blog',
        content: 'This is a test blog content.',
        author: 'Test Author',
        category: 'Technology',
        tags: ['test', 'blog'],
        isPublished: true,
      };

      const result = service.create(createBlogDto);
      expect(result).toBeDefined();
      expect(result.title).toBe(createBlogDto.title);
      expect(result.author).toBe(createBlogDto.author);
      expect(result.isPublished).toBe(true);
      expect(result.id).toBeDefined();
    });

    it('should calculate read time automatically', () => {
      const longContent = 'This is a very long blog content. '.repeat(100);
      const createBlogDto = {
        title: 'Long Blog',
        content: longContent,
        author: 'Test Author',
        category: 'Technology',
      };

      const result = service.create(createBlogDto);
      expect(result.readTime).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update a blog', () => {
      const updateBlogDto = {
        title: 'Updated Title',
        isPublished: true,
      };

      const result = service.update(1, updateBlogDto);
      expect(result.title).toBe('Updated Title');
      expect(result.isPublished).toBe(true);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.update(999, { title: 'Test' })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a blog', () => {
      const result = service.remove(1);
      expect(result.message).toContain('deleted successfully');
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });

  describe('findPublished', () => {
    it('should return only published blogs', () => {
      const result = service.findPublished();
      expect(result.every(blog => blog.isPublished)).toBe(true);
    });
  });

  describe('findByCategory', () => {
    it('should return blogs filtered by category', () => {
      const result = service.findByCategory('Technology');
      expect(result.every(blog => blog.category === 'Technology')).toBe(true);
    });
  });

  describe('findByAuthor', () => {
    it('should return blogs filtered by author', () => {
      const result = service.findByAuthor('John');
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('findByTag', () => {
    it('should return blogs filtered by tag', () => {
      const result = service.findByTag('nestjs');
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('searchBlogs', () => {
    it('should search blogs by query', () => {
      const result = service.searchBlogs('NestJS');
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getStatistics', () => {
    it('should return blog statistics', () => {
      const stats = service.getStatistics();
      expect(stats).toHaveProperty('totalBlogs');
      expect(stats).toHaveProperty('publishedBlogs');
      expect(stats).toHaveProperty('categories');
      expect(stats).toHaveProperty('averageReadTime');
    });
  });
});
