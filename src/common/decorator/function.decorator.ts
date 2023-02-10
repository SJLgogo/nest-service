/** 方法装饰器 
 *  应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
*/

// 情况1 通过方法修饰器加强或修改方法
function logMethod(params:any){

    return (target:any,name:string,desc:any)=>{
        console.log(target);  // 对实例成员方法来说:类的构造函数 静态成员方法:类的原型
        console.log(name);    // getData | getData2
        console.log(desc);

        let methods = desc.value  // 可以拿到对应name的方法

        desc.value = function(...args:any[]){
            args = args.map((item)=>String(item))
            methods.apply(this,args)
            console.log(args);
        }
    }
}

class E{
    constructor(){}

    @logMethod('实例成员的方法修饰器')
    getData(...args:any[]){
        console.log('我是原来的方法');
    }

    @logMethod('静态成员的方法修饰器')
    static getData2(){
        console.log('我是原来的方法');
    }
}

var e = new E()
e.getData(1,2,3,4)   
// '我是原来的方法'
// ['1','2','3','4']
