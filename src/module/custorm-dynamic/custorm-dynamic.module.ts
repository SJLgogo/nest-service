import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './service/config.service';

@Module({})
export class CustormDynamicModule {
    static register(options:Record<string,any>):DynamicModule{
        return {
            module:CustormDynamicModule,
            providers:[
                {
                    provide:'CONFIG_OPTIONS',
                    useValue:options
                },
                ConfigService
            ],
            exports:[ConfigService]
        }
    }
}
