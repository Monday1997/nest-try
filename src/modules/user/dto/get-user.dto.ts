import { PaginationDto } from '@/common/dto/pagination.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class GetUserDto extends PaginationDto {
  @IsNumber()
  @IsOptional()
  id: number;
}
