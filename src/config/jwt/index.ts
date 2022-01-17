/*
 * @Author: jack-pearson
 * @Date: 2021-12-31 13:35:50
 * @LastEditTime: 2021-12-31 13:38:43
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/config/jwt/index.ts
 * @Description:
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

export const secret = 'Jack'; // 秘钥
export const exp = () => Math.floor(Date.now() / 1000) + 60 * 60 * 2; // 过期时间 2 小时

/**
 * @description: 加密用户
 * @param {any} data 加密信息
 * @return {string} token
 */
export const createToken = (data: any) =>
  jwt.sign({ exp: exp(), data }, secret);
