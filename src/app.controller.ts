import { Controller, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('app')
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('this is log');
    this.logger.warn('this is warn');
    this.logger.error('this is error');
    this.logger.verbose('this is verbose');
  }
}
