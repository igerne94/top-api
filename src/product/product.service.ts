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
    // normally returns prev version of a doc; to update data on the frontend, use '{ new: true }'
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
        $limit: dto.limit,
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
          reviews: {
            $sortArray: {
              input: '$reviews',
              sortBy: {
                createdAt: -1, //newest first
              },
            },
          },
        },
      },
      // {
      //   $lookup: {
      //     from: 'reviews',
      //     let: { productId: '$_id' },
      //     pipeline: [
      //       {
      //         $match: {
      //           $expr: { $eq: ['$productId', '$$productId'] },
      //         },
      //       },
      //       {
      //         $sort: { createdAt: -1 }, // newest reviews first
      //       },
      //     ],
      //     as: 'reviews',
      //   },
      // },

      // {
      //   $addFields: {
      //     reviewCount: { $size: '$reviews' },
      //     reviewAvg: { $avg: '$reviews.rating' },
      //   },
      // },
    ];

    // returns Product Model and 3 fields:
    return (
      this.productModel
        .aggregate(aggregationSteps)
        // converting to unknown first to avoid type errors:
        .exec() as unknown as (ProductModel & {
        review: ReviewModel[];
        reviewCount: number;
        reviewAvg: number;
      })[]
    );
  }
}
