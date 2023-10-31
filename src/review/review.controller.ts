import { Body, Param, Controller, Delete, Post, Get } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
@Controller('review')
export class ReviewController {
  @Post('create')
  // corrected type of incoming data:
  async create(@Body() dto: CreateReviewDto) {
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
