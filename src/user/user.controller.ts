import { Controller, Get, Version } from '@nestjs/common';
import { UserService } from './user.service';
import { Query, ParseIntPipe } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  async getUser(
    @Query('pageSize', ParseIntPipe) pageSize = 10,
    @Query('page', ParseIntPipe) page = 1,
  ) {
    const [data, total] = await this.UserService.getUser(page, pageSize);
    return {
      data,
      total,
    };
  }
  @Get('find')
  find() {
    return 'version1';
  }
}
