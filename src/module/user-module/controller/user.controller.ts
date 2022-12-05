import { Body, Controller , DefaultValuePipe, Get, Param , Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGard } from 'src/common/guards/auth.gard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller(
    {path: 'user'}
)
export class UserController {

    constructor(private userService:UserService , private moduleRef:ModuleRef){}

    // @Get(':id')
    // userDetail(@Param('id' ,new ParseIntPipe()) id:number):string{
    //     return id.toString()
    // }

    @Get()
    async findAll(){
       return await this.userService.findAllUser()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createDto:CreateUserDto){
        return createDto.name
    }

    @Post('/createMany')
    async createMany(@Body() users:User[]){
        return await this.userService.createMany([
            {userName:'sjl',age:18,sex:'男',id:282,isActive:false}
        ])
    }


}
