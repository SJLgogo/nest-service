/** 类装饰器 */

// 情况1 装饰器为传参  :
function logClass(params){
    console.log(params);    // 这个时候params就是类A本身

    params.prototype.aaa='xxx'      // 向类A上动态扩展属性方法
    params.prototype.getMessage=()=>{} 
}
@logClass
class A{
    constructor(){}
    getData(){
        console.log('11');
    }
}


// 情况2 装饰器传参 : 
function logClassPar(params:any){
    console.log(params);        // '装饰器参数'
    return (target)=>{
        console.log(target);    // target: 类B
        target.prototype.aaa='xxx'      
        target.prototype.getMessage=()=>{} 
    }
}

@logClassPar('装饰器参数')
class B{
    constructor(){}
    getData(){
        console.log('11');
    }
}


// 情况3 如果类装饰器返回一个值 ，他会使用返回的来替换类的声明
function logClass2(target:any){
    return class extends target{
        bb='装饰器中修改'
        getData(){
            console.log('修改了呀');
        }
    }
}

@logClass2
class C{
    public bb:string;
    constructor(){
        this.bb='xx'
    }
    getData(){
        console.log(this.bb);
    }
}

var c = new C()
c.bb // '装饰器中修改'
c.getData() // '修改了呀'