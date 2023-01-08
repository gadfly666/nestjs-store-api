import { Module } from '@nestjs/common';
import { GiftCardController } from './gift_card.controller';
import { GiftCardProfile } from './gift_card.profile';
import { GiftCard } from './gift_card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftCardService } from './gift_card.service';

@Module({
  imports: [TypeOrmModule.forFeature([GiftCard])],
  providers: [GiftCardProfile, GiftCardService],
  controllers: [GiftCardController]
})
export class GiftCardModule {}
