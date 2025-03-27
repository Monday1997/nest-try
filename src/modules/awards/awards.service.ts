import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create_award.dto';
import { UpdateAwardDto } from './dto/update_award.dto';

@Injectable()
export class AwardsService {
  constructor(private prisma: PrismaService) {}
  createAward(dto: CreateAwardDto) {
    return this.prisma.awards.create({ data: dto });
  }
  delAward(id: number) {
    return this.prisma.awards.delete({
      where: {
        id,
      },
    });
  }
  updateAward(dto: UpdateAwardDto) {
    return this.prisma.awards.update({ where: { id: dto.id }, data: dto });
  }
  findAward(name: string) {
    return this.prisma.awards.findMany({
      where: {
        name,
      },
    });
  }
}
