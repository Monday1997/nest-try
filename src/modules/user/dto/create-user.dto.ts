import { IsString, IsOptional, IsIn } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsOptional() // 可选属性
  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  @IsIn(['actived', 'dead']) //规定值的范围
  status: string;
}
