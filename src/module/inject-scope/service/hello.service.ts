import { Inject, Injectable, Scope } from "@nestjs/common";
import { INQUIRER } from "@nestjs/core";

@Injectable({
    scope:Scope.TRANSIENT   // 注入临时提供者的每个消费将收到一个新的实例
})
export class HelloService{
    constructor(@Inject(INQUIRER) private parentClass: object) {}

    sayHello(message: string) {
      console.log(`${this.parentClass?.constructor?.name}: ${message}`);
    }
}