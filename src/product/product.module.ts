import { Module, Logger } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductOptionController } from './product-option.controller';
import { ProductProfile } from './product.profile';
import { ProductService } from './product.service';
import { MoneyAmount, Product, ProductOption, ProductType, ProductVariant } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption, ProductType, ProductVariant, MoneyAmount])], 
  providers: [ ProductProfile, ProductService],
  controllers: [ProductController, ProductOptionController]
})
export class ProductModule {}
