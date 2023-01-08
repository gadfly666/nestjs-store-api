import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class Item {
  @IsNotEmpty()
  @IsString()
  variant_id: string

  @IsNotEmpty()
  @IsInt()
  quantity: number
}

export class CartInput{
  @ApiProperty()
  items: Item[];
}