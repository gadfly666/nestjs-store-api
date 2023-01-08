import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';
import { CartInput } from './cart.input';

@ApiTags('Cart')
@Controller('cart')
export class CartController {

  constructor( 
    private service: CartService,
  ) {}  

  @ApiOkResponse({type: Cart})
  @Post()
  async create(@Request() req, @Body() dto: CartInput): Promise<void> {
    console.log(req.user);
  }
}
