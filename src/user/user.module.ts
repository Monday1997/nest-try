import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, UserService2 } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

function createDailyRotateTransport(level: string, filename: string) {
  return new winston.transports.DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
@Module({
  imports: [
    PrismaModule,
    WinstonModule.forRoot({
      level: 'silly', //日志等级 官网查看
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              colors: true,
              prettyPrint: true,
              processId: true,
              appName: true,
            }),
          ),
        }),
        // warn级别以上的都在error**.log中
        createDailyRotateTransport('warn', 'error'),
        createDailyRotateTransport('info', 'app'),
        // 使用daily之后就不用winston原生的了
        // other transports...
        // new winston.transports.File({
        //   filename: 'user.log',
        //   level: 'error',
        //   format: winston.format.combine(
        //     winston.format.timestamp(),
        //     nestWinstonModuleUtilities.format.nestLike('MyApp', {
        //       prettyPrint: true,
        //     }),
        //   ),
        // }),
      ],
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserService2],
})
export class UserModule {}
