import { Controller, Get, Inject, LoggerService } from '@nestjs/common';
import { UserService2 } from './user.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class UserController {
  constructor(
    private UserService2: UserService2,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('this is log');
    this.logger.warn('this is warn');
    this.logger.error('this is error');
    this.logger.verbose('this is verbose');
  }
  @Get()
  getUser(): any {
    console.log('okook');
    return this.UserService2.getUser();
  }
  @Get('home')
  getHome() {
    return this.UserService2.getHomeData();
  }
}
