import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserWtihRoleInterface,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { transformObjToArr } from '@/utils/pagenations';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(data: GetUserDto) {
    const { page, pageSize, id } = data;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const whereCondition = {
      ...(id && { id }),
      role: {
        some: {
          OR: [{ id: 4 }, { id: 5 }],
        },
      },
    };
    Object.entries(whereCondition).map(([key, value]) => {
      if (value === undefined) {
        delete whereCondition[key];
      }
    });
    return await this.prisma.$transaction([
      this.prisma.users.findMany({
        skip,
        take,
        where: whereCondition,
        include: {
          role: {
            select: {
              id: true,
              name: true,
              movieId: true,
              Movie: {
                select: {
                  movieName: true,
                },
              },
            },
          },
        },
        orderBy: transformObjToArr(data.order, {
          id: 'desc',
        }),
      }),
      this.prisma.users.count({ where: whereCondition }),
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
