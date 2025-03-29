import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateMovieDtoWithUserDto,
  CreateMovieDto,
} from './dto/create-movie.dto';
import { UPdateMovie } from './dto/update-moive.dto';
@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  addMovies(
    dto: CreateMovieDtoWithUserDto | CreateMovieDto | CreateMovieDto[],
  ) {
    if (dto instanceof Array) {
      return this.prisma.movie.createMany({
        data: dto,
      });
    }
    return this.prisma.movie.create({
      data: dto,
    });
  }
  updateMovie(dto: UPdateMovie) {
    return this.prisma.movie.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  }
  find(name: string) {
    console.log('🚀 ~ MovieService ~ find ~ name:', name);

    return this.prisma.movie.findMany({
      where: {
        movieName: name,
      },
    });
  }
}
