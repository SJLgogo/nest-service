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
    UserModuleModule,
    CustormProviderModule,
    CustormDynamicModule.register({folder:'./config'}),
    /** 静态配置 */
    TypeOrmModule.forRoot({ 
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'nest',
      // entities:[User , Car],
      autoLoadEntities: true,  
      synchronize:true  
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


/** 通过异步配置存储库模块选项 */
    // TypeOrmModule.forRootAsync({
    //   useFactory:()=>({
    //       type:'mysql',
    //       host:'localhost',
    //       port:3306,
    //       username:'root',
    //       password:'root',
    //       database:'nest',
    //       // entities:[User , Car],
    //       autoLoadEntities: true,  
    //       synchronize:true  
    //   })
    // })

/** 异步，并且能够注入依赖关系 */
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('HOST'),
    //     port: +configService.get('PORT'),
    //     username: configService.get('USERNAME'),
    //     password: configService.get('PASSWORD'),
    //     database: configService.get('DATABASE'),
    //     entities: [],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // });

/** 自定义数据源工厂 */
// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => ({
//     type: 'mysql',
//     host: configService.get('HOST'),
//     port: +configService.get('PORT'),
//     username: configService.get('USERNAME'),
//     password: configService.get('PASSWORD'),
//     database: configService.get('DATABASE'),
//     entities: [],
//     synchronize: true,
//   }),
//   dataSourceFactory: async (options) => {
//     const dataSource = await new DataSource(options).initialize();
//     return dataSource;
//   },
// });