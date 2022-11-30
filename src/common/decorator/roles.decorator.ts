import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles:string[]) => SetMetadata('roles',roles)

const a = Roles('2')
console.log(a);
