/*
 * @Author: jack-pearson
 * @Date: 2021-12-23 18:45:26
 * @LastEditTime: 2021-12-29 14:46:45
 * @LastEditors: jack-pearson
 * @FilePath: /server-cluster/src/types/http/index.ts
 * @Description:
 */
export interface HttpGlobalResponse<T = any> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IApiResponse<T = any> {
  code?: number;
  success?: boolean;
  data: {
    pageNumber?: number;
    pageSize?: number;
    total?: number;
  } & T;
  message?: string;
}
export interface HttpResponse<T> {
  data: T;
}
