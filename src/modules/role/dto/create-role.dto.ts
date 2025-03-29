import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;
  @IsNumber()
  @IsOptional()
  userId?: number;
  @IsNumber()
  movieId: number;
}
