import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    
    findAll():any[]{
        return [
            {name:'sjl',age:2}
        ]
    }
}