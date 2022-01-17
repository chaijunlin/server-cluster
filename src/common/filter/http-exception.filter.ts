/*
 * @Author: jack-pearson
 * @Date: 2021-12-06 20:38:56
 * @LastEditTime: 2021-12-28 15:44:56
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/common/filter/http-exception.filter.ts
 * @Description:
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('请求异常');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;
    this.logger.error(`🐞  ${message}`);
    const errorResponse = {
      data: {
        error: message,
      }, // 获取全部的错误信息
      message: '系统错误',
      code: 500, // 自定义code
      success: false,
      url: request.originalUrl, // 错误的url地址
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response
      .status(status)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(errorResponse);
  }
}
