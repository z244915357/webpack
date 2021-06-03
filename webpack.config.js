// es6 核心
const { resolve } = require('path')
// 插件需要引入 plugins
const htmlWebpackplugin = require('html-webpack-plugin')

module.exports = {
    // 使用webpack-cli 4.0版本 webpack-dev-server启动服务时 entry 默认会找寻src目录下的index.js文件
    // 不必使用指定绝对路劲  ./src/index.js   使用 entry: './src'即可
    // 当不使用webpack-dev-server时 ，使用手动打包指令 开发打包 npm run dev  packjson文件有注释  需要制定入口文件 entry : './src/index.js'
    entry : './src',
    output: {
        filename:'js/main.js',
        path:resolve(__dirname,'dist')
    },
    module:{
        rules:[
            // css-loader 将css 转译插入到commonjs中  
            // style-loader 将commonjs 中的css转译后的js解读 创建style标签 嵌入到header中渲染样式 
            {
                test:/\.css/,
                use:[
                    'style-loader',
                    'css-loader'
                ],
                
            },
            // less-loader 处理less 类型的文件
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(jpg|jpeg)$/,
                //需要下载url-loader file-loader 
                loader:'url-loader',
                options:{
                    // 图片小于64 将使用base64处理
                    limit:8 * 1024,
                    //hash:10 按10个字符 ext 按默认文件类型 命名
                    name:'[hash:10].[ext]',
                    outputPath:'imgs'     
                },
            },
            // url-loader 不能处理html文件中的img引入文件 所有需要使用html-loader 进行处理引入文件
            {
                test:/\.html$/,
                // html-loader 负责处理html 文件中img 引入的文件
                loader:'html-loader',
                // html-loader 使用commonjs解析  url-loader 使用es6模块编译解析 关闭（esModele:false）模块编译，图片就能正常展示
                options:{
                    esModule:false
                }
            },
            // 打包其他资源  js/css/html/json/less以外的资源（如js/css等资源前面已经配置了处理的loader这里将这些资源全部排除掉即可，这里使用过排除法，排除那些已经做过处理的文件类型，剩下的类型交友file-loader处理）
            {
                // exclude 排除制定文件之外的资源
                exclude:/\.(js|css|html|less|json|jpg|jpeg)$/,
                loader:'file-loader',
                options:{
                    outputPath:'media'  
                }
            }
        ]
    },
    // 插件  引用插件需要1.下载 2.引入 3.使用
    plugins:[

        // 创建一个空html 加载资源 并将页面嵌入到展示html中
        new htmlWebpackplugin({
            // 生成的目标html
            template: './src/index.html'
        })
    ],
    // 编译模块
    mode:'development',

    // 开发服务器 devServe ：用来自动化（自动化编译，自动化打开浏览器，自动化浏览器刷新）
    // 特点: 只会在内存中编译，不会进行输出
    // 启动devServe的指令位npx webpack-dev-server

    devServer: {
        // 启动服务的目录（开发环境编译后的文件）
        contentBase : resolve(__dirname,'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // open 当页面发生改变时 控制自动化更新 或者 打开新窗口 （热更新）
        open: true
    }
}