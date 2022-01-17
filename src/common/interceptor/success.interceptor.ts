/*
 * @Author: Jack
 * @Date: 2021-04-16 11:56:05
 * @LastEditTime: 2021-12-27 18:45:11
 * @LastEditors: jack-pearson
 * @Description: In User Settings Edit
 * @FilePath: /server-cluster/src/common/interceptor/success.interceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpGlobalResponse, HttpResponse } from 'src/types';

@Injectable()
export class SuccessInterceptor<T = any>
  implements NestInterceptor<T, HttpResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpResponse<T>> {
    return next.handle().pipe(
      map(
        (
          response: HttpGlobalResponse = {
            data: {},
            code: 200,
            success: true,
            message: '请求成功',
          },
        ) => {
          const { data, code, success, message } = response;
          return {
            data,
            code,
            message: message ?? (code === 200 ? '请求成功' : '请求失败'),
            success: success,
          };
        },
      ),
    );
  }
}
