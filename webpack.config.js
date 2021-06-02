// es6 核心
const { resolve } = require('path')
// 插件需要引入 plugins
const htmlWebpackplugin = require('html-webpack-plugin')

module.exports = {
    entry : './src/index/js',
    output: {
        filename:'build.js',
        path:resolve(__dirname,'build')
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
                ]
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
                    name:'[hash:10].[ext]'
                }
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
    mode:'development'
}