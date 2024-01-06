import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesModule } from './movies/movies.module';
import db from './db/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [db],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('db'),
    }),
    MoviesModule,
  ],
})
export class AppModule {}
