import { IsString, IsArray, IsBoolean, IsOptional, IsNumber, Min, IsIn } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsString()
  readonly author?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Technology', 'Health', 'Lifestyle', 'Business', 'Education', 'Entertainment', 'Travel', 'Food', 'Other'])
  readonly category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];

  @IsOptional()
  @IsBoolean()
  readonly isPublished?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly readTime?: number;
}
