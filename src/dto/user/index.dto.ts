/*
 * @Author: jack-pearson
 * @Date: 2021-12-28 15:51:30
 * @LastEditTime: 2022-01-17 15:54:00
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/dto/user/index.dto.ts
 * @Description:
 */

import { IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { User } from 'src/entities';

export class loginDto extends User {
  @IsNotEmpty({ message: '账户不能为空' })
  @IsString()
  account: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { each: true, message: '密码长度不能小于6位或大于20位' })
  password: string;
}

export class UserDto extends loginDto {}
