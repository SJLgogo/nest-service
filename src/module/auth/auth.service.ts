import { Injectable } from '@nestjs/common';
import { UserAuthService } from '../user-module/service/userAuth.service';

@Injectable()
export class AuthService {
    constructor(private userAuthService : UserAuthService){
    }


    // 验证用户
    async validateUser(username:string,password:string):Promise<any>{
        const user:any = this.userAuthService.findOne(username) 
        if(user && user.password == password){          // 在真正的应用程序中，不会以纯文本存储密码
            const { password, ...result } = user;
            return result;
        }
        return null
    }
}
