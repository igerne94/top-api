import { ReviewService } from './review.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  TestHttpExceptionFilter,
  BadRequestExceptionFilter,
} from 'src/exceptions/http-exception.filters';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEmail } from 'src/decorators/user-email.decorator';
import { IdValidationPipe } from 'src/pipes/id-validation-pipe/id-validation.pipe';
import { TelegramService } from './../telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}

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

  @UsePipes(new ValidationPipe())
  @Post('notify')
  // Now that UseFilters is applied, the BadRequestExceptionFilter will be overwritten
  @UseFilters(new TestHttpExceptionFilter(), new BadRequestExceptionFilter())
  async notify(@Body() dto: CreateReviewDto) {
    const message =
      `Name ${dto.name}\n` +
      `title ${dto.title}\n` +
      `description ${dto.description}\n` +
      `rating ${dto.rating}\n` +
      `productId ${dto.productId}`;

    // TODO: post the review to db
    return this.telegramService.sendMessage(message);
  }

  @Get('all')
  async getAll() {
    return this.reviewService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProductId(
    @Param('productId', IdValidationPipe) productId: string,
    @UserEmail() email: string, // get email from jwt token
  ) {
    console.log(email);
    return this.reviewService.getByProductId(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    await this.reviewService.delete(id);
    return { message: 'Review successfully deleted' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('byProduct/:productId')
  async deleteMany(@Param('productId', IdValidationPipe) productId: string) {
    await this.reviewService.deleteMany(productId);
    return { message: 'Reviews successfully deleted' };
  }
}
