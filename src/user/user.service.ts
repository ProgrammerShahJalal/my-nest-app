import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  private nextId = 3;

  // CREATE - Add a new user
  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.users.push(newUser);
    return newUser;
  }

  // READ - Get all users
  findAll(): User[] {
    return this.users;
  }

  // READ - Get user by ID
  findOne(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // UPDATE - Update user by ID
  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  // DELETE - Remove user by ID
  remove(id: number): { message: string } {
    const userIndex = this.users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return { message: `User with ID ${id} has been deleted successfully` };
  }

  // Additional helper method - Get users by role
  findByRole(role: string): User[] {
    return this.users.filter(user => user.role === role);
  }
}
