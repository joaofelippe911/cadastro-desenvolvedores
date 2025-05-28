import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './developer.entity';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { Level } from 'src/level/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Developer, Level])],
  providers: [DeveloperService],
  controllers: [DeveloperController]
})
export class DeveloperModule {}
