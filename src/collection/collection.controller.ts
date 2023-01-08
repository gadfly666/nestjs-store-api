import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Collection')
@Controller('collection')
export class CollectionController {}
