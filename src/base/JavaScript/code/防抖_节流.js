function dou(fn,wait){
    /* 短时间内触发多次事件 只执行一次事件*/
    /* 短时间内大量触发同一事件，只会执行一次函数 */
    let TIMEOUT = null
    return function(){
        if(TIMEOUT) clearTimeout(TIMEOUT)
        TIMEOUT=setTimeout(()=>{
            fn.apply(this,args)
        },wait)
    }
}

/* 节流 */
function liu(fn,wait){
    /* 高频触发事件多次，每隔一段时间只执行一次 */
    let TIMEOUT = null
    return function(){
        if(!TIMEOUT){
            TIMEOUT= setTimeout(()=>{
                clearTimeout(TIMEOUT)
                flag = false
                fn.apply(this,args)
            },wait)
        }
    }
}
let now =new Date()
console.log(now.getFullYear()+'/'+(now.getMonth()+1))
