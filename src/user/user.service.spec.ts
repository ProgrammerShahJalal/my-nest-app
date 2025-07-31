import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', () => {
      const user = service.findOne(1);
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        role: 'user',
      };

      const result = service.create(createUserDto);
      expect(result).toBeDefined();
      expect(result.name).toBe(createUserDto.name);
      expect(result.id).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const updateUserDto = { name: 'Updated Name' };
      const result = service.update(1, updateUserDto);
      
      expect(result.name).toBe('Updated Name');
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.update(999, { name: 'Test' })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      const result = service.remove(2);
      expect(result.message).toContain('deleted successfully');
    });

    it('should throw NotFoundException for invalid id', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
