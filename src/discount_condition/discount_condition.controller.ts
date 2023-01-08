import { Controller, Inject, Post, Put, Get, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { DiscountConditionService } from './discount_condition.service';
import { DiscountConditionDto } from './discount_condition.dto';
import { Response } from 'express';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Discount Condition')
@Controller('discount-condition')
export class DiscountConditionController {

  constructor( 
    private service: DiscountConditionService,
  ) {}  
    
  @ApiOkResponse({type: DiscountConditionDto})
  @Post()
  create(@Body() dto: DiscountConditionDto): DiscountConditionDto {
    return this.service.create(dto);
  }
  
  @ApiOkResponse({type: DiscountConditionDto})
  @ApiParam({name: 'id', type: 'number'})
  @Get(':id')
  async retrieve(@Param('id') id: bigint): Promise<DiscountConditionDto> {
    return await this.service.retrieve(id);
  }
  
  @ApiOkResponse({type: DiscountConditionDto})
  @ApiParam({name: 'id', type: 'number'})
  @Put(':id')
  async update(@Param('id') id: bigint, @Body() dto: DiscountConditionDto): Promise<DiscountConditionDto> {
    return await this.service.update(id, dto);
  }
  
  @ApiParam({name: 'id', type: 'number'})
  @Delete(':id')
  async delete(@Param('id') id: bigint, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({"message": "success"});
  }

}
