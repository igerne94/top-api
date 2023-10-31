import { Module } from '@nestjs/common';
import { RewievController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './review.model';

@Module({
  controllers: [RewievController],
  imports: [
    MongooseModule.forFeature([
      { name: ReviewModel.name, schema: ReviewSchema },
    ]),
  ],
})
export class RewievModule {}
