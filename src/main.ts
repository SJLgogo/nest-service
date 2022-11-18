import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseExceptionFillter } from './common/exception/base.exception.filter';
import { HttpExceptionFilter } from './common/exception/exception.filter';

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
  
  /**
   * 全局管道
   */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
