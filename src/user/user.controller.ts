import { Controller, Get } from '@nestjs/common';
import { UserService2 } from './user.service';

@Controller()
export class UserController {
  constructor(private UserService2: UserService2) {
    console.log(
      '🚀 ~ UserController ~ constructor ~ UserService2:',
      UserService2,
    );
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
