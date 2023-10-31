import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel, AuthModelSchema } from './auth.model';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthModelSchema,
      },
    ]),
  ],
  providers: [ConfigService],
})
export class AuthModule {}
