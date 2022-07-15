1.keyCodes 自定义键盘事件
2.performance 浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪

全局API
1.Vue.extend( options )   创建一个类无逻辑子组件
2.Vue.directive( id, [definition] )  全局指令
3.Vue.observable( object ) 让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
4.delimiters  改变模板语法标记 默认是{{}}

5.functional 函数式组件 使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。

6.model 允许一个自定义组件在使用 v-model 时定制 prop 和 event。
7.inheritAttrs 组件是否继承属性
8.comments 当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。


实例 property
1.vm.$slots 用来访问被插槽分发的内容。每个具名插槽有其相应的 property 
2.vm.$scopedSlots 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
3.vm.$isServer   当前 Vue 实例是否运行于服务器。
4.vm.$attrs 属性传值
5.vm.$listeners 通过 v-on="$listeners" 传入内部（子）组件——在创建更高层次的组件时非常有用

实例方法 / 数据
1.vm.$set( target, propertyName/index, value )   向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
2.vm.$delete( target, propertyName/index )  删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制

实例方法 / 事件
1.vm.$mount( [elementOrSelector] ) 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
2.vm.$forceUpdate()  迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
3.vue异步更新队列 
4.v-on 
.stop - 调用 event.stopPropagation()。
.prevent - 调用 event.preventDefault()。
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器

特殊 attribute
1.key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
	完整地触发组件的生命周期钩子 | 触发过渡
2.is 用于动态组件且基于 DOM 内模板的限制来工作。

内置的组件
1.component 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染
2.transition 过渡
3.transition-group 过渡 元素作为多个元素/组件的过渡效果
4.keep-alive 缓存组件 
	include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
	exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
	max - 数字。最多可以缓存多少组件实例

vue2 响应式原理
https://cn.vuejs.org/v2/guide/reactivity.html
