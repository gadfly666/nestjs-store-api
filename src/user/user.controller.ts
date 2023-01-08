import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(
    private service: UserService,
  ) {}

  @Post("/register")
  async login(@Body() dto: RegisterDto): Promise<String> {
    await this.service.register(dto);
    return "OK";
  }
}
