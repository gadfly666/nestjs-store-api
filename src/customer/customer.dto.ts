import { ApiProperty } from "@nestjs/swagger";

export class CustomerDTO {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  billingAddressId: bigint;
  @ApiProperty()
  hasAccount: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date; 
}