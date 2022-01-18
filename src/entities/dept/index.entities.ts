/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 15:37:01
 * @LastEditTime: 2022-01-18 13:33:27
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/entities/dept/index.entities.ts
 * @Description:
 */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { plainToClass } from 'class-transformer';

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
