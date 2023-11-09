import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/configs/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [
    // TODO: is MongooseModule imported needed?
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserModelSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  providers: [ConfigService, AuthService],
})
export class AuthModule {}
