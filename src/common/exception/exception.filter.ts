/**
 * 虽然内置异常过滤器 ，可以自动处理很多异常 ，但我们更希望完全控制异常 。
 */
import { HttpException , Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception?.getStatus();
      const error = exception?.getResponse()

      console.log(ctx);
      
      response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          msg:error
        });
    }
  }