import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseExceptionFillter } from './common/exception/base.exception.filter';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { MyLogger } from './module/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs:true
  });
  app.useLogger(app.get(MyLogger))
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
  app.useGlobalPipes(new ValidationPipe({
    //   disableErrorMessages: true, 禁用详细错误
    transform:true,    // 自动转换
    whitelist:true,   // 设置白名单 ，将请求中未包含在DTO中的属性自动剔除 , 自动删除非白名单属性(验证类中没有任何修饰属性)
  }));

  /**
   * 全局守卫
   * app.useGlobalGuards(new RolesGuard());
   */

  /** 全局拦截器 */
   app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(3000);
}
bootstrap();
