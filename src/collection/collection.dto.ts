import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class CollectionDto {
  @AutoMap()
  @ApiProperty()
  id: bigint;
  @AutoMap()
  @ApiProperty()
  title: string;
  @AutoMap()
  @ApiProperty()
  handle: string;
  @AutoMap()
  @ApiProperty()
  createdAt: Date;
  @AutoMap()
  @ApiProperty()
  updatedAt: Date; 
}