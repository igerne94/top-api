import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigService } from '@nestjs/config';
import { TopPageModel, TopPageSchema } from './top-page.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      { name: TopPageModel.name, schema: TopPageSchema },
    ]),
  ],
  providers: [ConfigService],
})
export class TopPageModule {}
