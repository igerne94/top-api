import { IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5)
  // customize options, ex message lang:
  @Min(1, { message: 'Rating kan ikke være mindre enn 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
