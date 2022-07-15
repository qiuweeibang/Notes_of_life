/* call */
/** 
 * this 指向调用call的对象
 *  @params that  传入的this指向
 *  @params arg    参数
 **/
Function.prototype.myCall= function(that,...arg){
    let fn = Symbol('fn'); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    that = that || window   // 若没有传入this, 默认绑定window对象
    that[fn] = this ;  // this指向调用call的对象,即我们要改变this指向的函数
    let res  =  that[fn](...arg)   // 执行当前函数
    delete fn    // 删除我们声明的fn属性
    return res   // 返回函数执行结果
}

/* apply */
Function.prototype.myApply= function(that,arg=[]){
    if(arg !== []){
        return console.error('myApply 参数需要[]类型')
    }
    let fn = Symbol[1];
    that[fn] = this;
    let res  =  that[fn](...arg)
    delete fn
    return res
}

/* bind */
Function.prototype.myBind= function(that,arg){
    return function(){
        let fn = Symbol[1];
        that[fn] = this;
        let res  =  that[fn](...arg)
        return res
    }
}
