import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { DiscountDto } from './discount.dto';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Discount, DiscountDto);
      createMap(mapper, DiscountDto, Discount,
        forMember((d) => d.id, ignore())
      );
    };
  }

}