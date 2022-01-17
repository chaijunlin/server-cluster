/*
 * @Author: your name
 * @Date: 2021-11-16 17:45:53
 * @LastEditTime: 2021-12-06 16:00:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /demo/src/app.service.ts
 */
import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
@Injectable()
export class AppService {
  getHello() {
    try {
      const res = execSync(
        'curl --unix-socket /var/run/docker.sock http:/v1.24/containers/json',
      ).toString();
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
  getId() {
    try {
      const res = execSync(
        'curl --unix-socket /var/run/docker.sock http:/v1.24/containers/1759207928cc81c6240ab3688034c5fbe408256ab2776e013e1322f73953c234/json',
      ).toString();
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
