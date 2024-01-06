import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async list() {
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

    console.log(data);

    if (data.Error === 'Incorrect IMDb ID.') {
      return { error: 'Incorrect IMDb ID.' };
    }

    const newMovie = this.moviesRepository.create({
      id: data.imdbID,
      title: data.Title,
      rating: data.imdbRating,
      posterUrl: data.Poster,
    });

    return this.moviesRepository.save(newMovie);
  }

  async delete(id: string) {
    this.moviesRepository.delete(id);
  }
}
