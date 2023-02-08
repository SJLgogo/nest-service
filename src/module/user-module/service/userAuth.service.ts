import { Injectable } from "@nestjs/common";

@Injectable()
export class UserAuthService{
    private readonly users=[
        {
            userId:1,
            username:'john'
        }
    ]

    async findOne(username:string):Promise<any>{
        return this.users.find(user => user.username === username);
    }
}