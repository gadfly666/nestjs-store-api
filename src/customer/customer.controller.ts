import { Controller, Inject, Post, Put, Get, Delete, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.dto';
import { Response } from 'express';
import { ApiOkResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor( 
    private service: CustomerService,
  ) {}  

  @ApiResponse({type: CustomerDTO})
  @Post()
  create(@Body() dto: CustomerDTO): CustomerDTO {
    return this.service.create(dto);
  }

  @ApiResponse({type: CustomerDTO})
  @ApiParam({name: 'id',type: 'number'})
  @Get(':id')
  async retrieve(@Param('id') id: bigint): Promise<CustomerDTO> {
    return await this.service.retrieve(id);
  }

  @ApiResponse({type: CustomerDTO})
  @ApiParam({name: 'id',type: 'number'})
  @Put(':id')
  async update(@Param('id') id: bigint, @Body() dto: CustomerDTO): Promise<CustomerDTO> {
    return await this.service.update(id, dto);
  }

  @ApiOkResponse({description: 'Customer deleted'})
  @ApiParam({name: 'id',type: 'number'})
  @Delete(':id')
  async delete(@Param('id') id: bigint, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({"message": "success"});
  }
}
