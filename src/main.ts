import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseExceptionFillter } from './common/exception/base.exception.filter';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** 
   * 全局中间件
   *  app.use(logger)
   */
  /**
   * 全局过滤器 
   * 缺点 ： 不会为网关或混合应用设置过滤器 
   * app.useGlobalFilters(new HttpExceptionFilter()) 
   */
  app.useGlobalFilters( new BaseExceptionFillter()  , new HttpExceptionFilter())

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  
  /**
   * 全局管道
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * 全局守卫
   * app.useGlobalGuards(new RolesGuard());
   */

  /**
   * 全局拦截器
   */
   app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(3000);
}
bootstrap();
