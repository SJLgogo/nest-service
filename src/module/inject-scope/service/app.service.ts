import { Injectable } from "@nestjs/common";
import { CatService } from "./cat.service";
import { HelloService } from "./hello.service";

@Injectable()
export class AppService{
    constructor(
        private helloService:HelloService,
        private catService:CatService
    ){}

    getRoot():string{
        this.helloService.sayHello('hi')   
        return 'scope -> service -> app.service'
    }
}