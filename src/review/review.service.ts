import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ReviewModel } from './review.model';
import mongoose, { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewService {
  constructor(
    // ingect model to have the Model available
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    try {
      return await this.reviewModel.create(dto);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create review: ${error}`,
      );
    }
  }

  async getByProduct(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel
      .find({
        productId: new mongoose.Types.ObjectId(productId),
      })
      .exec();
  }

  async delete(id: string): Promise<ReviewModel | null> {
    try {
      const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();
      if (!deletedReview) {
        throw new NotFoundException(`Review with id ${id} not found`);
      }
      return deletedReview;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete review: ${error}`,
      );
    }
  }

  async deleteMany(productId: string): Promise<any> {
    try {
      return await this.reviewModel
        .deleteMany({
          productId: new mongoose.Types.ObjectId(productId),
        })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete reviews: ${error}`,
      );
    }
  }
}
