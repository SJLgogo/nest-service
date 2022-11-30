import { Module } from '@nestjs/common';
import { CustormDynamicModule } from '../custorm-dynamic/custorm-dynamic.module';
import { CustormProviderController } from './controller/custorm-provider.controller';
import { ConfigProviderService, TemplateService } from './service/custom-provider.service';
import { DevelopmentService } from './service/development-config.service';
import { ProductionConfigService } from './service/Production-config.service';

const configServiceProvider =   {
    provide:ConfigProviderService,
    useClass:process.env.NODE_ENV === 'development' ? DevelopmentService : ProductionConfigService
}

const aliasProvider = {
    provide:'AliasProvider',
    useExisting:TemplateService
}

const configFactory = {
    provide:'CONFIG',
    useFactory:() => process.env.NODE_ENV ? '1' : '2'
}


// const connectionProvider = {
//     provide: 'CONNECTION',
//     useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
//       const options = optionsProvider.get();
//       return new DatabaseConnection(options);
//     },
//     inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
// };

@Module({
    providers:[
        TemplateService ,
        configServiceProvider,
        aliasProvider
    ],
    imports:[CustormDynamicModule.register({folder:'./config'})],
    exports:[],
    controllers:[CustormProviderController]
})
export class CustormProviderModule {}



