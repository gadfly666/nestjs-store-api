import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore, condition } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ProductInput } from './product.input';
import { Product } from './product.entity';

@Injectable()
export class ProductProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Product, ProductInput);
      createMap(mapper, ProductInput, Product,
        forMember((p) => p.id, ignore()),
        forMember((p) => p.profileId, condition((s) => !(s.profileId == null))),
        forMember((p) => p.collectionId, condition((s) => !(s.collectionId == null))),
        forMember((p) => p.createdAt, ignore()),
        forMember((p) => p.updatedAt, ignore()),
        forMember((p) => p.deletedAt, ignore())
      );
    };
  }

}