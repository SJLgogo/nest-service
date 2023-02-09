import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModuleModule } from '../user-module/user-module.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant/constant';
import { LocalAuthGuard } from './guard/loacl-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports:[UserModuleModule , PassportModule ,
    JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{ expiresIn:`${jwtConstants.expiresIn}m`}
    })
],
    exports:[LocalAuthGuard,AuthService],
    providers:[AuthService , LocalStrategy , LocalAuthGuard , JwtStrategy],
    controllers:[]
})
export class AuthModule {}
