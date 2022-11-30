import { Body, Controller , DefaultValuePipe, Get, Param , Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AuthGard } from 'src/common/guards/auth.gard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller(
    {path: 'user'}
)
export class UserController {

    constructor(private userService:UserService){}

    // @Get(':id')
    // userDetail(@Param('id' ,new ParseIntPipe()) id:number):string{
    //     return id.toString()
    // }

    @Get()
    async findAll(){
        return '2222'
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createDto:CreateUserDto){
        console.log(createDto);
        return createDto.name
    }


}
