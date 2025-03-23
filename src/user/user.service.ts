import { Injectable } from '@nestjs/common';
import { HomeResources } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
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
  constructor(private prisma: PrismaService) {}
  getUser() {
    return {
      code: 0,
      list: [{ name: '名字22', id: 2 }],
      msg: '获取成功22',
    };
  }
  getHomeData(): Promise<HomeResources[]> {
    return this.prisma.homeResources.findMany({});
  }
}
