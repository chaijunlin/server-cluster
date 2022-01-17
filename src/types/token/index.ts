/*
 * @Author: jack-pearson
 * @Date: 2021-12-23 18:46:14
 * @LastEditTime: 2021-12-23 18:46:15
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/types/token/index.ts
 * @Description:
 */
/** token 错误类型 */
export interface ITokenError {
  name: string;
  message: string;
}

/** token 错误返回类型 */
export interface ITokenErrorResponse {
  code: number;
  message: string;
  success: boolean;
  data: any;
}
