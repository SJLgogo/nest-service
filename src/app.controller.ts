import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { logger } from './common/middleware/logger-middleware/logger.middleware';
import { LocalAuthGuard } from './module/auth/guard/loacl-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return req.user
  }


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
