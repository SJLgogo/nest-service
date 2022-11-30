import { Module } from '@nestjs/common';
import { CustormProviderController } from './controller/custorm-provider.controller';
import { ConfigService , TemplateService } from './service/custom-provider.service';
import { DevelopmentService } from './service/development-config.service';
import { ProductionConfigService } from './service/Production-config.service';

const configServiceProvider =   {
    provide:ConfigService,
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
    imports:[],
    exports:[],
    controllers:[CustormProviderController]
})
export class CustormProviderModule {}



