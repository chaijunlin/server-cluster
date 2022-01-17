/*
 * @Author: your name
 * @Date: 2021-12-06 17:25:41
 * @LastEditTime: 2021-12-28 18:32:50
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/module/menu/menu.module.ts
 */
import { Module } from '@nestjs/common';
import { Menu } from 'src/entities';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
