import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

const serializeBigInt = (data: any) => {
  if (typeof data === 'bigint') {
    return data.toString();
  } else if (typeof data === 'object' && typeof data !== null) {
    for (const key in data) {
      data[key] = serializeBigInt(data[key]);
    }
  }
  return data;
};
@Injectable()
export class BigIntTransformIterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(map((data) => serializeBigInt(data)));
  }
}
