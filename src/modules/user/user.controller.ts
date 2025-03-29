import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserWtihRoleDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  async getUser(
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('id', new ParseIntPipe({ optional: true })) id?: number,
  ) {
    const [data, total] = await this.UserService.getUser(page, pageSize, id);
    return {
      data,
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
