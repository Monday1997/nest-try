import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
export class UpdateUserDto extends OmitType(CreateUserDto, [
  'username',
  'password',
]) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;
}
