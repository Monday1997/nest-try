import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, UserService2 } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserService2],
})
export class UserModule {}
