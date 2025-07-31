import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { Blog } from '../interfaces/blog.interface';

@Controller('blogs') // This creates routes starting with /blogs
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // POST /blogs - Create a new blog
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBlogDto: CreateBlogDto): Blog {
    return this.blogService.create(createBlogDto);
  }

  // GET /blogs - Get all blogs with optional filters
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('author') author?: string,
    @Query('tag') tag?: string,
    @Query('published') published?: string,
    @Query('search') search?: string,
  ): Blog[] {
    if (search) {
      return this.blogService.searchBlogs(search);
    }
    if (category) {
      return this.blogService.findByCategory(category);
    }
    if (author) {
      return this.blogService.findByAuthor(author);
    }
    if (tag) {
      return this.blogService.findByTag(tag);
    }
    if (published === 'true') {
      return this.blogService.findPublished();
    }
    return this.blogService.findAll();
  }

  // GET /blogs/published - Get only published blogs
  @Get('published')
  findPublished(): Blog[] {
    return this.blogService.findPublished();
  }

  // GET /blogs/statistics - Get blog statistics
  @Get('statistics')
  getStatistics(): any {
    return this.blogService.getStatistics();
  }

  // GET /blogs/:id - Get a specific blog by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Blog {
    return this.blogService.findOne(id);
  }

  // PUT /blogs/:id - Update a blog
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Blog {
    return this.blogService.update(id, updateBlogDto);
  }

  // DELETE /blogs/:id - Delete a blog
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.blogService.remove(id);
  }

  // GET /blogs/category/:category - Get blogs by category
  @Get('category/:category')
  findByCategory(@Param('category') category: string): Blog[] {
    return this.blogService.findByCategory(category);
  }

  // GET /blogs/author/:author - Get blogs by author
  @Get('author/:author')
  findByAuthor(@Param('author') author: string): Blog[] {
    return this.blogService.findByAuthor(author);
  }

  // GET /blogs/tag/:tag - Get blogs by tag
  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string): Blog[] {
    return this.blogService.findByTag(tag);
  }
}
