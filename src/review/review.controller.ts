import { ReviewService } from './review.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  TestHttpExceptionFilter,
  BadRequestExceptionFilter,
} from 'src/exceptions/http-exception.filters';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // The @UsePipes(new ValidationPipe()) decorator applies
  //...validation to the incoming request DTO.
  // If the request data doesn't comply with the CreateReviewDto validation rules,
  //...the ValidationPipe will throw a default BadRequestException immediately.
  @UsePipes(new ValidationPipe())
  @Post('create')
  // Now that UseFilters is applied, the BadRequestExceptionFilter will be overwritten
  @UseFilters(new TestHttpExceptionFilter(), new BadRequestExceptionFilter())
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @Get('byProduct/:productId')
  async getByProductId(@Param('productId') productId: string) {
    return this.reviewService.getByProductId(productId);
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
