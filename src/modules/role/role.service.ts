import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateRoleDto) {
    return this.prisma.role.create({ data: dto });
  }
}
