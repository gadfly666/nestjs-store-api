import { Controller, Post, Get, Put, Delete, Param, Body, Res, Inject, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GiftCardDto } from './gift_card.dto';
import { GiftCardService } from './gift_card.service';

@ApiTags('Gift Card')
@Controller('gift-card')
export class GiftCardController {

  constructor( 
    private service: GiftCardService,
  ) {}  

  @ApiOkResponse({type: GiftCardDto})
  @Post()
  create(@Body() dto: GiftCardDto): GiftCardDto {
    return this.service.create(dto);
  }

  @ApiOkResponse({type: GiftCardDto})
  @ApiParam({name: 'id', type: 'number'})
  @Get(':id')
  async retrieve(@Param('id') id: bigint): Promise<GiftCardDto> {
    return await this.service.retrieve(id);
  }

  @ApiOkResponse({type: GiftCardDto})
  @ApiParam({name: 'id', type: 'number'})
  @Put(':id')
  async update(@Param('id') id: bigint, @Body() dto: GiftCardDto): Promise<GiftCardDto> {
    return await this.service.update(id, dto);
  }

  @ApiParam({name: 'id', type: 'number'})
  @Delete(':id')
  async delete(@Param('id') id: bigint, @Res() res: Response) {
    await this.service.delete(id);
    res.status(HttpStatus.OK).json({"message": "success"});
  }

}
