import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Enable automatic timestamps
export class ReviewModel extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: Number, min: 0, max: 5 })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
ReviewSchema.set('collection', 'Review');
