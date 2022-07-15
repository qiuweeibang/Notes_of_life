### ES6

**1、let 和 const**

2、默认参数

3、扩展运算符(合并数组)

4、concat (合并数组

5、剩余参数

6、模板字符串

7、Object.keys ：获取对象的key值成数组



8、箭头函数 : 没有原型对象,没有自己的this，没有arguments对象，不可作为构造函数，不能使用new

9、Array.prototype.forEach(*三个参数：遍历项 索引 数组本身*) :  改变原数组:基础类型不会被更改, 使用array[index]的形式是赋值是可以改变的



10、Array.prototype.map 常用于返回一个处理过后的新数组

11、Array.prototype.filter 用来过滤的方法,返回过滤的新数组

12、Array.prototype.some  只要有一个是真，那就返回真（只要有一个符合条件,就返回true,如果没有就false）

13、Array.prototype.every  是要所有为真才返回真  (所有为真则返回为true,否则为false)

14、对象属性同名简写

15、Promise

```js
1.resolve('成功状态')		Promise.then(()=>{})
2.reject('失败状态')		Promise.catch(()=>{})
	Promise.then(res=>{
    	// '成功'
	},err=>{
    	// 一秒钟后输出 '错误啦'
	})

3.all方法
	接收一个Promise数组，数组中如有非Promise项，则此项当做成功
	如果所有Promise都成功，则返回成功结果数组
  如果有一个Promise失败，则返回这个失败结果
   
// 如果全都为成功
function fn(time) {
  return new Promise((resolve, reject) => {
    console.log(88)
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

Promise.all([fn(2000), fn(3000), fn(1000)]).then(res => {
  // 3秒后输出 [ '2000毫秒后我成功啦！！！', '3000毫秒后我成功啦！！！', '1000毫秒后我成功啦！！！' ]
  console.log(res) 
}, err => {
  console.log(err)
})



// 如果有一个失败
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.all([fn(2000, true), fn(3000), fn(1000, true)]).then(res => {
  console.log(res)
}, err => {
  console.log(err) // 3秒后输出 '3000毫秒后我失败啦！！！'
})

4.race方法
	接收一个Promise数组，数组中如有非Promise项，则此项当做成功
	哪个Promise最快得到结果，就返回那个结果，无论成功失败
    
function fn(time, isResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve(`${time}毫秒后我成功啦！！！`) : reject(`${time}毫秒后我失败啦！！！`)
    }, time)
  })
}

Promise.race([fn(2000, true), fn(3000), fn(1000)]).then(res => {
  console.log(res)
}, err => {
  console.log(err) // 1秒后输出
})
```



16、class

1.class`本质也是`function`，`class`是`function`的`语法糖

2.构造器 **constructor**

3.`extend`继承

4.静态属性和静态方法，使用`static`定义的属性和方法只能class自己使用



17、解构赋值

​	1、对象解构赋值

​	2、函数解构赋值

​	3、数组结构赋值(通过索引)

```js
对象深度解构赋值
const obj = {
  name: '林',
  doing: {
    morning: '摸鱼',
    afternoon: '摸鱼',
    evening: 'sleep'
  }
}
const { name,doing:{evening} } = obj
evening //  sleep

数组解构
const arr = [1, 2, 3]

const [a, b, c] = arr
console.log(a, b, c) // 1 2 3

// 默认赋值
const [a, b, c, d = 5] = arr
console.log(a, b, c, d) // 1 2 3 5

// 乱序解构
const { 1: a, 0: b, 2: c } = arr
console.log(a, b, c) // 2 1 3
```



18、find 和 findIndex

​	find：找到返回被找元素，找不到返回undefined

​	findIndex：找到返回被找元素索引，找不到返回-1



19、for of 和 for in

​	for in ：遍历方法，可遍历对象和数组

​	for of ：遍历方法，只能遍历数组，不能遍历非iterable对象



### ES7

20、includes 传入元素，如果数组中能找到此元素，则返回true，否则返回false

21、求幂运算符 

**const** num = Math.pow(3, 2) *// 9* 

**const** num = 3 ** 2 *// 9* 



### ES8

22、Object.values 可以用来获取对象的value的集合(数组)

23、Object.entries 可以用来获取对象的键值对集合

```
const obj = {
  name: '林三心',
  age: 22,
  gender: '男'
}

const entries = Object.entries(obj)
console.log(entries) 
// [ [ 'name', '林三心' ], [ 'age', 22 ], [ 'gender', '男' ] ]
```



24、async/await **以同步方式执行异步操作**

- await只能在async函数里使用
- await后面最好接Promise，如果后面接的是普通函数则会直接执行
- async函数返回的是一个Promise



### ES9

25、for await of    将多个请求放入数组中,通过循环来输出

```js
function fn (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${time}毫秒后我成功啦！！！`)
    }, time)
  })
}

