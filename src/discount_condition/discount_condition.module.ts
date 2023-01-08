import { Module } from '@nestjs/common';
import { DiscountConditionController } from './discount_condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountCondition } from './discount_condition.entity';
import { DiscountConditionService } from './discount_condition.service';
import { DiscountConditionProfile } from './discount_condition.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountCondition])
  ],
  providers: [
    DiscountConditionService,
    DiscountConditionProfile
  ],
  controllers: [DiscountConditionController]
})
export class DiscountConditionModule {}
