import { BullModule } from '@nestjs/bull';
import { CacheModule, ForbiddenException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';
import * as Joi from 'joi';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggerMiddlewareModule } from './common/middleware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from './common/middleware/logger-middleware/logger.middleware';
import { CustormDynamicModule } from './module/custorm-dynamic/custorm-dynamic.module';
import { CustormProviderModule } from './module/custorm-provider/custorm-provider.module';
import { DevelopmentService } from './module/custorm-provider/service/development-config.service';
import { UserController } from './module/user-module/controller/user.controller';
import { Car } from './module/user-module/entity/car.entity';
import { User } from './module/user-module/entity/user.entity';
import { UserModuleModule } from './module/user-module/user-module.module';
import { AudioModule } from './module/audio/audio.module';

const audio:any[]=[
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  AudioModule
]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'./config/development.env' ,
      cache:true,  // 缓存环境变量
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
    LoggerMiddlewareModule, 
    UserModuleModule,
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
      autoLoadEntities: true,  
      synchronize:true  
    }),
    CacheModule.register({
      isGlobal:true
    }),
    ScheduleModule.forRoot(),
    ...audio
  ],
  controllers: [AppController],
  providers: [AppService , {
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }],
  exports:[
  ]
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