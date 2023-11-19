import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './product.model';
import { Model, PipelineStage } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductModel>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductModel> {
    return this.productModel.create(dto);
  }

  async getAll(): Promise<ProductModel[]> {
    return this.productModel.find().exec();
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

  async findWithReviews(dto: FindProductDto) {
    const aggregationSteps: PipelineStage[] = [
      {
        $match: {
          categories: dto.category,
        },
      },
      {
        $sort: {
          _id: 1, // sort by id before next steps makes the order stable
        },
      },
      {
        $limit: dto.limit, // limit the number of items
      },
      // attach data from review collection:
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'productId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          reviewCount: { $size: '$reviews' },
          reviewAvg: { $avg: '$reviews.rating' },
        },
      },
    ];
    console.log(JSON.stringify(aggregationSteps));
    return this.productModel
      .aggregate(aggregationSteps)
      .exec() as unknown as (ProductModel & {
      // converting to unknown first to avoid type errors
      review: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
