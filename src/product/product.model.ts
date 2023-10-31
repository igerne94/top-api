import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ProductCharacteristic {
  @Prop()
  name: string;
  @Prop()
  value: string;
}

@Schema({ timestamps: true }) // Enable automatic timestamps
export class ProductModel extends Document {
  _id: string;
  @Prop()
  image: string;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  oldPrice: number;
  @Prop()
  credit: number;
  @Prop()
  calculatedRating: number;
  @Prop()
  description: string;
  @Prop()
  advantages: string;
  @Prop()
  disAdvantages: string;
  @Prop({ type: () => [String] })
  categories: string[];
  @Prop({ type: () => [String] })
  tags: string;
  @Prop({ type: () => [ProductCharacteristic] })
  characteristics: ProductCharacteristic;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
ProductSchema.set('collection', 'Product');
