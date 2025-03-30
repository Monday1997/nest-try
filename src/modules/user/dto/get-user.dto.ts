import { PaginationDto } from '@/common/dto/pagination.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { IsValueInArr } from '@/common/decorators/is-valid-value-in-arr.decorator';
class OrderType {
  [key: string]: 'asc' | 'desc';
}
export class GetUserDto extends PaginationDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  @IsValueInArr(['asc', 'desc'])
  order: OrderType;

  // @IsNumber({}, { each: true })
  // role: number[];
}
