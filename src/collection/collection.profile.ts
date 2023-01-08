import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CollectionDto } from './collection.dto';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Collection, CollectionDto);
      createMap(mapper, CollectionDto, Collection,
        forMember((c) => c.id, ignore())
      );
    };
  }

}