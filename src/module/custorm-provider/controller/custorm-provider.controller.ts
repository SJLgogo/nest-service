import { Controller, Get, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from 'src/module/custorm-dynamic/service/config.service';
import { AppService } from 'src/module/inject-scope/service/app.service';
import {  ConfigProviderService, TemplateService } from '../service/custom-provider.service';

@Controller('custorm-provider')
export class CustormProviderController {
    constructor(
        private templateService:TemplateService,
        private configService : ConfigProviderService,
        private devService:ConfigService,
        private moduleRef:ModuleRef,
        private appService:AppService
    ){}

    @Get()
    findAll():string{
      this.appService.getRoot();
        return 'all'
    }

}
