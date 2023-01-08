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
  @Get()
  async list(): Promise<any> {
    const [products, count] = await this.service.list();
    return {
      datas: products,
      total: count
    }
  }

}
