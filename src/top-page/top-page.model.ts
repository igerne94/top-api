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

  // creates index for only one field (curently "title"), does not matter where else the decorator "text" will be applied more. It will be used only for search within "title".
  @Prop({ required: true, text: true })
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
TopPageSchema.set('collection', 'top_pages');
