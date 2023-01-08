import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, LineItem} from './cart.entity';
import { CartInput } from './cart.input';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(LineItem)
    private lineItemRepository: Repository<LineItem>,
  ) {}

  // async create(dto: CartInput): Promise<Cart> {
  //   // const collection = this.mapper.map(dto, CollectionDto, Collection);
  //   // this.repository.save(collection);
  //   // return this.mapper.map(collection, Collection, CollectionDto);
  // }

}