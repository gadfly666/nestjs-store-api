import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { CollectionDto } from './collection.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class CollectionService {

  constructor(
    @InjectRepository(Collection)
    private repository: Repository<Collection>,
    @InjectMapper()
    private mapper: Mapper,
  ) {}

  create(dto: CollectionDto): CollectionDto{
    const collection = this.mapper.map(dto, CollectionDto, Collection);
    this.repository.save(collection);
    return this.mapper.map(collection, Collection, CollectionDto);
  }

  async retrieve(id: bigint): Promise<CollectionDto> {
    const collection = await this.repository.findOne({
      where: {
        "id": id
      }
    })

    if (collection) {
      return this.mapper.map(collection, Collection, CollectionDto);
    }

    throw new NotFoundException({
      "collectionId": id
    });
  }

  async update(id: bigint, dto: CollectionDto): Promise<CollectionDto> {
    const collection = await this.repository.findOne({
      where: {
        "id": id
      }
    })

    if (collection) {
      this.mapper.mutate(dto, collection, CollectionDto, Collection);
      this.repository.save(collection);
      return this.mapper.map(collection, Collection, CollectionDto);
    }

    throw new NotFoundException({
      "collectionId": id
    });
  }
  

  async delete(id: bigint) {
    const collection = await this.repository.findOne({
      where: {
        "id": id
      }
    })

    if (collection) {
      this.repository.delete(collection);
    }

  }

}