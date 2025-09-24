import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip and titanium design',
      price: 999.99,
      category: 'Electronics',
      brand: 'Apple',
      stock: 50,
      isActive: true,
      tags: ['smartphone', 'apple', 'ios', 'premium'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      description: 'Comfortable running shoes with Air Max technology',
      price: 129.99,
      category: 'Sports',
      brand: 'Nike',
      stock: 25,
      isActive: true,
      tags: ['shoes', 'running', 'nike', 'airmax'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'The Great Gatsby',
      description: 'Classic American novel by F. Scott Fitzgerald',
      price: 12.99,
      category: 'Books',
      brand: 'Scribner',
      stock: 100,
      isActive: true,
      tags: ['classic', 'literature', 'american', 'novel'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 4;

  // Get all products with optional filtering
  findAll(category?: string, brand?: string, isActive?: boolean): Product[] {
    let result = this.products;

    if (category) {
      result = result.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    if (brand) {
      result = result.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
    }

    if (isActive !== undefined) {
      result = result.filter(product => product.isActive === isActive);
    }

    return result;
  }

  // Get a specific product by ID
  findOne(id: number): Product {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Create a new product
  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
      isActive: createProductDto.isActive ?? true,
      tags: createProductDto.tags ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // Update an existing product
  update(id: number, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const existingProduct = this.products[productIndex];
    const updatedProduct: Product = {
      ...existingProduct,
      ...updateProductDto,
      updatedAt: new Date(),
    };

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  // Delete a product
  remove(id: number): { message: string } {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.products.splice(productIndex, 1);
    return { message: `Product with ID ${id} has been successfully deleted` };
  }

  // Search products by name or description
  search(query: string): Product[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  // Get products by category
  findByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase() && product.isActive
    );
  }

  // Update stock for a product
  updateStock(id: number, quantity: number): Product {
    const product = this.findOne(id);
    if (product.stock + quantity < 0) {
      throw new Error('Insufficient stock');
    }
    
    return this.update(id, { stock: product.stock + quantity });
  }
}