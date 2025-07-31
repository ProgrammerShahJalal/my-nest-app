// DTO for creating a new user
// To add validation, install: npm install class-validator class-transformer
// Then uncomment the decorators below

// import { IsString, IsEmail, IsNumber, IsIn, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateUserDto {
  // @IsString()
  // @IsNotEmpty()
  readonly name: string;

  // @IsEmail()
  // @IsNotEmpty()
  readonly email: string;

  // @IsNumber()
  // @Min(1)
  // @Max(120)
  readonly age: number;

  // @IsString()
  // @IsIn(['admin', 'user', 'moderator'])
  readonly role: string;
}
