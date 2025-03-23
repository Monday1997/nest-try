import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return {
      code: 0,
      list: [{ name: '名字', id: 1 }],
      msg: '获取成功',
    };
  }
}

@Injectable()
export class UserService2 {
  getUser() {
    return {
      code: 0,
      list: [{ name: '名字22', id: 2 }],
      msg: '获取成功22',
    };
  }
}
