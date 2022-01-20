/*
 * @Author: jack-pearson
 * @Date: 2021-12-28 18:19:39
 * @LastEditTime: 2022-01-20 17:20:04
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/config/typeorm/index.ts
 * @Description:
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from 'src/entities';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '39.105.172.102',
      port: 7300,
      username: 'root',
      password: 'jack-mysql-server-cluster',
      database: 'server-cluster',
      entities: Object.values(entities),
      synchronize: true,
      logging: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class TypeormModule {}
