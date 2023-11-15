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
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.productService.deleteById(id);
    if (!deleted) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return deleted;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    // why not CreateProductDto ?
    const updated = await this.productService.updateById(id, dto);
    if (!updated) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }
    return updated;
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    console.log(dto);
  }
}
