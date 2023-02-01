import { Injectable } from "@nestjs/common";
import { OnEvent } from '@nestjs/event-emitter';
import { MyLogger } from "src/module/logger/logger.service";

@Injectable()
export class OrderListener{

    constructor( private myLogger:MyLogger ){
    }

    @OnEvent('order.create') 
    handleListen(event:any){
        this.myLogger.log('监听接受信息',event)
    }  
}