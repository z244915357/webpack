/*
index.js  webpack入口起点文件

1.运行指令
  开发环境:webpack ./src/index.js -o ./build --mode=development
  webpack 会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js
  整体打包环境为开发环境
  生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
  webpack 会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js
  整体打包环境为生产环境

2.结论 webpack 能处理js/json文件,css/img资源不能处理需要使用loader处理
  能将es6代码模块化编译，生产环境能压缩代码

*/ 
import dataJson from './json/data.json'
import './css/index.css'
import './css/public.css'
import './css/index.less'
import './iconfont/iconfont.css'
import print from './js/print.js'
import list from './js/list.js'
// import { mode } from '../webpack.config'
function add(x,y){
    return x + y
}
console.log(add(1,2))
console.log(dataJson)

console.log( print())
console.log( list())

if(module.hot){
  //一但module上有hot 属性，说明开启了webpack的HMR功能 --> 要让HMR功能生效
  module.hot.accept('./js/print.js',function(){
    console.log(
    print())
  }),
  module.hot.accept('./js/list.js',function(){
    console.log(
    list())
  })
}