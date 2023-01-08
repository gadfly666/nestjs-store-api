import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @AutoMap()
  @IsEmail()
  @ApiProperty()
  email: string;
  @AutoMap()
  @ApiProperty()
  firstName: string;
  @AutoMap()
  @ApiProperty()
  lastName: string;
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  username: string;
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  password: string;
}