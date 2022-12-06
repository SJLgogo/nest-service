import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ServiceUnavailableException } from "@nestjs/common";


@Catch()
export class BaseExceptionFillter implements ExceptionFilter{
    catch(exception:Error,host:ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse() 
        const request = ctx.getRequest()


        // 非 Http 标准异常处理
        response.status(HttpStatus.SERVICE_UNAVAILABLE).send({
            statusCode:HttpStatus.SERVICE_UNAVAILABLE,
            message:new ServiceUnavailableException().getResponse()
        })
    }
}