import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/** 类中间件 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('中间件 Request...');
    next();
  }
}


/** 函数中间件 */
export function logger(req:Request,res:Response,next:NextFunction){
    // console.log('Request...');
    next()
}