import { Body, Controller , DefaultValuePipe, Get, Param , Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { CreateUserDto } from '../dto/user.dto';

@Controller(
    {path: 'user'}
)
export class UserController {

    constructor(){}

    @Get(':id')
    userDetail(@Param('id' ,new ParseIntPipe()) id:number):string{
        return id.toString()
    }

    @Get()
    async findAll(
        @Query('page',new DefaultValuePipe(0),new ParseIntPipe()) page:number
    ){

    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createDto:CreateUserDto){
        console.log(createDto);
        return createDto.name
    }


}
