import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsArray, IsIn } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly price?: number;

  @IsOptional()
  @IsString()
  @IsIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Health', 'Toys', 'Automotive'])
  readonly category?: string;

  @IsOptional()
  @IsString()
  readonly brand?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly stock?: number;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}