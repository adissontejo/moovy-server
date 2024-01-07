import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async search(title: string) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=8b8306f5&s=${title}`,
    );

    const data = await response.json();

    if (data.Error) {
      throw new HttpException({ error: data.Error }, HttpStatus.BAD_REQUEST);
    }

    const result: { movie: Movie; saved: boolean }[] = [];

    await Promise.all(
      data.Search.map((item, index) => {
        return (async () => {
          const movie = await this.moviesRepository.findOne({
            where: { id: item.imdbID },
          });

          if (movie) {
            result[index] = { movie, saved: true };
          } else {
            const response = await fetch(
              `https://www.omdbapi.com/?apikey=8b8306f5&i=${item.imdbID}`,
            );

            const data = await response.json();

            const newMovie = this.moviesRepository.create({
              id: data.imdbID,
              title: data.Title,
              rating: data.imdbRating,
              posterUrl: data.Poster,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            result[index] = { movie: newMovie, saved: false };
          }
        })();
      }),
    );

    return result;
  }

  list() {
    return this.moviesRepository.find();
  }

  async save(id: string) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (movie) {
      return movie;
    }

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=8b8306f5&i=${id}`,
    );

    const data = await response.json();

    if (data.Error === 'Incorrect IMDb ID.') {
      throw new HttpException(
        { error: 'Movie not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const newMovie = this.moviesRepository.create({
      id: data.imdbID,
      title: data.Title,
      rating: data.imdbRating,
      posterUrl: data.Poster,
    });

    return this.moviesRepository.save(newMovie);
  }

  addReview(movie: Movie, reviewUrl: string) {
    movie.reviewUrl = reviewUrl;

    return this.moviesRepository.save(movie);
  }

  deleteReview(movie: Movie) {
    movie.reviewUrl = null;

    return this.moviesRepository.save(movie);
  }

  delete(movie: Movie) {
    this.moviesRepository.delete(movie);
  }
}
