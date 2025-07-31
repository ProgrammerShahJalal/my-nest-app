import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { NotFoundException } from '@nestjs/common';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a cat by id', () => {
      const cat = service.findOne(1);
      expect(cat).toBeDefined();
      expect(cat.id).toBe(1);
      expect(cat.name).toBe('Whiskers');
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new cat', () => {
      const createCatDto = {
        name: 'Test Cat',
        age: 2,
        breed: 'Persian',
        color: 'Gray',
        weight: 3.5,
        isVaccinated: true,
        owner: 'Test Owner',
      };

      const result = service.create(createCatDto);
      expect(result).toBeDefined();
      expect(result.name).toBe(createCatDto.name);
      expect(result.id).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a cat', () => {
      const updateCatDto = { name: 'Updated Whiskers', weight: 5.0 };
      const result = service.update(1, updateCatDto);
      
      expect(result.name).toBe('Updated Whiskers');
      expect(result.weight).toBe(5.0);
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.update(999, { name: 'Test' })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a cat', () => {
      const result = service.remove(2);
      expect(result.message).toContain('deleted successfully');
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });

  describe('findByBreed', () => {
    it('should return cats of specific breed', () => {
      const persianCats = service.findByBreed('Persian');
      expect(persianCats.length).toBeGreaterThan(0);
      expect(persianCats[0].breed).toBe('Persian');
    });
  });

  describe('findVaccinated', () => {
    it('should return only vaccinated cats', () => {
      const vaccinatedCats = service.findVaccinated();
      vaccinatedCats.forEach(cat => {
        expect(cat.isVaccinated).toBe(true);
      });
    });
  });

  describe('getStatistics', () => {
    it('should return cat statistics', () => {
      const stats = service.getStatistics();
      expect(stats).toHaveProperty('totalCats');
      expect(stats).toHaveProperty('vaccinatedCats');
      expect(stats).toHaveProperty('averageAge');
      expect(stats).toHaveProperty('averageWeight');
      expect(stats.totalCats).toBeGreaterThan(0);
    });
  });
});
