import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';
export class UPdateMovie extends CreateMovieDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
