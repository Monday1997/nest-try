import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { AppController } from './app.controller';
import { MovieModule } from './modules/movie/movie.module';
import { AwardsModule } from './modules/awards/awards.module';
import { RoleModule } from './modules/role/role.module';
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
    MovieModule,
    AwardsModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