async function asyncFn () {
  const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)]
  for await (let x of arr) {
    console.log(x)
  }
}
```

26、Promise.finally 新增的Promise方法，无论失败或者成功状态，都会执行这个函数



### ES10

27、Array.flat(Infinity)  将多维数组转化为一维数组

可以传参数，参数为降维的次数, 参数为Infinity的话，可以实现了多维数组(无论几维)降为一维数组



28、Array.flatMap

```js
let arr = ["科比 詹姆斯 安东尼", "利拉德 罗斯 麦科勒姆"];
将上面数组转为
[ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]

//map + flat
console.log(arr.map(x => x.split(" ")).flat());
// [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]

//flatMap就是flat + map，一个方法顶两个
console.log(arr.flatMap(x => x.split(" ")));
// [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]
```



29、BigInt(解决精度丢失问题)

`BigInt`是ES10新加的一种JavaScript数据类型，用来表示表示大于 `2^53 - 1` 的整数，`2^53 - 1`是ES10之前，**JavaScript所能表示最大的数字**



30、Object.fromEntries  Object.fromEntries`把`键值对数组转为对象

```js
const arr = [
  ['name', '林三心'],
  ['age', 22],
  ['gender', '男']
]

console.log(Object.fromEntries(arr)) // { name: '林三心', age: 22, gender: '男' }

//Map转为对象
const map = new Map()
map.set('name', '林三心')
map.set('age', 22)
map.set('gender', '男')

console.log(map) // Map(3) { 'name' => '林三心', 'age' => 22, 'gender' => '男' }

const obj = Object.fromEntries(map)
console.log(obj) // { name: '林三心', age: 22, gender: '男' }
```



31、String.trimStart && String.trimEnd trimStart和trimEnd用来单独去除字符串的首和尾的空格

​		String.trim方法，可以清除字符串首尾的空格



## ES11

32、Promise.allSettled （数组版all）

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- **把每一个Promise的结果，集合成数组，返回**



33、 ?. 可选链  和 ??   空位合并运算符

?. 可选链

```js
//1.变量
    const list = null
    // do something
    if (list && list.length) {
      // do something
    }

    // 使用可选链
    const list = null
    // do something
    if (list?.length) {
      // do something
    }

//2、对象
    const obj = {
      cat: {
        name: '哈哈'
      }
    }
    const dog = obj && obj.dog && obj.dog.name // undefined

    // 可选链
    const obj = {
      cat: {
        name: '哈哈'
      }
    }
    const dog = obj?.dog?.name // undefined

// 3.函数
    const fn = null
    // do something
    const res = fn && fn()

    // 可选链
    const fn = null
    // do something
    const res = fn?.()

//4.数组
    const arr = null
    // do something
    const item = arr && arr[1]

    // 可选链
    const arr = null
    // do something
    const item = arr?.[1]
```



??   空位合并运算符 **只有undefined和null才算假值**

```js
使用||运算符，只要左边是假值，就会返回右边的数据

const a = 0 || '林三心' // 林三心
const b = '' || '林三心' // 林三心
const c = false || '林三心' // 林三心
const d = undefined || '林三心' // 林三心
const e = null || '林三心' // 林三心

而??和||最大的区别是，在??这，只有undefined和null才算假值

const a = 0 ?? '林三心' // 0
const b = '' ?? '林三心' // ''
const c = false ?? '林三心' // false
const d = undefined ?? '林三心' // 林三心
const e = null ?? '林三心' // 林三心
```



### ES12

34、Promise.any

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- **如果有一个Promise成功，则返回这个成功结果**
- 如果所有Promise都失败，则报错



35、数字分隔符  数字分隔符可以让你在定义长数字时，更加地一目了然

```
const num = 1000000000

// 使用数字分隔符
const num = 1_000_000_000
```



36、||= 和 &&=

```
或等于(||=)   a ||= b 等同于 a || (a = b);

且等于(&&=)   a &&= b 等同于 a && (a = b);
```





37、对象计算属性(动态存储属性)

```js
this.setData({
  [`${type}Name`]: name
})
```













==================================分割线===============================================

有待深究知识

2.Map和Set

3.Array.prototype.reduce 

```js
第一个参数callback函数： pre为上次return的值，next为数组的本次遍历的项
第二个参数为初始值，也是第一个pre

// 计算 1 + 2 + 3 + 4 + 5
const reduceArr = [1, 2, 3, 4, 5]
const sum = reduceArr.reduce((pre, next) => {
  return pre + next
}, 0)
console.log(sum) // 15

// 统计元素出现个数
const nameArr = ['林三心', 'sunshine_lin', '林三心', '林三心', '科比']
const totalObj = nameArr.reduce((pre, next) => {
  if (pre[next]) {
    pre[next]++
  } else {
    pre[next] = 1
  }
  return pre
}, {})
console.log(totalObj) // { '林三心': 3, sunshine_lin: 1, '科比': 1 }

```

4.Symbol



