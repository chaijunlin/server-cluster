/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 15:36:03
 * @LastEditTime: 2022-01-19 11:02:33
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/module/dept/dept.service.ts
 * @Description:
 */

import { Injectable, Logger } from '@nestjs/common';
import { Brackets, getRepository } from 'typeorm';
import { Dept } from 'src/entities';
import { ApiResponse } from 'src/config';
import { deptArrayToTree } from 'src/utils';

@Injectable()
export class DeptService {
  private logger = new Logger('部门服务');
  async createDept(dept: Partial<Dept>) {
    try {
      const con = getRepository(Dept);
      const newDept = await con.save(dept);
      return new ApiResponse().msg('新增部门成功').data(newDept).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async updateDept(dept: Partial<Dept>) {
    try {
      const con = getRepository(Dept);
      const newDept = await con.save(dept);
      return new ApiResponse().msg('更新部门成功').data(newDept).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async deleteDept(deptId: string) {
    try {
      const con = getRepository(Dept);
      const dept = await con.findOne(deptId);
      if (!dept) {
        return new ApiResponse().msg('部门不存在').code(500).return();
      }
      await con.remove(dept);
      return new ApiResponse().msg('删除部门成功').return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
  async query({ name, status }: { name?: string; status?: number }) {
    try {
      const con = getRepository(Dept);
      const depts = await con
        .createQueryBuilder('dept')
        .andWhere(
          new Brackets((qb) => {
            if (name)
              qb.andWhere('dept.name LIKE :name', { name: `%${name}%` });
            if (status) qb.andWhere('dept.status = :status', { status });
            return qb;
          }),
        )
        .getMany();
      const deptTree = deptArrayToTree(depts);
      return new ApiResponse().msg('获取部门成功').data(deptTree).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
}
