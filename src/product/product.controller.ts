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
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../interfaces/product.interface';

@Controller('products') // This creates routes starting with /products
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // POST /products - Create a new product
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productService.create(createProductDto);
  }

  // GET /products - Get all products with optional filters
  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('active') active?: string,
  ): Product[] {
    let isActive: boolean | undefined;
    if (active === 'true') {
      isActive = true;
    } else if (active === 'false') {
      isActive = false;
    }

    return this.productService.findAll(category, brand, isActive);
  }

  // GET /products/search?q=query - Search products
  @Get('search')
  search(@Query('q') query: string): Product[] {
    if (!query) {
      return [];
    }
    return this.productService.search(query);
  }

  // GET /products/category/:category - Get products by category
  @Get('category/:category')
  findByCategory(@Param('category') category: string): Product[] {
    return this.productService.findByCategory(category);
  }

  // GET /products/:id - Get a specific product
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this.productService.findOne(id);
  }

  // PUT /products/:id - Update a product
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Product {
    return this.productService.update(id, updateProductDto);
  }

  // PUT /products/:id/stock - Update product stock
  @Put(':id/stock')
  updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity') quantity: number,
  ): Product {
    return this.productService.updateStock(id, quantity);
  }

  // DELETE /products/:id - Delete a product
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.productService.remove(id);
  }
}