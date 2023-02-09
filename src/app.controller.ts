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
import { AuthService } from './module/auth/auth.service';
import { Public } from './module/auth/constant/constant';
import { JwtAuthGuard } from './module/auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './module/auth/guard/loacl-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService , private authService:AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.authService.login(req.body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.body;
  }

  @Public()
  @Get()
  findAll() {
    return [];
  }


  @Post('/postFn')
  @HttpCode(201) // 修改状态码
  @Header('Cache-Control', 'none') // 自定义响应头
  postFn(@Req() req: Request): string {
    return 'postFn';
  }
}
