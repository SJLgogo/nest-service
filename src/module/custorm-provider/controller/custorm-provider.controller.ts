import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from 'src/module/custorm-dynamic/service/config.service';
import {  ConfigProviderService, TemplateService } from '../service/custom-provider.service';

@Controller('custorm-provider')
export class CustormProviderController {
    constructor(
        private templateService:TemplateService,
        private configService : ConfigProviderService,
        private devService:ConfigService
    ){}

    @Get()
    findAll():string{
        console.log(this.templateService.returnStr());
        console.log(this.devService.get('HELLO_MESSAGE'));
        return 'all'
    }

}
