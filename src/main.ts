/*
 * @Author: your name
 * @Date: 2021-11-16 17:45:53
 * @LastEditTime: 2021-12-28 15:27:23
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';
import { SuccessInterceptor, HttpExceptionFilter, TimeoutInterceptor } from 'src/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  // NOTE: added security
  app.use(helmet());
  // NOTE: body parser
  app.use(bodyParser.json({ limit: '50mb' }));
  // NOTE: rateLimit
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60, // an hour
      max: 10000, // limit each IP to 100 requests per windowMs
      message: '⚠️  Too many request created from this IP, please try again after an hour',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalInterceptors(new SuccessInterceptor());
  await app.listen(7001);
}
bootstrap();
