import { IsString, IsArray, IsBoolean, IsOptional, IsNotEmpty, IsNumber, Min, IsIn } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Technology', 'Health', 'Lifestyle', 'Business', 'Education', 'Entertainment', 'Travel', 'Food', 'Other'])
  readonly category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @IsBoolean()
  @IsOptional()
  readonly isPublished?: boolean;

  @IsNumber()
  @Min(1)
  @IsOptional()
  readonly readTime?: number;
}
