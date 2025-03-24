import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<[Users[], number]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return await this.prisma.$transaction([
      this.prisma.users.findMany({
        skip,
        take,
      }),
      this.prisma.users.count(),
    ]);
  }
}
