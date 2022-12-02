import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpExceptionFilter } from "src/common/exception/exception.filter";
import { DataSource, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        private dataSource : DataSource
    ){
    }

    async createUser(post:Partial<User>):Promise<User>{
        const { userName } = post
        if(!userName){
            throw new HttpException('缺少人员姓名',200)
        } 
        const doc = await this.userRepository.findOne({ where:{ userName } })
        if(doc){
            throw new HttpException('人员已存在',200)
        }
        return await this.userRepository.save(post)
    }

    async findAllUser():Promise<User[]>{
        return await this.userRepository.find() 
    }

    async findUserById(id:number):Promise<User>{
        return await this.userRepository.findOneBy({id})
    }

    async remove(id:number):Promise<void>{
        await this.userRepository.delete(id)
    }

}