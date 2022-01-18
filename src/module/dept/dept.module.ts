/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 16:19:12
 * @LastEditTime: 2022-01-17 16:19:13
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/module/dept/dept.module.ts
 * @Description:
 */
import { Module } from '@nestjs/common';
import { Dept } from 'src/entities';
import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}
