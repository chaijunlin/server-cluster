/*
 * @Author: your name
 * @Date: 2021-11-16 17:45:53
 * @LastEditTime: 2021-12-28 18:31:32
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/app.module.ts
 */
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MenuModule, UserModule } from 'src/module';
import { AuthMiddleware, LoggerMiddleware } from 'src/common';
import { TypeormModule } from './config';

@Module({
  imports: [TypeormModule, UserModule, MenuModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).exclude('user/login/web').forRoutes('*');
  }
}
