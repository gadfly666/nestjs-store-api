import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GiftCard } from './gift_card.entity';
import { GiftCardDto } from './gift_card.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class GiftCardService {

  constructor(
    @InjectRepository(GiftCard)
    private giftCardRepository: Repository<GiftCard>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: GiftCardDto): GiftCardDto {
    const giftCard = this.mapper.map(dto, GiftCardDto, GiftCard);
    this.giftCardRepository.save(giftCard);
    return this.mapper.map(giftCard, GiftCard, GiftCardDto);
  }

  async retrieve(id: bigint): Promise<GiftCardDto> {
    const giftCard = await this.giftCardRepository.findOne({
      where: {
        "id": id
      }
    })

    if (giftCard) {
      return this.mapper.map(giftCard, GiftCard, GiftCardDto);
    }

    throw new NotFoundException({
      "giftCardId": id
    });
  }

  async update(id: bigint, dto: GiftCardDto): Promise<GiftCardDto> {
    const giftCard = await this.giftCardRepository.findOne({
      where: {
        "id": id
      }
    })

    if (giftCard) {
      this.mapper.mutate(dto, giftCard, GiftCardDto, GiftCard);
      this.giftCardRepository.save(giftCard);
      return this.mapper.map(giftCard, GiftCard, GiftCardDto);
    }

    throw new NotFoundException({
      "giftCardId": id
    });
  }
  

  async delete(id: bigint) {
    const giftCard = await this.giftCardRepository.findOne({
      where: {
        "id": id
      }
    })

    if (giftCard) {
      this.giftCardRepository.delete(giftCard);
    }

  }

}