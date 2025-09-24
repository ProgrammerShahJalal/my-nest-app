import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty, Min, IsArray, IsIn } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @Min(0)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Health', 'Toys', 'Automotive'])
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly brand: string;

  @IsNumber()
  @Min(0)
  readonly stock: number;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean = true;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];
}