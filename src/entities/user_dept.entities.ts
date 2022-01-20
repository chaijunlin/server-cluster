/*
 * @Author: jack-pearson
 * @Date: 2022-01-19 14:38:10
 * @LastEditTime: 2022-01-19 14:40:51
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/entities/user_dept.entities.ts
 * @Description:
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { plainToClass } from 'class-transformer';

@Entity({
  name: 'user_dept',
})
export class UserDept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户 id',
  })
  userId: number;

  @Column({
    comment: '部门 id',
  })
  deptId: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
