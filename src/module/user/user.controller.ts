/*
 * @Author: your name
 * @Date: 2021-12-06 17:05:36
 * @LastEditTime: 2022-01-19 14:18:31
 * @LastEditors: jack-pearson
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /server-cluster/src/module/user/user.controller.ts
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ParameterCheckPipe } from 'src/common';
import { loginDto, UserDto } from 'src/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @UsePipes(new ParameterCheckPipe())
  @Post('/login/web')
  loginWeb(@Body() user: loginDto) {
    return this.userService.loginWeb(user);
  }

  @HttpCode(200)
  @UsePipes(new ParameterCheckPipe())
  @Post('/create')
  create(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @HttpCode(200)
  @UsePipes(new ParameterCheckPipe())
  @Post('/update')
  update(@Body() user: UserDto) {
    return this.userService.updateUser(user);
  }

  @UsePipes(new ParameterCheckPipe())
  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UsePipes(new ParameterCheckPipe())
  @Get('/query/:id')
  query(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('/query')
  queryUser(@Query() query: any) {
    return this.userService.query(query);
  }
}
