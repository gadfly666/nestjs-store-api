import { ApiProperty } from "@nestjs/swagger";

export class CustomerGroupDto {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date; 
}