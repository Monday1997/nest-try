import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * @param transformKeys string[] 要将逗号转为数组的key值
 */
@Injectable()
export class QueryArrayInterceptor implements NestInterceptor {
  constructor(private transformKeys: string[]) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;
    this.transformKeys.map((key) => {
      if (/,/.test(query[key])) {
        query[key] = query[key].split(',').map((item) => Number(item));
      }
    });
    return next.handle();
  }
}
