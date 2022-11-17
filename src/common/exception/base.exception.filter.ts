import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ServiceUnavailableException } from "@nestjs/common";


@Catch()
export class BaseExceptionFillter implements ExceptionFilter{
    catch(exception:Error,host:ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse() 

        response.status(HttpStatus.SERVICE_UNAVAILABLE).send(new ServiceUnavailableException().getResponse())
    }
}