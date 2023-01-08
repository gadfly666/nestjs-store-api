import { Controller, Post, Get, Put, Delete, Param, Body, Res, Inject, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductOptionInput, ProductVariantInput } from './product.input';
import { ProductService } from './product.service';
import { Product, ProductVariant } from './product.entity';

@ApiTags('Product Options')
@Controller('product')
export class ProductVariantController{
  constructor( 
    private service: ProductService,
  ) {}  

  @ApiOkResponse({type: ProductVariant})
  @ApiParam({
    name: "id",
    type: "number"
  })
  @Post(':id/variants')
  async createVariant(@Param('id') id: bigint, @Body() input: ProductVariantInput) {
    return this.service.createVariant(id, input);
  }

  @ApiOkResponse({type: ProductVariant})
  @ApiParam({name: "id", type: "number"})
  @ApiParam({name: "varant_id", type: "number"})
  @Put(':id/variants/:variant_id')
  async updateVariant(@Param('id') id: bigint, @Param('variant_id') variantId: bigint, @Body() input: ProductVariantInput) {
    return this.service.updateVariant(id, variantId, input);
  }

  @ApiParam({name: "id", type: "number"})
  @ApiParam({name: "variant_id", type: "number"})
  @Put(':id/variants/:variant_id')
  async deleteVariant(@Param('id') id: bigint, @Param('variant_id') variantId: bigint) {
    return this.service.deleteVariant(id, variantId);
  }

}
