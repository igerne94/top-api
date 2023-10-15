import { Module } from '@nestjs/common';
import { RewievController } from './rewiev.controller';

@Module({
  controllers: [RewievController],
})
export class RewievModule {}
