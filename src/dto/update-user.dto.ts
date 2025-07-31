// DTO for updating an existing user
// To add validation, install: npm install class-validator class-transformer
// Then uncomment the decorators below

// import { IsString, IsEmail, IsNumber, IsIn, IsOptional, Min, Max } from 'class-validator';

export class UpdateUserDto {
  // @IsOptional()
  // @IsString()
  readonly name?: string;

  // @IsOptional()
  // @IsEmail()
  readonly email?: string;

  // @IsOptional()
  // @IsNumber()
  // @Min(1)
  // @Max(120)
  readonly age?: number;

  // @IsOptional()
  // @IsString()
  // @IsIn(['admin', 'user', 'moderator'])
  readonly role?: string;
}
