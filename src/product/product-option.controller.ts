import { Controller, Post, Get, Put, Delete, Param, Body, Res, Inject, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductOptionInput } from './product.input';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@ApiTags('Product Options')
@Controller('product')
export class ProductOptionController {
  constructor( 
    private service: ProductService,
  ) {}  

  @ApiOkResponse({type: Product})
  @ApiParam({
    name: "id",
    type: "number"
  })
  @Post(':id/options')
  async addOption(@Param('id') id: bigint, @Body() input: ProductOptionInput) {
    return this.service.addOption(id, input);
  }

  @ApiOkResponse({type: Product})
  @ApiParam({name: "id", type: "number"})
  @ApiParam({name: "option_id", type: "number"})
  @Put(':id/options/:option_id')
  async updateOption(@Param('id') id: bigint, @Param('option_id') optionId: bigint, @Body() input: ProductOptionInput) {
    return this.service.updateOption(id, optionId, input);
  }

  @ApiParam({name: "id", type: "number"})
  @ApiParam({name: "option_id", type: "number"})
  @Put(':id/options/:option_id')
  async deleteOption(@Param('id') id: bigint, @Param('option_id') optionId: bigint) {
    return this.service.deleteOption(id, optionId);
  }

}
