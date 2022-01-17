/*
 * @Author: jack-pearson
 * @Date: 2021-12-06 21:32:10
 * @LastEditTime: 2022-01-17 11:13:29
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/common/middleware/logger.middleware.ts
 * @Description:
 */
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('请求中间件');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, baseUrl: path, body, query } = req;
    const userAgent = req.get('user-agent') || '';
    this.logger.log(
      `✨ Request: path-> ${path}, method-> ${method}, userAgent-> ${userAgent}, ip-> ${ip} \n✨ body-> ${JSON.stringify(
        body,
      )}, query-> ${JSON.stringify(query)}`,
    );
    next();
  }
}
