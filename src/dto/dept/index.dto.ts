/*
 * @Author: jack-pearson
 * @Date: 2022-01-17 15:53:15
 * @LastEditTime: 2022-01-18 17:30:35
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/dto/dept/index.dto.ts
 * @Description:
 */
import { IsNotEmpty } from 'class-validator';
import { Dept } from 'src/entities';

export class DeptDto extends Dept {
  @IsNotEmpty()
  parentId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  status: number;

  children?: DeptDto[];
}
