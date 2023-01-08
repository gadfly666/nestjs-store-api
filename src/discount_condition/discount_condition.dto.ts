import { ApiProperty } from "@nestjs/swagger";

export class DiscountConditionDto {
  @ApiProperty()
  id: bigint;
  @ApiProperty()
  type: string;
  @ApiProperty()
  operator: string;
  @ApiProperty()
  discountRuleId: bigint;
}