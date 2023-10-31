import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './product.model';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductModel.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ConfigService],
})
export class ProductModule {}
