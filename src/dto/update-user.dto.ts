import { IsString, IsEmail, IsNumber, IsIn, IsOptional, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(120)
  readonly age?: number;

  @IsOptional()
  @IsString()
  @IsIn(['admin', 'user', 'moderator'])
  readonly role?: string;
}
