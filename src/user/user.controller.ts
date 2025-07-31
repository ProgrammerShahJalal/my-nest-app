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
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../interfaces/user.interface';

@Controller('users') // This creates routes starting with /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users - Create a new user
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  // GET /users - Get all users
  @Get()
  findAll(@Query('role') role?: string): User[] {
    if (role) {
      return this.userService.findByRole(role);
    }
    return this.userService.findAll();
  }

  // GET /users/:id - Get user by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOne(id);
  }

  // PUT /users/:id - Update user by ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.userService.update(id, updateUserDto);
  }

  // DELETE /users/:id - Delete user by ID
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.userService.remove(id);
  }
}
