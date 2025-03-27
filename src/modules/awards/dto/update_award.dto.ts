import { IsNumber, IsNotEmpty } from 'class-validator';
import { CreateAwardDto } from './create_award.dto';
export class UpdateAwardDto extends CreateAwardDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
