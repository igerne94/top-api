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

  async getAll(): Promise<ReviewModel[]> {
    return this.reviewModel.find().exec();
  }

  /**
   * Fetches all reviews associated with a given product ID.
   *
   * Note: The `productId` is explicitly converted to a MongoDB ObjectId using `new mongoose.Types.ObjectId(productId)`.
   * This conversion ensures that the string is in the correct format to match ObjectId references in the database.
   * In most cases, Mongoose automatically handles the conversion of string IDs to ObjectIds.
   * Therefore, this manual conversion is only necessary if automatic type casting is disabled or
   * if you need to ensure the operation's consistency regardless of Mongoose's casting behavior.
   * If the auto-casting is enabled and functioning as expected, the conversion can be omitted and
   * the `productId` can be used directly in the query.
   */
  async getByProductId(productId: string): Promise<ReviewModel[]> {
    return this.reviewModel
      .find({
        productId: productId,
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
