/*
 * @Author: your name
 * @Date: 2021-12-06 17:05:56
 * @LastEditTime: 2022-01-20 16:56:32
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/module/user/user.service.ts
 */
import { Injectable, Logger } from '@nestjs/common';
import { Dept, User } from 'src/entities';
import { Brackets, createQueryBuilder, getConnection, Connection, getRepository, Like } from 'typeorm';
import { ApiResponse } from 'src/config/apiResponse';
import { createToken } from 'src/config';
import { IApiResponse } from 'src/types';
@Injectable()
export class UserService {
  private logger = new Logger('用户服务');
  /**
   * @description: 创建用户
   * @param {User} user 用户信息
   * @return {User} 新增的用户信息
   */
  async createUser(user: User): Promise<IApiResponse<User[]>> {
    try {
      const newUser = await getRepository(User).save(new User(user));
      if (newUser) {
        return new ApiResponse().msg('新增用户成功').data(newUser).return();
      } else {
        return new ApiResponse().msg('新增用户失败').code(500).data(newUser).return();
      }
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }

  /**
   * @description: 更新用户信息
   * @param {User} user
   * @return {User} 更新后的用户信息
   */
  async updateUser(user: User): Promise<IApiResponse<User>> {
    try {
      const con = getRepository(User);
      const findUser = await con.findOne(user.id);
      if (findUser) {
        const newUser = await con.save(Object.assign(findUser, user));
        return new ApiResponse().data(newUser).return();
      } else {
        return new ApiResponse().data(findUser).msg('用户不存在').code(500).return();
      }
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }

  /**
   * @description: 删除用户信息
   * @param {number} id 用户 id
   * @return {delUser} 删除的用户信息
   */
  async deleteUser(id: string): Promise<IApiResponse<User>> {
    try {
      const con = await getRepository(User);
      const user = await con.findOne(id);
      if (user) {
        const delUser = await con.remove(user);
        if (delUser) {
          return new ApiResponse().msg('删除用户成功').data(delUser).return();
        } else {
          return new ApiResponse().msg('删除用户失败').code(500).data(delUser).return();
        }
      } else {
        return new ApiResponse().msg('用户不存在').code(500).return();
      }
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }

  async findUserById(id: string): Promise<IApiResponse<User>> {
    try {
      const con = getRepository(User);
      const user = await con.findOne(id);
      if (user) {
        return new ApiResponse().data(user).return();
      } else {
        return new ApiResponse().msg('用户不存在').code(500).return();
      }
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }

  /**
   * @description:  web 端根据账号密码登录
   * @param {User} account 用户信息
   * @return {User} 用户信息和 token
   */
  async loginWeb(account: User): Promise<IApiResponse<User>> {
    try {
      const user = await getRepository(User).findOne(account);
      if (user) {
        const token = createToken(user);
        return new ApiResponse().data({ token: token, ...user }).msg('用户登录成功').response;
      } else {
        return new ApiResponse().msg('用户名或者密码不正确').code(500).return();
      }
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }

  /**
   * @description: 查询用户
   * @return {User[]} 用户 list
   */
  async query({ account, deptId, pageNum = 1, pageSize = 20 }): Promise<IApiResponse<User[]>> {
    // , 'dept.id = user_dept.deptId'
    // , 'user_dept.userId = user.id'
    console.log(account, deptId);
    try {
      const [users, total] = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.dept', 'dept')
        .andWhere(
          new Brackets((qb) => {
            if (account) qb.andWhere('user.account like :account', { account: `%${account}%` });
            if (deptId) qb.andWhere('dept.id = :deptId', { deptId });
          }),
        )
        .skip((pageNum - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
      return new ApiResponse().msg('获取用户成功').page(pageNum, pageSize, total, users).return();
    } catch (error) {
      this.logger.error(`🐞  ${error}`);
      return new ApiResponse().msg(error.toString()).code(500).return();
    }
  }
}
