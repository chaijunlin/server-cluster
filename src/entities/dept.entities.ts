/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 15:37:01
 * @LastEditTime: 2022-01-20 14:40:03
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/entities/dept.entities.ts
 * @Description:
 */
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from './user.entities';

@Entity({
  name: 'dept',
})
export class Dept {
  constructor(dept: Partial<Dept>) {
    if (dept) {
      Object.assign(
        this,
        plainToClass(Dept, dept, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }

  @PrimaryColumn({
    comment: '主键',
  })
  id: number;

  @ManyToMany(() => User, (user) => user.dept)
  @JoinTable({
    name: 'user_dept',
  })
  user: User[];

  @Column({
    comment: '父节点 id',
  })
  parentId: number;

  @Column({
    comment: '部门名称',
    nullable: true,
  })
  name: string;

  @Column({
    comment: '部门状态, 0: 停用, 1: 启用',
    nullable: true,
    type: 'enum',
    default: 1,
    enum: [0, 1],
  })
  status: number;

  @Column({
    comment: '部门描述',
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
