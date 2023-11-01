import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' }) // Enable automatic timestamps
export class AuthModel extends Document {
  @Prop({ unique: true })
  email: string;
  @Prop()
  passwordHash: string;
  @Prop([String])
  roles: string[];
}

export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);
AuthModelSchema.set('collection', 'users');
