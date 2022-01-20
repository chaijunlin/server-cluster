/*
 * @Author: your name
 * @Date: 2021-12-06 17:05:56
 * @LastEditTime: 2022-01-19 15:34:52
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/module/menu/menu.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ApiResponse } from 'src/config/apiResponse';
import { Menu } from 'src/entities';
import { dynamicRoutes } from 'src/utils';
@Injectable()
export class MenuService {
  private logger = new Logger('菜单服务');
  async createMenu(menu: Menu) {
    try {
      const conn = getRepository(Menu);
      const newMenu = await conn.save(menu);
      return new ApiResponse().msg('新增菜单成功').data(newMenu).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async findAllMenu() {
    try {
      const [list, total] = await getRepository(Menu).createQueryBuilder('menu').limit(10).offset(0).getManyAndCount();
      return new ApiResponse().msg('查询菜单成功').page(1, 10, total, dynamicRoutes(list)).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
}
