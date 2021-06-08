"# webpack" 
测试下载文件内容

package.json文件配置打包命令

打包开发环境代码
npm run dev 

打包生产环境代码
npm run prod 

### 使用webpack 搭建基本的开发环境，搭建基本配置

开发环境 自动化编译不对对代码进行打包压缩处理，节省时间，提高效率，
生产环境打包则需要对文件进行打包压缩，让项目体积更小，提高性能，
当前webpack为开发环境的基本配置，仅用于开发环境
涉及的webpack的功能点有
1.js/json 文件的打包
2.css less webpack不能识别，使用对应的loader进行处理
3.img 类型文件的打包处理 
4.html 文件 使用img 便签引入图片 进行打包时处理
5.其他类型文件处理  使用exclude 排除法进行打包处理
6.开启自动化编译功能  使用webpack-dev-Server插件 完成自动化编译 提高开发效率  监测文件变化同步进行视图更新，简化了手动打包调试流程
7.使用webpack打包后对文件类型进行分类，避免文件杂乱无章存放

以上是本次webpack开发环境基本配置的所有内容

### webpack HMR功能  热模块替换 （类视于vue现在发行的vite构建工具，当某一个模块更新时，开发环境下只会构建更新的模块，不会编译关联模块） 
css 文件的热更新不用配置  只需要在devServer上增加一个hot:true 即可
js  文件需要进行模块监听配置否则更新某一个模块会重新加载所有，页面会直接刷新掉,
注意：只能处理非入口文件的js 
html 一般项目只有一个html文件所有不需要配置热模块更新
6.webpack 性能优化
### 开发环境  生产环境  性能优化  
    优化打包构建速度
    代码性能优化
    优化打包构建速度
    优化代码的调试功能  
    webpack HMR功能
    在devServer 种设置hot ：true
    在对module进行监听
    module.hot 返回值为true false 
    ture 则开启HMR功能  （模块热更新跟踪）
    当模块变更时 只编译变更模块 其他模块不加载
    xxx.js 为模块名 可以是一个可以是多个 不可以是入口的js文件
    if(module.hot){
      module.hot.accept('xxx1.js'，function(){
        console.log( fn() ,'fn()可以是函数可以是返回值，是当前跟踪模块的任意属性')
      })
      module.hot.accept('xxx2.js'，function(){
        console.log( a ,' a可以是函数可以是返回值，是当前跟踪模块的任意属性')
      })
    }

    调试 source-map
    inline- hidden- eval- cheap- cheap-module nosources- （source-map）
    内联 
    inline-source-map
    eval-source-map
    
    

    外部
    source-map
    hidden-source-map
    cheap-source-map
    cheap-mpdule-source-map
    nosources-source-map
   

    内联编译快，在js 文件内部  测试环境使用内联 eval-source-map 
    指出文件的错误位置 能看到源代码信息

    生产环境根据是否需要隐藏源代码进行选择
    隐藏源代码使用
    nosources-source-map //有报错 全部隐藏 源代码和映射都隐藏
    hidden-source-map  // 隐藏源代码 映射错误代码位置能找到

    不隐藏源代码使用
    source-map //运行快 展示错误信息和位置
    cheap-module-source-map  运行快 展示错误信息和位置

### 缓存 cacheDirectory ： false  编译js/css 当文件未发生变化时使用缓存，不需要向服务器请求资源，提高构建效率，减小服务器压力

出现的问题 不配置js/css 文件的hash值，无法监测文件是否有修改过

hash： [hash:10] 配置普通hash值，js/css 文件有更改时会更新文件的hash值
问题 js/Css公用一个hash值，重新构建时缓存会失效 ， 可能我之改动了一个文件，但是所有缓存都会失效

chunkhash [chunkhash:10] css引入到js 中， hash值公用，重新构建，hash值都会改变，也处理不了的单独文件hash更新，其他文件缓存同样失效

contenthash [contenthash: 10] 根据文件生产唯一的hash值，只有文件改动时，才生成新的hash值，其他文件不受影响，生产环境使用（缓存更友好）

### 树摇 tree chaking 使用

使用必备 打包时处理掉无用的内容 （比如注册的方法，并未使用，打包时会处理过滤掉这些不起作用的垃圾代码，打包后项目体积更小）

es6模块化  production（生产环境）

在package.json 文件中进行配置即可

"slideEffects":false (默认对所有文件进行tree shaking处理，但是webpack版本不同，有些会处理掉 css @babel/polyfill 等插件，所有我们通过下面的配置，指定那些类型文件不进行tree shaking 处理，避免出现问题)

"slideEffects":["*.css",".less"] （将不需要使用tree shaking 的文件类型写入到数组即可）




