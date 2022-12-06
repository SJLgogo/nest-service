import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    userName: string;
    
    @IsNumber()
    age: number;

    @IsString()
    sex:string
}


// 设置所有属性可选
// export class UpdateCatDto extends PartialType(CreateUserDto) {}



// 一个使用类验证器定义验证规则的类
export class FindOneParams{
  @IsNumberString()
  id:number
}



