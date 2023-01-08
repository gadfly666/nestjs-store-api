import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerGroup } from './customer_group.entity';
import { CustomerGroupDto } from './customer_group.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class CustomerGroupService {

  constructor(
    @InjectRepository(CustomerGroup)
    private customerRepository: Repository<CustomerGroup>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: CustomerGroupDto): CustomerGroupDto{
    const entity = this.mapper.map(dto, CustomerGroupDto, CustomerGroup);
    this.customerRepository.save(entity);
    return this.mapper.map(entity, CustomerGroup, CustomerGroupDto);
  }

  async retrieve(id: bigint): Promise<CustomerGroupDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      return this.mapper.map(entity, CustomerGroup, CustomerGroupDto);
    }

    throw new NotFoundException({
      "customerId": id
    });
  }

  async update(id: bigint, dto: CustomerGroupDto): Promise<CustomerGroupDto> {
    const entity = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (entity) {
      this.mapper.mutate(dto, entity, CustomerGroupDto, CustomerGroup);
      this.customerRepository.save(entity);
      return this.mapper.map(entity, CustomerGroup, CustomerGroupDto);
    }

    throw new NotFoundException({
      "customerId": id
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