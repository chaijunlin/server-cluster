/*
 * @Author: jack-pearson
 * @Date: 2021-12-23 18:27:05
 * @LastEditTime: 2021-12-23 18:27:08
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/common/interceptor/timeout.interceptor.ts
 * @Description:
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(100000));
  }
}
