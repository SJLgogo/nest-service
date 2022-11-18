import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

export class JoiValidationPipe implements PipeTransform{
    constructor(
        private schema:ObjectSchema
    ){}
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value)
        if(error){
            throw new Error('Dto Validation failed')
        }
        return value
    }
}