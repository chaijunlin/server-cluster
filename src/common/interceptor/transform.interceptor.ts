/*
 * @Author: jack-pearson
 * @Date: 2021-12-23 18:31:01
 * @LastEditTime: 2021-12-23 18:31:03
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/common/interceptor/transform.interceptor.ts
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
