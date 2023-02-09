import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthService } from '../user-module/service/userAuth.service';

@Injectable()
export class AuthService {
    constructor(private userAuthService : UserAuthService , private jwtService:JwtService){
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


    // 生成一个JWT( JSON Web Token ) , 并返回 
    async login(user:any):Promise<any>{
        const payload = {username:user.username,sub:user.userId}
        return {
            access_token : this.jwtService.sign(payload)
        }
    }
}
