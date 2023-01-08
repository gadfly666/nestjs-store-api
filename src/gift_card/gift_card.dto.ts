import { ApiProperty } from "@nestjs/swagger";

export class GiftCardDto {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  code: string;
  @ApiProperty()
  value: bigint;
  @ApiProperty()
  balance: bigint;
  @ApiProperty()
  orderId: bigint;
  @ApiProperty()
  isDisabled: boolean;
  @ApiProperty()
  endsAt: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date; 
}