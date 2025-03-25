import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Query, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  async getUser(
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const [data, total] = await this.UserService.getUser(page, pageSize);
    return {
      data,
      total,
    };
  }
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.UserService.create(dto);
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
