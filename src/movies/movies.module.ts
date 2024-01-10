import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { LoadMovieMiddleware } from './middlewares/load-movie.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoadMovieMiddleware)
      .exclude('movies', 'movies/saved', 'movies/:id/save')
      .forRoutes(MoviesController);
  }
}
