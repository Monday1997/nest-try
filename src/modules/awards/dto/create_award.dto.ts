import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateAwardDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  movieId: number;
}
