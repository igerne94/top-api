import { Body, Param, Controller, Delete, Post, Get } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class RewievController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    console.log(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    console.log(productId);
  }
}
