import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { Cart, LineItem  } from './cart.entity';
import { ProductVariant } from '../product/product.entity';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, LineItem, ProductVariant])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
