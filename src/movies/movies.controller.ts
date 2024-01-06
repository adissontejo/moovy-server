import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  search(
    @Query('name') name: string,
    @Query('page') page: number,
    @Res() res: Response,
  ) {
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    }

    res.redirect(
      `https://www.omdbapi.com/?apikey=8b8306f5&s=${name}&page=${page || 1}`,
    );
  }

  @Get('/saved')
  list() {
    return this.moviesService.list();
  }

  @Post('/:id/save')
  save(@Param('id') id: string) {
    return this.moviesService.save(id);
  }

  @Delete('/:id/delete')
  delete(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
