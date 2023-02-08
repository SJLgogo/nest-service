import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class MyLogger extends ConsoleLogger{
    
    error(message:any,stack?:string,context?:string){
        super.error('自定义错误信息:'+message)
    }

} 