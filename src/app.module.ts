import { ForbiddenException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggerMiddlewareModule } from './common/middleware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from './common/middleware/logger-middleware/logger.middleware';
import { CustormDynamicModule } from './module/custorm-dynamic/custorm-dynamic.module';
import { CustormProviderModule } from './module/custorm-provider/custorm-provider.module';
import { UserController } from './module/user-module/controller/user.controller';
import { Car } from './module/user-module/entity/car.entity';
import { User } from './module/user-module/entity/user.entity';
import { UserModuleModule } from './module/user-module/user-module.module';





@Module({
  imports: [
    LoggerMiddlewareModule, 
    UserModuleModule ,
    CustormProviderModule,
    CustormDynamicModule.register({folder:'./config'}),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'nest',
      // entities:[User , Car],
      autoLoadEntities: true,  // 不包括未通过 forFeature() 方法注册的实体
      synchronize:true  // 不要再生产中使用 ， 会丢失数据
    }),
  ],
  controllers: [AppController],
  providers: [AppService , {
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }],
  exports:[]
})


export class AppModule {
  constructor(private dataSource:DataSource){
  }
}


