import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { MoviesService } from './movies.service';

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
  unsave(@Param('id') id: string) {
    return this.moviesService.unsave(id);
  }
}
