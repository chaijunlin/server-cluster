/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 15:36:03
 * @LastEditTime: 2022-01-18 18:44:07
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/module/dept/dept.service.ts
 * @Description:
 */

import { Injectable, Logger } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Dept } from 'src/entities';
import { ApiResponse } from 'src/config';
import { deptArrayToTree } from 'src/utils';

@Injectable()
export class DeptService {
  private logger = new Logger('部门服务');
  async createDept(dept: Partial<Dept>) {
    try {
      const conn = getRepository(Dept);
      const newDept = await conn.save(dept);
      return new ApiResponse().msg('新增部门成功').data(newDept).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async updateDept(dept: Partial<Dept>) {
    try {
      const conn = getRepository(Dept);
      const newDept = await conn.save(dept);
      return new ApiResponse().msg('更新部门成功').data(newDept).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async deleteDept(deptId: string) {
    try {
      const conn = getRepository(Dept);
      const dept = await conn.findOne(deptId);
      if (!dept) {
        return new ApiResponse().msg('部门不存在').code(500).return();
      }
      await conn.remove(dept);
      return new ApiResponse().msg('删除部门成功').return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async findAllDept() {
    try {
      const conn = getRepository(Dept);
      const depts = await conn.find();
      const deptTree = deptArrayToTree(depts);
      return new ApiResponse().msg('获取部门成功').data(deptTree).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
}
