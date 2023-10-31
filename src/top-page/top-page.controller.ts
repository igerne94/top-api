import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}

  // @Post('create')
  // async create(@Body() dto: Omit<TopPageModel, '_id'>) {
  //   console.log(dto);
  // }

  @Get('get/:alias')
  async get(@Param('alias') alias: string): Promise<TopPageModel> {
    console.log(alias);
    this.configService.get('TEST');
    return;
  }
  // @Get(':id')
  // async get(@Param('id') id: string) {
  //   console.log(id);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {
    console.log(id);
    console.log(dto);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    console.log(dto);
  }
}
