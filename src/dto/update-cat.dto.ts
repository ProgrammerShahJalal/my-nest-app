import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max, IsIn } from 'class-validator';

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(30)
  readonly age?: number;

  @IsOptional()
  @IsString()
  @IsIn(['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Bengal', 'Russian Blue', 'Mixed'])
  readonly breed?: string;

  @IsOptional()
  @IsString()
  readonly color?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.5)
  @Max(20)
  readonly weight?: number;

  @IsOptional()
  @IsBoolean()
  readonly isVaccinated?: boolean;

  @IsOptional()
  @IsString()
  readonly owner?: string;
}
