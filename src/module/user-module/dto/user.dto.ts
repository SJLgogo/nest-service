import { PartialType  , OmitType  , IntersectionType} from "@nestjs/mapped-types";
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
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumberString()
  id: number;
} 


// 一个使用类验证器定义验证规则的类
export class FindOneParams{
  @IsNumberString()
  id:number
}


// 从输入类型选择所有属性 ，然后删除一组特定的键来构造类型
export class OmitUserType extends OmitType(CreateUserDto, ['userName']) {

}


// IntersectionType  将两个类结合成一个类 
export class intersectionTypeUser extends IntersectionType(
  CreateUserDto, FindOneParams
){

}