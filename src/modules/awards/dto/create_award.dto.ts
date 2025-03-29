import { IsString, IsNumber } from 'class-validator';
export class CreateAwardDto {
  @IsString()
  name: string;
  @IsNumber()
  movieId: number;
}
