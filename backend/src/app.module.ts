import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeveloperModule } from './developer/developer.module';
import { LevelModule } from './level/level.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './level/level.entity';
import { Developer } from './developer/developer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'cadastro-desenvolvedores',
      entities: [Level, Developer],
      synchronize: true,
    }),
    DeveloperModule,
    LevelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
