import { Controller, Post, Get, Put, Delete, Param, Body, Res, Inject, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProductInput, ProductOptionInput } from './product.input';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor( 
    private service: ProductService,
  ) {}  

  @ApiOkResponse({type: Product})
  @Post()
  async create(@Body() dto: ProductInput): Promise<ProductInput> {
    return this.service.create(dto);
  }

  @ApiOkResponse({type: Product})
  @ApiParam({name: 'id', type: 'number'})
  @Get(':id')
  async retrieve(@Param('id') id: bigint): Promise<ProductInput> {
    return await this.service.retrieve(id);
  }

  @ApiOkResponse({type: Product})
  @ApiParam({name: 'id', type: 'number'})
  @Put(':id')
  async update(@Param('id') id: bigint, @Body() dto: ProductInput): Promise<ProductInput> {
    return await this.service.update(id, dto);
  }

  @ApiParam({name: 'id', type: 'number'})
  @Delete(':id')
  async delete(@Param('id') id: bigint, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({"message": "success"});
  }

}
