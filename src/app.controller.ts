import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
  Request
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Param() params): string {
    return this.appService.getHello();
  }

  @Post('/postFn')
  @HttpCode(201) // 修改状态码
  @Header('Cache-Control', 'none') // 自定义响应头
  postFn(@Req() req: Request): string {
    console.log(req);
    return 'postFn';
  }
}
