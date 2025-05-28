import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { UpdateDeveloperDto } from './dtos/update-developer.dto';
import { Developer } from './developer.entity';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Controller('desenvolvedores')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) { }

  @Post()
  create(@Body() data) {
    return this.developerService.create(data);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.developerService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.developerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDeveloperDto,
  ): Promise<Developer> {
    return this.developerService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.developerService.remove(id);
  }
}
