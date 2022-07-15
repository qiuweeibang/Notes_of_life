# JS基础

## 1. 如何在ES5环境下实现let

- `let`和`var`有什么区别，对于这个问题，我们可以直接查看`babel`转换前后的结果，看一下在循环中通过`let`定义的变量是如何解决变量提升的问题

  ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/5/1714616e2fd53bf8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

  **babel在let定义的变量前加了道下划线，避免在块级作用域外访问到该变量**，除了对变量名的转换，我们也可以通过自执行函数来模拟块级作用域

  ```js
  `var`声明的变量会挂到window上，而`let`和`const`不会
  `var`声明的变量存在变量提升，而`let`和`const`不会
  `let`和`const`声明形成块作用域，只能在块作用域里访问，不能跨块访问，也不能跨函数访问
   同一作用域下`let`和`const`不能声明同名变量，而`var`可以
   暂时性死区，`let`和`const`声明的变量不能在声明前被使用
  ```



## 2. 如何在ES5环境下实现const

实现const的关键在于`Object.defineProperty()`,API用于在一个对象上增加或修改属性。通过配置属性描述符，可以精确地控制属性行为。`Object.defineProperty()` 接收三个参数:



```js
Object.defineProperty(obj, prop, desc)
obj 要在其上定义属性的对象
prop 要定义或修改的属性的名称
descriptor	将被定义或修改的属性描述符

descriptor
	value 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为 undefined	
	get	  一个给属性提供 getter 的方法，如果没有 getter 则为 undefined	
	set   一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。当属性值修改时，触发执行该方法	 writable	当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false	
	enumerable enumerable定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举	
    Configurable configurable特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改	
```



## 3. 手写call() 

使用call传入this 和参数调用一个函数



```js
// this 转移
function foo(){
console.log(this.name)
}
cosnt call = fucntion(that,...arg){
    that.fn = this
    return that.fn(...arg)
}
```



