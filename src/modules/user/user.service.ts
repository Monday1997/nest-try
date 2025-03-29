import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import {
  CreateUserDto,
  CreateUserWtihRoleInterface,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(data: GetUserDto): Promise<[Users[], number]> {
    const { page, pageSize, id } = data;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const whereCondition = id ? { id } : {};
    return await this.prisma.$transaction([
      this.prisma.users.findMany({
        skip,
        take,
        where: whereCondition,
        include: {
          role: true,
        },
        orderBy: {
          id: 'desc',
        },
      }),
      this.prisma.users.count(),
    ]);
  }
  create(data: CreateUserDto) {
    return this.prisma.users.create({ data });
  }
  createWithRole(data: CreateUserWtihRoleInterface) {
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
