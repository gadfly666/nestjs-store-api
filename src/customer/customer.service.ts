import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerDTO } from './customer.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: CustomerDTO): CustomerDTO{
    const customer = this.mapper.map(dto, CustomerDTO, Customer);
    this.customerRepository.save(customer);
    return this.mapper.map(customer, Customer, CustomerDTO);
  }

  async retrieve(id: bigint): Promise<CustomerDTO> {
    const customer = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (customer) {
      return this.mapper.map(customer, Customer, CustomerDTO);
    }

    throw new NotFoundException({
      "customerId": id
    });
  }

  async update(id: bigint, dto: CustomerDTO): Promise<CustomerDTO> {
    const customer = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (customer) {
      this.mapper.mutate(dto, customer, CustomerDTO, Customer);
      this.customerRepository.save(customer);
      return this.mapper.map(customer, Customer, CustomerDTO);
    }

    throw new NotFoundException({
      "customerId": id
    });
  }
  

  async delete(id: bigint) {
    const customer = await this.customerRepository.findOne({
      where: {
        "id": id
      }
    })

    if (customer) {
      this.customerRepository.delete(customer);
    }

  }

}