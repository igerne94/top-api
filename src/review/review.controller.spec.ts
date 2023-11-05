import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReviewService } from './review.service';
import mongoose from 'mongoose';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };

  const reviewRepositoryMockFactory = () => ({
    find: () => exec,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryMockFactory, // returns mock implementation of the ReviewModel
          provide: getModelToken('ReviewModel'), // tells to find the model by the tocken and inject the factory
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId works', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    reviewRepositoryMockFactory()
      .find()
      .exec.mockReturnValueOnce([{ productId: id }]);
    const res = await service.getByProductId(id);
    expect(res[0].productId).toBe(id);
  });
});
