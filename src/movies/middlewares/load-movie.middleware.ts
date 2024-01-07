import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';

import { Movie } from '../entities/movie.entity';

export class LoadMovieMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const movie = await this.moviesRepository.findOne({
      where: { id: req.params.id },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.locals.movie = movie;

    next();
  }
}
