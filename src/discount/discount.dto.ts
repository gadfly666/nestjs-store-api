import { ApiProperty } from "@nestjs/swagger";

export class DiscountDto {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  code: string;
  @ApiProperty()
  isDynamic: boolean;
  @ApiProperty()
  ruleId: bigint;
  @ApiProperty()
  isDisabled: boolean;
  @ApiProperty()
  parentDiscountId: bigint;
  @ApiProperty()
  startsAt: Date;
  @ApiProperty()
  endsAt: string;
  @ApiProperty()
  usageLimit: string;
  @ApiProperty()
  usageCount: string;
  @ApiProperty()
  validDuration: string;
}