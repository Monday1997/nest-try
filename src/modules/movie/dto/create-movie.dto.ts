import { IsString } from 'class-validator';
export class CreateMovieDto {
  @IsString()
  movieName: string;
}
export class CreateMovieDtoWithUserDto extends CreateMovieDto {
  user: {
    create: { usersId: number }[];
  };
}
