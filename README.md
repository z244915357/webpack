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
### 开发环境 性能优化 
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

### 生产环境 性能优化
    优化打包构建速度
    代码性能优化

