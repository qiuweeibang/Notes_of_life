# 一.构建基础篇



### package.json 文件

1.第三方插件配置

​		1.1 browserslist :配置项，那么该配置项便是这里所说的第三方插件配置，该配置的**主要作用是用于在不同的前端工具之间共享目标浏览器和 Node.js 的版本**：

```
"browserslist": [
    "> 1%", // 表示包含所有使用率 > 1% 的浏览器
    "last 2 versions", // 表示包含浏览器最新的两个版本
    "not ie <= 8" // 表示不包含 ie8 及以下版本
]
```

​		1.2  [autoprefixer](https://www.npmjs.com/package/autoprefixer) 这样的插件需要把你写的 css 样式适配不同的浏览器，

autoprefixer 的配置中，那么会存在一个问题，万一其他第三方插件也需要浏览器的包含范围用于实现其特定的功能，那么就又得在其配置中设置一遍，这样就无法得以共用。所以在 package.json 中配置 bro	wserslist 的属性使得所有工具都会自动找到目标浏览器。



2.除了文章中介绍的 `browserslist` 这样的配置项可以写在单独的文件中外，还有哪些常用的配置项可以这样操作？又是如何配置的？

  \*  script  表示命令行

  \*  dependencies 表示依赖项

  \*  devDependencies 开发环境依赖性

  \*  browserslist   浏览器兼容列表

  \*  gitHooks  Git提交定制化的脚本程序

  \*  lint-staged  代码规范,提交git符合代码规则

 



不积跬步无以至千里，不积小流无以成江海。



### webpack

1. vue.config.js 的配置

   1.基础配置

   ```js
   // vue.config.js
   module.exports = {
       ...
       
       baseUrl: 'vue',//将项目地址加一个二级目录，比如：`http://localhost:8080/vue/`，那么我们需要在 vue.config.js 里配置 baseurl 
       
       outputDir: 'output',//如果你想将构建好的文件打包输出到 output 文件夹下（默认是 dist 文件夹）
       
       productionSourceMap: true,//该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息，我们都会开启 source map
       ...
   }
   ```

   2.chainWebpack

   ​	chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置，其集成的是 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 这一插件，该插件可以使用链式操作来修改配置

   ```js
   // 用于做相应的合并处理
   const merge = require('webpack-merge');
   
   module.exports = {
       ...
       
       // config 参数为已经解析好的 webpack 配置
       chainWebpack: config => {
           config.module
               .rule('images')
               .use('url-loader')
               .tap(options =>
                   merge(options, {
                     limit: 5120,
                   })
               )
       }
       
       ...
   }
   
   转译后代码
   
   {
       ...
       
       module: {
           rules: [
               {   
                   /* config.module.rule('images') */
                   test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                   use: [
                       /* config.module.rule('images').use('url-loader') */
                       {
                           loader: 'url-loader',
                           options: {
                               limit: 5120,
                               name: 'img/[name].[hash:8].[ext]'
                           }
                       }
                   ]
               }
           ]
       }
       
       ...
   }
   ```

​		3.configureWebpack

​			除了上述使用 chainWebpack 来改变 webpack 内部配置外，我们还可以使configureWebpack		来进行修改，两者的不同点在于 chainWebpack 是链式修改，而 configureWebpack 更倾向于整		体替换和修改

```js
// vue.config.js
module.exports = {
    ...
    
    // config 参数为已经解析好的 webpack 配置
    configureWebpack: config => {
        // config.plugins = []; // 这样会直接将 plugins 置空
        
        // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
        return {
            plugins: []
        }
    }
    
    ...
}
```

configureWebpack 可以直接是一个对象，也可以是一个函数，如果是对象它会直接使用 webpack-merge 对其进行合并处理，如果是函数，你可以直接使用其 config 参数来修改 webpack 中的配置，或者返回一个对象来进行 merge 处理。

 		4.devServer	

```js
vue.config.js 还提供了 devServer 项用于配置 webpack-dev-server 的行为，使得我们可以对本地服务器进行相应配置 
	devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
        port: 8080, // 端口地址
        https: false, // 使用https提供服务
        proxy: null, // string | Object 代理设置
        
        // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
          // `app` 是一个 express 实例
        }
    }
```



2.默认插件简介

```js
// vue-loader是 webpack 的加载器，允许你以单文件组件的格式编写 Vue 组件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// webpack 内置插件，用于创建在编译时可以配置的全局常量
const { DefinePlugin } = require('webpack');

// 用于强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 用于在 webpack 构建期间优化、最小化 CSS文件
const OptimizeCssnanoPlugin = require('optimize-css-assets-webpack-plugin');

// webpack 内置插件，用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
const { HashedModuleIdsPlugin } = require('webpack');

