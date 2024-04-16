import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';
import { IdValidationPipe } from 'src/pipes/id-validation-pipe/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deleted = await this.productService.deleteById(id);
    if (!deleted) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return deleted;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ProductModel,
  ) {
    const updated = await this.productService.updateById(id, dto);
    if (!updated) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return updated;
  }

  // validate incomming data
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
