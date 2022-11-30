import { Injectable } from "@nestjs/common";

/** 一 : 标准提供者
 *  providers:[TemplateService] = providers:[
 *      {
 *          provide:TemplateService,
 *          useClass:TemplateService
 *      }
 *  ]   
 */
@Injectable()
class TemplateService{
    constructor(){}
    private str:string = '基础依赖注入返回'

    returnStr():string{
        return this.str
    }
}


/** 
 * 二 : ValueProvider useValue注入常量值
 * providers:[
 *      {
            provide:TemplateService,
            useValue:mockService
        }
 * ] 
 **/
const mockService = {
    name:'sjl',
    age:18,
    returnStr:()=>'useValue'
}


/**
 * 三: useClass  使用此class作为令牌
 */
@Injectable()
class ConfigService{
    constructor(){}
}

/**
 * 四 : useFactory
 * 提供程序由工厂函数返回的值提供 ， inject属性接受参数 ，并在实例化过程中传递给工厂函数
 */





export {
    TemplateService,
    mockService,
    ConfigService
}