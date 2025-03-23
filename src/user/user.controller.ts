import { Controller, Get } from '@nestjs/common';
import { UserService, UserService2 } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService2: UserService2) {
    console.log(
      '🚀 ~ UserController ~ constructor ~ UserService2:',
      UserService2,
    );
    // console.log(
    //   '🚀 ~ UserController ~ constructor ~ userService:',
    //   userService,
    // );
  }
  @Get()
  getUser(): any {
    console.log('okook');
    return this.UserService2.getUser();
  }
}