// 用于根据模板或使用加载器生成 HTML 文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于在使用 html-webpack-plugin 生成的 html 中添加 <link rel ='preload'> 或 <link rel ='prefetch'>，有助于异步加载
const PreloadPlugin = require('preload-webpack-plugin');

// 用于将单个文件或整个目录复制到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(), 
        
        /* config.plugin('define') */
        new DefinePlugin(),
        
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(),
        
        /* config.plugin('extract-css') */
        new MiniCssExtractPlugin(),
        
        /* config.plugin('optimize-css') */
        new OptimizeCssnanoPlugin(),
        
        /* config.plugin('hash-module-ids') */
        new HashedModuleIdsPlugin(),
        
        /* config.plugin('html') */
        new HtmlWebpackPlugin(),
        
        /* config.plugin('preload') */
        new PreloadPlugin(),
        
        /* config.plugin('copy') */
        new CopyWebpackPlugin()
    ]
}


```

每个插件上方都添加了使用 chainWebpack 访问的方式，同时我也添加了每个插件相应的用途注释，需要注意的是要区分 webpack 内置插件和第三方插件的区别，如果是内置插件则无需安装下载，而外部插件大家可以直接访问：[https://www.npmjs.com/](https://www.npmjs.com/) 搜索对应的插件，了解其详细的 api 设置。





### env 文件与环境设置

1.环境配置

\*  开发环境（开发阶段，本地开发版本，一般会使用一些调试工具或额外的辅助功能）

\*  测试环境（测试阶段，上线前版本，除了一些 bug 的修复，基本不会和上线版本有很大差别）

\*  生产环境（上线阶段，正式对外发布的版本，一般会进行优化，关掉错误报告）

作为一名开发人员，我们可能需要针对每一种环境编写一些不同的代码并且保证这些代码运行在正确的环境中，那么我们应该如何在代码中判断项目所处的环境同时执行不同的代码呢？这就需要我们进行正确的环境配置和管理。



可以了解到每一个环境其实有其不同的配置，同时它们也存在着交集部分，交集便是它们都共有的配置项，那么在 Vue 中我们应该如何处理呢？

```js
1.在根目录下创建以下形式的文件进行不同环境下变量的配置：
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略

2.创建一个名为 .env.stage 的文件，该文件表明其只在 stage 环境下被加载，在这个文件中，我们可以配置如下键值对的变量：
NODE_ENV=stage
VUE_APP_TITLE=stage mode


3.在 vue.config.js 中访问这些变量呢？很简单，使用 process.env.[name] 进行访问
// vue.config.js
console.log(process.env.NODE_ENV); // development（在终端输出）


4.因为 vue-cli-service serve 命令默认设置的环境是 development，你需要修改 package.json 中的 serve 脚本的命令为
"scripts": {
    "serve": "vue-cli-service serve --mode stage",
}

5.相同配置项的权重
env.[mode].local > .env.[mode] > .env.local > .env 
除了相同配置项权重大的覆盖小的，不同配置项它们会进行合并操作，类似于 Javascript 中的 Object.assign 的用法。

```



2.环境注入

通过上述配置文件的创建，我们成功使用命令行的形式对项目环境进行了设置并可以自由切换，但是需要注意的是我们在 Vue 的前端代码中打印出的 `process.env` 与 vue.config.js 中输出的可能是不一样的，这需要普及一个知识点：webpack 通过 DefinePlugin 内置插件将 process.env 注入到客户端代码中。

```js
// webpack 配置
{
    ...
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    
    ...
}
```

 **CLI 封装后仅支持注入环境配置文件中以 `VUE_APP_` 开头的变量，而 `NODE_ENV` 和 `BASE_URL` 这两个特殊变量除外**

可见注入时过滤调了非 `VUE_APP_` 开头的变量，其中多出的 `BASE_URL` 为你在 vue.config.js 设置的值，默认为 /，其在环境配置文件中设置无效。



3.额外配置

​	新建配置文件的方式为项目不同环境配置不同的变量值，能够实现项目基本的环境管理，但是 .env 这样的配置文件中的参数目前只支持静态值，无法使用动态参数，在某些情况下无法实现特定需求，这时候我们可以在根目录下新建 config 文件夹用于存放一些额外的配置文件。

​	**环境变量分为了公共变量、开发环境变量和生产环境变量， 根据环境判断使用哪份配置**



4.实际场景

 比如在非线上环境我们可以给自己的移动端项目开启 [vConsole](https://github.com/Tencent/vConsole) 调试，但是在线上环境肯定不需要开启这一功能，可以在入口文件设置 仅在开发环境则开启。





环境的配置和管理对于项目的构建起到了至关重要的作用，通过给项目配置不同的环境不仅可以增加开发的灵活性、提高程序的拓展性，同时也有助于帮助我们去了解并分析项目在不同环境下的运行机制，建立全局观念。