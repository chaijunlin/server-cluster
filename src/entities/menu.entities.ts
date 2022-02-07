/*
 * @Author: jack-pearson
 * @Date: 2021-12-13 13:45:30
 * @LastEditTime: 2022-02-07 14:04:38
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/entities/menu.entities.ts
 * @Description:
 */
import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { plainToInstance, Expose } from 'class-transformer';
@Entity({
  name: 'menu',
})
export class Menu {
  children?: any;
  constructor(menu: Partial<Menu>) {
    if (menu) {
      Object.assign(
        this,
        plainToInstance(Menu, menu, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }

  @PrimaryColumn()
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @Expose()
  @Column({ comment: '树结构的父id' })
  parentId: number;

  @Expose()
  @Column({ comment: '路由 name 属性' })
  name: string;

  @Expose()
  @Column({ comment: '路由地址' })
  path: string;

  @Expose()
  @Column({ comment: '路由重定向', nullable: true })
  redirect: string;

  @Expose()
  @Column({ comment: '路由组件地址' })
  component: string;

  @Expose()
  @Column({ comment: '菜单标题' })
  title: string;

  @Expose()
  @Column({ comment: 'icon', nullable: true })
  icon: string;

  @Expose()
  @Column({ comment: '排序', nullable: true, default: 0 })
  sort: number;

  @Expose()
  @Column({
    comment: '是否可展示再菜单树中',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isHide: boolean;

  @Expose()
  @Column({
    comment: '是否前端缓存',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isKeepAlive: boolean;

  @Expose()
  @Column({
    comment: 'tagView 不可关闭',
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isAffix: boolean;

  @Expose()
  @Column({
    comment: '是否再 tagView 中显示',
    type: 'boolean',
    default: true,
    nullable: true,
  })
  isTagView: boolean;

  @CreateDateColumn({ length: 0 })
  createTime: Date;

  @UpdateDateColumn({ length: 0 })
  updateTime: Date;
}
