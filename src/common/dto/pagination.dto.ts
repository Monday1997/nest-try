import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  page: number = 1;
  @IsNumber()
  @Type(() => Number)
  pageSize: number = 10;
  order: Record<string, 'asc' | 'desc'>;
}
