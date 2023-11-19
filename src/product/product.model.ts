import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ProductCharacteristic {
  @Prop()
  name: string;
  @Prop()
  value: string;
}

@Schema({ timestamps: true, collection: 'products' }) // Enable automatic timestamps
export class ProductModel extends Document {
  @Prop()
  image: string;
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  oldPrice?: number;
  @Prop()
  credit: number;
  @Prop()
  description: string;
  @Prop()
  advantages: string; //? optional
  @Prop()
  disAdvantages: string;
  @Prop({ type: [String] })
  categories: string[];
  @Prop({ type: [String] })
  tags: string[];
  @Prop({ type: () => [ProductCharacteristic], default: [] })
  characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
