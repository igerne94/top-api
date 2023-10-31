import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class HhData {
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
  @Prop()
  title: string;
  @Prop()
  description: string;
}

@Schema()
export class TopPageModel extends Document {
  _id: string;
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
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
// TopPageSchema.index({ title: 'text', seoText: 'text' });
TopPageSchema.set('collection', 'TopPage');
