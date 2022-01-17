/*
 * @Author: your name
 * @Date: 2021-12-06 17:05:36
 * @LastEditTime: 2021-12-29 13:44:47
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/module/menu/menu.controller.ts
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ParameterCheckPipe } from 'src/common';
import { menuDto } from 'src/dto/menu/index.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @HttpCode(200)
  @Post('/create')
  @UsePipes(new ParameterCheckPipe())
  createMenu(@Body() menu: menuDto) {
    return this.menuService.createMenu(menu);
  }

  @Get('/findAll')
  findAllMenu() {
    return this.menuService.findAllMenu();
  }
}
