/*
 * @Author: jack-pearson
 * @Date: 2021-12-23 18:13:40
 * @LastEditTime: 2021-12-23 18:13:41
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/config/toukenError/index.ts
 * @Description:
 */
// token Error Map
export const tokenErrorMap = {
  'jwt expired': 'token 已过期',
  'invalid signature': '无效的 token',
  'jwt malformed': 'token 格式不正确',
  'jwt must be provided': '缺少 token',
  'jwt must be a string': 'token 必须是字符串',
  'jwt signature is required': '需要 token',
  'invalid algorithm': '无效的算法',
  'invalid nbf value': '无效的 nbf',
  'invalid exp value': '无效的 exp',
  'invalid token': '无效的 token',
};
