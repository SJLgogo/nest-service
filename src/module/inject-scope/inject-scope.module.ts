import { Module } from '@nestjs/common';
import { ScopeController } from './scope/scope.controller';
import { AppService } from './service/app.service';
import { CatService } from './service/cat.service';
import { HelloService } from './service/hello.service';

@Module({
    providers:[CatService , HelloService , AppService],
    controllers: [ScopeController],
    exports:[CatService , HelloService , AppService],
})
export class InjectScopeModule {}
