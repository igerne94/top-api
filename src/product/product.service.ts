import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductModel> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductModel> {
    return this.productModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<ProductModel> {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: ProductModel): Promise<ProductModel> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
