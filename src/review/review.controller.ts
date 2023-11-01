import { ReviewService } from './review.service';
import { Body, Param, Controller, Delete, Post, Get } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  // corrected type of incoming data:
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.getByProduct(productId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.reviewService.delete(id);
    return { message: 'Review successfully deleted' };
  }

  @Delete('byProduct/:productId')
  async deleteMany(@Param('productId') productId: string) {
    await this.reviewService.deleteMany(productId);
    return { message: 'Reviews successfully deleted' };
  }
}
