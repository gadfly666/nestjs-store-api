import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiscountCondition } from './discount_condition.entity';
import { DiscountConditionDto } from './discount_condition.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class DiscountConditionService {

  constructor(
    @InjectRepository(DiscountCondition)
    private customerRepository: Repository<DiscountCondition>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: DiscountConditionDto): DiscountConditionDto{
    const entity = this.mapper.map(dto, DiscountConditionDto, DiscountCondition);
    this.customerRepository.save(entity);
    return this.mapper.map(entity, DiscountCondition, DiscountConditionDto);
  }

  async retrieve(id: bigint): Promise<DiscountConditionDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      return this.mapper.map(entity, DiscountCondition, DiscountConditionDto);
    }

    throw new NotFoundException({
      "entityId": id
    });
  }

  async update(id: bigint, dto: DiscountConditionDto): Promise<DiscountConditionDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      this.mapper.mutate(dto, entity, DiscountConditionDto, DiscountCondition);
      this.customerRepository.save(entity);
      return this.mapper.map(entity, DiscountCondition, DiscountConditionDto);
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