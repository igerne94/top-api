import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' }) // Enable automatic timestamps
export class UserModel extends Document {
  @Prop({ unique: true })
  email: string;
  @Prop()
  passwordHash: string;
  // @Prop([String])
  // roles: string[];
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
UserModelSchema.set('collection', 'users');
