import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddlewareModule } from 'src/middle-ware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from 'src/middle-ware/logger-middleware/logger.middleware';
import { UserController } from './controller/user.controller';

@Module({
    imports:[LoggerMiddlewareModule],
    controllers:[UserController],
    providers:[]
})

/** 模块使用中间件 必须满足NestModule接口 */
export class UserModuleModule implements NestModule{

    // 1. 类中间件
    configure(consumer:MiddlewareConsumer){
      consumer.apply(LoggerMiddleware).forRoutes('user') 
    } 


    // 2.函数中间件
    // configure(consumer:MiddlewareConsumer){
    //     consumer.apply(logger).forRoutes('user') 
    // } 


    // 3.顺序执行的中间件
    // configure(consumer:MiddlewareConsumer){
    //     consumer.apply(cors(),helmet(),logger).forRoutes('user') 
    // } 



  }