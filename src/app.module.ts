import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppController } from './app.controller';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const isDebug = process.env.NODE_ENV === 'development';
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
    UserModule,
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
        ...(isDebug
          ? []
          : [
              // warn级别以上的都在error**.log中
              createDailyRotateTransport('warn', 'error'),
              createDailyRotateTransport('info', 'app'),
            ]),

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
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
