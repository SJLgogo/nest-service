import { Module } from '@nestjs/common';
import { OrderListener } from './listeners/order-listener';
import { OrderController } from './orders.controller';
import { OrdersService } from './service/orders.service';

@Module({
    controllers:[OrderController],
    providers:[OrdersService,OrderListener],
})
export class OrdersModule {}
