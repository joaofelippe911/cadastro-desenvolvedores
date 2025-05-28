import { Controller, Post, Body, Get, Put, Param, ParseIntPipe, Delete, HttpCode, Query } from '@nestjs/common';
import { LevelService } from './level.service';
import { UpdateLevelDto } from './dtos/update-level.dto';
import { Level } from './level.entity';
import { PaginationQueryDto } from './dtos/pagination-query.dto';

@Controller('niveis')
export class LevelController {
  constructor(private readonly levelService: LevelService) { }

  @Post()
  create(@Body('nivel') nivel: string) {
    return this.levelService.create(nivel);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.levelService.findAll(query);
  }
  
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.levelService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLevelDto,
  ): Promise<Level> {
    return this.levelService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.levelService.remove(id);
  }
}
