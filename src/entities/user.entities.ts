/*
 * @Author: your name
 * @Date: 2021-12-06 17:12:13
 * @LastEditTime: 2022-01-20 14:36:18
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/entities/user.entities.ts
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { plainToInstance, Expose } from 'class-transformer';
import { Dept } from '.';
@Entity({
  name: 'user',
})
export class User {
  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(
        this,
        plainToInstance(User, user, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }

  @PrimaryGeneratedColumn({ comment: '主键' })
  id: number;

  @ManyToMany(() => Dept, (dept) => dept.user)
  dept: Dept[];

  @Expose()
  @Column({ comment: '账户', unique: true })
  account: string;

  @Expose()
  @Column({ comment: '密码' })
  password: string;

  @Expose()
  @Column({ comment: '昵称', nullable: true })
  name: string;

  @Expose()
  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Expose()
  @Column({ comment: '手机号', nullable: true })
  mobile: string;

  @Expose()
  @Column({ comment: '电话', nullable: true })
  phone: string;

  @Expose()
  @Column({ comment: '年龄', type: 'int', nullable: true })
  age: number;

  @Expose()
  @Column({ comment: '头像', nullable: true })
  avatar: string;

  @Expose()
  @Column({
    comment: '性别: null:未知 man:男 girl:女',
    type: 'enum',
    enum: ['null', 'man', 'girl'],
    default: 'null',
    nullable: true,
  })
  sex: 'null' | 'man' | 'girl';

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
