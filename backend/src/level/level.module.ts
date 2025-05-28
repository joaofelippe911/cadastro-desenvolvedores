import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './level.entity';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { Developer } from 'src/developer/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Developer])],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule {}
