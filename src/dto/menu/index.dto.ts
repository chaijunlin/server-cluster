/*
 * @Author: jack-pearson
 * @Date: 2021-12-28 16:56:54
 * @LastEditTime: 2022-01-17 15:53:48
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/dto/menu/index.dto.ts
 * @Description:
 */
import { IsNotEmpty } from 'class-validator';
import { Menu } from 'src/entities';

export class MenuDto extends Menu {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;

  @IsNotEmpty({ message: '父级id不能为空' })
  parentId: number;

  @IsNotEmpty({ message: '菜单名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '路由路径不能为空' })
  path: string;

  @IsNotEmpty({ message: '路由组件地址不能为空' })
  component: string;

  @IsNotEmpty({ message: '菜单标题不能为空' })
  title: string;
}
