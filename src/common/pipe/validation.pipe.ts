import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";


/** 接受一个输入值 ， 然后立即返回相同的值  */

export class ValidationSimplePipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        return value
    }
}

export class ValidationPipe implements PipeTransform{
    async transform(value: any, { metatype }: ArgumentMetadata) {
        console.log(value , metatype);
        if(!metatype || !this.toValidate(metatype)){
            return value
        }
        const object = plainToClass(metatype, value);
        console.log(object);
        const errors = await validate(object);
        if (errors.length > 0) {
          throw new BadRequestException('Validation failed');
        }
        return value;
    }


    private toValidate(metaType:Function):boolean{
        const types:Function[]=[String, Boolean, Number, Array, Object]
        return !types.includes(metaType)
    }
}