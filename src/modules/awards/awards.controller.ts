import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create_award.dto';
import { UpdateAwardDto } from './dto/update_award.dto';

@Controller('awards')
export class AwardsController {
  constructor(private awardsService: AwardsService) {}
  @Get()
  async findAwards(@Query() name: string) {
    const result = await this.awardsService.findAward(name);
    return result.map((item) => {
      return {
        ...item,
        movie: item.movie.movieName,
      };
    });
  }
  @Post()
  createAwards(@Body() dto: CreateAwardDto) {
    return this.awardsService.createAward(dto);
  }
  @Put()
  updateAwards(@Body() dto: UpdateAwardDto) {
    return this.awardsService.updateAward(dto);
  }
  @Delete(':id')
  delAwards(@Param('id', ParseIntPipe) id: number) {
    return this.awardsService.delAward(id);
  }
}
