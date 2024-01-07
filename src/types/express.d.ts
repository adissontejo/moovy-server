import { Movie } from 'src/movies/movie.entity';

declare module 'express' {
  export interface Response extends Express.Response {
    locals: {
      movie: Movie;
    };
  }
}
