import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { DiscountConditionDto } from './discount_condition.dto';
import { DiscountCondition } from './discount_condition.entity';

@Injectable()
export class DiscountConditionProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DiscountCondition, DiscountConditionDto);
      createMap(mapper, DiscountConditionDto, DiscountCondition,
        forMember((d) => d.id, ignore())
      );
    };
  }

}