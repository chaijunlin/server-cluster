/*
 * @Author: your name
 * @Date: 2021-11-16 17:45:53
 * @LastEditTime: 2021-12-06 16:00:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/app.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello() {
    return this.appService.getHello();
  }
  @Get('/id')
  getId() {
    return this.appService.getId();
  }
}
