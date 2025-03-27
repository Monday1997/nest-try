import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create_award.dto';
import { UpdateAwardDto } from './dto/update_award.dto';

@Controller('awards')
export class AwardsController {
  constructor(private awardsService: AwardsService) {}
  @Get()
  findAwards(name: string) {
    this.awardsService.findAward(name);
  }
  @Post()
  createAwards(dto: CreateAwardDto) {
    this.awardsService.createAward(dto);
  }
  @Put()
  updateAwards(dto: UpdateAwardDto) {
    this.awardsService.updateAward(dto);
  }
  @Delete()
  delAwards(id: number) {
    this.awardsService.delAward(id);
  }
}
