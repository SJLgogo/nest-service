import { ForbiddenException, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { LoggerMiddlewareModule } from './common/middleware/logger-middleware/logger-middleware.module';
import { LoggerMiddleware } from './common/middleware/logger-middleware/logger.middleware';
import { CustormProviderModule } from './module/custorm-provider/custorm-provider.module';
import { UserController } from './module/user-module/controller/user.controller';
import { UserModuleModule } from './module/user-module/user-module.module';

@Module({
  imports: [LoggerMiddlewareModule, UserModuleModule , CustormProviderModule],
  controllers: [AppController],
  providers: [AppService , {
    provide:APP_FILTER,
    useClass:HttpExceptionFilter
  }],
})


export class AppModule {}


