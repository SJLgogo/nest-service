import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [],
  exports: [],
  providers: [LoggerMiddleware],
})
export class LoggerMiddlewareModule {}
