import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'reviews' }) // Enable automatic timestamps
export class ReviewModel extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: Number, min: 0, max: 5 })
  rating: number;

  @Prop({ type: Types.ObjectId }) //?
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
ReviewSchema.set('collection', 'reviews');
