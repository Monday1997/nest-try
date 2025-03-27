import { Controller, Body, Post, Put, Query, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UPdateMovie } from './dto/update-moive.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  create(@Body() dto: CreateMovieDto | CreateMovieDto[]) {
    console.log('🚀 ~ MovieController ~ create ~ data:', dto);
    return this.movieService.addMovies(dto);
  }

  @Put()
  update(@Body() data: UPdateMovie) {
    return this.movieService.updateMovie(data);
  }
  @Get()
  find(@Query('name') name: string) {
    return this.movieService.find(name);
  }
}
