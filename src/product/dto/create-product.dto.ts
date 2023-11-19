import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

class ProductCharacteristic {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreateProductDto extends Document {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string; //? optional

  @IsString()
  disAdvantages: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristic)
  characteristics: ProductCharacteristic[];
}
