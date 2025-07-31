import { IsString, IsNumber, IsBoolean, IsOptional, IsNotEmpty, Min, Max, IsIn } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @Min(0)
  @Max(30)
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Ragdoll', 'Bengal', 'Russian Blue', 'Mixed'])
  readonly breed: string;

  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @IsNumber()
  @Min(0.5)
  @Max(20)
  readonly weight: number;

  @IsBoolean()
  readonly isVaccinated: boolean;

  @IsOptional()
  @IsString()
  readonly owner?: string;
}
