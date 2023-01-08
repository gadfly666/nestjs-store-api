import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { GiftCardDto } from './gift_card.dto';
import { GiftCard } from './gift_card.entity';

@Injectable()
export class GiftCardProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper){
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, GiftCard, GiftCardDto);
      createMap(mapper, GiftCardDto , GiftCard,
        forMember((g) => g.id, ignore())
      );
    };
  }

}