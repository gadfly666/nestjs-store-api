import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './discount.entity';
import { DiscountDto } from './discount.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class DiscountService {

  constructor(
    @InjectRepository(Discount)
    private customerRepository: Repository<Discount>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: DiscountDto): DiscountDto{
    const entity = this.mapper.map(dto, DiscountDto, Discount);
    this.customerRepository.save(entity);
    return this.mapper.map(entity, Discount, DiscountDto);
  }

  async retrieve(id: bigint): Promise<DiscountDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      return this.mapper.map(entity, Discount, DiscountDto);
    }

    throw new NotFoundException({
      "entityId": id
    });
  }

  async update(id: bigint, dto: DiscountDto): Promise<DiscountDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      this.mapper.mutate(dto, entity, DiscountDto, Discount);
      this.customerRepository.save(entity);
      return this.mapper.map(entity, Discount, DiscountDto);
    }

    throw new NotFoundException({
      "entityId": id
    });
  }
  

  async delete(id: bigint) {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      this.customerRepository.delete(entity);
    }

  }

}