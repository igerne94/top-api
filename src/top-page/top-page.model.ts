import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

class HhData {
  @Prop()
  count: number;
  @Prop()
  juniorSalary: number;
  @Prop()
  middleSalary: number;
  @Prop()
  seniorSalary: number;
}

export class TopPageAdvantage {
  _id?: Types.ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
}

@Schema({ collection: 'top_pages' })
export class TopPageModel extends Document {
  @Prop({ required: true, enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @Prop({ required: true })
  secondCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ unique: true })
  alias: string;
  @Prop({ type: () => HhData })
  hh?: HhData;
  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];
  @Prop()
  seoText: string;
  @Prop()
  tagsTitle: string;
  @Prop({ type: () => [String] })
  tags: string[];
  @Prop()
  updatedAt?: Date;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
// Create index that allows to search through all fields, including nested ones:
TopPageSchema.index({ '$**': 'text' });
TopPageSchema.set('collection', 'top_pages');
