import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { User } from "../entity/user.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(
        private dataSource:DataSource
    ){
        dataSource.subscribers.push(this)
    }

    listenTo() {
        return User;
    }
    
    beforeInsert(event: InsertEvent<User>) {
        console.log(`BEFORE USER INSERTED: `, event.entity);
    }

}