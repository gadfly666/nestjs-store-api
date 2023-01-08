import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CustomerGroupDto } from './customer_group.dto';
import { CustomerGroup } from './customer_group.entity';

@Injectable()
export class CustomerGroupProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CustomerGroup, CustomerGroupDto);
      createMap(mapper, CustomerGroupDto, CustomerGroup,
        forMember((c) => c.id, ignore())
      );
    };
  }

}