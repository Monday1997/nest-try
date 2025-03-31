import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserWtihRoleDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { BigIntTransformIterceptor } from '@/common/interceptor/bigint-interceptor';
import { Serialize } from '@/common/decorators/serialize.decorator';
import { GetUserNoStatusDto } from './dto/get-user-no-status.dto';
import { QueryArrayInterceptor } from '@/common/interceptor/query-array.interceptor';
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @UseInterceptors(new QueryArrayInterceptor(['id']))
  @Serialize(GetUserNoStatusDto)
  @UseInterceptors(BigIntTransformIterceptor)
  @Get()
  async getUser(@Query() data: GetUserDto) {
    const [list, total] = await this.UserService.getUser(data);
    return {
      list: list.map((item) => {
        return {
          ...item,
          role: item.role?.map((roleItem) => {
            return {
              ...roleItem,
              movieName: roleItem.Movie?.movieName,
              Movie: undefined,
            };
          }),
        };
      }),
      total,
    };
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    // return this.UserService.create(dto);
    return dto;
  }
  @Post('createWithRole')
  createWithRole(@Body() dto: CreateUserWtihRoleDto) {
    console.log('🚀 ~ UserController ~ createWithRole ~ dto:', dto);
    const role = {
      create: dto.role,
    };
    return this.UserService.createWithRole({ ...dto, role });
  }
  @Put()
  update(@Body() data: UpdateUserDto) {
    return this.UserService.update(data);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.del(id);
  }

  @Get('find')
  find() {
    return 'version1';
  }
}
