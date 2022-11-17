import { HttpException } from "@nestjs/common";

/** 自定义异常 */
export class ForbiddenException extends HttpException{
    constructor(){
        super('Forbidden',400)
    }
}