import { Injectable } from "@nestjs/common";
import { Order } from "../entity/order.entity";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrderDto } from "../dto/create-order.dto";

@Injectable()
export class OrdersService{
   
    constructor(private eventEmitter:EventEmitter2){}

    create(createOrderDto:CreateOrderDto){
        this.eventEmitter.emit('order.create',{
            name:'传递部分信息'
        })
        return createOrderDto.name
    }
}