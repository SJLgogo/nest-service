import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModuleModule } from '../user-module/user-module.module';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/loacl-auth.guard';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports:[UserModuleModule , PassportModule],
    exports:[LocalAuthGuard],
    providers:[AuthService , LocalStrategy],
    controllers:[]
})
export class AuthModule {}
