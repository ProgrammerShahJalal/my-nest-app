import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should filter by category', () => {
      const result = service.findAll('Electronics');
      expect(result).toBeInstanceOf(Array);
      result.forEach(product => {
        expect(product.category).toBe('Electronics');
      });
    });

    it('should filter by brand', () => {
      const result = service.findAll(undefined, 'Apple');
      expect(result).toBeInstanceOf(Array);
      result.forEach(product => {
        expect(product.brand).toBe('Apple');
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const product = service.findOne(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'A test product',
        price: 29.99,
        category: 'Electronics',
        brand: 'TestBrand',
        stock: 10,
        isActive: true,
        tags: ['test', 'sample'],
      };

      const result = service.create(createProductDto);
      expect(result).toBeDefined();
      expect(result.name).toBe(createProductDto.name);
      expect(result.price).toBe(createProductDto.price);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should create a product with default values', () => {
      const createProductDto = {
        name: 'Simple Product',
        description: 'A simple product',
        price: 19.99,
        category: 'Books',
        brand: 'TestBrand',
        stock: 5,
      };

      const result = service.create(createProductDto);
      expect(result.isActive).toBe(true);
      expect(result.tags).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update an existing product', () => {
      const updateProductDto = {
        name: 'Updated Product Name',
        price: 199.99,
      };

      const result = service.update(1, updateProductDto);
      expect(result.name).toBe(updateProductDto.name);
      expect(result.price).toBe(updateProductDto.price);
      expect(result.updatedAt).toBeDefined();
    });

    it('should throw NotFoundException for invalid id', () => {
      const updateProductDto = { name: 'Updated Name' };
      expect(() => service.update(999, updateProductDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const result = service.remove(1);
      expect(result.message).toContain('successfully deleted');
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });

  describe('search', () => {
    it('should find products by name', () => {
      const result = service.search('iPhone');
      expect(result.length).toBeGreaterThan(0);
      result.forEach(product => {
        expect(product.name.toLowerCase()).toContain('iphone');
      });
    });

    it('should find products by description', () => {
      const result = service.search('running');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should find products by tags', () => {
      const result = service.search('smartphone');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findByCategory', () => {
    it('should return active products in specified category', () => {
      const result = service.findByCategory('Electronics');
      expect(result).toBeInstanceOf(Array);
      result.forEach(product => {
        expect(product.category).toBe('Electronics');
        expect(product.isActive).toBe(true);
      });
    });
  });

  describe('updateStock', () => {
    it('should update product stock', () => {
      const product = service.findOne(1);
      const initialStock = product.stock;
      const quantityToAdd = 10;

      const result = service.updateStock(1, quantityToAdd);
      expect(result.stock).toBe(initialStock + quantityToAdd);
    });

    it('should throw error for insufficient stock', () => {
      const product = service.findOne(1);
      const excessiveQuantity = -(product.stock + 1);

      expect(() => service.updateStock(1, excessiveQuantity)).toThrow('Insufficient stock');
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.updateStock(999, 10)).toThrow(NotFoundException);
    });
  });
});