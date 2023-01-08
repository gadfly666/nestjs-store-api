import { Module, Logger } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductVariantController } from './product-variant.controller';
import { ProductProfile } from './product.profile';
import { ProductService } from './product.service';
import { Product, ProductOption, ProductType, ProductVariant, ProductOptionValue } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOption, ProductType, ProductVariant, ProductOptionValue])], 
  providers: [ ProductProfile, ProductService],
  controllers: [ProductController, ProductVariantController]
})
export class ProductModule {}
