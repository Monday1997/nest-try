import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private dto: any,
    private flag: boolean = true,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 将data转化成符合dto的对象
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: this.flag,
        });
      }),
    );
  }
}
