import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountProfile } from './discount.profile';
import { DiscountService } from './discount.service'
import { Discount } from './discount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discount]),
  ],
  providers: [
    DiscountProfile,
    DiscountService, 
  ],
  controllers: [DiscountController]
})
export class DiscountModule {}
