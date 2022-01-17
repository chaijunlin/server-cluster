/*
 * @Author: jack-pearson
 * @Date: 2021-12-22 18:00:57
 * @LastEditTime: 2021-12-31 13:40:59
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/common/middleware/auth.middleware.ts
 * @Description:
 */
import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { tokenErrorMap } from 'src/config';
import { ITokenError, ITokenErrorResponse } from 'src/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
import { secret } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger('token鉴权');
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    try {
      this.verifyToken(headers);
      next();
    } catch (err) {
      this.logger.error(`🐞  token 错误 ${err}`);
      const error: ITokenError = err;
      const message: string =
        tokenErrorMap[
          Object.keys(tokenErrorMap).find((key) => error.message.includes(key))
        ];
      const ErrorResponse: ITokenErrorResponse = {
        code: 401,
        message: message,
        success: false,
        data: {},
      };
      throw new UnauthorizedException(ErrorResponse);
    }
  }
  verifyToken(headers: Request['headers']) {
    const authorization = headers.authorization || '';
    const token = authorization.split(' ')[1] || '';
    const decode = jwt.verify(token, secret);
    return decode;
  }
}
