import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { unlink } from 'fs';

import { reviewMulterConfig } from 'src/config/multer';
import { MoviesService } from './movies.service';
import { LoadMovie } from './decorators/load-movie.decorator';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  search(@Query('name') name: string) {
    return this.moviesService.search(name);
  }

  @Get('/saved')
  list() {
    return this.moviesService.list();
  }

  @Post('/:id/save')
  save(@Param('id') id: string) {
    return this.moviesService.save(id);
  }

  @Delete('/:id/unsave')
  unsave(@LoadMovie() movie: Movie) {
    return this.moviesService.delete(movie);
  }

  @Post('/:id/review')
  @UseInterceptors(FileInterceptor('review', reviewMulterConfig))
  async addReview(
    @Req() req: Request,
    @UploadedFile() review: Express.Multer.File,
    @LoadMovie() movie: Movie,
  ) {
    if (!review) {
      throw new HttpException({ error: 'Review mp3 file is required' }, 400);
    }

    if (movie.reviewUrl) {
      const filename = movie.reviewUrl.split('/').slice(-1)[0];

      unlink(filename, () => {});
    }

    const reviewUrl = `${process.env.HOST_URL}/uploads/${review.filename}`;

    await this.moviesService.addReview(movie, reviewUrl);

    return { reviewUrl };
  }

  @Delete('/:id/review')
  async deleteReview(@LoadMovie() movie: Movie) {
    if (!movie.reviewUrl) {
      return;
    }

    const filename = movie.reviewUrl.split('/').slice(-1)[0];

    unlink(`./uploads/${filename}`, () => {});

    await this.moviesService.deleteReview(movie);
  }
}
