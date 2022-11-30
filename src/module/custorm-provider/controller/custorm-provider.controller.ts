import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService, TemplateService } from '../service/custom-provider.service';

@Controller('custorm-provider')
export class CustormProviderController {
    constructor(
        private templateService:TemplateService,
        private configService : ConfigService,
    ){}

    @Get()
    findAll():string{
        console.log(this.templateService.returnStr());
        return 'all'
    }

}
