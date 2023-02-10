import { SetMetadata } from "@nestjs/common";
import { MyLogger } from "src/module/logger/logger.service";

export const Roles = (...roles:string[]) => SetMetadata('roles',roles)

const a = Roles('2')
console.log(a);



