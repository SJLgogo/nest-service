import { Body, Controller , DefaultValuePipe, Get, Param , Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGard } from 'src/common/guards/auth.gard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { CreateUserDto, FindOneParams } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller(
    {path: 'user'}
)
export class UserController {

    constructor(private userService:UserService , private moduleRef:ModuleRef , 
        private configService:ConfigService
        ){}

    @Get('/findById/:id')
    async userDetail(@Param('id') id:number):Promise<User>{       // 开启管道自动转换
        return await this.userService.findUserById(id)
    }
    /** 显式转换 : 
     *  @Parma('id' , ParseIntPipe) id :number
     *  @Parma('sort' , ParseBoolPipe) sort : boolean
     */
    // async userDetail(@Param() params:FindOneParams){
    //     return await this.userService.findUserById(params.id)
    // }

    @Get()
    async findAll():Promise<User[]>{
       return await this.userService.findAllUser()
    }

    @Post('/update')
    // async updateUser(
    //     @Body() upDateProp:
    // ){

    // }



    @Post('/createUser')
    async createUser(@Body() user:CreateUserDto):Promise<User>{
        return await this.userService.createUser(user)
    }


}
