import { Controller , Get } from '@nestjs/common';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';

@Controller(
    {path: 'user'}
)
export class UserController {

    constructor(){
        
    }
 
    @Get()
    userDetail():string{
        // throw console.error();   //异常由内置的全局异常过滤器执行 ， 返回 {"statusCode":500,"message":"Internal server error"}
        // throw new ForbiddenException();
        return 'sjl'
    }

    
}
