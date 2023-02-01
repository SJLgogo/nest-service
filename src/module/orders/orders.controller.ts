import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrdersService } from "./service/orders.service";

@Controller('orders')
export class OrderController{

    constructor(private orderService:OrdersService){}

    @Post()
    createOrder(@Body() createOrderDto:CreateOrderDto ){
        return this.orderService.create(createOrderDto)
    }
}