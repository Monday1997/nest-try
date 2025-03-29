import { IsString, IsOptional, IsIn, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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

type TRolesList = { name: string; movieId: number }[];
class RoleCraete {
  name: string;
  movieId: number;
}

export class CreateUserWtihRoleDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => RoleCraete)
  role: TRolesList;
}
export class CreateUserWtihRoleInterface extends CreateUserDto {
  role: {
    create: { name: string; movieId: number }[];
    // connect: { id: number }[];
  };
}
