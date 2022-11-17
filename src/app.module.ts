import { ForbiddenException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggerMiddlewareModule } from './middle-ware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from './middle-ware/logger-middleware/logger.middleware';
import { UserController } from './user-module/controller/user.controller';
import { UserModuleModule } from './user-module/user-module.module';

@Module({
  imports: [LoggerMiddlewareModule, UserModuleModule],
  controllers: [AppController],
  providers: [AppService , {
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }],
})


export class AppModule {}


