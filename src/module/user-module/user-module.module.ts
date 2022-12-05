import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddlewareModule } from 'src/common/middleware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from 'src/common/middleware/logger-middleware/logger.middleware';
import { DataSource } from 'typeorm';
import { UserController } from './controller/user.controller';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';
import { AlbumsService } from './service/albums.service';
import { UserService } from './service/user.service';
import { UserSubscriber } from './service/user.subscribe';

/**
 * imports:  使用forFeature() 方法定义在当前范围中注册的存储库 。这样，就可以使用@InjectRepository() 将 UserRepository 注入到 UserService
 * exports:  如果需要在导入TypeOrmModul的模块之外使用存储库。 对于Feature , 需要重新导出它生成的提供程序，可以通过导出整个模块来完成此操作。
 */
@Module({
    imports:[LoggerMiddlewareModule , TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Car])],
    controllers:[UserController],
    providers:[
      UserService ,
      UserSubscriber,
    ],
    exports:[TypeOrmModule]
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