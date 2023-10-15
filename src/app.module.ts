import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { RewievModule } from './rewiev/rewiev.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TopPageModule,
    ProductModule,
    RewievModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
