import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
  create(data: CreateUserDto) {
    return this.prisma.users.create({ data });
  }
  update(data: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id: data.id },
      data,
    });
  }
  del(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
