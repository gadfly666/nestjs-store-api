import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class ItemInput {
  @IsNotEmpty()
  @IsString()
  variant_id: bigint 

  @IsNotEmpty()
  @IsInt()
  quantity: number
}

export class CartInput{
  @ApiProperty()
  items: ItemInput[];
}