/*
 * @Author: Jack
 * @Date: 2021-04-22 10:26:51
 * @LastEditTime: 2021-12-28 16:29:05
 * @LastEditors: jack-pearson
 * @Description: In User Settings Edit
 * @FilePath: /server-cluster/src/common/pipe/validation.pipe.ts
 */
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ParameterCheckPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints).join(','); // 只需要取第一个错误信息并返回即可
      throw new BadRequestException(`参数校验: ${msg}`);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
