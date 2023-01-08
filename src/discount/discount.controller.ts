import { Controller, Inject, Post, Put, Get, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountDto } from './discount.dto';
import { Response } from 'express';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Discount')
@Controller('discount')
export class DiscountController {
  
  constructor( 
    private service: DiscountService,
  ) {}  

  @ApiOkResponse({type: DiscountDto})
  @Post()
  create(@Body() dto: DiscountDto): DiscountDto {
    return this.service.create(dto);
  }

  @ApiOkResponse({type: DiscountDto})
  @ApiParam({name: 'id', type: 'number'})
  @Get(':id')
  async retrieve(@Param('id') id: bigint): Promise<DiscountDto> {
    return await this.service.retrieve(id);
  }

  @ApiOkResponse({type: DiscountDto})
  @ApiParam({name: 'id', type: 'number'})
  @Put(':id')
  async update(@Param('id') id: bigint, @Body() dto: DiscountDto): Promise<DiscountDto> {
    return await this.service.update(id, dto);
  }

  @ApiParam({name: 'id', type: 'number'})
  @Delete(':id')
  async delete(@Param('id') id: bigint, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({"message": "success"});
  }

}
