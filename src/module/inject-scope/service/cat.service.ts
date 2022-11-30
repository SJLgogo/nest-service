import { Injectable, Scope , Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';


/**
 * 注意 ： 使用请求范围的提供程序将影响程序性能 。除非程序必须是请求范围的 ， 否则强烈建议使用默认的单例范围
 */

@Injectable({
    scope:Scope.REQUEST,  // 针对每个传入请求专门创建提供程序的新实例。在请求完成后 , 进行垃圾回收
    durable:true    // 将持久标志设置为true
})
export class CatService{
    // 当使用请求范围的提供程序时，可能会希望访问对原始对象的引用 ，可以通过注入REQUEST来实现
    constructor(
        @Inject(REQUEST) private request : Request){
    }

    find(){
        return '作用域:REQUEST'
    }
}