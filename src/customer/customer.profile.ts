import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Customer, CustomerDTO);
      createMap(mapper, CustomerDTO, Customer,
        forMember((c) => c.id, ignore())
      );
    };
  }

}