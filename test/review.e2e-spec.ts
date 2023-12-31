import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Test Description',
  rating: 5,
  productId: productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // #1 test for create review
  it('/review/create (POST) - successs', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  // #1.2 test for create review
  it('/review/create (POST) - test successfully failed', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log('body: ', body);
      });
  });

  // #2 test for get all reviews
  it('/review/ (GET)', async () => {
    return request(app.getHttpServer())
      .get('/review/')
      .expect(200)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(body.length).toBe(0); //if no elems
      });
  });

  // #3 test for get reviews by product id
  it('/review/byProduct:productId (GET) - success', async () => {
    console.log('productId: ', productId);
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(3); //if no elems
      });
  });

  // #4 test for delete review by id
  it('/review/delete:id (DELETE) ', () => {
    console.log('createdId: ', createdId);
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
  });

  afterAll(async () => {
    // close the Nest application
    await app.close();
    // disconnect from MongoDB
    await disconnect();
  });
});
