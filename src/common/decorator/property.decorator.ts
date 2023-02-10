/** 属性修饰器 */


function logProperty(params:any){
    console.log('params' , params);  // xxxx
    
    // 接受2个参数 一个是类的原型对象 , 一个是属性名
    return function(target:any,name:any){ 
        console.log(target); 
        console.log(name);
        target[name]=params
    }
}

class D {
    @logProperty('xxxx')
    public bb:string;
    constructor(
    ){}

    getData(){
        console.log(this.bb);
    }

}